<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="card in cards" v-bind="{ [`xs6 md4`]: true }" :key="card.Name">
        <v-card class="mx-auto my-2">
          <v-toolbar color="accent" flat>
            <!-- <v-icon left>home</v-icon> -->
            <span v-text="card.Name"></span>
          </v-toolbar>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "@/axios-auth";

export default {
  data() {
    return {
      cards: [],
      errors: [],
      title: ""
    };
  },
  props: ["user"],
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("/churches", {
          params: {
            AccessToken: this.user.AccessToken
          }
        })
        .then(res => {
          this.cards = res.data;
        })
        .catch(error => this.errors.push(error));
    }
  }
};
</script>

<style>
</style>
