<template>
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
    :search="search"
  >
    <template v-slot:header></template>
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
                    class="caption mx-0 my-0 pa-1"
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
              <v-icon>history</v-icon>&nbsp;History
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn small icon @click.stop="props.expanded = !props.expanded">
              <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card
              color="grey lighten-2"
              class="ma-1 elevation-0"
              light
              v-if="props.expanded == true"
            >
              <v-layout row wrap class="ma-0">
                <v-flex class="grey lighten-2" xs12>
                  <div class="caption grey--text">Notes</div>
                  <div>{{ props.item.AdditionalComments }}</div>
                </v-flex>
                <v-flex xs7 class="grey lighten-4">
                  <div class="caption grey--text">Decision</div>
                  <div>{{ decisionText[props.item.DecisionMade] }}</div>
                </v-flex>
                <v-flex xs5 class="grey lighten-4">
                  <div class="caption grey--text">Language</div>
                  <div>{{ props.item.LanguageType }}</div>
                </v-flex>
                <v-flex xs7 class="grey lighten-2">
                  <div class="caption grey--text">Email</div>
                  <div>{{ props.item.EmailAddress }}</div>
                </v-flex>
                <v-flex xs5 class="grey lighten-2">
                  <div class="caption grey--text">Age Group</div>
                  <div>{{ ageGroups[props.item.AgeGroup] }}</div>
                </v-flex>
                <v-flex xs12 class="grey lighten-4">
                  <div class="caption grey--text">Rally Attended</div>
                  <div>{{ rallyTime[props.item.RallyTime] }}</div>
                </v-flex>
                <v-flex xs7 class="grey lighten-2">
                  <div class="caption grey--text">Friend</div>
                  <div>{{ props.item.NameOfFriend }}</div>
                </v-flex>
                <v-flex xs5>
                  <div class="caption grey--text">Friend's Contact</div>
                  <div>{{ props.item.FriendContactNumber }}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="caption grey--text">Friend's Church</div>
                  <div>{{ props.item.FriendChurchName }}</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </template>
    <template v-slot:footer>
      <v-btn color="secondary darken-1" class="elevation-1 caption" @click.stop="onExportFiltered">
        <v-icon class="left" color="secondary lighten-4">cloud_download</v-icon>&nbsp;Export these Inquirers
      </v-btn>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapState, mapActions } from "vuex";
import XLSX from "xlsx";

export default {
  props: ["search"],
  created() {},
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
  data() {
    return {
      expand: false,

      options: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "unreachable", value: "3" }
        // { name: "reassign", value: "4" }
      ],
      rowsPerPageItems: [30, 60, 100],

      pagination: {
        rowsPerPage: 30
      },
      filteredItems: []
    };
  },
  methods: {
    ...mapActions(["updateContact", "fetchContacts"]),
    showContactHistory(id) {
      console.log(id);
      this.$router.push({
        path: "/dashboard/contacts/history/" + id
      });
    },
    filterMultiple(item) {
      // search == { language: null ? 'english', status: null ? '1' }

      return (
        (this.search["language"]
          ? item.LanguageType === this.search["language"]
          : true) &&
        (this.search["status"]
          ? item.BelieverStatus === this.search["status"]
          : true) &&
        (this.search["decision"]
          ? item.DecisionMade === this.search["decision"]
          : true) &&
        (this.search["rally"]
          ? item.RallyTime === this.search["rally"]
          : true)
      );
    },
    filterContacts(items, search, filterFunction) {
      this.filteredItems = items.filter(filterFunction);
      return this.filteredItems;
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
    onExportFiltered() {
      let newContacts = JSON.parse(JSON.stringify(this.filteredItems));
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
      var dateTime = new Date().toLocaleString('en-GB');
      if (this.Church.Name != "") {
        filename =
          this.Church.Name +
          "-" +
          (this.search["language"] ? "-" + this.search["language"] : "") +
          (this.search["status"]
            ? "-" + this.believerStatus[this.search["status"]].text
            : "") +
          (this.search["decision"] ? "-" + this.search["decision"] : "") +
          (this.search["rally"] ? "-" + this.search["rally"] : "") +
          "-" +
          dateTime +
          ".xlsx";
      } else {
        filename =
          "SuperAdmin" +
          (this.search["language"] ? "-" + this.search["language"] : "") +
          (this.search["status"]
            ? "-" + this.believerStatus[this.search["status"]].text
            : "") +
          (this.search["decision"] ? "-" + this.search["decision"] : "") +
          (this.search["rally"] ? "-" + this.search["rally"] : "") +
          "-" +
          dateTime +
          ".xlsx";
      }
      XLSX.writeFile(wb, filename); // name of the file is 'book.xlsx'
    }
  }
};
</script>
