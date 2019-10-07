---
title: Custom Decorators with Storybook & Vue
published: true
date: 2019-07-18
description: Using Storybook and Vue to build multiple components that are section
  aware. An easy way to support multiple themes.
cover_image: https://khrome.dev/image/**Custom%20Decorators**%20with%20*Storybook*%20%26%20*Vue*.png?theme=dark-mode&pattern=polka-dots&screen=cover-image&undraw=programmer
tags:
- typescript
- vue
- storybook
release_date: 2019-07-18

---
Storybook has excellent Vue support. While it did not support Vue at launch, it now does. So it has become my goto technology while fleshing out base components. It is critical to my development process, and I think it should be considered for your process as well.

No longer do I need to stub out pages or hack together a test page. Instead, I can focus on my design language. Each story is a base component, making it incredibly clear and more comfortable to process. It has sped up my development in unexpected ways.

The ecosystem within Storybook also covers many of my concerns. I love the "knobs" plugin. It allows me to stress test each component by mixing settings. The a11y plugin gives me a high-level view of the current state of the component to ensure that everything is accessible. To simulate different viewports, I use the breakpoint component. These tools ensure that I think about these concerns much earlier in my process. Also, my work is better for it.

## The Problem

I did run into a small issue recently, in any case. How to build for multiple themes at once? One of the patterns I rely on is the use of background colors to modify the pallet in the foreground. I like the concept of breaking up the page. Moreover, as content shifts in my marketing pages, I want the flexibility to change the pallet on the fly. Here is an example of the same signup banner across three different pallets.

![Three examples of the same form with different background colors and foreground colors passing accessibility.](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448524/multiple_themes_yexmrm.png "Examples of a subscription start form on different backgrounds.")

So I want to demonstrate with a simple `<base-badge>` component. This component takes a label in its default slot and shows it in a colored badge. It is excellent for notification counts and tagging content. Here is an example of it in Storybook.

![The interface for storybook showing a single red badge with the words "new"](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448523/badge-on-single-background_u2e15g.png "Storybook interface and BaseBadge component")

### BaseBadge Breakdown

Here is the `BaseBadge.vue` file.

> _Note_ - This uses TypeScript and `nuxt-property-decorator` of which I am a massive fan.

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

For those new to Vue and TypeScript, I am going to break this down quickly.

```vue
<template>
  <span class="badge" :class="{ secondary, small, large }">
    <slot></slot>
  </span>
</template>
```

The template section is relatively standard and straightforward Vue. We are creating a span that contains the text passed to the default slot. The interface accepts a size and a color pallet. The default is assumed to be standard size and primary color pallet.

```vue
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class BaseBadge extends Vue {
  @Prop(Boolean) private secondary!: boolean;
  @Prop(Boolean) private small!: boolean;
  @Prop(Boolean) private large!: boolean;
}
</script>
```

Notice the `<script lang=" ts">` where we tell Vue to process this as TypeScript.

