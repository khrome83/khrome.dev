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
Storybook has excellent Vue support. While it did not support Vue at launch, it now does. And it has become my goto technology while fleshing out base components. It is critical to my development process, and I think it should be considered for yours.

No longer do I need to stub out pages or hack together a test page. Instead I can focus on my design language. Each story is a base component, making it incredibly clear and easier to process. It has sped up my development in unexpected ways.

The ecosystem within Storybook also covers a lot of my concerns. I love the “knobs” plugin. It allows me to stress test each component by mixing settings. The a11y plugin gives me a high level view of the current state of the component to ensure everything is acessible. I use the breakpoint component to simulate different viewports. These tools ensure that I think about these concerns much earlier in my process. And my work is better for it.

## The Problem

I did run into a small issue recently though. How to build for multiple themes at once? One of the patterns I rely on is the use of background colors to modify the pallet in the foreground. I like the concept of breaking up the page. And as content shifts in my marketing pages, I want the flexibility to change the pallet on the fly. Here is an example of the same signup banner across three different pallets.

![](/uploads/multiple_themes.png)

So I want to demonstrate with a simple `<base-badge>` component. This is a simple component that takes a label and shows it in a colored badge. It is great for notification counts, and tagging content. Here is a example of it in Storybook.

![](/uploads/badge-on-single-background.png)

### BaseBadge Breakdown

Here is the `BaseBadge.vue` file. 

> _Note_ - This uses TypeScript and `nuxt-property-decorator` which I am a huge fan of. 

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

For those new to Vue and TypeScript, I am going to quickly break this down.

```vue
<template>
  <span class="badge" :class="{ secondary, small, large }">
    <slot></slot>
  </span>
</template>
```

The template section is fairly simple and standard Vue. We are creating a span that contains the text passed to the default slot. The interface accepts a size and a color pallet. The default is assuemed to be normal size and primary color pallet.

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

This is where the TypeScript syntax comes into play. Notice the `<script lang="ts">` where we tell Vue to process this as TypeScript.

The `import` line is used to pull in our decorartors and classes from [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator) which is a nice wrapper around four other modules. This just cleans up the interface instead of having to pull in [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator), [vue-class-component](https://github.com/vuejs/vue-class-component), [vuex-class](https://github.com/ktsn/vuex-class/), and [nuxt-class-component](https://github.com/nuxt-community/nuxt-class-component) seperatly. 

The `@Component({})` decorartor defines the class as a component. The `@Prop(Boolean)` defines props for the Vue component, and sets up both TypeScript type checking, and Vue prop type checking. Hence why `Boolean`/`boolean` is repeated. 

I choose a very simple component for the purpose of this article. Notice that we do not have any state or logic to deal with.

### CSS Styling

```css
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

Looking at just a small subset of the CSS, you can see that we are modifying `.secondary` three times. The default pallet is considered the "Primary" theme and sets the background color. When the component is within a element with the `.__bg-grey` or `.__bg-dark` class applied, it gets modified. 

The structure I use for different sections within my site is to have a section define the background color. Then the contents within respond to that. 

```vue
<section class="__bg-dark">
	<base-badge secondary/>
</section>
```

This ensures that as the parent section changes it's pallet, all the children behave accordingly.

## The Storybook Story

The Storybook setup is fairly basic. It uses the standard patterns for using Vue within Storybook, as well as a few "Knobs". 


### Basic Storybook Story


First we import `storiesOf` method from the `@storybook/vue` module. This allows us to create a story and define it in a namespace. We also import our `BaseBadge.vue` component.

> Tip - I place all my base component within a folder called "Components". This makes it clear to others what components can be combined to create larger. Base Components typically have minimal to no state, and are the lowest level component in Vue.

```ts
import { storiesOf } from "@storybook/vue";
import BaseBadge from "../components/BaseBadge.vue";

const stories = storiesOf("Components/Base Badge", module);
```

Next we are going to display the `BaseBadge` on the page. We add the story to Storybook using the `stories.add` method. I name the page for all root instances of my components "Default" unless I have different implimentation setups. 

The template is just a simple ES6 template string that exports the same contents you would have in a a Vue template. 

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

This is great so far, but we can't test any of the stress cases. We want to be able to change the text, modify the size and color pallet. First we want to import the interface types we need from `@storybook/addon-knobs`.

```ts
import { radios, text } from "@storybook/addon-knobs";
```

Then we want to extend the story definition object to include a props object that tells Storybook what "knobs" to enable and the rules and labels for each knob. In this case we use `text` knob to define the content within the badge. The `radio` knob is used to select the theme and size of the badge.

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

```
        <base-badge v-bind="{
          secondary: theme === 'secondary',
          small: size === 'small',
          large: size === 'large',
        }">
          {{text}}
        </base-badge>
```

Here is the whole story completed. While we have no solved for the multiple background colors, we have build the Vue component and the Storybook story for it.

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

So far we have built this.

![](/uploads/badge-on-single-background.png)

### Building our Decorator

Storybook uses decorators to extend the functionality of a story. This looks a little different than the ES7 decorartors we see in typescript, but the concept is similar. We wan to extend the functionality of the core object, and introduce additional behavior.

Building a decorator in Storybook is fairly simple. It is just a export of an object from a method. The `data` method within the object is used to return properties for the template. The `template` then has access to anything data returns. 

In this case, the data method is returning objects of CSS styles. This follows the rules of using styles in JS for Vue. So `box-shadow` becomes `boxShadow` and is the key. While the value is a string of the contents for that css property. 

We then use `:style="wrapper"` bindings to apply those styles to the HTML elements. 

Finally the `<story />` component within the template, tells Storybook where to inject our root story. This is where the magic happens, because for every instance of `<story />`, Storybook makes a copy of the template the decorator is being applied too. We want this applied to our `<base-badge>` template.

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

### Including our Decorator

g

```ts
import { storiesOf, addDecorator } from "@storybook/vue";
```

dd

```ts
const stories = storiesOf("Components/Base Badge", module).addDecorator(sectionStates);
```

![](/uploads/badge-on-multiple-backgrounds.png)



![](/uploads/badge-with-a11y.png)