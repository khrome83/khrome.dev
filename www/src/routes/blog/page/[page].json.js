import graph from "../../../libs/Graph.js";

export async function get(req, res, next) {
  const { page } = req.params;
  const query = `
    query FetchPosts($page: Int!, $limit: Int!) {
      getPosts(page: $page, limit: $limit) {
        posts {
          slug
          attributes {
            title
            description
            date
            cover_image
            social_image
            heading_image
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
  const variables = { page: parseInt(page, 10), limit: 10 };

  try {
    const response = await graph.run(query, variables);

    // Bail if we have errors
    if (response.errors) throw new Error(response.errors);

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(response.data.getPosts));
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
