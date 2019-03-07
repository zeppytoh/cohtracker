<template>
  <v-app>
    <core-navbar/>
    <core-drawer/>
    <core-view/>
    <!-- <v-footer app dark inset color="secondary" class="px-3">
      <span class="align-center">{{ copyrighttext }}</span>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      //
      copyrighttext: "Celebration of Hope Singapore 2019"
    };
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>

<style lang="scss">
// #app {
//   font-family: "overpass", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>

