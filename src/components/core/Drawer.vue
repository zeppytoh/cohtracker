<template>
  <v-navigation-drawer app dark clipped left v-model="drawer" class="secondary darken-1">
    <v-img :src="image" height="100%">
      <v-layout class="overlay fill-height" tag="v-list" column>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="{name: link.routename}">
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
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          routename: "dashboard"
        },
        {
          icon: "person",
          text: "Contacts",
          routename: "churchadmin"
        },
        {
          icon: "info",
          text: "About",
          routename: "about"
        }
      ]
    };
  },
  computed: {
    ...mapState("ui", ["image", "color"]),
    drawer: {
      get() {
        return this.$store.state.ui.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    },
    items() {
      return this.$t("Layout.View.items");
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
    ...mapMutations("ui", ["setDrawer", "toggleDrawer"]),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    onClickBtn() {
      this.setDrawer(!this.$store.state.ui.drawer);
    }
  }
};
</script>

<style lang="scss">
.v-image__image--contain {
  top: 9px;
  height: 60%;
}
.overlay {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 200),
    rgba(0, 0, 0, 15)
  );
}
</style>
