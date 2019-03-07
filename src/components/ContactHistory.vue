<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :fullscreen="false"
    persistent
    :overlay="false"
    transition="dialog-bottom-transition"
    @open="loadDialog"
  >
    <v-btn icon slot="activator">
      <v-icon>history</v-icon>
    </v-btn>
    <v-card class="mb-3">
      <v-toolbar color="secondary" dark flat>
        <v-btn icon dark @click="dialog=false">
          <v-icon>close</v-icon>
        </v-btn>
        <h3 class="title font-weight-light text-xs-center grow">Contact History</h3>
      </v-toolbar>
      <v-card dark style="border-radius: 2px">
        <v-btn
          absolute
          bottom
          :color="getColorByStatus(contact.BelieverStatus)"
          right
          fab
        >{{getStatusText(contact.BelieverStatus)}}</v-btn>

        <v-container>
          <v-layout align-center>
            <strong class="display-4 font-weight-regular mr-4">S</strong>
            <v-layout column justify-end>
              <div class="headline font-weight-light">{{ contact.FullName }}</div>
              <div class="text-uppercase font-weight-light">{{ contact.MobileNumber }}</div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>

      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="logitem in ContactLogs"
            :key="logitem.BelieveID"
            :color="getColorByStatus(logitem.BelieverStatus)"
            large
            :icon="statusIcon(logitem.BelieverStatus)"
          >
            <v-layout justify-start row wrap pt-3>
              <v-flex md3 xs3>
                <strong>{{formatDate(logitem.UpdatedAt)}}</strong>
              </v-flex>
              <v-flex md3 xs5>
                <strong>{{logitem.ChangeLog}}</strong>
                <div class="caption mb-2">{{logitem.ChurchName}}</div>
              </v-flex>
              <v-flex md3 xs4>
                <v-chip
                  label
                  small
                  :color="getColorByStatus(logitem.BelieverStatus)"
                  text-color="white"
                >{{ getStatusText( logitem.BelieverStatus ) }}</v-chip>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-flex xs12></v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  filters: {},
  props: {
    contact: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      show: false,
      marker: true,
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
      statusIcons: {
        "1": "contact_support",
        "2": "contact_phone",
        "3": "speaker_notes_off",
        "4": "assignment_return"
      },
      colors: {
        "1": "warning lighten-1",
        "2": "success darken-2",
        "3": "grey darken-1",
        "4": "primary lighten-2"
      },
      currentLogMessage: "Contact status is being changed",
      ContactLogs: []
    };
  },
  watch: {
    dialog: function(val) {
      if (val) {
        this.loadDialog();
      }
    }
  },
  methods: {
    ...mapActions(["fetchContact"]),

    ...mapMutations("ui", ["setLoading", "toggleLoading"]),

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
    loadDialog() {
      console.log("Load Dialog");
      this.setLoading(true);
      this.fetchContact(this.contact.RandomID)
        .then(res => {
          this.ContactLogs = res.BelieverLogs;
          console.log(res);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    getColorByStatus(status) {
      return this.colors[status];
    },
    getStatusText(status) {
      return this.believerStatusText[status];
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.currentLogMessage = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    statusIcon(status) {
      return this.statusIcons[status];
    }
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  }
};
</script>

<style scoped>
</style>