<template>
  <Layout>
    <the-hero />
    <my-works />
    <about-me />
    <contact-me />
    <the-newsletter />
  </Layout>
</template>

<script>
import AboutMe from "../components/AboutMe";
import ContactMe from "../components/ContactMe";
import MyWorks from "../components/MyWorks";
import TheNewsletter from "../components/TheNewsletter";
import TheHero from "../components/TheHero";

export default {
  components: {
    AboutMe,
    ContactMe,
    MyWorks,
    TheNewsletter,
    TheHero
  },
  metaInfo: {
    title: "Home"
  }
};
</script>
