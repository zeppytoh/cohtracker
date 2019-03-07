<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="pa-0">
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-content v-for="(church,i) in churches" :key="i">
            <v-layout slot="header" row wrap>
              <v-flex xs6>
                <div class="caption grey--text">Church name</div>
                <div>{{ church.Name }}</div>
              </v-flex>
              <v-flex xs6>
                <v-btn color="secondary" @click="viewContactList(church)">View</v-btn>
              </v-flex>
            </v-layout>
            <v-card>
              <v-card-text>{{ church.Address }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "Churches",
  computed: {
    ...mapGetters(["AccessToken"])
  },
  data() {
    return {
      churches: [],
      errors: []
    };
  },
  created() {
    this.fetchChurches()
      .then(res => {
        this.churches = res;
        console.log(this.churches);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    ...mapActions(["fetchChurches", "setChurch"]),
    viewContactList(church) {
      this.setChurch(church);
      router.push({
        name: "churchadmin",
        params: { postcode: church.Postcode }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-expansion-panel__container--active {
  .v-expansion-panel__header {
    background-color: rgba(0, 0, 0, 0);
  }
  .v-expansion-panel__body {
    .v-card {
      border-radius: 0.6rem;
    }
  }
}
.v-expansion-panel__container {
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  border-left: 6px solid var(--v-secondary-lighten2);
  margin-bottom: 4px;
}
</style>
