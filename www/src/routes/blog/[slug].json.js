import graph from "../../libs/Graph.js";

export async function get(req, res, next) {
  const { slug } = req.params;
  const query = `
    query FetchPostByID($slug: ID!) {
      getPost(slug: $slug) {
        content
        tags {
          label
          slug
        }
        attributes {
          title
          description
          date
          cover_image
          social_image
          heading_image
        }
        timeToRead
        ldjson
        slug
      }
    }
  `;
  const variables = { slug };

  try {
    const response = await graph.run(query, variables);

    // Bail if we have errors
    if (response.errors) throw new Error(response.errors);

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(response.data.getPost));
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
