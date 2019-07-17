---
title: Show Multiple Background with Custom Decorators in Storybook
published: false
date: 2019-07-15
description: ''
cover_image: ''
tags:
- typescript
- vue
- storybook

---
Storybook has excellent Vue support. While it did not support Vue at launch, it now does. And it has become my goto technology while fleshing out base components. It is critical to my development process, and I think it should be critical to yours.

No longer do I need to stub out pages or hack together a test page. Instead I can focus on my design language. Each story is a base component, make it incredibly clear and easy the purpose. The ecosystem with Storybook also covers a lot of my concerns. I love the “knobs” plugin. It allows me to stress test each component by mixing settings. The a11y plugin gives me a high level view of the current state of the component to ensure everything passes. I use the breakpoint component to simulate devices. In short, I think about these things much earlier in the process, and my work is better for it.

I did run into an issue. How to build for multiple themes at once? One of the most common use cases in my design work is use background colors to modify the pallet in the foreground.

![](/uploads/multiple_themes.png)

![](/uploads/badge-on-single-background.png)

k

```vue
<template>
  <span class="badge" :class="{ secondary, small, large }">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class BaseBadge extends Vue {
  @Prop(Boolean) private secondary!: boolean;
  @Prop(Boolean) private small!: boolean;
  @Prop(Boolean) private large!: boolean;
}
</script>

<style scoped>
.badge {
  display: inline-block;
  text-align: center;
  color: #fff;
  fill: #fff;
  background-color: #ee0028;
  border-radius: 2px;
  padding: 4px 6px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
}

/* Grey Modifications - Badge */
.__bg-grey .badge {
  background-color: #da0629;
  color: #fdfcfb;
  fill: #fdfcfb;
}

/* Dark Modifications - Badge */
.__bg-dark .badge {
  background-color: #f32144;
  color: #010b19;
  fill: #010b19;
}

.secondary {
  background-color: #010b19;
}

/* Grey Modifications - Secondary */
.__bg-grey .secondary {
  background-color: #010b19;
  color: #fdfcfb;
  fill: #fdfcfb;
}

/* Dark Modifications - Secondary */
.__bg-dark .secondary {
  background-color: #ffffff;
  color: #010b19;
  fill: #010b19;
}

.small {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 16px;
  line-height: 1;
  letter-spacing: 1.25;
}

.large {
  font-size: 20px;
  padding: 6px 12px;
  letter-spacing: 0.1rem;
  line-height: 1;
}
</style>
```

fg

```js
import { storiesOf, addDecorator } from "@storybook/vue";
import { radios, text, boolean } from "@storybook/addon-knobs";
import sectionStates from "./decorators/sectionStates";
import BaseBadge from "../components/BaseBadge.vue";

const stories = storiesOf("Components/Base Badge", module).addDecorator(sectionStates);

stories.add(
  "Default",
  () =>
    ({
      components: { BaseBadge },
      props: {
        text: {
          default: text("Text", "NEW")
        },
        theme: {
          default: radios(
            "Theme",
            {
              Primary: "primary",
              Secondary: "secondary"
            },
            "primary"
          )
        },
        size: {
          default: radios(
            "Size",
            {
              Small: "small",
              Normal: "normal",
              Large: "large"
            },
            "normal"
          )
        }
      },
      template: `
        <base-badge v-bind="{
          secondary: theme === 'secondary',
          small: size === 'small',
          large: size === 'large',
        }">
          {{text}}
        </base-badge>
      `
    } as object)
);
```

fg

```js
const sectionStates = () => ({
  data: () => ({
    wrapper: {
      margin: '0 2rem 2rem',
      border: 'thin solid transparent',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0rem 0.125rem 0.3125rem 0rem',
      borderRadius: '0.3125rem',
      padding: '2rem',
    },
    light: {
      backgroundColor: '#ffffff',
    },
    grey: {
      backgroundColor: '#fdfcfb',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0rem 0.125rem 0.3125rem 0rem',
    },
    dark: {
      backgroundColor: '#010b19',
      boxShadow: 'rgba(0, 0, 0, 0.5) 0rem 0.125rem 0.3125rem 0rem',
    },
    heading: {
      fontSize: '0.75rem',
      margin: '0',
      padding: '0.5rem 0 0.5rem 2rem',
      color: '#737373',
      textTransform: 'uppercase',
    },
  }),
  template: `
    <div>
      <div :style="heading">On Light Background</div>
      <div class="__bg-light" :style="[wrapper, light]"><story/></div>
      <div :style="heading">On Gray Background</div>
      <div class="__bg-grey" :style="[wrapper, grey]"><story/></div>
      <div :style="heading">On Dark Background</div>
      <div class="__bg-dark" :style="[wrapper, dark]"><story/></div>
    </div>
    `,
});

export { sectionStates as default };
```

g

![](/uploads/badge-on-multiple-backgrounds.png)

d

![](/uploads/badge-with-a11y.png)