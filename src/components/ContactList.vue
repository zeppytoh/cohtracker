<template>
  <div>
    <v-data-iterator
      :items="contacts"
      :pagination.sync="pagination"
      content-tag="v-expansion-panel"
      content-class="elevation-0"
      :custom-filter="filterContacts"
      :filter="filterMultiple"
      :search="searchTerm"
    >
      <template v-slot:header>
        <v-toolbar style="background-color: rgba(0,0,0,0)" flat prominent>
          <v-select
            v-model="languageFilterValue"
            item-value="value"
            item-text="name"
            :items="languageFilter"
            label="Language Filter"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip dark color="secondary">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="decisionFilterValue"
            item-value="value"
            item-text="name"
            :items="decisionFilter"
            label="DecisionMade Filter"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip dark color="secondary">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="statusFilterValue"
            item-value="value"
            item-text="name"
            :items="statusFilter"
            label="Status Filter"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip dark color="secondary">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-select>

          <v-btn color="secondary" fab small @click.prevent="removeFilters">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item="props">
        <v-expansion-panel-content :class="`${getStatusText(props.item.BelieverStatus)}`">
          <div slot="header">
            <v-layout row wrap>
              <v-flex xs3 md3>
                <div class="caption grey--text">Name</div>
                <div>{{ props.item.FullName }}</div>
              </v-flex>
              <v-flex xs1 md1>
                <div class="caption grey--text">.</div>

                <div>{{props.item.Gender}}</div>
              </v-flex>
              <v-flex xs4 sm4 md3>
                <div class="caption grey--text">Number</div>
                <div>{{ props.item.MobileNumber }}</div>
              </v-flex>
              <v-flex xs2 sm2 md2>
                <v-edit-dialog
                  :return-value.sync="props.item.BelieverStatus"
                  lazy
                  large
                  persistent
                  @save="saveContact(props.item)"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
                >
                  <v-btn
                    small
                    :color="getColorByStatus(props.item.BelieverStatus)"
                    class="white--text caption my-2 pa-0"
                  >{{getStatusText(props.item.BelieverStatus)}}</v-btn>

                  <template v-slot:input>
                    <v-select
                      :items="options"
                      item-value="value"
                      item-text="name"
                      label="Click to change status"
                      flat
                      dense
                      v-model="props.item.BelieverStatus"
                    ></v-select>
                    <v-text-field
                      v-if="props.item.BelieverStatus !== '2'"
                      v-model="logMessage"
                      label="Please share why you're making the change"
                      :rules="['Required']"
                      required
                      autofocus
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </v-flex>
              <v-flex xs1 sm2 md1>
                <ContactHistory :contact="props.item"/>
              </v-flex>
            </v-layout>
          </div>
          <v-card flat color="accent lighten-3">
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
        </v-expansion-panel-content>
      </template>
    </v-data-iterator>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ContactHistory from "@/components/ContactHistory";

export default {
  props: ["contacts"],
  components: {
    ContactHistory
  },
  computed: {
    ...mapState("ui", ["loading"]),
    ...mapGetters(["UserName", "Church"]),
    thePostcode: function() {
      return this.Church.Postcode === "" ? "000000" : this.Church.Postcode;
    }
  },
  watch: {
    languageFilterValue: function() {
      this.searchTerm = {
        language: this.languageFilterValue,
        status: this.statusFilterValue,
        decision: this.decisionFilterValue
      };
    },
    statusFilterValue: function() {
      this.searchTerm = {
        language: this.languageFilterValue,
        status: this.statusFilterValue,
        decision: this.decisionFilterValue
      };
    },
    decisionFilterValue: function() {
      this.searchTerm = {
        language: this.languageFilterValue,
        status: this.statusFilterValue,
        decision: this.decisionFilterValue
      };
    }
  },
  methods: {
    ...mapActions(["updateContact"]),
    removeFilters() {
      this.searchTerm = this.languageFilterValue = this.statusFilterValue = this.decisionFilterValue = null;
    },

    filterMultiple(item) {
      // searchTerm == { language: null ? 'english', status: null ? '1' }

      return (
        (this.searchTerm["language"]
          ? item.LanguageType === this.searchTerm["language"]
          : true) &&
        (this.searchTerm["status"]
          ? item.BelieverStatus === this.searchTerm["status"]
          : true) &&
        (this.searchTerm["decision"]
          ? item.DecisionMade === this.searchTerm["decision"]
          : true)
      );
    },
    filterContacts(items, search, filterFunction) {
      const filteredItems = items.filter(filterFunction);
      return filteredItems;
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
    },

    saveContact(contact) {
      const payload = {
        RandomID: contact.RandomID,
        BelieverStatus: contact.BelieverStatus,
        ChangeLog: this.logMessage,
        Postcode: this.thePostcode
      };
      this.updateContact(payload);
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      this.logMessage = "";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
      this.logMessage = "";
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
      languageFilter: [
        { name: "English", value: "English" },
        { name: "Mandarin", value: "Mandarin" },
        { name: "Mandarin", value: "Mandarin" },
        { name: "Mandarin", value: "Mandarin" },
        { name: "Tagalog", value: "Tagalog" },
        { name: "Children", value: "Children" },
        { name: "None", value: null }
      ],
      statusFilter: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "closed", value: "3" },
        { name: "reassign", value: "4" },
        { name: "None", value: null }
      ],
      decisionFilter: [
        { name: "PRC", value: "A" },
        { name: "Rededicated", value: "B" },
        { name: "Interested", value: "C" },
        { name: "Like to join a church", value: "D" },
        { name: "Others", value: "E" },
        { name: "None", value: null }
      ],
      statusFilterValue: null,
      languageFilterValue: null,
      decisionFilterValue: null,
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 35 || "Input too long!",
      searchTerm: null,
      pagination: {
        rowsPerPage: 10
      },
      logMessage: "",
      options: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "missing", value: "3" },
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
        "3": "missing",
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
        "1": "warning lighten-1",
        "2": "success darken-2",
        "3": "grey darken-1",
        "4": "primary lighten-2"
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
    border-left: 6px solid var(--v-warning-lighten2);
  }
  &.uncontactable {
    border-left: 6px solid var(--v-grey-darken1);
  }
  &.contacted {
    border-left: 6px solid var(--v-success-darken2);
  }
  &.reassign {
    border-left: 6px solid var(--v-primary-lighten1);
  }
}
</style>