<template>
  <v-app>
    <Navbar/>
    <Drawer/>
    <ContentView/>
    <Snackbar/>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import ContentView from "./components/ContentView";
import Snackbar from "./components/Snackbar";

export default {
  name: "App",
  components: {
    Navbar,
    Drawer,
    ContentView,
    Snackbar
  },
  data() {
    return {
      //
    };
  },
  created() {
    if (this.$store.dispatch("tryAutoLogin") === true) {
      this.$router.replace("dashboard");
    } else {
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss">
.contentGradient {
  background-image: linear-gradient(
    to bottom,
    var(--v-accent-base),
    var(--v-secondary-base)
  );
}
</style>