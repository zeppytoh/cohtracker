<template>
  <div class="about">
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <contacts/>
      </v-flex>
    </v-layout>
    <v-container class="my-5">
      <h1 class="subheading grey--text">Near-Earth Objects</h1>
      <v-layout class="mb-3" row>
        <v-tooltip top>
          <v-btn small flat color="grey" slot="activator" @click="sortBy('name')">
            <v-icon left small>face</v-icon>
            <span class="caption text-lowercase">By name</span>
          </v-btn>
          <span>Sort NEOs by name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" slot="activator" @click="sortBy('date')">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By date</span>
          </v-btn>
          <span>Sort NEOs by approach date</span>
        </v-tooltip>
      </v-layout>

      <v-card class="py-3" flat v-for="(a, index) in asteroids" :key="a.neo_reference_id">
        <v-layout row wrap class="pa-3">
          <v-flex xs2 md1>
            <div>{{index + 1}}</div>
          </v-flex>
          <v-flex xs10 md4>{{a.name}}</v-flex>
          <v-flex xs2 md2>{{getCloseApproachDate(a)}}</v-flex>
          <v-flex xs12 md4>
            <ul v-if="a.close_approach_data.length > 0">
              <li
                v-for="(value, key) in a.close_approach_data[0].miss_distance"
                :key="key"
              >{{key}}: {{value}}</li>
            </ul>
          </v-flex>
          <v-flex xs2 md1>
            <v-btn small depressed class="warning" @click="remove(index)">Remove</v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Contacts from "@/components/Contacts";
export default {
  components: {
    Contacts
  },
  data() {
    return {
      asteroids: [],
      believers: [],
      errors: []
    };
  },
  created() {
    this.fetchAsteroids();
  },
  methods: {
    remove(index) {
      this.asteroids.splice(index, 1);
    },
    getCloseApproachDate: function(a) {
      if (a.close_approach_data.length > 0) {
        return a.close_approach_data[0].close_approach_date;
      } else return "NA";
    },
    fetchAsteroids() {
      var apiKey = "v8ObxDMWH1dLCkTu0zJXKR07yoDurFtKwDSSJbUn";
      var url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;

      axios
        .get(url)
        .then(res => {
          this.asteroids = res.data.near_earth_objects;
        })
        .catch(error => this.errors.push(error));
    },
    fetchBelievers() {
      var url =
        "https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/believers";
      axios
        .get(url)
        .then(res => {
          this.believers = res.data;
        })
        .catch(error => this.errors.push(error));
    },
    sortBy(prop) {
      if (prop != "date")
        this.asteroids.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      else
        this.asteroids.sort(
          (a, b) =>
            (a.close_approach_data.length > 0
              ? a.close_approach_data[0].close_approach_date
              : "NA") <
            (b.close_approach_data.length > 0
              ? b.close_approach_data[0].close_approach_date
              : "NA")
              ? -1
              : 1
        );
    }
  }
};
</script>

<style>
</style>

