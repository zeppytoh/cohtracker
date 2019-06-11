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
                  v-if="$store.state.Role=='church-admin' || $store.state.Role=='super-admin'"
                  :return-value.sync="props.item.BelieverStatus"
                  lazy
                  large
                  @open="clearMessage()"
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
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["search"],

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

      logMessage: "",

      pagination: {
        rowsPerPage: 30
      }
    };
  },
  methods: {
    ...mapActions(["updateContact", "fetchContacts", "setSnackMessage"]),
    showContactHistory(id) {
      this.$router.push({
        path: "/dashboard/contacts/history/" + id
      });
    },
    filterMultiple(item) {
      return (
        item.FirstName.indexOf(this.search) !== -1 ||
        item.LastName.indexOf(this.search) !== -1
      );
    },
    filterContacts(items, search, filterFunction) {
      return items.filter(filterFunction);
    },
    saveContact(contact) {
      // if (contact.BelieverStatus !== "2" && this.logMessage == "") {
      //   this.setSnackMessage(
      //     "Status was not changed because no message was logged. Please try again"
      //   );
      //   this.cancel();
      // } else {
        var message = this.logMessage;
        var churchID = this.Church.ChurchID;
        if (this.$store.state.Role=='super-admin') {
          message = 'Updated by admin - ' + this.logMessage;
          churchID = contact.ChurchID;
        }

        const payload = {
          BelieverID: contact.BelieverID,
          BelieverStatus: contact.BelieverStatus,
          ChangeLog: message,
          ChurchID: churchID
        };
        this.updateContact(payload);
        this.logMessage = "";
      // }
    },
    clearMessage() {
      this.logMessage = "";
    },
    cancel() {
      return;
    },
    open() {},
    close() {
      console.log("Dialog closed");
    }
  }
};
</script>
