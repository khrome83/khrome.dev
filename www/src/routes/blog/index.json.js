import graph from "../../libs/Graph.js";

export async function get(req, res, next) {
  const query = `
    query FetchPosts($page: ID!) {
      getPosts(page: $page) {
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
        count
      }
    }
  `;
  const variables = { page: 1 };

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
