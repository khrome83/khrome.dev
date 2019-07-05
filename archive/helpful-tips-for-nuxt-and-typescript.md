---
title: Helpful Tips for Nuxt and Typescript
date: 2019-03-07
cover_image: ./images/blog_bg_4.jpg
description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic rerum earum quos explicabo suscipit maxime iste qui nihil. Reiciendis asperiores minus necessitatibus
tags: ["design", "frontend"]
series: false
published: false
canonical_url: false
---

![background](./images/blog_bg_4.jpg)

1. Allowing SVGs to be imported
2. Fixing Vue?
3. Allow Layout for `@Component`

### Sample Code

```ts
import Vue from "vue";

declare module "*.vue" {
  import Vue from "vue";
  const _default: Vue;
  export default _default;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
  }
}
```