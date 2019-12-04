---
date: 2019-12-03
release_date: 2019-12-03
title: An Unexpected Benefit of Tailwind CSS
published: false
description: Utility CSS frameworks can make it easier to refactor a codebase, or
  even change to a new framework.
heading_image: https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1575429855/Dev.to_Post_-_6_m7izv6.png
social_image: https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1575429848/Twitter_Post_-_6_u40x5s.png
cover_image: ''
tags:
- svelte
- vue
- tailwindcss
- css

---
CSS has been around for a long time now. I have been using it for over a decade. In that time, we went from keeping it as a single separate file to using naming conventions and pre-processors. Moving past [Atomic](https://github.com/nemophrost/atomic-css "Atomic CSS"), [BEM](), and [SMACSS](http://smacss.com/ "Scalable an Modular Architecture for CSS"), we started to put the CSS directly into the JavaScript. And to be honest, it has slowed down development for me.

So when I built Khrome.dev earlier in the year, with the goal of building it in a single day, I choose to use [Tailwind CSS](https://tailwindcss.com/ "A utility-first CSS Framework") as an experiment. It felt like moving back in time in a lot of ways, and I was really drawn to the approach of composing classes in HTML. Basically, never having used it before, it felt simple and easy to grasp. And it got out of my way to let me build quickly.

> For those not familiar, Tailwind CSS is a utility-first framework that really tries to focus on giving you the building blocks to craft what you need. I am very much against CSS frameworks because of the opinionated styles. But Tailwind CSS is different, it's just basic properties with some well-defined defaults. Anything I didn't like, I replaced.

## The Easiest Refactor Ever

Due to a project at work, I decided to migrate my personal blog I had just launched from Vue to Svelte. It was an experiment to ensure the technology choice was a wise one. I ended up liking the outcome and merging the branch into the master branch at the beginning of October.

The refactor took a lot longer than expected, but not because of Svelte or Vue. It was replacing the functionality I was getting from Gridsome that really cost me time. I had to replace the GraphQL file system interface to processing the markdown files. I also had to write custom code to handle the RSS feed and sitemap generation.

The only part that was not hard, was the styling. The act of actually migrating the HTML and Styles from Vue to Svelte.

### Refactoring a Component

Vue uses a template structure that is basically HTML with some custom templates. Here is my Hero tile on the homepage of Khrome.dev. I choose a simple presentation component on purpose.

```vue
<template>
  <div
    class="bg-regal-blue text-white overflow-hidden bg-repeat"
    style="background-image: linear-gradient(to bottom, rgba(40,69,105,0) 0%,rgba(36,60,90,1) 80%), url('./dots.svg');"
  >
    <div class="hero container-inner mx-auto flex flex-col justify-between py-16">
      <div class="mt-8 sm:mt-0">
        <g-image src="../../static/code_review.svg" alt="hero" class="mx-auto sm:mx-0" />
      </div>
      <div class="text-4xl font-bold w-full text-center mt-16">
        <div class="text-white">
          I build
          <strong class="text-orange-700">products</strong> &nbsp;&amp;&nbsp;
          <strong class="text-orange-700">teams</strong>.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
```

Here is the same component in Svelte.

```html
<div
    class="bg-regal-blue text-white overflow-hidden bg-repeat"
    style="background-image: linear-gradient(to bottom, rgba(40,69,105,0) 0%,rgba(36,60,90,1) 80%), url('./dots.svg');"
>
  <div class="hero container-inner mx-auto flex flex-col justify-between py-16">
    <div class="mt-8 sm:mt-0">
      <img src="../../static/code_review.svg" alt="hero" class="mx-auto sm:mx-0" />
    </div>
    <div class="text-4xl font-bold w-full text-center mt-16">
      <div class="text-white">
        I build
        <strong class="text-orange-700">products</strong>               &nbsp;&amp;&nbsp;
        <strong class="text-orange-700">teams</strong>.
      </div>
    </div>
  </div>
</div>
```

It is really difficult to notice the difference. Basically the `<template>` tag needed to be removed, and the Gridsome specific `<g-image>` tag needed to be replaced with a plain old HTML compliant `<img>` tag.

## The Benefits of Utility-first frameworks

At first glance, this may seem like a silly example. But that is the beautify. For every line template code that I migrated over, I only brought with it the CSS I used.

Another way to look at this --- during the redesign I made a few decisions, like removing the search interface. Those components were not brought over, and the CSS was not included automatically.

Yes, you can get some of those benefits from CSS in JS or having component-specific CSS files. But I did not have to change any tooling. And if I removed part of a component, the CSS for that piece is gone as well.

Utility-first frameworks like Tailwind CSS, are an elegant and simple solution to solving the issues we all face when refactoring or removing dead HTML. How do we ensure the CSS is also correctly removed?