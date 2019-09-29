import fs from "fs";
import fm from "front-matter";
import fg from "fast-glob";
import slug from "slug";
import words from "lodash.words";
const shiki = require("shiki");
import markdown from "markdown-it";

class Posts {
  constructor() {
    this.posts = new Map();
    this.tags = new Map();
  }

  // Markdown
  async markdown(content) {
    try {
      return await shiki
        .getHighlighter({
          theme: "Material-Theme-Palenight",
          skipInline: true
        })
        .then(highlighter => {
          const md = markdown({
            html: true,
            highlight: (code, lang) => {
              return highlighter.codeToHtml(code, lang);
            }
          })
            .use(require("markdown-it-anchor"))
            .use(require("markdown-it-img-lazy"), { useLoading: true });

          return md.render(content);
        });
    } catch (e) {
      console.log(e);
    }
  }

  // Pagination
  paginate(array, page, limit) {
    --page;
    return array.slice(page * limit, (page + 1) * limit);
  }

  // Date Formatter
  formatDate(isoDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const date = new Date(isoDate);

    return `${
      months[date.getMonth()]
    } ${date.getUTCDate()}, ${date.getFullYear()}`;
  }

  // JSONLD
  getLdJson(attributes, content, type = "BlogPost") {
    let ldjson;
    switch (type) {
      // ONLY A PARTIAL REFERENCE FOR USE WITHIN BLOG
      case "BlogPostReference":
        ldjson = `
          {
            "@type": "BlogPosting",
            "mainEntityOfPage": "https://khrome.dev/blog/${content}",
            "headline": "${attributes.title}",
            "description": "${attributes.description}",
            "datePublished": "${attributes.date}",
            "dateModified": "${attributes.date}",
            "image": {
              "@type": "ImageObject",
              "url": "${attributes.cover_image.replace(
                "screen=cover-image",
                "screen=social"
              )}",
              "height": "2048",
              "width": "1170"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Khrome.dev"
              "logo": {
                "@type": "ImageObject",
                "url": "https://khrome.dev/social/social-profile-icon.png",
                "height": "400",
                "width": "400"
              },
            },
            "author": {
              "@type": "Person",
              "name": "Zane C. Milakovic"
            },
          }`;
        break;
      case "Tag":
        ldjson = `<script type="application/ld+json">{
            "@context": "http://schema.org",
            "@type": "Blog",
            "name": "${attributes.name}",
            "url": "${attributes.url}",
            "description": "${attributes.description}",
            "publisher": {
              "@type": "Organization",
              "name": "Khrome.dev"
              "logo": {
                "@type": "ImageObject",
                "url": "https://khrome.dev/social/social-profile-icon.png",
                "height": "400",
                "width": "400"
              },
            },
            "sameAs": [
              "https://dev.to/khrome83",
              "https://twitter.com/KhromeDotDev"
            ]
          }</script>`;
        break;
      case "Blog":
        ldjson = `<script type="application/ld+json">{
          "@context": "http://schema.org",
          "@type": "Blog",
          "name": "${attributes.name}",
          "url": "${attributes.url}",
          "description": "${attributes.description}",
          "publisher": {
            "@type": "Organization",
            "name": "Khrome.dev"
            "logo": {
              "@type": "ImageObject",
              "url": "https://khrome.dev/social/social-profile-icon.png",
              "height": "400",
              "width": "400"
            },
          },
          "sameAs": [
            "https://dev.to/khrome83",
            "https://twitter.com/KhromeDotDev"
          ],
          "blogPosts": [
            ${content.join(",")}
          ]
        }</script>`;
        break;
      case "BlogPost":
      default:
        ldjson = `<script type="application/ld+json">{
            "@context": "http://schema.org/",
            "@type": "BlogPosting",
            "headline": "${attributes.title}",
            "description": "${attributes.description}",
            "datePublished": "${attributes.date}",
            "dateModified": "${attributes.date}",
            "mainEntityOfPage": "True",
            "image": {
              "@type": "ImageObject",
              "url": "${attributes.cover_image.replace(
                "screen=cover-image",
                "screen=social"
              )}",
              "height": "2048",
              "width": "1170"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Khrome.dev"
              "logo": {
                "@type": "ImageObject",
                "url": "https://khrome.dev/social/social-profile-icon.png",
                "height": "400",
                "width": "400"
              },
            },
            "author": {
              "@type": "Person",
              "name": "Zane C. Milakovic"
            },
            "articleBody": "${content}"
          }</script>`;
    }

    return ldjson;
  }

