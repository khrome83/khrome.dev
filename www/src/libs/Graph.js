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

    type Query {
      getPost(slug: ID!): Post,
      getPosts(page: Int!, limit: Int!): Posts
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

  async getPosts({ page, limit }) {
    const posts = await initPosts();
    return posts.getPosts(page, limit);
  }

  run(query, variables) {
    return graphql(this.schema, query, this.root, null, variables);
  }
}

let graph = new Graph();

export { graph as default, Graph };
