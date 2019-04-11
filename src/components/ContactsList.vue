<template>
  <v-flex v-resize="onResize" xs12 class="ma-0 pa-0">
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
        <v-toolbar color="transparent" prominent flat>
          <v-select
            v-model="languageFilterValue"
            item-value="value"
            item-text="name"
            :items="languageFilter"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip dark color="secondary" class="caption">
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
              <v-chip dark color="secondary" class="caption">
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
              <v-chip dark color="secondary" class="caption">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-select>

          <v-btn color="transparent" icon small @click.prevent="removeFilters">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn hidden-sm-and-up color="transparent" icon small @click.prevent="onToggleFilter">
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item="props">
        <v-expansion-panel-content :class="`${believerStatus[props.item.BelieverStatus].text}`">
          <v-container class="pa-0" slot="header">
            <v-layout justify-space-between row>
              <v-flex xs4 md4 align-self-center>
                <div v-if="!isMobile" class="caption grey--text">Name</div>
                <div
                  :class="{'title' : isMobile} "
                >{{ props.item.FirstName }}&nbsp;{{ props.item.LastName }}</div>
              </v-flex>
              <v-flex xs1 md1 align-self-center hidden-xs-only>
                <div>{{props.item.Gender}}</div>
              </v-flex>
              <v-flex xs4 md3 hidden-xs-only>
                <div class="caption grey--text">Number</div>
                <div>{{ props.item.MobileNumber }}</div>
              </v-flex>
              <v-flex xs4 md2 align-self-center>
                <v-edit-dialog
                  v-if="$store.state.Role=='church-admin'"
                  :return-value.sync="props.item.BelieverStatus"
                  lazy
                  large
                  persistent
                  @save="saveContact(props.item)"
                  @cancel="cancel"
                  disabled
                >
                  <v-btn
                    small
                    :color="believerStatus[props.item.BelieverStatus].color"
                    class="white--text caption mx-0 my-0 pa-0"
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
                      v-if="props.item.BelieverStatus !== '2'"
                      v-model="logMessage"
                      label="Please share why you're making the change"
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
              <v-flex hidden-xs-only xs1 sm2 md1>
                <v-btn
                  @click="showContactHistory(props.item.BelieverID)"
                  flat
                  icon
                  small
                  color="secondary"
                >
                  <v-icon>history</v-icon>
                </v-btn>
                <!-- <ContactHistory :contact="props.item"/> -->
              </v-flex>
            </v-layout>
          </v-container>
          <v-card flat color="accent lighten-3">
            <v-layout row wrap class="ma-3">
              <v-flex xs12 md4>
                <div class="caption grey--text">Notes</div>
                <div>{{ props.item.AdditionalComments }}</div>
              </v-flex>
              <v-flex xs8 sm4 md2>
                <div class="caption grey--text">Decision</div>
                <div>{{ decisionText[props.item.DecisionMade] }}</div>
              </v-flex>
              <v-flex xs4 sm4 md2>
                <div class="caption grey--text">Language</div>
                <div>{{ props.item.LanguageType }}</div>
              </v-flex>
              <v-flex xs4 sm4 md2>
                <div class="caption grey--text">Age Group</div>
                <div>{{ ageGroups[props.item.AgeGroup] }}</div>
              </v-flex>
              <v-flex xs4>
                <div class="caption grey--text">Friend</div>
                <div>{{ props.item.NameOfFriend }}</div>
              </v-flex>
              <v-flex xs4>
                <div class="caption grey--text">Friend's Church</div>
                <div>{{ props.item.FriendChurchPostcode }}</div>
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
  </v-flex>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["churchid"],
  computed: {
    ...mapState([
      "loading",
      "Church",
      "FullName",
      "ageGroups",
      "ageGroupsMap",
      "believerStatus",
      "decisionText",
      "isMobile"
    ]),
    thePostcode: function() {
      return this.churchid === "" ? "000000" : this.churchid;
    }
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
    const data = this.churchid;
    console.log(this.churchid);
    this.fetchContacts(data)
      .then(res => {
        this.contacts = res;
        this.setLoading(false);
      })
      .catch(error => {
        console.log("There was an error fetching Contacts:", error.response);
      });
  },
  data() {
    return {
      contacts: [],
      filterDrawer: false,
      isMobile: false,
      options: [
        { name: "pending", value: "1" },
        { name: "contacted", value: "2" },
        { name: "unreachable", value: "3" },
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
      pagination: {
        rowsPerPage: 10
      },
      logMessage: "",
      iconIndex: 0
    };
  },
  methods: {
    ...mapActions(["updateContact", "fetchContacts"]),
    ...mapMutations(["toggleDrawerRight", "setMobile"]),
    onToggleFilter() {
      this.toggleDrawerRight();
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
      const payload = {
        BelieverID: contact.BelieverID,
        BelieverStatus: contact.BelieverStatus,
        ChangeLog: this.logMessage,
        ChurchID: this.thePostcode
      };
      this.updateContact(payload);
    },
    cancel() {
      //
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
  &.unreachable {
    border-left: 6px solid var(--v-grey-darken1);
  }
  &.uncontactable {
    border-left: 6px solid var(--v-grey-darken1);
  }
  &.contacted {
    border-left: 6px solid var(--v-success-darken1);
  }
  &.reassign {
    border-left: 6px solid var(--v-primary-lighten1);
  }
}
</style>