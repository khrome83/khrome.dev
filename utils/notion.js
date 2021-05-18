const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// TODO - Add Other Fields
const fmt = (field) => {
  switch (field.type) {
    case "rich_text":
    case "title":
      return field[field.type].map((cur) => fmt(cur)).join();
    case "text":
      return field.text.content;
    case "date":
      return field?.date?.start;
  }
};

const getDatabasesConfig = () => {
  const config = {
    database_id: process.env.NOTION_BLOG_ID,
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
    page_size: 10,
  };

  // Filter by Published Only
  if (process.env.SHOW_DRAFT === "false") {
    config.filter = {
      property: "published",
      checkbox: {
        equals: true,
      },
    };
  }

  return config;
};

export const getAllPosts = async (page = 1) => {
  const config = getDatabasesConfig();

  let start_cursor = undefined;
  let response;

  // Make Call for Notion Data
  for (let i = 0; i < page; i++) {
    config.start_cursor = start_cursor;
    response = await notion.databases.query(config);
    start_cursor = response.next_cursor;

    if (!response.has_more) break;
  }

  return {
    posts: response.results.map((result) => {
      const {
        id,
        properties: { slug, date, description, title },
      } = result;

      return {
        id,
        slug: fmt(slug),
        date: fmt(date),
        description: fmt(description),
        title: fmt(title),
      };
    }),
    next: response.has_more,
  };
};

export const getPaginationCount = async () => {
  const config = getDatabasesConfig();

  let start_cursor = undefined;
  let response;
  let count = 1;

  // Make Call for Notion Data
  while (true) {
    config.start_cursor = start_cursor;
    response = await notion.databases.query(config);
    start_cursor = response.next_cursor;

    if (!response.has_more) break;
    count++;
  }

  return count;
};

export const getAllSlugs = async () => {
  const config = getDatabasesConfig();
  config.page_size = 10;

  const output = [];
  let start_cursor = undefined;
  let response;

  while (true) {
    config.start_cursor = start_cursor;
    response = await notion.databases.query(config);
    start_cursor = response.next_cursor;

    if (!response.has_more) break;

    response.results.forEach((result) => {
      const {
        properties: { slug },
      } = result;

      output.push(fmt(slug));
    });
  }

  return output;
};

export const convertSlugToId = async (slug) => {
  const db = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_ID,
    filter: {
      property: "slug",
      text: {
        equals: slug,
      },
    },
  });

  return db.results[0].id;
};

export const getPost = async (slug) => {
  const blockId = await convertSlugToId(slug);
  console.log("ID - ", blockId);

  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  console.log(response);

  const posts = await getAllPosts();
  try {
    const post = posts.find((t) => t.slug === slug);
    const blocks = await notion.getPage(post.id);
    return { blocks, post };
  } catch (e) {
    return { blocks: {}, post: undefined };
  }
};
