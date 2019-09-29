import { graphql, buildSchema } from "graphql";
import initPosts from "./Posts.js";

class Graph {
  constructor() {
    this.schema = buildSchema(`
    type Attributes {
      title: String!
      published: Boolean!
      date: String
      description: String
      cover_image: String
      tags: [String]
      series: Boolean
      canonical_url: Boolean
    }

    type TagData {
      label: String!
      slug: String!
      count: Float!
    }

    type Post {
      content: String
      attributes: Attributes!
      tags: [TagData]
      path: String!
      excerpt: String
      isEmpty: Boolean
      slug: String!
      timeToRead: Int
      ldjson: String
    }

    type Pagination {
      totalPages: Int!
      currentPage: String!
      previousPage: String!
      nextPage: String!
    }

    type Meta {
      name: String!
      url: String!
      description: String!
      title: String!
    }

    type Posts {
      posts: [Post]!
      page: Int!
      meta: Meta!
      pagination: Pagination!
      ldjson: String
    }

    type Tag {
      label: String!
      slug: String!
      posts: [String]!
      count: Int!
    }

    type Tags {
      meta: Meta!
      ldjson: String
      tags: [Tag]!
    }

    type Content {
      meta: Meta!
      ldjson: String
    }

    type Query {
      getPost(slug: ID!): Post
      getPosts(page: Int!, limit: Int!): Posts
      getPostsByTag(tag: ID!, page: Int!, limit: Int!): Posts
      getHomepage: Content
      getTags: Tags
    }
  `);

    this.root = {
      getPost: this.getPost,
      getPosts: this.getPosts,
      getPostsByTag: this.getPostsByTag,
      getTags: this.getTags,
      getHomepage: this.getHomepage
    };
  }

  async getPost({ slug }) {
    const posts = await initPosts();
    if (posts.hasPost(slug)) {
      return posts.getPost(slug);
    }

    return null;
  }

  async getPosts({ page, limit }) {
    const posts = await initPosts();
    return posts.getPosts(page, limit);
  }

  async getPostsByTag({ tag, page, limit }) {
    const posts = await initPosts();
    return posts.getPostsByTag(tag, page, limit);
  }

  async getTags() {
    const posts = await initPosts();
    return posts.getTags();
  }

  async getHomepage() {
    const title = "Khrome.dev - Maker and Team Builder";
    const description =
      "Personal site of Zane C. Milakovic. I run the technology for a startup making peoples like better. Loves the JAM Stack.";
    const name = "Khrome.dev";
    const url = "https://khrome.dev";

    const ldjson = `<script type="application/ld+json">{
        "@context": "http://schema.org",
        "@type": "WebSite",
        "name": "${name}",
        "url": "${url}",
        "sameAs": [
          "https://dev.to/khrome83",
          "https://twitter.com/KhromeDotDev"
        ],
      }</script>`;

    return {
      ldjson,
      meta: {
        title,
        description,
        name,
        url
      }
    };
  }

  run(query, variables) {
    return graphql(this.schema, query, this.root, null, variables);
  }
}

let graph = new Graph();

export { graph as default, Graph };
