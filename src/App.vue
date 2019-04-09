<template>
  <v-app>
    <Navbar/>
    <Drawer/>
    <ContentView/>
    <Snackbar/>
    <Loading/>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import ContentView from "./components/ContentView";
import Snackbar from "./components/Snackbar";
import Loading from "./components/Loading";

export default {
  name: "App",
  components: {
    Navbar,
    Drawer,
    ContentView,
    Snackbar,
    Loading
  },
  data() {
    return {
      //
    };
  },
  created() {
    if (this.$store.dispatch("tryAutoLogin")) {
      console.log("AugoLogin returned true");
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