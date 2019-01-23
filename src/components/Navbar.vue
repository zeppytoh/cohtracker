<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click.prevent.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link class="home-title" router :to="{name : 'login'}">
          <span class="font-weight-light">Celebration of</span>
          <span class="text-uppercase">_Hope</span>
        </router-link>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn flat>
        <span>Welcome, admin
          <v-icon right>exit_to_app</v-icon>
        </span>
      </v-btn>-->
    </v-toolbar>
    <v-navigation-drawer app temporary v-model="drawer" class="secondary">
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
import Popup from "@/components/Popup";

export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: "person",
          text: "Believers",
          routename: "believers"
        }
      ]
    };
  },
  components: {
    Popup
  }
};
</script>

<style lang="scss">
.home-title {
  text-decoration: none;
}
</style>
