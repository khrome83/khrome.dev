---
title: HTML Elements with Flex-Box Quirks
published: false
date: 2019-07-08
description: Flex-box is almost 10 years old, but some quirks still exist. Here are several elements to avoid using with flex-box.
cover_image: https://khrome.dev/image/**HTML**%20Elements%20with%20Flex-box%20**Quirks**%20%F0%9F%93%A6%F0%9F%93%A6%F0%9F%93%A6.png?theme=royal-blue&md=1&pattern=squares&screen=cover-image&undraw=code-typing
tags: ["frontend", "html", "css", "flexbox"]
series: false
canonical_url: false
---

I have interviewed many frontend developers. One of the methods I have used during the candidate screening process is to give a CSS pair programming exam. The exam allowed my team to have an accurate way to rule out candidates that did not have strong HTML and CSS knowledge. Given that one of the current trends in the industry is to focus on frameworks, I find that knowledge of basic web fundamentals is lacking. Attention to detail is always an issue with young developers as well.

The setup for the interview was simple - the interviewing candidate would start a phone conversation with the interviewer. We would give them a collaborative link to a CodePen. After a few minutes of explanation of what we were expecting, they would start coding.

The task was simple; we asked them to create the styling for a simple login form. We provided the HTML, and they could not modify it. Using a picture of the solution as a guide, they would start.

## The Problem

During about ~50 interviews with this method, we kept seeing the same issue. Young developers would rely heavily on flex-box and fail at aligning the content vertically within a `fieldset`. Even talented developers that nailed all the colors and understood the details struggled.

It turns out that the browsers have some nasty quirks when it comes to flex-box.

## The Truth

Flex-box is buggy. Philip Walton has a great readme on his [GitHub](https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers) that breaks out all the intricate quirks with flex-box by the browser vendor. While flex-box came out in 2009, the spec got finalized in 2011. Years later, many of the bugs still exist.

### Fieldset

In the exam above, the `fieldset` element was the biggest surprise challenge. In Chrome and Edge, the `display: flex` property does not get applied by the browser. This issue has been frustrating developers for years. Years later, both Google and Microsoft have either punted on the bug or flagged it as "by design."

So avoid flex-box on `fieldset`. Unless you are using Firefox or Safari, turns out they fixed this bug.

### Button

The `button` element does not support the `align-items` property in Chrome. Safari does not support `justify-content`. Good news though, you can place the content within `div` or `span`.

### Summary

Even though Safari fixed `fieldset`, the `summary` element can't be a flex container still.

## Bonus - CSS Challenge

You can see the solution to the CSS exam below. Want to test your CSS skills? Fork the CodeSandbox and remove the CSS. See if you can reproduce the original without using flexbox.

https://codesandbox.io/embed/css-login-problem-986o4?autoresize=1&fontsize=14&hidenavigation=1&view=preview
