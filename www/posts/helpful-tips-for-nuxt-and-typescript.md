---
title: Helpful Tips for Nuxt and Typescript
published: false
date: 11-02-1983
description: ""
cover_image: ""
tags: []
---

1\. Allowing SVGs to be imported

2\. Fixing Vue?

3\. Allow Layout for \`@Component\`

**### Sample Code**
\`\`\`

import Vue from "vue";
declare module "_.vue" { import Vue from "vue"; const \_default: Vue; export default \_default;}
declare module "_.svg" { const content: any; export default content;}
declare module "vue/types/options" { interface ComponentOptions<V extends Vue> { layout?: string; }}

\`\`\`
