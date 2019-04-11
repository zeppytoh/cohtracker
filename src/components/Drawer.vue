<template>
  <v-navigation-drawer
    v-if="isAuthenticated"
    app
    dark
    clipped
    left
    v-model="drawer"
    class="secondary darken-1"
  >
    <v-img :src="image" height="100%">
      <v-layout class="overlay fill-height" tag="v-list" column>
        <v-list>
          <v-subheader color="secondary darken-4">
            <v-list-tile-content background-color="primary">
              <v-img :src="computeLogo" class="logo fill-height" width="80%"></v-img>
            </v-list-tile-content>
            <v-divider></v-divider>
          </v-subheader>
          <v-list-tile v-for="link in links" :key="link.text" router :to="{path: link.routename}">
            <v-list-tile-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          routename: "/dashboard/"
        },
        {
          icon: "person",
          text: "Inquirers",
          routename: "/dashboard/contacts/"
        },
        {
          icon: "more",
          text: "Change Password",
          routename: "/changepassword"
        }
      ]
    };
  },
  computed: {
    ...mapState(["image", "color"]),
    ...mapGetters(["isAuthenticated"]),
    computeLogo() {
      return "static/COH_Eng_White-300.png";
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
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
    ...mapMutations(["setDrawer", "toggleDrawer"]),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    onClickBtn() {
      this.setDrawer(!this.$store.state.drawer);
    }
  }
};
</script>

<style lang="scss">
.v-image__image--contain {
  top: 9px;
  height: 60%;
}
.v-image.logo {
  padding: 10px;
}
.overlay {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 200),
    rgba(0, 0, 0, 15)
  );
}
</style>
