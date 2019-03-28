<template>
  <div>
    <filter-drawer/>
    <v-container fluid grid-list-md>
      <v-data-iterator
        row
        wrap
        :items="Contacts"
        item-key="BelieverID"
        :rows-per-page-items="rowsPerPageItems"
        pagination.sync="pagination"
        content-tag="v-layout"
        :custom-filter="filterContacts"
        :filter="filterMultiple"
        :expand="expand"
        :search="searchTerm"
      >
        <template v-slot:header>
          <v-toolbar color="transparent" prominent flat>
            <v-select
              v-model="languageFilterValue"
              item-value="value"
              item-text="name"
              :items="languageFilter"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip color="accent" class="caption">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
            <v-select
              v-model="decisionFilterValue"
              item-value="value"
              item-text="name"
              :items="decisionFilter"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip color="accent" class="caption">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
            <v-select
              v-model="statusFilterValue"
              item-value="value"
              item-text="name"
              :items="statusFilter"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip color="accent" class="caption">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
            <v-toolbar-items>
              <v-btn color="transparent" icon small @click.prevent="removeFilters">
                <v-icon color="secondary">layers_clear</v-icon>
              </v-btn>
              <v-btn
                hidden-sm-and-up
                color="transparent"
                icon
                small
                @click.prevent="onToggleFilter"
              >
                <v-icon color="secondary">filter_list</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </template>
        <template v-slot:item="props">
          <v-flex xs12 sm6>
            <v-card
              :class="`${believerStatus[props.item.BelieverStatus].text} contact pa-1 ma-0`"
              light
            >
              <v-card-title primary-title>
                <v-layout row wrap>
                  <v-flex grow>
                    <div>{{ props.item.FirstName }}&nbsp;{{ props.item.LastName }}</div>
                    <span>{{ props.item.MobileNumber }}</span>
                  </v-flex>
                  <v-flex shrink>
                    <v-edit-dialog
                      v-if="$store.state.Role=='church-admin'"
                      :return-value.sync="props.item.BelieverStatus"
                      lazy
                      large
                      persistent
                      @save="saveContact(props.item)"
                      @cancel="cancel"
                      class="right"
                    >
                      <v-btn
                        small
                        :color="believerStatus[props.item.BelieverStatus].color"
                        class="caption mx-0 my-0 pa-0"
                        @click.prevent
                      >{{believerStatus[props.item.BelieverStatus].text}}</v-btn>

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
                          v-model="logMessage"
                          label="Give details for this status change"
                          :rules="['Required']"
                          required
                          autofocus
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                    <template v-else>
                      <v-btn
                        small
                        :color="believerStatus[props.item.BelieverStatus].color"
                        class="elevation-0 white--text caption mx-0 my-0 pa-0"
                        @click.prevent
                      >{{believerStatus[props.item.BelieverStatus].text}}</v-btn>
                    </template>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  @click="showContactHistory(props.item.BelieverID)"
                  flat
                  small
                  color="secondary lighten-1"
                >
                  <v-icon>history</v-icon>History
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn small icon @click.stop="props.expanded = !props.expanded">
                  <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-slide-y-transition>
                <v-card
                  class="ma-1 elevation-0"
                  light
                  color="grey lighten-4"
                  v-if="props.expanded == true"
                >
                  <v-layout row wrap class="ma-0">
                    <v-flex xs12>
                      <div class="caption grey--text">Notes</div>
                      <div>{{ props.item.AdditionalComments }}</div>
                    </v-flex>
                    <v-flex xs7>
                      <div class="caption grey--text">Decision</div>
                      <div>{{ decisionText[props.item.DecisionMade] }}</div>
                    </v-flex>
                    <v-flex xs5>
                      <div class="caption grey--text">Language</div>
                      <div>{{ props.item.LanguageType }}</div>
                    </v-flex>
                    <v-flex xs7>
                      <div class="caption grey--text">Email</div>
                      <div>{{ props.item.EmailAddress }}</div>
                    </v-flex>
                    <v-flex xs5>
                      <div class="caption grey--text">Age Group</div>
                      <div>{{ ageGroups[props.item.AgeGroup] }}</div>
                    </v-flex>
                    <v-flex xs12>
                      <div class="caption grey--text">Rally Attended</div>
                      <div>{{ rallyTime[props.item.RallyTime] }}</div>
                    </v-flex>
                    <v-flex xs7>
                      <div class="caption grey--text">Friend</div>
                      <div>{{ props.item.NameOfFriend }}</div>
                    </v-flex>
                    <v-flex xs5>
                      <div class="caption grey--text">Friend's Contact</div>
                      <div>{{ props.item.FriendContactNumber }}</div>
                    </v-flex>

                    <!-- <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
                    </v-flex>-->
                  </v-layout>
                </v-card>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
      <v-layout row wrap align-content-start>
        <v-flex xs12>
          <v-btn color="secondary" class="elevation-1 caption" @click.stop="onToggleFilter">
            <v-icon class="left" color="secondary lighten-3">filter_list</v-icon>&nbsp;Toggle Filters
          </v-btn>
          <v-btn color="secondary" class="elevation-1 caption" @click.stop="removeFilters">
            <v-icon class="left" color="secondary lighten-3">layers_clear</v-icon>&nbsp;Clear Filters
          </v-btn>
          <v-btn color="secondary lighten-1" class="elevation-1 caption" @click.stop="onExport">
            <v-icon class="left" color="secondary lighten-4">cloud_download</v-icon>&nbsp;Export to Excel spreadsheet
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import FilterDrawer from "@/components/FilterDrawer";
import XLSX from "xlsx";
export default {
  components: {
    FilterDrawer
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
      expand: false,
      filterDrawer: false,
      options: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "missing", value: "3" },
        { name: "reassign", value: "4" }
      ],
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
        { name: "missing", value: "3" },
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
      rowsPerPageItems: [6, 18, 54],

      pagination: {
        rowsPerPage: 10
      },
      logMessage: "",
      iconIndex: 0
    };
  },
  methods: {
    ...mapActions(["updateContact", "fetchContacts"]),
    ...mapMutations(["toggleDrawerRight", "setMobile", "setSnack"]),
    onToggleFilter() {
      this.toggleDrawerRight();
    },
    onExport() {
      let contactsWS = XLSX.utils.json_to_sheet(this.Contacts);
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

    saveContact(contact) {
      if (contact.BelieverStatus !== "2" && this.logMessage == "") {
        this.setSnack(
          "Status was not changed because no message was logged. Please try again"
        );
        this.cancel();
      } else {
        const payload = {
          BelieverID: contact.BelieverID,
          BelieverStatus: contact.BelieverStatus,
          ChangeLog: this.logMessage,
          ChurchID: this.Church.ChurchID
        };
        this.updateContact(payload);
        this.setSnack("Status updated");
        this.logMessage = "";
      }
    },
    cancel() {
      return;
    },
    open() {},
    close() {
      console.log("Dialog closed");
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
    border-left: 6px solid var(--v-warning-lighten2);
  }
  &.missing {
    border-left: 6px solid grey;
  }
  &.contacted {
    border-left: 6px solid var(--v-success-darken1);
  }
  &.reassign {
    border-left: 6px solid var(--v-primary-lighten1);
  }
}
</style>