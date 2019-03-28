<template>
  <v-toolbar dark clipped-left clipped-right fixed app class="coh-toolbar">
    <v-toolbar-side-icon v-if="isAuthenticated" @click="onClickBtn"></v-toolbar-side-icon>
    <!-- <v-toolbar-items v-if="isAuthenticated"><v-btn
        @click="onClickBtn"
        class="pt-3"
        color="primary"
        small
        flat
        router
        :to="{name : 'dashboard'}"
      >
        <v-img :src="computeLogo" contain height="72"></v-img>
    </v-btn></v-toolbar-items>-->

    <v-toolbar-title class="body-2">{{ toolbarTitle }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu transition="slide-y-transition" dark v-if="isAuthenticated" offset-y>
      <template v-slot:activator="{ on }">
        <span class="hidden-xs-only caption">{{ FullName }}</span>

        <v-btn icon flat v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile router to="/changepassword">
          <v-list-tile-title class="caption">Change Password</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="onLogout()">
          <v-list-tile-title class="caption">Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      responsive: false,
      responsiveInput: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "FullName"]),
    ...mapState(["Church"]),
    computeLogo() {
      return "static/COH_Eng_White-300.png";
    },
    toolbarTitle() {
      if (this.$route.path.endsWith("/dashboard/")) {
        return "Church Directory";
      } else if (this.Church) {
        return this.Church.Name;
      } else return "";
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
    onChangePassword() {
      this.setDrawer(false);

      this.$router.push("/changepassword");
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
