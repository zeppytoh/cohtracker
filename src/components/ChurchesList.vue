<template>
  <v-data-iterator
    content-tag="v-expansion-panel"
    content-class="elevation-0"
    row
    wrap
    :filter="filterLanguage"
    :items="churches"
    :search="searchTerm"
  >
    <template v-slot:header>
      <v-toolbar color="transparent" prominent flat>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Search"
              placeholder="Search name or language"
              color="transparent"
              clearable
              v-model="searchTerm"
            ></v-text-field>
            <!-- <v-select
              v-model="searchTerm"
              item-value="value"
              item-text="name"
              :items="languageFilter"
              label="Congregation"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip dark color="secondary">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>-->
          </v-flex>
        </v-layout>
      </v-toolbar>
    </template>
    <template v-slot:item="props">
      <v-expansion-panel-content :class="churches">
        <v-container class="pa-0 ma-0" slot="header">
          <v-layout row wrap>
            <v-flex xs6>
              <div class="caption grey--text">Name</div>

              <p>{{ props.item.Name }}</p>
            </v-flex>
            <v-flex xs3>
              <div class="caption grey--text">Congregation</div>

              <p>{{ props.item.Congregation }}</p>
            </v-flex>
            <v-flex xs3>
              <v-btn dark @click="onViewChurch(props.item)">View</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container class="pa-3 ma-0">
          <v-layout row wrap>
            <v-flex xs4>
              <div class="caption grey--text">Address</div>
              <div>{{ props.item.Address }}</div>
            </v-flex>
            <v-flex xs4>
              <div class="caption grey--text">Quota</div>
              <div>{{ props.item.Quota }}</div>
            </v-flex>
            <v-flex xs4>
              <div class="caption grey--text">Contacts</div>
              <div>{{ props.item.total }}</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapActions, mapState } from "vuex";
import router from "@/router";

export default {
  name: "ChurchesList",
  computed: {
    ...mapState(["AccessToken"])
  },
  data() {
    return {
      churches: [],
      panels: [],
      languageFilter: [
        { name: "English", value: "English" },
        { name: "Mandarin", value: "Mandarin" },
        { name: "Tagalog", value: "Tagalog" },
        { name: "Children", value: "Children" },
        { name: "None", value: null }
      ],
      languageFilterValue: null,
      searchTerm: null
    };
  },
  watch: {
    panels: function(val) {
      if (val) {
        console.log(val);
        this.fetchContacts(this.churches[val].ChurchID)
          .then(res => {
            console.log("Panels" + res);
            const contacts = res;
            for (let key in res) {
              const contact = res[key];
              contact.id = key;
              contacts.push(contact);
            }
            contacts.length;
          })
          .catch(error => console.log(error));
      }
    }
  },
  created() {
    this.fetchChurches()
      .then(res => {
        this.churches = res;
        console.log(this.churches);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    ...mapActions(["fetchChurches", "setChurch", "fetchContacts"]),
    filterLanguage(item, search) {
      return item.toLowerCase().includes(search);
    },
    onViewChurch(church) {
      this.setChurch(church);
      console.log(church.ChurchID);
      router.push({
        path: "dashboard/contacts/" + church.ChurchID
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-expansion-panel__container--active {
  .v-expansion-panel__header {
    background-color: rgba(0, 0, 0, 0);
  }
  .v-expansion-panel__body {
    .v-card {
      border-radius: 0.6rem;
    }
  }
}
.v-expansion-panel__container {
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  border-left: 6px solid var(--v-secondary-lighten2);
  margin-bottom: 4px;
}
</style>
