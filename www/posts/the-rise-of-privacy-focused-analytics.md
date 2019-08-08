---
title: The Rise of Privacy Focused Analytics
published: false
date: 2019-07-11
description: ''
cover_image: ''
tags:
- indie web
- analytics
- privacy

---
Privacy is growing to be a bigger concern in your users minds. Every week it seems that a new scandal is surfacing over at Facebook that is making headlines. Or we have a smart gadget that hide a microphone for years. Zoom's teleconference software was recently revealed with a security gafe.  It was installing  a hidden unsecured server the users consent. The trending headlines teach us not to trust the tech companies with our information. Why should your users trust you?

Changes are happening in the public eye. The EU signed the GDPR in 2016, the biggest data privacy regulation in over 20 years. Companies recently facing scrutiny are scrambling to try change their public image. Yes, Facebook announced on the switch to be a privacy focused company, but they rely on ad revenue. How can they be?

How can we trust these mega tech corporations to power our analytics? Actionable insights these tools provide come at a cost, the abuse of our users data. There is a reason Google Analytics is free. The data they collect is the payment, and then some. It's time you and I are responsible to our users. After all, we both want to make products that users can trust, right?

## The Data We Need

The point of website analytics is to delve information that is meaningful to us about our users. The information we need boils down to a few themes.

1. We need to understand growth.
2. We need to understand some basics about our audience.
3. We need to understand what technology we need to support.

### Growth

This is pretty basic concept that has been a staple since the early days of the web. Are we gaining or loosing visitors? Where are those visitors going on our site? How are they getting to our site?

### Demographics

As the internet grew and sites became more global, we started asking about our users. What countries do these visitors come from? Are we supporting the locales?

### Technology

We need to understand how to support our audience. We technologies have exploded. The devices to access the web have changed. There is more surface area than ever. What browsers are they using? What devices did they connect from? What was the screen size of those devices?

These basic data concepts can power a wave of changes to our business. From changing where to advertise due to inbound sources changing. Or we may focus on our mobile experience, because the user base shifted over the last few months.

### The Cost of Privacy

Privacy focused solutions tend to capture a lot less data. Does this make them less beneficial? But it depends on your specific needs. Analytics suites tend to have a lot of tools that go underused and don't serve many of the sites using them. But your paying for this extra features with the data you capture about your users.

Most of the information our business need get recorded in privacy focused tools. So what is the difference? What are you giving up? The answer is it depends.

A privacy focused toolset means we may understand less about our users. But we were also less invasive and more transparent. Google Analytics, for example, show demographic data around age or gender. It does so by marring data about your users from across the internet. Your site visitors viewing habits and interests are also identified. Many if these are invasive data points. Yes, they may help you target an ad campaign. After all ad buying one of Google primary sources of revenue. So if we loose all that information, how do we capture it? What did we do before Google Analytics? We use to survey our audience. The users self identify, and opt in to questions they were willing to answer. And it was responsible and transparent.

Privacy focused analytics can have a higher cost. Either a monetary cost like a month fee. Even though the fee is very low, it can feel hard to justify if you spent years not pay for Google Analytics. Or the tools need more overhead like self hosting, infrastructure, and technical setup. G

You will have to judge for yourself if you can live without the features, or do the setup. But the result is you will be no longer tracking unneeded data about your users.

## The New Breed of Analytics

Privacy focused analytics are not new. In the early days of the web analytics captured very little information. The mechanisms to capture data and marry data were not available. Yet, we use to drown ourselves in our sites graphs month to month charting success.

Google Analytics and others of it's ilk were sparks that lit the fire. It moved analytics off our systems and small providers and into the cloud. It expanded the analytical capabilities. It drove insights into our business and taught us new questions to answered. It gave us insights in how to spend on ads. It became self serving to the corporation, and could remain free. In the beginning it might have been innocent. Remember, Google’s motto use to be "Don't be evil." It's hard to argue that is still the case.

Recently, several companies have released privacy focused analytics. These products give us most of the capabilities we need.

### Simple Analytics

This software is based on a premise, let’s make analytics simple. And for the most part the creator \[@AdriaanvRossum\]([https://twitter.com/intent/user?screen_name=AdriaanvRossum](https://twitter.com/intent/user?screen_name=AdriaanvRossum "https://twitter.com/intent/user?screen_name=AdriaanvRossum")) delivers on exactly that goal.

You type the domain your going to add, and your left with this snipped.

\`\`\`html  
<script async defer src="[https://cdn.simpleanalytics.io/hello.js](https://cdn.simpleanalytics.io/hello.js "https://cdn.simpleanalytics.io/hello.js")"></script>  
<noscript><img src="[https://api.simpleanalytics.io/hello.gif](https://cdn.simpleanalytics.io/hello.js "https://cdn.simpleanalytics.io/hello.js")" alt=""></noscript>  
\`\`\`  
This is the shortest and easiest analytics snipped I have seen. There is no complicated tracking code, or additional javascript closures inserted into the page. Just a linked file off of a CDN, and a small `.gif` for tracking sites when JavaScript is disabled.

There is a really great benefit for not having a unique tracking code. I don’t have to disable to separate my lower environments and review apps. Because they are not `khrome.dev` or `www.khrome.dev` they are simply not counted. Pretty slick since I host on with \[zeit.co\](https://zeit.co).

![](/uploads/simple_analytics.png)

### Fathom Analytics

The brain child of Jack Ellis and Paul Jarvis, two independent developers. They

![](/uploads/fathom.png)

### Netlify Analytics

This addition to privacy focused analytics is very new. Launching just a few weeks ago, it is already making some headlines. One of the coolest tricks, is that you don’t need to install it. You do need to be a Netlify customer, and pay for the feature though.

## The Middle Ground

### Matomo