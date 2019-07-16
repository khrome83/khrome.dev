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