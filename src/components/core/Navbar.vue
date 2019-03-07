<template>
  <v-toolbar dark clipped-left fixed app class="coh-toolbar">
    <v-toolbar-items v-if="isAuthenticated">
      <v-toolbar-side-icon @click="onClickBtn"></v-toolbar-side-icon>
    </v-toolbar-items>
    <v-btn class="pt-3" color="primary" small flat router :to="{name : 'home'}">
      <v-img :src="computeLogo" contain height="72"></v-img>
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn v-if="isAuthenticated" @click="onLogout" flat>
      <span>
        Welcome, {{ UserName }}
        <v-icon right>exit_to_app</v-icon>
      </span>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: null,
      responsive: false,
      responsiveInput: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "UserName"]),
    computeLogo() {
      return "/static/COH_Eng_White-300.png";
    }
  },
  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapActions(["logout"]),
    ...mapMutations("ui", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.ui.drawer);
    },
    onClick() {
      //
    },
    onLogout() {
      this.logout();
      this.setDrawer(false);
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  }
};
</script>

<style>
.home-title {
  text-decoration: none;
}
.coh-toolbar {
  background-image: linear-gradient(to bottom, #f24405, var(--v-primary-base));
}
</style>