  // Parsers
  async parsePosts(pattern) {
    const files = fg.sync(pattern, { dot: true });

    for (const file of files) {
      const [path, postSlug] = file.match(/^..\/posts\/(.*)\.md$/) || ["", ""];

      try {
        const { attributes, body } = fm(fs.readFileSync(file, "utf-8"));

        if (
          (process.env.SHOW_UNPUBLISHED === "1" || attributes.published) &&
          postSlug
        ) {
          let tags = [];

          if (attributes.tags && attributes.tags.length > 0) {
            tags = this.parseTags(postSlug, attributes.tags);
          }

          // keep original date as iso date for sorting
          attributes.isoDate = attributes.date;

          // format date from iso string to Month D, YYYY
          attributes.date = this.formatDate(attributes.date);

          // markdown parser
          const content = await this.markdown(body);

          // time to read
          // gridsome used lodash, might offer differernt count with 230 division
          // https://github.com/lodash/lodash/blob/master/words.js
          const count = words(body).length;
          // gridsome uses 230
          const timeToRead = Math.round(count / 230) || 1;

          // json+ld - structured content
          const ldjson = this.getLdJson(attributes, content, "BlogPost");

          this.setPost(postSlug, {
            attributes,
            slug: postSlug,
            tags,
            timeToRead,
            content,
            ldjson
          });
        }
      } catch (error) {
        return error;
      }
    }
  }

  parseTags(postSlug, tags) {
    const output = [];

    // Builds Tag/Slug Mapping
    tags.forEach(tag => {
      const tagSlug = slug(tag);

      output.push({
        label: tag,
        slug: tagSlug
      });

      this.setTag(tag, tagSlug, postSlug);
    });

    // Augments Tag Data with Count of Instances
    return output.map(tag => {
      const count = this.getTag(tag.slug).posts.length;
      return { ...tag, count };
    });
  }

  // Tag
  setTag(tag, tagSlug, postSlug) {
    if (this.hasTag(tagSlug)) {
      const { posts: prevPosts } = this.getTag(tagSlug);
      const posts = [postSlug, ...prevPosts];
      this.tags.set(tagSlug, {
        label: tag,
        slug: tagSlug,
        posts,
        count: posts.length
      });
    } else {
      this.tags.set(tagSlug, {
        label: tag,
        slug: tagSlug,
        posts: [postSlug],
        count: 1
      });
    }
  }

  hasTag(tag) {
    return this.tags.has(tag);
  }

  getTag(tag) {
    return this.tags.get(tag);
  }

  // Post
  setPost(postSlug, data) {
    this.posts.set(postSlug, data);
  }

  hasPost(postSlug) {
    return this.posts.has(postSlug);
  }

  getPost(postSlug) {
    return this.posts.get(postSlug);
  }

