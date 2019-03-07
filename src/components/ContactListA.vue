<template>
  <v-expansion-panel class="elevation-0" dense>
    <v-expansion-panel-content
      v-for="(contact,i) in contacts"
      :key="i"
      :class="`${getStatusText(contact.BelieverStatus)}`"
    >
      <div slot="header">
        <v-layout row wrap>
          <v-flex xs3 md3>
            <div class="caption grey--text">Name</div>
            <div>{{ contact.FullName }}</div>
          </v-flex>
          <v-flex xs1 md1>
            <div class="caption grey--text">.</div>

            <div>{{contact.Gender}}</div>
          </v-flex>
          <v-flex xs4 sm4 md3>
            <div class="caption grey--text">Number</div>
            <div>{{ contact.MobileNumber }}</div>
          </v-flex>
          <v-flex xs2 sm2 md2>
            <!-- <v-btn
              small
              class="elevation-0"
              color="primary"
              @click="detailView(contact.RandomID)"
            >View</v-btn>-->
            <believer-detail :Believer="contact"/>
          </v-flex>
          <v-flex xs2 sm4 md3>
            <!-- <v-chip
                    small
                    :color="getColorByStatus(contact.BelieverStatus)"
                    class="white--text caption my-2 pa-0"
                  >{{getStatusText(contact.BelieverStatus)}}</v-chip>
            -->
            <v-select
              :items="options"
              item-value="value"
              item-text="name"
              solo
              flat
              :background-color="getColorByStatus(contact.BelieverStatus)"
              class="caption"
              v-model="contact.BelieverStatus"
            ></v-select>
          </v-flex>
        </v-layout>
      </div>
      <v-card flat color="grey lighten-3">
        <v-layout row wrap class="ma-3">
          <v-flex xs12 md4>
            <div class="caption grey--text">Comments</div>
            <div>{{ contact.AdditionalComments }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Decision</div>
            <div>{{ getDecisionText(contact.DecisionMade) }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Language</div>
            <div>{{ contact.LanguageType }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Age Group</div>
            <div>{{ getAgeGroupText(contact.AgeGroup) }}</div>
          </v-flex>
          <v-flex>
            <div class="caption grey--text">Friend</div>
            <div>{{ contact.Friend }}</div>
          </v-flex>
          <v-flex>
            <div class="caption grey--text">Friend</div>
            <div>{{ contact.Friend }}</div>
          </v-flex>
          <v-flex>
            <div class="caption grey--text">Friend</div>
            <div>{{ contact.Friend }}</div>
          </v-flex>
          <!-- <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-flex>-->
        </v-layout>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapActions } from "vuex";
import BelieverDetail from "@/components/BelieverDetail";

export default {
  components: {
    BelieverDetail
  },
  props: ["contacts"],
  methods: {
    onViewDetails(contactID) {
      this.$emit("detailView", contactID);
    },
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
    }
  },
  data() {
    return {
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