<template>
  <div>
    <filter-drawer/>
    <v-container fluid grid-list-md>
      <v-toolbar color="transparent" prominent flat>
        <v-layout row wrap>
          <v-text-field v-model="searchText" label="Search Inquirers"></v-text-field>

          <v-toolbar-items>
            <v-btn color="transparent" icon small @click.prevent="removeFilters">
              <v-icon color="secondary">label_off</v-icon>
            </v-btn>
            <v-btn hidden-sm-and-up color="transparent" icon small @click.prevent="onToggleFilter">
              <v-icon color="secondary">label</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-toolbar>
      <component :is="iteratorComponent" :search="search"></component>
      <v-layout row wrap align-content-start>
        <v-flex xs12>
          <v-btn color="secondary" class="elevation-1 caption" @click.stop="onToggleFilter">
            <v-icon class="left" color="secondary lighten-3">label</v-icon>Toggle Filters
          </v-btn>
          <v-btn color="secondary" class="elevation-1 caption" @click.stop="removeFilters">
            <v-icon class="left" color="secondary lighten-3">label_off</v-icon>Clear Filters
          </v-btn>
          <v-btn color="secondary darken-1" class="elevation-1 caption" @click.stop="onExport">
            <v-icon class="left" color="secondary lighten-4">cloud_download</v-icon>&nbsp;Export all Inquirers
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import FilterDrawer from "@/components/FilterDrawer";
import NameIterator from "@/components/NameIterator";
import FieldsIterator from "@/components/FieldsIterator";

import XLSX from "xlsx";
export default {
  components: {
    FilterDrawer,
    NameIterator,
    FieldsIterator
  },

  props: ["churchid"],
  computed: {
    ...mapState([
      "loading",
      "Church",
      "Contacts",
      "FullName",
      "ageGroups",
      "rallyTime",
      "believerStatus",
      "decisionText",
      "drawerRight"
    ])
  },

  watch: {
    $route(to) {
      this.searchTerm = to.query;
      this.languageFilterValue = this.searchTerm.language || null;
      this.statusFilterValue = this.searchTerm.status || null;
      this.decisionFilterValue = this.searchTerm.decision || null;

      this.search = this.searchTerm;

      this.iteratorComponent = "FieldsIterator";
    },
    searchText: function() {
      if (this.searchText != "") {
        this.removeFilters();
        this.search = this.searchText;
        this.iteratorComponent = "NameIterator";
      } else {
        this.search = this.searchTerm;
        this.iteratorComponent = "FieldsIterator";
      }
    },
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
  created() {
    this.searchTerm = this.$route.query;
    this.languageFilterValue = this.searchTerm.language || null;
    this.statusFilterValue = this.searchTerm.status || null;
    this.decisionFilterValue = this.searchTerm.decision || null;
    if (this.searchTerm) {
      this.search = this.searchTerm;
      this.iteratorComponent = "FieldsIterator";
    }
    // const data = this.churchid;
    // if (!data) {
    //   this.$router.push({
    //     path: "/dashboard/"
    //   });
    // }
    // this.fetchContacts(data)
    //   .then(res => {
    //     console.log("Contacts fetched!");
    //     console.log(res);
    //     this.contacts = res.data;
    //     this.setLoading(false);
    //   })
    //   .catch(error => {
    //     console.log(
    //       "There was an error fetching in Contacts component:",
    //       error.response
    //     );
    //   });
  },
  data() {
    return {
      iteratorComponent: "FieldsIterator",
      filterDrawer: false,

      languageFilter: [
        { name: "English", value: "English" },
        { name: "Mandarin", value: "Mandarin" },
        { name: "Tamil", value: "Tamil" },
        { name: "Indonesian", value: "Indonesian" },
        { name: "Hindi", value: "Hindi" },
        { name: "Tagalog", value: "Tagalog" },
        { name: "Children", value: "Children" },
        { name: "None", value: null }
      ],
      statusFilter: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "unreachable", value: "3" },
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
      max25chars: v => v.length <= 35 || "Input too long!",
      searchTerm: null,
      searchText: "",
      search: null,

      logMessage: "",
      iconIndex: 0,
      term: "" // text search term
    };
  },
  methods: {
    ...mapActions(["updateContact", "fetchContacts"]),
    ...mapMutations(["toggleDrawerRight", "setMobile", "setSnack"]),
    onToggleFilter() {
      this.toggleDrawerRight();
    },
    onExport() {
      let newContacts = JSON.parse(JSON.stringify(this.Contacts));
      for (var i = 0; i < newContacts.length; i++) {
        newContacts[i].Status = this.believerStatus[
          newContacts[i]["BelieverStatus"]
        ].text;
        newContacts[i].AgeGroup = this.ageGroups[newContacts[i]["AgeGroup"]];
        newContacts[i].RallyTime = this.rallyTime[newContacts[i]["RallyTime"]];
        newContacts[i].DecisionMade = this.decisionText[
          newContacts[i]["DecisionMade"]
        ];

        delete newContacts[i].BelieverStatus;
        delete newContacts[i].CreatedAt;
        delete newContacts[i].UpdatedAt;
        delete newContacts[i].id;
        delete newContacts[i].BelieverID;
      }
      let contactsWS = XLSX.utils.json_to_sheet(newContacts);
      let wb = XLSX.utils.book_new(); // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, contactsWS, "contacts");
      // add Worksheet to Workbook
      var filename;
      if (this.Church.Name != "") {
        filename = this.Church.Name + ".xlsx";
      } else {
        filename = "SuperAdmin.xlsx";
      }
      XLSX.writeFile(wb, filename); // name of the file is 'book.xlsx'
    },
    removeFilters() {
      this.searchTerm = this.languageFilterValue = this.statusFilterValue = this.decisionFilterValue = null;
      this.$router.push({
        path: this.$router.path,
        query: {
          language: this.languageFilterValue,
          status: this.statusFilterValue,
          decision: this.decisionFilterValue
        }
      });
    },

    showContactHistory(id) {
      console.log(id);
      this.$router.push({
        path: "/dashboard/contacts/history/" + id
      });
    },
    onResize() {
      if (window.innerWidth < 769) this.setMobile(true);
      else this.setMobile(false);
    }
  }
};
</script>

<style lang="scss">
.contact {
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 6px solid grey;
  margin-bottom: 4px;
  &.pending {
    border-left: 6px solid var(--v-warning-base);
  }
  &.unassigned {
    border-left: 6px solid var(--v-primary-darken1);
  }
  &.unreachable {
    border-left: 6px solid #ccc;
  }
  &.contacted {
    border-left: 6px solid var(--v-success-darken1);
  }
  &.reassign {
    border-left: 6px solid var(--v-primary-lighten1);
  }
}
</style>