// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require("fs");
const path = require("path");

module.exports = function(api, options) {
  api.loadSource(store => {
    if (process.env.NODE_ENV === "production") {
      const posts = store.getContentType("Post");

      posts.data().forEach(node => {
        if (node.published !== true) {
          posts.removeNode(node.id);
        }
      });
    }
  });

  api.beforeBuild(({ config, store }) => {
    // Generate an index file for Fuse to search Posts
    const { collection } = store.getContentType("Post");

    const posts = collection.data.map(post => {
      const { title, path, description } = post;
      return { title, path, description };
    });

    const output = {
      dir: "./static",
      name: "search.json",
      ...options.output
    };

    const outputPath = path.resolve(process.cwd(), output.dir);
    const outputPathExists = fs.existsSync(outputPath);
    const fileName = output.name.endsWith(".json")
      ? output.name
      : `${output.name}.json`;

    if (outputPathExists) {
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, fileName),
        JSON.stringify(posts)
      );
    } else {
      fs.mkdirSync(outputPath);
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, fileName),
        JSON.stringify(posts)
      );
    }
  });
};
