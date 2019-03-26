<template>
  <v-toolbar dark clipped-left clipped-right fixed app class="coh-toolbar">
    <v-toolbar-items v-if="isAuthenticated">
      <v-toolbar-side-icon @click="onClickBtn"></v-toolbar-side-icon>
    </v-toolbar-items>
    <v-btn class="pt-3" color="primary" small flat router :to="{name : 'home'}">
      <v-img :src="computeLogo" contain height="72"></v-img>
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn v-if="isAuthenticated" @click="onLogout" flat>
      <span>
        Welcome, {{ FullName }}
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
      responsive: false,
      responsiveInput: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "FullName"]),
    computeLogo() {
      return "/static/COH_Eng_White-300.png";
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
    ...mapMutations(["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.drawer);
    },
    onClick() {
      //
    },
    onLogout() {
      this.logout();
      this.setDrawer(false);
      this.$router.replace("/");
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
