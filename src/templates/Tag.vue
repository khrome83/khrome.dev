<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h2 class="text-4xl font-bold mb-8 border-b">Tag: {{ $page.tag.title }}</h2>

      <div
        v-for="post in $page.tag.belongsTo.edges"
        :key="post.node.id"
        class="post border-gray-400 border-b mb-12"
      >
        <h2 class="text-3xl font-bold">
          <g-link :to="post.node.path" class="text-copy-primary">{{ post.node.title }}</g-link>
        </h2>
        <div class="text-copy-secondary mb-4">
          <span>{{ post.node.date }}</span>
          <span class="pl-4 pr-4 inline-block">&middot;</span>
          <span>{{ post.node.timeToRead }} min read</span>
        </div>

        <div class="text-lg mb-4">{{ post.node.description }}</div>

        <div class="mb-8">
          <g-link :to="post.node.path" class="font-bold uppercase">Read More</g-link>
        </div>
      </div>

      <pagination-posts
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
        :base="`/tag/${$page.tag.title}`"
        :totalPages="$page.tag.belongsTo.pageInfo.totalPages"
        :currentPage="$page.tag.belongsTo.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>-

<page-query>
query Tag ($id: String!, $page: Int) {
  tag: tag (id: $id) {
    title
    belongsTo (page: $page, perPage: 10) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ...on Post {
            title
            timeToRead
    	      date (format: "MMMM D, YYYY")
            path
            description
            tags {
              id
              title
              path
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
// cover_image (width: 770, height: 380, blur: 10)

import PaginationPosts from "../components/PaginationPosts";

// <g-image
//   alt="Cover image"
//   v-if="post.node.cover_image"
//   class="post-card__image"
//   :src="post.node.cover_image"
// />

export default {
  metaInfo() {
    return {
      title: "Tag: " + this.$page.tag.title
    };
  },
  components: {
    PaginationPosts
  }
};
</script>
