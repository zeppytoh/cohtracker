<template>
  <v-container fluid grid-list-xl class="my-2">
    <v-layout row wrap>
      <v-flex class="pa-2" lg8>
        <contact-list @detailView="viewDetail($event)" :contacts="contacts"/>
      </v-flex>
      <v-flex lg3>
        <church-details :church="Church"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContactList from "@/components/ContactList";
import ChurchDetails from "@/components/ChurchDetails";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "ChurchAdmin",
  components: {
    ContactList,
    ChurchDetails
  },
  computed: {
    ...mapGetters(["Church"]),
    ...mapState("ui", ["loading"])
  },
  data() {
    return {
      contacts: [],
      selectedComponent: "ChurchDetails"
    };
  },
  props: ["postcode"],
  created() {
    this.setLoading(true);

    const data = this.postcode || this.Church.Postcode;

    this.fetchContacts(data)
      .then(res => {
        this.contacts = res;
        this.setLoading(false);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
    // store
    //   .dispatch("fetchContacts", store.getters.Church.Postcode)
    //   .then(res => {
    //     this.contacts = res;
    //   })
    //   .catch(error => {
    //     console.log("There was an error:", error.response);
    //   });
  },
  methods: {
    ...mapActions(["fetchContacts", "updateContact", "setChurch"]),
    ...mapMutations(
      "ui",
      ["setLoading", "toggleLoading"],
      ["setChurchPostcode"]
    ),

    viewDetail(contact) {
      this.selectedComponent = "ContactHistory";
    },
    postBelieverStatus(contact) {
      console.log("Believer Status Changed");
      console.log(contact.RandomID);
      this.updateContact(contact);
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
    },
    getDate: function(value) {
      var d = new Date(value);
      return d.toDateString();
    },
    sortBy(prop) {
      this.believers.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style>
.person.prayed {
  border-left: 4px solid #3cd1c2;
}
.person.rededicated {
  border-left: 4px solid orange;
}
.person.interested {
  border-left: 4px solid pink;
}
.person.church {
  border-left: 4px solid maroon;
}
.person.default {
  border-left: 4px solid grey;
}
.v-chip.prayed {
  background-color: #3cd1c2;
}
.v-chip.rededicated {
  background-color: orange;
}
.v-chip.interested {
  background-color: pink;
}
.v-chip.church {
  background-color: maroon;
}
.v-chip.default {
  background-color: grey;
}
</style>
