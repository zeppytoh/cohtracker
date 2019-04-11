<template>
  <v-card color="transparent" class="chartjs pa-2">
    <v-layout row wrap>
      <v-flex xs6 v-if="church.TotalEnquirers > 0">
        <div class="body">Total Inquirers: {{ church.TotalEnquirers }}</div>
        <span v-if="church.Stat.StatusOneCount > 0">
          <v-chip small color="secondary">
            <v-avatar class="warning">{{church.Stat.StatusOneCount}}</v-avatar>Pending
          </v-chip>
        </span>
        <span v-if="church.Stat.StatusTwoCount > 0">
          <v-chip small color="secondary">
            <v-avatar class="accent darken-1">{{church.Stat.StatusTwoCount}}</v-avatar>Contacted
          </v-chip>
        </span>
        <span v-if="church.Stat.StatusThreeCount > 0">
          <v-chip small color="secondary">
            <v-avatar class="grey">{{church.Stat.StatusThreeCount}}</v-avatar>DNC
          </v-chip>
        </span>
        <span v-if="church.Stat.StatusFourCount > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary">{{church.Stat.StatusFourCount}}</v-avatar>Reassign
          </v-chip>
        </span>
        <doughnut :chart-data="datacollection"></doughnut>
      </v-flex>
      <v-flex xs6>
        <div class="body">Congregation Size: {{ church.CongregationSize }}</div>
        <v-chip small color="secondary lighten-1">
          <v-avatar class="primary lighten-1">{{church.TotalLeaders}}</v-avatar>Follow-Up Leaders
        </v-chip>
        <span v-if="church.EnglishLeaderSize > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary darken-1">{{church.EnglishLeaderSize}}</v-avatar>English
          </v-chip>
        </span>
        <span v-if="church.FilipinoLeaderSize > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary darken-1">{{church.FilipinoLeaderSize}}</v-avatar>Filipino
          </v-chip>
        </span>
        <span v-if="church.HindiLeaderSize > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary darken-1">{{church.HindiLeaderSize}}</v-avatar>Hindi
          </v-chip>
        </span>
        <span v-if="church.TamilLeaderSize > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary darken-1">{{church.TamilLeaderSize}}</v-avatar>Tamil
          </v-chip>
        </span>
        <span v-if="church.MandarinLeaderSize > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary darken-1">{{church.MandarinLeaderSize}}</v-avatar>Mandarin
          </v-chip>
        </span>
        <span v-if="church.IndonesianLeaderSize > 0">
          <v-chip small color="secondary">
            <v-avatar class="primary darken-1">{{church.IndonesianLeaderSize}}</v-avatar>Indonesian
          </v-chip>
        </span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Doughnut from "@/Doughnut.js";
export default {
  props: ["church"],
  components: {
    Doughnut
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["pending", "contacted", "dnc", "reassign"],

        datasets: [
          {
            label: "pending",
            data: [
              this.church.Stat.StatusOneCount,
              this.church.Stat.StatusTwoCount,
              this.church.Stat.StatusThreeCount,
              this.church.Stat.StatusFourCount
            ],
            backgroundColor: ["#BF1F2C", "#C4E4DE", "#888", "#F26A1B"],
            borderWidth: 1,
            weight: 2
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.chartjs {
}
</style>