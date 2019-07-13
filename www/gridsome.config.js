// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

const postcssPlugins = [tailwind()];

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  siteName: "Khrome.dev",
  siteDescription: "Blog and Portfolio site for Zane C. Milakovic",
  siteUrl: "https://khrome.dev",
  plugins: [
    {
      use: "gridsome-plugin-simple-analytics",
      options: {
        domain: "sa.khrome.dev"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "posts/**/*.md",
        route: "/:slug",
        refs: {
          tags: {
            typeName: "Tag",
            route: "tag/:id",
            create: true
          }
        },
        remark: {
          plugins: [
            ["gridsome-plugin-remark-codesandbox"],
            [
              "gridsome-plugin-remark-shiki",
              { theme: "Material-Theme-Palenight", skipInline: true }
            ]
          ]
        }
      }
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Khrome.dev",
          description:
            "All about frontend web development and serverless technologies",
          language: "en",
          feed_url: "https://khrome.dev/rss.xml",
          site_url: "https://khrome.dev/"
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: "https://khrome.dev" + node.path,
          author: "Zane C. Milakovic",
          date: node.date,
          custom_elements: [
            { published: node.published },
            {
              content: `${
                node.content
              } \r\n *Originally published on [Khrome.dev](https://khrome.dev${
                node.path
              })*`
            }
          ]
        }),
        output: {
          dir: "./static",
          name: "rss.xml"
        }
      }
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000,
        exclude: ["/signed-up", "/thanks"],
        config: {
          "/posts": {
            changefreq: "daily",
            priority: 0.9
          },
          "/tag/*": {
            changefreq: "weekly",
            priority: 0.8
          },
          "/*": {
            changefreq: "monthly",
            priority: 1.0
          },
          "/": {
            changefreq: "monthly",
            priority: 0.5
          }
        }
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link"
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins
      }
    }
  }
};
