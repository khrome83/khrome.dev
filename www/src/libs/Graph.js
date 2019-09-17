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

    type Posts {
      posts: [Post]!
      count: Int!
    }

    type Query {
      getPost(slug: ID!): Post,
      getPosts(page: ID!): Posts
    }
  `);

    this.root = {
      getPost: this.getPost,
      getPosts: this.getPosts
    };
  }

  async getPost({ slug }) {
    const posts = await initPosts();
    if (posts.hasPost(slug)) {
      return posts.getPost(slug);
    }

    return null;
  }

  async getPosts({ page }) {
    const posts = await initPosts();
    return posts.getPosts(page);
  }

  run(query, variables) {
    return graphql(this.schema, query, this.root, null, variables);
  }
}

let graph = new Graph();

export { graph as default, Graph };
