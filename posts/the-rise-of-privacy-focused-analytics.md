---
title: The Rise of Privacy Focused Analytics
published: true
date: 2019-12-02
description: Privacy is becoming a larger focus on the web. New players in the Analytics
  space promise to bring better security around users data.
cover_image: ''
tags:
- indie web
- analytics
- privacy
social_image: https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1575343596/Twitter_Post_-_5_i3wr34.png
heading_image: https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1575343603/Dev.to_Post_-_5_u4kc7f.png
release_date: 2019-12-02

---
Privacy is growing to be a more significant concern in your user's minds. Every week it seems that a new scandal is surfacing over at Facebook that is making headlines. Or we have a smart gadget that hides a microphone for years. Zoom's teleconference software was recently revealed with a security mistake. It was installing a hidden unsecured server for the 's consent. The trending headlines teach us not to trust the tech companies with our information. Why should your users trust you?

Changes are happening in the public eye. The EU signed the GDPR in 2016, the biggest data privacy regulation in over 20 years. Companies recently facing scrutiny are scrambling to try to change their public image. Yes, Facebook announced on the switch to be a privacy-focused company, but they rely on ad revenue. How can they be?

How can we trust these mega tech corporations to power our analytics? Actionable insights these tools provide come at a cost, the abuse of our user's data. There is a reason Google Analytics is free. The data they collect is the payment, and then some. It's time you and I are responsible for our users. After all, we both want to make products that users can trust.

## The Data We Need

The point of website analytics is to delve information that is meaningful to us about our users. The information we need boils down to a few themes.

1. We need to understand growth.
2. We need to understand some basics about our audience.
3. We need to understand what technology we need to support.

### Growth

This is a pretty basic concept that has been a staple since the early days of the web. Are we gaining or losing visitors? Where are those visitors going on our site? How are they getting to our site?

### Demographics

As the internet grew and sites became more global, we started asking about our users. From what countries are our visitors from? Are we supporting the locales?

### Technology

We need to understand how to support our audience. Techniques have exploded for capturing user data. The devices to access the web have changed. There is more surface area than ever. What browsers are they using? What physical devices did they connect with? What was the screen size of those devices?

These basic data concepts can power a wave of changes to our business from changing where to advertise due to inbound sources changing. Or we may focus on our mobile experience because the user base shifted over the last few months.

## The Cost of Privacy

Privacy-focused solutions tend to capture a lot less data. Does this make them less beneficial? But it depends on your specific needs. Analytics suites tend to have a lot of tools that go underused and don't serve any of the sites using them. But your paying for these extra features with the data you capture about your users.

Most of the information our business need to get recorded in privacy-focused tools. So what is the difference? What are you giving up? The answer is it depends.

A privacy-focused toolset means we may understand less about our users. But we were also less invasive and more transparent. Google Analytics, for example, shows demographic data around age or gender. It does so by marring data about your users from across the internet. Your site visitors viewing habits and interests are also identified. Many of these are invasive data points. Yes, they may help you target an ad campaign. After all ad buying one of Google's primary sources of revenue. So if we lose all that information, how do we capture it? What did we do before Google Analytics? We use to survey our audience. The users self identify, and opt into questions they were willing to answer. And it was responsible and transparent.

Privacy-focused analytics can have a higher cost. Either a monetary cost like a monthly fee. Even though the fee is very low, it can feel hard to justify if you spent years not pay for Google Analytics. Or the tools need more overhead like self-hosting, infrastructure, and technical setup.

You will have to judge for yourself if you can live without the features, or do the setup. But the result is you will be no longer tracking unneeded data about your users.

## The New Breed of Analytics

Privacy-focused analytics is not new. In the early days of the web analytics captured very little information. The mechanisms to capture data and marry data were not available. Yet, we use to drown ourselves in our site graphs month to month charting success.

Google Analytics and others of its ilk were sparks that lit the fire. It moved analytics off our systems and small providers and into the cloud. It expanded analytical capabilities. It drove insights into our business and taught us new questions to answer. It gave us insights on how to spend on ads. It became self-serving to the corporation and could remain free. In the beginning, it might have been innocent. Remember, Google’s motto used to be "Don't be evil." It's hard to argue that is still the case.

