<template>
  <Layout>
    <div
      class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
      style="background-image: linear-gradient(to bottom, rgba(40,69,105,0) 0%,rgba(36,60,90,1) 80%), url('../../dots.svg');"
    ></div>
    <div
      class="container-inner mx-auto -mt-48 mb-16 relative bg-white pt-4 sm:rounded-t-lg sm:px-8 sm:pt-8"
    >
      <h2
        class="text-4xl font-bold inline-block bold pl-2 pr-2 pt-1 pb-1 leading-none m-1 mx-auto bg-orange-600 text-white mb-12"
      >#{{ $page.tag.title }}</h2>

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
    <the-newsletter />
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
import TheNewsletter from "../components/TheNewsletter";

// <g-image
//   alt="Cover image"
//   v-if="post.node.cover_image"
//   class="post-card__image"
//   :src="post.node.cover_image"
// />

export default {
  components: {
    PaginationPosts,
    TheNewsletter
  },
  metaInfo() {
    return {
      title: "Tag: " + this.$page.tag.title
    };
  }
};
</script>
