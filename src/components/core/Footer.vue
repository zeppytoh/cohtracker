<template>
  <v-footer id="core-footer" absolute height="60" class="pa-4" color="secondary darken-1">
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://www.creative-tim.com/"
        target="_blank"
      >Zeppytoh</a>, made with
      <v-icon color="tertiary" size="17">person</v-icon>for a better web
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "Home", Link: "/dashboard" },
      { name: "Zeppytoh", Link: "https://zeppytoh.github.io" },
      { name: "About Us", Link: "https://celebrationofhope.sg" }
    ]
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