The `import` line is used to pull in our decorators and classes from [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator) which is a nice wrapper around four other modules. This just cleans up the interface instead of having to pull in [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator), [vue-class-component](https://github.com/vuejs/vue-class-component), [vuex-class](https://github.com/ktsn/vuex-class/), and [nuxt-class-component](https://github.com/nuxt-community/nuxt-class-component) separately.

The `@Component({})` decorator defines the class as a component. The `@Prop(Boolean)` defines props for the Vue component. Notice that `Boolean`/`boolean` repeated during the prop declaration, this sets up both TypeScript type checking and Vue prop type checking. Notice that we do not have any state or logic to deal with inside the Vue component. I wanted to focus on the CSS instead.

### CSS Styling

```css
<style>
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
</style>
```

Looking at just a small subset of the CSS, you can see that we are modifying `.secondary` three times. The default pallet is considered the "Primary" theme and sets the background color. When the component is within an element with the `.__bg-grey` or `.__bg-dark` class applied, it gets modified.

The structure I use for different sections within my site is to have a section define the background color. Then the contents within respond to that.

```vue
<section class="__bg-dark">
    <base-badge secondary/>
</section>
```

The goal is to ensure that as the parent section changes the theme, all the children behave accordingly, modifying their color pallets accordingly.

## The Storybook Story

The Storybook setup is relatively basic. It uses the standard patterns for using Vue within Storybook, as well as a few "Knobs."

### Basic Storybook Story

First, we import `storiesOf` method from the `@storybook/vue` module. The method allows us to create a story and define it in a namespace. We also import our `BaseBadge.vue` component.

> Tip - I place all my base component within a folder called "Components." The purpose is to make it clear to others what components can be combined to create more significant sets of components. Base Components typically have minimal to no state and are the lowest level component in Vue.

```ts
import { storiesOf } from "@storybook/vue";
import BaseBadge from "../components/BaseBadge.vue";

const stories = storiesOf("Components/Base Badge", module);
```

Next, we are going to display the `BaseBadge` on the page. We add the story to Storybook using the `stories.add` method. I name the page for all root instances of my components "Default" unless I have different implementation setups.

The template is just a simple ES6 template string that exports the same contents you would have in a Vue template.

```ts
stories.add(
  "Default",
  () =>
    ({
      components: { BaseBadge },
      },
      template: `
        <base-badge>
          New
        </base-badge>
      `
    } as object)
);
```

### Adding Knobs

We have a basic rendering, but we can't test any of the stress cases. We want to be able to change the text, modify the size and color pallet. First, we want to import the interface types we need from `@storybook/addon-knobs`.

```ts
import { radios, text } from "@storybook/addon-knobs";
```

Then we want to extend the story definition object to include a props object that tells Storybook what "knobs" to enable and the rules and labels for each knob. In this case, we use `text` knob to define the content within the badge. The `radio` knob is used to select the theme and size of the badge.

```ts
    {
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
      template: ``,
    }
```

Lastly, we want to modify the template to use the values from these knobs.

```vue
<base-badge
  v-bind="{
    secondary: theme === 'secondary',
    small: size === 'small',
    large: size === 'large'
  }"
>
              {{text}}
            </base-badge>
```

Here is the whole story completed. While we have not solved for the multiple background colors, we have built the Vue component and the Storybook story for it.

```ts
import { storiesOf } from "@storybook/vue";
import { radios, text, boolean } from "@storybook/addon-knobs";
import BaseBadge from "../components/BaseBadge.vue";

const stories = storiesOf("Components/Base Badge", module);

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

So far we have built this. The thing I showed you in the beginning.

![Showing a single red BaseBadge component.](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448523/badge-on-single-background_u2e15g.png "Just a single BaseBadge component")

### Building our Decorator

Storybook uses decorators to extend the functionality of a story. These decorators look a little different than the ES7 decorators we see in typescript, but the concept is similar. We want to extend the functionality of the core object and introduce new behavior.

Building a decorator in Storybook is reasonably straightforward. It is just an export of an object from a method. The `data` method within the object is used to return properties for the template. The `template` then has access to anything data returns.

In this case, the data method is returning objects of CSS styles. This object follows the rules of using styles in JS for Vue. So `box-shadow` becomes `boxShadow` and is the key while the value is a string of the contents for that CSS property.

We then use `:style="wrapper"` bindings to apply those styles to the HTML elements.

Finally, the `<story />` component within the template, tells Storybook where to inject our root story. For every instance of `<story />`, Storybook makes a copy of the template the decorator is applied too. We want this applied to our `<base-badge>` template.

```js
const sectionStates = () => ({
  data: () => ({
    wrapper: {
      margin: "0 2rem 2rem",
      border: "thin solid transparent",
      boxShadow: "rgba(0, 0, 0, 0.15) 0rem 0.125rem 0.3125rem 0rem",
      borderRadius: "0.3125rem",
      padding: "2rem"
    },
    light: {
      backgroundColor: "#ffffff"
    },
    grey: {
      backgroundColor: "#fdfcfb",
      boxShadow: "rgba(0, 0, 0, 0.2) 0rem 0.125rem 0.3125rem 0rem"
    },
    dark: {
      backgroundColor: "#010b19",
      boxShadow: "rgba(0, 0, 0, 0.5) 0rem 0.125rem 0.3125rem 0rem"
    },
    heading: {
      fontSize: "0.75rem",
      margin: "0",
      padding: "0.5rem 0 0.5rem 2rem",
      color: "#737373",
      textTransform: "uppercase"
    }
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
    `
});

export { sectionStates as default };
```

The thing that makes this work with multiple backgrounds is the inclusion of the `**.__bg-light**`**,** `.__bg-grey`, and `.__bg-dark` CSS classes. These are using in my global styles to augment any children.

> Note - I called this **sectionStates** because the standard Vue component that defines the background color in my project is a section. So it has a few colored states that children components have to react too.

### Including our Decorator

The next step is to make use of this decorator in the story we built earlier. First, we want to add the `addDecorator` method to our imports. This method is used to apply custom decorators to Storybook stories.

```ts
import sectionStates from "../utils/sectionStates.ts";
import { storiesOf, addDecorator } from "@storybook/vue";
```

Finally, we chain the `storesOf` method and call `addDecorator` method passing in `sectionStates`.

```ts
const stories = storiesOf("Components/Base Badge", module).addDecorator(
  sectionStates
);
```

The output is three instances instead of one. Each instance has a different background color. Every child within each instance is respecting its parents' container. The outcome perfectly mimics the behavior of the `BaseSection.vue` component.

![The storybook interface where BaseBadge is now wrapped with different background colors and the foreground colors are adjusted.](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448524/badge-on-multiple-backgrounds_gz281d.png "The BaseBadge on different backgrounds")

As a bonus, this allows us to validate the accessibility of each change. We see all the possibilities across all backgrounds pallets.

![](https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570448523/badge-with-a11y_hzgjvc.png)

### Conclusion

This pattern is beneficial in many situations -

* Building multiple themes like this example
* Supporting shared components across multiple brands
* Working with other types of external modifiers that work by CSS namespacing.

In general, this is very easy to do, provided your comfortable with CSS in JS, and you follow the strict class naming structure.