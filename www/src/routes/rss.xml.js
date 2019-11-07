const RSS = require("rss");
import graph from "../libs/Graph.js";

export async function get(req, res, next) {
  const { slug } = req.params;
  const query = `
    query FetchPosts($page: Int!, $limit: Int!) {
      getHomepage {
        meta {
          title
          description
          name
          url
        }
      }
      getPosts(page: $page, limit: $limit) {
        posts {
          content
          slug
          tags {
            label
          }
          attributes {
            title
            description
            date
            social_image
            heading_image
          }
        }
        meta {
          title
          description
          name
          url
        }
      }
    }
  `;

  const variables = { page: 1, limit: 20 };

  try {
    const response = await graph.run(query, variables);

    // Bail if we have errors
    if (response.errors) throw new Error(response.errors);

    // All Posts we Have
    const { posts, meta } = response.data.getPosts;
    const { meta: siteMeta } = response.data.getHomepage;

    const feed = new RSS({
      title: meta.title,
      description: meta.description,
      feed_url: "https://khrome.dev/rss.xml",
      site_url: "https://khrome.dev",
      guid: meta.url,
      link: meta.url,
      managingEditor: "Zane C. Milakovic",
      webMaster: "Zane C. Milakovic",
      docs: "http://blogs.law.harvard.edu/tech/rss",
      categories: [
        "Front End Development",
        "Web Development",
        "Serverless",
        "JAMStack",
        "Node",
        "Svelte",
        "Zeit",
        "Now"
      ],
      pubDate: new Date(),
      language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
      image_url: "https://khrome.dev/social/social-profile-icon.png",
      favicon: "https://khrome.dev//favicon.ico",
      copyright: "Copyright 2019 Zane C. Milakovic. All rights reserved.",
      generator: "Custom Khrome.dev Generator", // optional, default = 'Feed for Node.js'
      feedLinks: {
        json: "https://khrome.dev/json",
        atom: "https://khrome.dev/atom"
      },
      author: "zane@khrome.dev (Zane C. Milakovic)"
    });

    posts.forEach(({ content, slug, attributes, tags }) => {
      feed.item({
        title: attributes.title,
        url: `https://khrome.dev/blog/${slug}`,
        description: attributes.description,
        categories: tags.map(({ label }) => label),
        date: new Date(attributes.date),
        image: attributes.heading_image,
        custom_namespaces: {
          content: "http://purl.org/rss/1.0/modules/content/",
          dc: "http://purl.org/dc/elements/1.1/"
        },
        custom_elements: [
          {
            "content:encoded": `${content} <br /><em>Originally published on <a href="https://khrome.dev/blog/${slug}">Khrome.dev</a>.</em>`
          }
        ]
      });
    });

    res.writeHead(200, {
      "Content-Type": "application/xml"
    });

    res.end(feed.xml());
  } catch (error) {
    console.log("ERROR: ", error);
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: `Not found`
      })
    );
  }
}
