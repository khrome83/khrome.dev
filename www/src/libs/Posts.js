import fs from "fs";
import fm from "front-matter";
import fg from "fast-glob";
import slug from "slug";
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
          });

          return md.render(content);
        });
    } catch (e) {
      console.log(e);
    }
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
  getLdJson(attributes, content, type = "post") {
    let ldjson;
    switch (type) {
      case "post":
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

          // format date from iso string to Month D, YYYY
          attributes.date = this.formatDate(attributes.date);

          // markdown parser
          const content = await this.markdown(body);

          // time to read
          // gridsome used lodash, might offer differernt count with 230 division
          // https://github.com/lodash/lodash/blob/master/words.js
          const count = content.match(
            /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g
          ).length;
          // gridsome uses 230
          const timeToRead = Math.round(count / 500) || 1;

          // json+ld - structured content
          const ldjson = this.getLdJson(attributes, content, "post");

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
  // TODO: pagination, sort order, limit
  getPosts(page) {
    const posts = [...this.posts.values()];
    const count = this.posts.size;
    return { posts, count };
  }

  // Tags
  getTags() {
    return [...this.tags.values()];
  }

  // Posts by Tag
  getPostsByTag(tag) {
    const output = [];
    const tagData = this.tags.get(tag);

    tagData.posts.forEach(postSlug => {
      output.push(this.getPost(postSlug));
    });

    return output;
  }
}

let posts;
const initPosts = () => {
  if (posts && posts.posts.size) {
    return Promise.resolve(posts);
  }
  return new Promise(async (res, rej) => {
    posts = new Posts();
    try {
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
