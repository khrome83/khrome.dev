import graph from "../libs/Graph.js";
const { createSitemap } = require("sitemap");

export async function get(req, res, next) {
  const { slug } = req.params;
  const query = `
    query FetchPosts($page: Int!, $limit: Int!) {
      getPosts(page: $page, limit: $limit) {
        posts {
          slug
        }
      }
      getTags {
        tags {
          slug
          count
        }
      }
    }
  `;

  const variables = { page: 1, limit: 100 };

  try {
    const response = await graph.run(query, variables);

    // Bail if we have errors
    if (response.errors) throw new Error(response.errors);

    // All Posts we Have
    const { posts } = response.data.getPosts;
    const { tags } = response.data.getTags;

    // URLs that don't get programaticly created
    const siteUrls = [
      { url: "/", changefreq: "monthly", priority: 0.5 },
      { url: "/blog/", changefreq: "weekly", priority: 0.8 },
      { url: "/blog/tag/", changefreq: "monthly", priority: 0.7 }
    ];

    // Blog Post Urls
    const blogUrls = posts.map(({ slug }) => ({
      url: `/blog/${slug}/`,
      changefreq: "monthly",
      priority: 1.0
    }));

    // Blog Pagination Urls (minus first poage)
    const blogPaginationUrls = [];
    const limit = 10; // Pagination Limit
    const pages = Math.ceil(posts.length / limit);
    for (let i = pages; i >= 2; i--) {
      blogPaginationUrls.push({
        url: `/blog/page/${i}/`,
        changefreq: "weekly",
        priority: 0.8
      });
    }

    // Tag List Urls
    const tagUrls = [];
    for (let i = 0; i < tags.length; i++) {
      const { slug, count } = tags[i];
      tagUrls.push({
        url: `/blog/tag/${slug}/`,
        changefreq: "weekly",
        priority: 0.8
      });

      // Pagination for Tag List Urls
      const tagPages = Math.ceil(count / limit);
      for (let i = tagPages; i >= 2; i--) {
        tagUrls.push({
          url: `/blog/tag/${slug}/page/${i}/`,
          changefreq: "weekly",
          priority: 0.8
        });
      }
    }

    const sitemap = createSitemap({
      hostname: "https://khrome.dev",
      cacheTime: 600000,
      urls: [...siteUrls, ...blogUrls, ...blogPaginationUrls, ...tagUrls]
    });

    res.writeHead(200, {
      "Content-Type": "application/xml"
    });

    res.end(sitemap.toXML());
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
