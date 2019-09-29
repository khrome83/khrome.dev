import graph from "../../../../../libs/Graph.js";

export async function get(req, res, next) {
  const { tag, page } = req.params;
  const query = `
    query FetchPostsByTag($tag: ID!, $page: Int!, $limit: Int!) {
      getPostsByTag(tag: $tag, page: $page, limit: $limit) {
        posts {
          slug
          attributes {
            title
            description
            date
            cover_image
          }
          timeToRead
        }
        page
        pagination {
          currentPage
          totalPages
          previousPage
          nextPage
        }
        meta {
          title
          description
          name
        }
        ldjson
      }
    }
  `;
  const variables = { tag: tag, page: parseInt(page, 10), limit: 10 };

  try {
    const response = await graph.run(query, variables);

    // Bail if we have errors
    if (response.errors) throw new Error(response.errors);

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(response.data.getPostsByTag));
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
