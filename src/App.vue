<template>
  <v-app>
    <Navbar/>
    <v-content class="contentGradient">
      <router-view></router-view>
    </v-content>
    <v-footer app class="px-3">{{ copyrighttext }}</v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      //
      copyrighttext: "Celebration of Hope Singapore 2019"
    };
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

.v-content.contentGradient {
  background-image: linear-gradient(
    to bottom,
    var(--v-accent-base),
    var(--v-secondary-base)
  );
}
</style>

