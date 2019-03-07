<template>
  <v-list two-line subheader>
    <v-data-iterator
      :items="contacts"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
      <v-list-group slot="item" slot-scope="props">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ props.item.FullName }}&nbsp; {{ props.item.Gender }}</v-list-tile-title>
            <v-list-tile-sub-title>{{props.item.MobileNumber}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon>info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-card flat color="accent lighten-2">
          <v-card-title>
            <h4>{{ props.item.AdditionalComments }}</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout row wrap class="ma-3">
            <v-flex xs12 md4>
              <div class="caption grey--text">Comments</div>
              <div>{{ props.item.AdditionalComments }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Decision</div>
              <div>{{ getDecisionText(props.item.DecisionMade) }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Language</div>
              <div>{{ props.item.LanguageType }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Age Group</div>
              <div>{{ getAgeGroupText(props.item.AgeGroup) }}</div>
            </v-flex>
            <v-flex>
              <div class="caption grey--text">Friend</div>
              <div>{{ props.item.Friend }}</div>
            </v-flex>
            <v-flex>
              <div class="caption grey--text">Friend</div>
              <div>{{ props.item.Friend }}</div>
            </v-flex>
            <v-flex>
              <div class="caption grey--text">Friend</div>
              <div>{{ props.item.Friend }}</div>
            </v-flex>
            <!-- <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
            </v-flex>-->
          </v-layout>
        </v-card>
      </v-list-group>
    </v-data-iterator>
  </v-list>

  <!-- <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
  </v-snackbar>-->
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["contacts"],
  computed: {
    ...mapState("ui", ["loading"])
  },
  methods: {
    getColorByStatus(status) {
      return this.colors[status];
    },
    getStatusText(status) {
      return this.believerStatusText[status];
    },
    getDecisionText(status) {
      return this.decisionText[status];
    },
    getAgeGroupText(code) {
      return this.ageGroupText[code];
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    }
  },
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      logMessage: "Default string",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Number",
          align: "left",
          sortable: false,
          value: "mobile-number"
        },
        { text: "Remarks", value: "remarks" },
        { text: "Decision Made", value: "decision" },
        { text: "Language", value: "language" },
        { text: "Status", value: "status" }
      ],
      options: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "closed", value: "3" },
        { name: "reassign", value: "4" }
      ],
      iconIndex: 0,
      icons: [
        "sentiment_very_satisfied",
        "sentiment_satisfied",
        "sentiment_dissatisfied",
        "sentiment_very_dissatisfied"
      ],
      believerStatusText: {
        "1": "pending",
        "2": "contacted",
        "3": "closed",
        "4": "reassign"
      },
      decisionText: {
        A: "PRC",
        B: "Rededicated",
        C: "Interested",
        D: "Like to join church"
      },
      statusIcons: {
        pending: "sentiment_very_satisfied",
        contacted: "sentiment_satisfied",
        uncontactable: "sentiment_dissatisfied",
        reassign: "sentiment_very_dissatisfied"
      },
      colors: {
        "1": "warning lighten-2",
        "2": "success",
        "3": "grey lighten-2",
        "4": "primary lighten-3"
      },
      ageGroupText: {
        A: "6 yo and below",
        B: "7-12 yo",
        C: "13-16 yo",
        D: "17-25 yo",
        E: "26-35 yo",
        F: "36-49 yo",
        G: "50 yo and above"
      }
    };
  }
};
</script>

<style lang="scss">
.v-expansion-panel__container--active {
  .v-expansion-panel__header {
    background-color: rgba(0, 0, 0, 0);
  }
}
.v-expansion-panel__container {
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  border-left: 6px solid grey;
  margin-bottom: 4px;
  &.pending {
    border-left: 6px solid var(--v-warning-base);
  }
  &.uncontactable {
    border-left: 6px solid var(--v-grey-base);
  }
  &.contacted {
    border-left: 6px solid var(--v-success-base);
  }
  &.reassign {
    border-left: 6px solid var(--v-primary-base);
  }
}
</style>