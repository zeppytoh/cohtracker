<template>
  <v-app>
    <Navbar/>

    <router-view/>
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
    };
  }
};
</script>

<style lang="scss">
@import "@/variables.scss";
@import "~vuetify-scss";
</style>

