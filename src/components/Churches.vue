<template>
  <div>
    <v-card v-for="church in churches" :key="church.Name">
      <v-layout row wrap justify-start class="pa-3 person">
        <v-flex xs12 md6>
          <div class="caption grey--text">Name</div>
          <span class="title">{{church.Name}}</span>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import axios from "@/axios-auth";
export default {
  name: "Churches",
  data() {
    return {
      churches: [],
      errors: []
    };
  },
  created() {
    this.fetchChurches();
  },
  methods: {
    fetchChurches() {
      var APIKey = "f912f198-e443-11e8-a9c5-89e884cb2e41";
      var url =
        "https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/churches?AccessToken=d78985fdc79388a1854ffb133dd4f619?APIKey=" +
        APIKey;
      axios
        .get(url)
        .then(res => {
          this.churches = res.data;
        })
        .catch(error => this.errors.push(error));
    }
  }
};
</script>

<style>
</style>
