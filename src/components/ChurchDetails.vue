<template>
  <v-card dark>
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-container>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{ Church.Name }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title>
      <div>
        <span class="grey--text">Address</span>
        <br>
        <span>{{Church.Address}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: mapGetters(["UserName", "Church"])
};
</script>
