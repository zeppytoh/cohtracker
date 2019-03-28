<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      row
      wrap
      :items="churches"
      :rows-per-page-items="rowsPerPageItems"
      pagination.sync="pagination"
      content-tag="v-layout"
      :expand="expand"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar color="transparent" prominent flat>
          <v-layout row wrap>
            <v-flex xs12>
              <v-combobox
                v-model="search"
                browser-autocomplete
                chips
                label="Type language or church name"
              ></v-combobox>
            </v-flex>
          </v-layout>
        </v-toolbar>
      </template>
      <template v-slot:item="props">
        <v-flex xs12 sm6 lg4>
          <v-card class="pa-1 ma-0" dark color="secondary">
            <v-card-title primary-title>
              <v-layout row wrap justify-space-between>
                <v-flex xs8>
                  <span
                    v-if="(props.item.Name.length > 45 && props.item.ChurchAbbreviation.length > 0)"
                  >{{ props.item.ChurchAbbreviation }}</span>
                  <span v-else>{{ props.item.Name }}</span>
                </v-flex>
                <v-flex xs4>
                  <v-btn
                    light
                    color="secondary lighten-2"
                    class="caption black--text"
                    @click.stop="onViewChurch(props.item)"
                  >Contacts</v-btn>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small icon @click="props.expanded = !props.expanded">
                <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card
                class="ma-2 elevation-0"
                dark
                color="secondary darken-1"
                v-if="props.expanded == true"
              >
                <v-card-text>
                  <span class>Congregations</span>

                  <ul>
                    <li
                      class="caption grey--text"
                      v-for="i in props.item.CongregationArray"
                      :key="i"
                    >{{ i }}</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
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
      search: "",
      expand: false,
      rowsPerPageItems: [6, 18, 54],

      pagination: {
        rowsPerPage: 6
      },
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
