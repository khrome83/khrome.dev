// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import VueScrollTo from "vue-scrollto";
import VueFuse from "vue-fuse";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(VueScrollTo, {
    duration: 350,
    easing: "ease"
  });

  Vue.use(VueFuse);

  head.meta.push({
    name: "keywords",
    content: "Vue,Typescript,Javascript,Node,Hiring"
  });

  head.meta.push({
    name: "description",
    content: "Personal Blog and Portfolio of Zane C. Milakovic"
  });

  head.meta.push({
    name: "author",
    content: "Zane C. Milakovic"
  });

  head.link.push({
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png"
  });

  head.link.push({
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png"
  });

  head.link.push({
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png"
  });

  head.link.push({
    rel: "manifest",
    href: "/site.webmanifest"
  });

  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
  });
}
