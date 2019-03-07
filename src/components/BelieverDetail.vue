<template>
  <v-dialog max-width="500">
    <v-btn icon slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card max-width="480">
      <v-toolbar color="secondary" dark flat>
        <v-btn icon>
          <v-icon>menu</v-icon>
        </v-btn>
        <h3 class="title font-weight-light text-xs-center grow">Contact History</h3>
      </v-toolbar>
      <v-card dark style="border-radius: 2px">
        <v-btn
          absolute
          bottom
          :color="getColorByStatus(getStatusText(Believer.BelieverStatus))"
          right
          fab
        >{{getStatusText(Believer.BelieverStatus)}}</v-btn>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
          dark
        >
          <v-container fill-height>
            <v-layout align-center>
              <strong class="display-4 font-weight-regular mr-4">8</strong>
              <v-layout column justify-end>
                <div class="headline font-weight-light">{{ Believer.FullName }}</div>
                <div class="text-uppercase font-weight-light">{{ Believer.MobileNumber }}</div>
              </v-layout>
            </v-layout>
          </v-container>
        </v-img>
      </v-card>

      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="logitem in BelieverLogs"
            :key="logitem.BelieveID"
            :color="getColorByStatus(getStatusText(logitem.BelieverStatus))"
            large
            :icon="statusIcon(getStatusText(logitem.BelieverStatus))"
          >
            <v-layout wrap pt-3>
              <v-flex md3 xs8>
                <strong>{{formatDate(logitem.UpdatedAt)}}</strong>
              </v-flex>
              <v-flex>
                <strong>{{logitem.ChangeLog}}</strong>
                <div class="caption mb-2">{{logitem.ChurchName}}</div>
              </v-flex>
              <v-flex>
                <v-chip
                  label
                  small
                  :color="getColorByStatus(getStatusText(logitem.BelieverStatus))"
                  text-color="white"
                >{{ getStatusText( logitem.BelieverStatus ) }}</v-chip>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-flex xs12>
          <v-text-field
            v-model="currentLogMessage"
            :append-icon="marker ? 'location_on' : 'location_off'"
            :append-outer-icon="currentLogMessage ? 'send' : 'settings_voice'"
            :prepend-icon="icon"
            box
            clearable
            label="Message"
            type="text"
            @click:append-outer="sendMessage"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  created() {},
  props: {
    Believer: {
      type: Object
    }
  },
  filters: {},
  methods: {
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
  },

  data() {
    return {
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
        "3": "uncontactable",
        "4": "reassign"
      },
      statusIcons: {
        pending: "sentiment_very_satisfied",
        contacted: "sentiment_satisfied",
        uncontactable: "sentiment_dissatisfied",
        reassign: "sentiment_very_dissatisfied"
      },
      colors: {
        pending: "secondary",
        contacted: "success darken-2",
        uncontactable: "warning",
        reassign: "primary"
      },
      currentLogMessage: "Contact status is being changed",

      BelieverLogs: [
        {
          BelieverID: "COH19-1549255632",
          BelieverStatus: "3",
          ChurchName: "Bethesda (Bedok-Tampines) Church",
          ChurchPostcode: "469717",
          ChangeLog: "Initial Response",
          CreatedAt: 1549255632,
          UpdatedAt: 1549255632
        },
        {
          BelieverID: "COH19-1549255632",
          BelieverStatus: "3",
          ChurchName: "Bethesda (Bedok-Tampines) Church",
          ChurchPostcode: "469717",
          ChangeLog: "Tried contacting for several days",
          CreatedAt: 1550812189,
          UpdatedAt: 1550812189
        },
        {
          BelieverID: "COH19-1549255632",
          BelieverStatus: "4",
          ChurchName: "Bethesda (Bedok-Tampines) Church",
          ChurchPostcode: "469717",
          ChangeLog: "Wants to be contacted by another church",
          CreatedAt: 1550812279,
          UpdatedAt: 1550812279
        },
        {
          BelieverID: "COH19-1549255632",
          BelieverStatus: "2",
          ChurchName: "Bethesda (Bedok-Tampines) Church",
          ChurchPostcode: "469717",
          ChangeLog: "System assigned status to 5",
          CreatedAt: 1550812321,
          UpdatedAt: 1550812321
        }
      ]
    };
  }
};
</script>

<style>
</style>
