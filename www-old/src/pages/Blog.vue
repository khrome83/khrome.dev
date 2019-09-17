<template>
  <Layout>
    <div
      class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
      style="background-image: linear-gradient(to bottom, rgba(40,69,105,0) 0%,rgba(36,60,90,1) 80%), url('./dots.svg');"
    ></div>
    <div
      class="container-inner mx-auto -mt-48 mb-16 relative bg-white pt-4 sm:rounded-t-lg sm:px-8 sm:pt-8"
    >
      <div
        v-for="post in $page.posts.edges"
        :key="post.id"
        class="post border-gray-400 border-b mb-12"
      >
        <g-link :to="post.node.path">
          <g-image
            alt="Cover image"
            v-if="post.node.cover_image"
            class="w-full mx-auto mb-8 rounded-lg"
            :src="post.node.cover_image"
          />
        </g-link>
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
      <!-- end post -->

      <pagination-posts
        v-if="$page.posts.pageInfo.totalPages > 1"
        base="/blog"
        :totalPages="$page.posts.pageInfo.totalPages"
        :currentPage="$page.posts.pageInfo.currentPage"
      />
    </div>
    <the-newsletter />
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        path
        cover_image
        tags {
          id
          title
          path
        }
        date (format: "MMMM D, Y")
        timeToRead
        description
      }
    }
  }
}
</page-query>

<script>
// cover_image (width: 770, height: 380, blur: 10)
import TheNewsletter from "../components/TheNewsletter";
import PaginationPosts from "../components/PaginationPosts";
export default {
  components: {
    PaginationPosts,
    TheNewsletter
  },
  metaInfo: {
    title: "Blog"
  }
};
</script>
