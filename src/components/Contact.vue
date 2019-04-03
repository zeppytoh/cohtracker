<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm8 offset-sm2>
        <v-card
          transition="slide-y-transition"
          :class="`${believerStatus[contact.BelieverStatus].text} contact pa-1 ma-0`"
          light
        >
          <v-toolbar color="secondary" dark flat>
            <h3
              class="title font-weight-light text-xs-center grow"
            >{{ contact.FirstName }}&nbsp;{{ contact.LastName }}</h3>
            <v-btn icon class="right" dark @click="onClose()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs5>
                <div class="caption grey--text">Mobile Number</div>

                <span class="title">{{ contact.MobileNumber }}</span>
              </v-flex>
              <v-flex xs7>
                <div class="caption grey--text">Email Address</div>
                <span>{{ contact.EmailAddress }}</span>
              </v-flex>
              <v-flex xs12>
                <div class="caption grey--text">Notes</div>
                <div>{{ contact.AdditionalComments }}</div>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card class="ma-0 elevation-0" light color="grey lighten-2">
            <v-layout row wrap class="pa-3">
              <v-flex xs7>
                <div class="caption grey--text">Decision</div>
                <div>{{ decisionText[contact.DecisionMade] }}</div>
              </v-flex>
              <v-flex xs5>
                <div class="caption grey--text">Language</div>
                <div>{{ contact.LanguageType }}</div>
              </v-flex>

              <v-flex xs12>
                <div class="caption grey--text">Age Group</div>
                <div>{{ ageGroups[contact.AgeGroup] }}</div>
              </v-flex>
              <v-flex xs12>
                <div class="caption grey--text">Rally Attended</div>
                <div>{{ rallyTime[contact.RallyTime] }}</div>
              </v-flex>
              <v-flex xs7>
                <div class="caption grey--text">Friend</div>
                <div>{{ contact.NameOfFriend }}</div>
              </v-flex>
              <v-flex xs5>
                <div class="caption grey--text">Friend's Contact</div>
                <div>{{ contact.FriendContactNumber }}</div>
              </v-flex>

              <!-- <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
              </v-flex>-->
            </v-layout>
          </v-card>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="logitem in contactLogs"
                :key="logitem.BelieverID"
                :color="believerStatus[logitem.BelieverStatus].color"
                large
                :icon="statusIcon(logitem.BelieverStatus)"
              >
                <v-layout align-center justify-start row wrap>
                  <v-flex md4>
                    <span class="caption">{{formatDate(logitem.UpdatedAt)}}</span>
                  </v-flex>
                  <v-flex md5>
                    <strong>{{logitem.ChangeLog}}</strong>
                    <div class="caption mb-2">{{logitem.ChurchName}}</div>
                  </v-flex>
                  <v-flex shrink>
                    <v-chip
                      label
                      small
                      :color="believerStatus[logitem.BelieverStatus].color"
                      text-color="white"
                    >{{ believerStatus[logitem.BelieverStatus].text }}</v-chip>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="secondary" @click.stop="onClose">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["id"],
  data: () => ({
    contact: null,
    contactLogs: [],
    statusIcons: {
      "1": "contact_support",
      "2": "contact_phone",
      "3": "speaker_notes_off",
      "4": "assignment_return"
    }
  }),
  computed: {
    ...mapState([
      "loading",
      "Church",
      "FullName",
      "ageGroups",
      "rallyTime",
      "ageGroupsMap",
      "believerStatus",
      "decisionText"
    ])
  },
  created() {
    this.fetchContact(this.id).then(res => {
      this.contact = res.Believer;
      this.contactLogs = res.BelieverLogs;
      this.contactLogs.reverse();
    });
  },

  methods: {
    ...mapActions(["fetchContact"]),
    ...mapMutations(["setLoading", "toggleLoading", "setDrawerRight"]),
    onClose() {
      this.$router.go(-1);
    },
    formatDate: function(dateValue) {
      const d = new Date(dateValue * 1000);
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Singapore"
      };
      return d.toLocaleString("en-US", options);
    },
    // loadDialog() {
    //   console.log("Load Dialog");
    //   this.setLoading(true);
    //   this.fetchContact(this.contact.BelieverID)
    //     .then(res => {
    //       this.ContactLogs = res.BelieverLogs;
    //       console.log(res);
    //     })
    //     .catch(error => {
    //       console.log("There was an error:", error.response);
    //     });
    // },
    statusIcon(status) {
      return this.statusIcons[status];
    }
  }
};
</script>

<style lang="scss" scoped>
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