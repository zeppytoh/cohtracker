<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      row
      wrap
      :items="Churches"
      :rows-per-page-items="rowsPerPageItems"
      pagination.sync="pagination"
      content-tag="v-layout"
      :expand="expand"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar v-if="$store.state.Role=='super-admin'" color="transparent" prominent flat>
          <v-layout row wrap>
            <v-flex xs12>
              <v-combobox
                v-model="search"
                browser-autocomplete
                chips
                label="Type language or church name"
              ></v-combobox>
            </v-flex>
          </v-layout>
        </v-toolbar>
      </template>
      <template slot="item" slot-scope="props">
        <v-flex xs12 sm6 lg4>
          <v-card class="pa-1 ma-0" dark color="secondary darken-1">
            <v-card-title primary-title>
              <v-layout row wrap justify-space-between>
                <v-flex xs8>
                  <span
                    v-if="(props.item.Name.length > 45 && props.item.ChurchAbbreviation.length > 0)"
                  >{{ props.item.ChurchAbbreviation }}</span>
                  <span v-else>{{ props.item.Name }}</span>
                  <div>
                    <span class="caption accent--text">{{ props.item.Address }}</span>
                  </div>
                </v-flex>
                <v-flex xs4>
                  <v-badge overlap color="warning">
                    <template v-slot:badge>
                      <span>{{ props.item.TotalEnquirers }}</span>
                    </template>
                    <v-btn
                      light
                      color="secondary lighten-2"
                      class="caption black--text"
                      @click.stop="onViewChurch(props.item)"
                    >Contacts</v-btn>
                  </v-badge>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small icon @click="props.expanded = !props.expanded">
                <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card
                class="ma-2 elevation-0"
                dark
                color="secondary darken-2"
                v-if="props.expanded"
              >
                <inquirer-stats :church="props.item"/>
              </v-card>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
    <v-layout row wrap align-content-start>
      <v-flex xs12>
        <v-btn color="secondary darken-1" class="elevation-1 caption" @click.stop="onExport">
          <v-icon class="left" color="secondary lighten-4">cloud_download</v-icon>&nbsp;Export all Churches
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from "@/router";
import { mapState, mapActions } from "vuex";
import InquirerStats from "@/components/InquirerStats";
import XLSX from "xlsx";
export default {
  name: "Churches",
  components: {
    InquirerStats
  },
  computed: {
    ...mapState(["Churches"])
  },
  data() {
    return {
      search: "",
      expand: false,
      rowsPerPageItems: [6, 18, 54],
      pagination: {
        rowsPerPage: 6
      },
      searchTerm: null
    };
  },
  methods: {
    ...mapActions(["setChurch"]),
    filterLanguage(item, search) {
      return item.toLowerCase().includes(search);
    },
    onViewChurch(church) {
      this.setChurch(church);
      router.push({
        path: "/dashboard/contacts/" + church.ChurchID
      });
    },
    onExport() {
      var churches = JSON.parse(JSON.stringify(this.Churches));

      // Find the right churches
      var exportChurches = [];
      for (var i = 0; i < churches.length; i++) {
        // Check if church is included
        if (churches[i].Stat.StatusOneCount > 0) {

          // Modify the values inside
          churches[i].PendingFollowUp = churches[i].Stat.StatusOneCount;
          churches[i].Contacted = churches[i].Stat.StatusOneCount;
          churches[i].Uncontactable = churches[i].Stat.StatusThreeCount;

          delete churches[i].ChurchID;
          delete churches[i].CongregationArray;
          delete churches[i].id;
          delete churches[i].Stat;

          exportChurches.push(churches[i]);
        }
      }

      let churchesWS = XLSX.utils.json_to_sheet(exportChurches);
      let wb = XLSX.utils.book_new(); // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, churchesWS, "churches");
      // add Worksheet to Workbook
      var dateTime = new Date().toLocaleString('en-GB');
      var filename = "Churches-Pending-" + dateTime + ".xlsx";
      XLSX.writeFile(wb, filename); // name of the file is 'book.xlsx'
    }
  }
};
</script>

<style lang="scss">
.v-progress-linear {
  border-radius: 12px;
  margin: 0; // remove margin as the txt will create that margin
}
.progress-bar-text {
  position: relative;
  top: -20px;
  left: 8px;
  z-index: 1;
}
</style>