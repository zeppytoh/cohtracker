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
    if (this.$store.dispatch("tryAutoLogin")) {
      this.$router.replace("dashboard");
    }
  }
};
</script>
