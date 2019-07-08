export default [
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/pages/404.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/pages/Index.vue")
  },
  {
    path: "/signed-up",
    component: () => import(/* webpackChunkName: "page--src--pages--signed-up-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/pages/SignedUp.vue")
  },
  {
    path: "/thanks",
    component: () => import(/* webpackChunkName: "page--src--pages--thanks-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/pages/Thanks.vue")
  },
  {
    path: "/blog/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--pages--blog-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/pages/Blog.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/:slug",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/templates/Post.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/tag/:id/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/templates/Tag.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/Users/zane/GitHub/khrome.dev/www/src/pages/404.vue")
  }
]

