<template>
  <nav>
    <v-toolbar fixed dark clipped-right app class="coh-toolbar">
      <v-btn color="primary" small flat router :to="{name : 'home'}">
        <v-img :src="require('../assets/COH_Eng_White-300.png')" contain height="64"></v-img>
      </v-btn>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-side-icon @click.prevent.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-items>

      <!-- <v-spacer></v-spacer>
      <v-btn flat>
        <span>Welcome, admin
          <v-icon right>exit_to_app</v-icon>
        </span>
      </v-btn>-->
    </v-toolbar>
    <v-navigation-drawer app dark clipped right v-model="drawer" class="secondary darken-1">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <!-- <Popup/> -->
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
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
    </v-navigation-drawer>
    
  </nav>
</template>

<script>
// import Popup from "@/components/Popup";

export default {
  data() {
    return {
      drawer: false,
      links: [
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
  components: {
    // Popup
  }
};
</script>

<style lang="scss">
.home-title {
  text-decoration: none;
}
.coh-toolbar {
  background-image: linear-gradient(to bottom, #f24405, var(--v-primary-base));
}
</style>
