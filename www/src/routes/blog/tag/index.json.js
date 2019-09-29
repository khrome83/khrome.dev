import graph from "../../../libs/Graph.js";

export async function get(req, res, next) {
  const { slug } = req.params;
  const query = `
    query FetchPosts {
      getTags {
        meta {
          title
          description
          url
        }
        tags {
          label
          slug
        }
        ldjson
      }
    }
  `;

  try {
    const response = await graph.run(query);

    // Bail if we have errors
    if (response.errors) throw new Error(response.errors);

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(response.data.getTags));
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
