---
title: Custom 404 Pages on Zeit Now v2 Platform
published: true
date: 2019-07-05
description: Zeit has finally updated the Now v2 platform to allow custom 404 pages.
  Find out what makes a good 404 page and how to set it up.
cover_image: https://khromedev.khrome83.now.sh/image/Custom%20**404**%20Pages%20on%20Zeit%20Now%20v2%20Platform.png?theme=dark-mode&md=1&pattern=hexagons&screen=cover-image&undraw=page-not-found
tags:
- '404'
- zeit
- now
- serverless
series: false
canonical_url: false
release_date: 2019-07-05
heading_image: https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570847237/Dev.to_Post_-_3_zduldg.png
social_image: https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570847237/Twitter_Post_-_3_kwhcir.png

---
Zeit launched the second version of the Now platform (Now v2) without custom 404 pages. This forces customers to use the built-in default 404 pages. While the design is sharp and works great to fit the Zeit brand, it offers the user no assistance. It is also very opinioned and stands out against most brands. In short, you should replace it.

![A simple page showing an error because the expected page is not found.](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448525/zeit_default_404_qb3lge.png "Zeit 404 Page")

### Replacing the Default 404 Page

The first thing we need is a new 404 page. I used [Gridsome](https://gridsome.org/docs/pages/#add-a-404-page), which had me create a `404.vue` in the `src/pages` folder. Now when I build the project, a `404.html` file is created in the `/dist` folder.

Zeit uses a `now.json` file to customize the build process. Most users need this file so they can specify how the site is built, and customize the routing experience.

The typically static site deployed on Now looks something like this -

    {
      "version": 2,
      "builds": [{ "src": "package.json", "use": "@now/static-build" }]
    }

Now uses this JSON file to create a static build based on the output of `npm run build` in your `package.json` file. If you deployed with just this configuration, you would get the default Now v2 404 pages.

To setup custom 404 pages, we have to add routes.

#### Adding Routes

    {
      "version": 2,
      "builds": [{ "src": "package.json", "use": "@now/static-build" }],
      "routes": [
        { "src": "/(.*)", "dest": "/$1" },
        { "handle": "filesystem" },
        { "src": "/.*", "status": 404, "dest": "/404" }
      ]
    }

The first line in the routes array, says that any traffic that enters should look for content within the destination directory. Routing can be a little confusing in Now v2. By default, the `/dist` folder that gets created after running `npm run build` with most static site generators, is treated as the root of your output.

The `{"handle": "filesystem"}` line tells Now to expose the filesystem as available routes. If you had three HTML files - `A.html`, `B.html` and `C.html` in your `/dist` folder, each of these would be mapped and available automatically.

At this point, going to `/404` on your site shows you the custom 404 pages, but going to `/not-a-real-page` does not. We have mapped the file system to make it available, but we have not told our routes to catch anything that has fallen through. So users won't see the show the 404 pages when it's needed.

The last line captures anything that was not found by the filesystem and sends the request to the `404.html` page correctly. It also sends the correct status of `404` to the users' browser.

> 12.01.19 - I moved the 404 pages examples into it's own article, and extend it some. You can read about them [Creating Compelling and Useful 404 Pages](https://khrome.dev/blog/creating-compelling-and-useful-404-pages "Creating Compelling and Useful 404 Pages")