  // Posts
  getPosts(page, limit) {
    const allPosts = [...this.posts.values()];
    let previousPage = "";
    let nextPage = "";
    let currentPage = "/blog";

    const meta = {
      name: "Khrome.dev",
      url: "https://khrome.dev/blog/",
      description:
        "A blog about JAM Stack and Front-end Development. Writing hastily by a developer with no time.",
      title: "Khrome.dev Blog - JAM Stack and Front-end Development"
    };

    // Pagination Data
    const totalPages = Math.ceil(this.posts.size / limit);

    if (page > 1) {
      currentPage = `/blog/page/${page}`;
    }

    if (page > 2) {
      previousPage = `/blog/page/${page - 1}`;
    } else if (page === 2) {
      previousPage = `/blog`;
    }

    if (page < totalPages) {
      nextPage = `/blog/page/${page + 1}`;
    }

    // Sort Descending by isoDate
    allPosts.sort((a, b) => {
      return a.attributes.isoDate < b.attributes.isoDate
        ? 1
        : a.attributes.isoDate > b.attributes.isoDate
        ? -1
        : 0;
    });

    // Enforce Limit and Pagination
    const posts = this.paginate(allPosts, page, limit);
    const postReferences = [];
    posts.forEach(post => {
      postReferences.push(
        this.getLdJson(post.attributes, post.slug, "BlogPostReference")
      );
    });

    const ldjson = this.getLdJson(meta, postReferences, "Blog");

    return {
      posts,
      page,
      meta,
      ldjson,
      pagination: { currentPage, totalPages, previousPage, nextPage }
    };
  }

  // Tags
  getTags() {
    const meta = {
      name: "Khrome.dev",
      url: "https://khrome.dev/blog/tag/",
      description: "Here are all the topics written about in this blog.",
      title: "Khrome.dev Blog - All topics I write about"
    };
    const tags = [...this.tags.values()];
    const ldjson = this.getLdJson(meta, tags, "Tag");

    return {
      meta,
      tags,
      ldjson
    };
  }

  // Posts by Tag
  getPostsByTag(tag, page, limit) {
    const allPosts = [];
    const tagData = this.tags.get(tag);

    tagData.posts.forEach(postSlug => {
      allPosts.push(this.getPost(postSlug));
    });

    const [first, ...rest] = tag;
    const capitalTag = first.toUpperCase() + rest.join("");
    let previousPage = "";
    let nextPage = "";
    let currentPage = `/blog/tag/${tag}`;

    const meta = {
      name: "Khrome.dev",
      url: `https://khrome.dev/blog/tag/${tag}`,
      description:
        "A blog about JAM Stack and Front-end Development. Writing hastily by a developer with no time.",
      title: `Khrome.dev Blog - Articles about ${capitalTag}`
    };

    // Pagination Data
    const totalPages = Math.ceil(allPosts.length / limit);

    if (page > 1) {
      currentPage = `/blog/tag/${tag}/page/${page}`;
    }

    if (page > 2) {
      previousPage = `/blog/tag/${tag}/page/${page - 1}`;
    } else if (page === 2) {
      previousPage = `/blog/tag/${tag}`;
    }

    if (page < totalPages) {
      nextPage = `/blog/tag/${tag}/page/${page + 1}`;
    }

    // Sort Descending by isoDate
    allPosts.sort((a, b) => {
      return a.attributes.isoDate < b.attributes.isoDate
        ? 1
        : a.attributes.isoDate > b.attributes.isoDate
        ? -1
        : 0;
    });

    // Enforce Limit and Pagination
    const posts = this.paginate(allPosts, page, limit);
    const postReferences = [];
    posts.forEach(post => {
      postReferences.push(
        this.getLdJson(post.attributes, post.slug, "BlogPostReference")
      );
    });

    const ldjson = this.getLdJson(meta, postReferences, "Blog");

    return {
      posts,
      page,
      meta,
      ldjson,
      pagination: { currentPage, totalPages, previousPage, nextPage }
    };

    return output;
  }
}

// Promised based return to ensure that the data is processed before used
let posts;
const initPosts = () => {
  if (posts && posts.posts.size) {
    return Promise.resolve(posts);
  }
  return new Promise(async (res, rej) => {
    posts = new Posts();
    try {
      // Need to handle differences in paths given differnet enviroments to run this within
      if (process.env.NOW_REGION === undefined) {
        // LOCAL: `npm run develop` from 'www/'
        await posts.parsePosts("../posts/*.md");
        res(posts);
      } else {
        // LOCAL: `now dev` from '/' SERVER: `now deploy` from '/'
        await posts.parsePosts("../posts/*.md");
        res(posts);
      }
    } catch (e) {
      throw Error(e);
    }
  });
};

export { initPosts as default, Posts };