Recently, several companies have released privacy-focused analytics. These products give us most of the capabilities we need.

### Simple Analytics

This software is based on a premise, let’s make analytics simple. And the creator [@AdriaanvRossum](https://twitter.com/intent/user?screen_name=AdriaanvRossum "Twitter Profile") delivers on exactly that goal.

You type the domain you are going to add, and you’re left with this snipped.

```html
    <script async defer src="https://cdn.simpleanalytics.io/hello.js"></script>
    <noscript><img src="https://api.simpleanalytics.io/hello.gif" alt=""></noscript>
```

Once inserted into your site, the analytics page automatically updates with data. Pretty slick!

This is the shortest and easiest analytics snipped I have seen. There is no complicated tracking code or additional javascript closures inserted into the page. Just a linked file off of a CDN, and a small `.gif` for tracking sites when JavaScript is disabled.

There is a really great benefit for not having a unique tracking code. I don’t have to disable tracking in my lower environments and review apps. Because they are not `khrome.dev` or `www.khrome.dev` they are simply not counted. Pretty convenient since I host on with [zeit.co](https://zeit.co "Zeit Platform") and make great use of review deployments.

![https://res.cloudinary.com/khromedotdev/image/upload/c](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448523/simple_analytics_u4pusp.png)

Of all the examples here, Simple Analytics has very high scrutiny in the data they store. Based out of Europe, they are very cautious to make sure their clients do not need to have any disclaimer based on the tracked metrics. For example, IP addresses are not stored, even in an anonymous hashed form. And all of the data is stored in Iceland, which has one of the highest standards for data protection and encryption.

I am currently using Simple Analytics on my own site. I have found the experience to be as easy as described. Visit [Simple Analytics](https://referral.simpleanalytics.com/zane-milakovic "Simple Analytics Signup") to sign up. Using this link will give you a 7-day trial, plus one month free!

### Fathom Analytics

The brainchild of Jack Ellis and Paul Jarvis, two independent developers. They also wanted to build a privacy-focused analytics solution.

One of the more interesting things about Fathom Analytics is the amount of care and work put into tracking more than just pageviews. Fathom Analytics uses a fairly complex hashing solution with table lookup to estimate the number of unique visitors and unique pageviews. What is critical though, is that they can not determine the individual path of a single user. You can read more about that in a post they wrote about [anonymization](https://usefathom.com/anonymization/ "Blog post by Fathom Analytics").

![https://res.cloudinary.com/khromedotdev/image/upload/c](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1575342260/Screen_Shot_2019-12-02_at_9.03.50_PM_tfsg8y.png)

While version 1.0 seemed to have issues with my SPA, version 2.0 promised to fix these problems. I have not tested this since last summer with version 1.0. But I know Paul Jarvis was receptive of the feedback on twitter.

What is really promising about Fathom Analytics, is the amount of data that is captured. The presentation is not only one of the strongest in version 2.0 of the data. But it includes metrics not found elsewhere, like "Average Time on Site", "Bounce Rate" and "Unique Visits".

### Netlify Analytics

This addition to privacy-focused analytics is very new. Launching just a few weeks ago, it is already making some headlines. You do need to be a Netlify customer and pay $9 a month for the feature though, which does appear to be fairly limited in data.

One of the coolest tricks is that you don’t need to install it. Once you activate it, it's live on your website, using data the CDN captures. Which basically means you don't have any client-side JavaScript that is capturing the data. It is a very neat trick.

#### Bandwidth Bar Chart

![https://res.cloudinary.com/khromedotdev/image/upload/c](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448576/netlify_bandwidth_xzk1ev.png)

#### Sources Table

![https://res.cloudinary.com/khromedotdev/image/upload/c](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448576/netlify_sources_aehvzn.png)

#### Pageviews Chart

![https://res.cloudinary.com/khromedotdev/image/upload/c](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448576/netlify_pageviews_rspoyw.png)