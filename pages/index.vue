<template>
  <section class="container">
    <div>
      <navigation/>
      <logo/>
      <h1 class="title">
        biconnect
      </h1>
      <h2 class="subtitle">
        Aplikacja wspierająca towarzystwo biznesowe.
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Navigation from "../components/Navigation";

export default {
  components: {
    Navigation,
    Logo
  }
}
</script>
