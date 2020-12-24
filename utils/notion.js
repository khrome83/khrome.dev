import { NotionAPI } from 'notion-client';

const headers = new Headers();
headers.append('Authorization', `Bearer ${process.env.NOTION_TOKEN}`);

const notion = new NotionAPI({authToken: process.env.NOTION_TOKEN });

export const getAllPosts = async () => {
  const posts = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`,
    {
      method: 'GET',
      headers,
    }
  ).then((res) => res.json());

  return (process.env.SHOW_DRAFT === "true" ? posts : posts.filter(post => post.published === true));
};

export const getPost = async (slug) => {
  const posts = await getAllPosts();
  try {
    const post = posts.find((t) => t.slug === slug);
    const blocks = await notion.getPage(post.id);
    return { blocks, post };
  } catch (e) {
    return { blocks: {}, post: undefined};
  }  
}