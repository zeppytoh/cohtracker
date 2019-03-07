<template>
  <v-card>
    <v-toolbar color="accent" flat>
      <v-toolbar-title>Contacts</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line subheader>
      <!-- <v-subheader inset>Contacts</v-subheader> -->
      <v-list-group
        v-for="contact in contacts"
        :key="contact.RandomID"
        :prepend-icon="`person`"
        no-action
        :class="`${statusColor(contact.BelieverStatus)} contact`"
        active-class="secondary--text"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ contact.FullName }}&nbsp; {{ contact.Gender }}</v-list-tile-title>
            <v-list-tile-sub-title>{{contact.MobileNumber}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon>info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-card flat>
          <v-layout row wrap justify-start class="pa-4">
            <v-flex xs12 md6>
              <div class="caption grey--text">E-mail</div>
              <div>{{ contact.EmailAddress }}</div>
            </v-flex>

            <v-flex id="dropdown-status" xs6>
              <v-select
                :items="believer_status_text"
                item-text="name"
                item-value="value"
                v-model="contact.BelieverStatus"
                @click="updateContact(contact)"
              ></v-select>

              <believer-detail :Believer="contact"/>
              <!-- <v-overflow-btn
                :items="believer_status_text"
                label="Status"
                target="#dropdown-status"
                depressed
                small
                color="primary"
              >{{ statusText(contact.BelieverStatus) }}</v-overflow-btn>-->
              <!-- <v-chip
                small
                :class="`white--text caption my-2`"
              ></v-chip>-->
            </v-flex>
          </v-layout>
        </v-card>
        <!-- <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>more</v-icon>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
        </v-list-tile>-->
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import BelieverDetail from "@/components/BelieverDetail";
export default {
  components: {
    BelieverDetail
  },
  data() {
    return {
      believer_status_text: [
        { name: "Pending Follow-Up", value: "1" },
        { name: "Contact", value: "2" },
        { name: "Uncontactable", value: "3" },
        { name: "Request Re-assignment", value: "4" },
        { name: "To Re-assign", value: "5" }
      ]
    };
  },
  props: ["contacts"],
  methods: {
    ...mapActions(["updateContact"]),

    getDateString(value) {
      var d = new Date(value * 1000);
      return d.toLocaleString();
    },
    statusText: function(value) {
      if (value > 0 && value <= 5) return this.believer_status_text[value - 1];
      else return "Error";
    },
    statusColor: function(value) {
      switch (value) {
        case "1":
          return "pending";
        case "2":
          return "tocontact";
        case "3":
          return "uncontactable";
        case "4":
          return "reassign";
        case "5":
          return "reassign";
        default:
          return "none";
      }
    },
    decisionText: function(code) {
      switch (code) {
        case "A":
          return "prayed";
        case "B":
          return "rededicated";
        case "C":
          return "interested";
        case "D":
          return "church";
        default:
          return "default";
      }
    }
  }
};
</script>

<style lang="scss">
.contact {
  border-left: 0.5rem solid gray;

  &.default {
    border-color: var(--v-primary-lighten1);
    .v-btn--icon {
      color: var(--v-primary-lighten1);
    }
  }
  &.tocontact {
    border-color: pink;
    .v-btn--icon {
      color: pink;
    }
  }
  &.pending {
    border-color: lightblue;
    .v-btn--icon {
      color: lightblue;
    }
  }
  margin: 0.5rem 0 0.5rem 0;
  &.v-list__group--active {
    margin-left: -0.4rem;
  }
  .v-list__group__header__prepend-icon {
    margin-right: -0.5rem;
  }
  .v-btn--icon {
    .default & {
      color: var(--v-primary-lighten1);
    }
    .pending & {
      color: pink;
    }
    .rededicated & {
      color: lightblue;
    }
  }
}
</style>
