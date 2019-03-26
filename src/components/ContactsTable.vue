<template>
  <div>
    <v-toolbar dark color="secondary">
      <v-toolbar-title class="white--text">Contacts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchTerm"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn hidden-sm-and-up color="primary" icon small @click.prevent="onToggleFilter">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout v-resize="onResize" column>
      <v-data-table
        :headers="headers"
        :items="contacts"
        :search="searchTerm"
        :filter="filterMultiple"
        :custom-filter="filterContacts"
        :pagination.sync="pagination"
        :hide-headers="isMobile"
        :class="{mobile: isMobile}"
      >
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile">
            <td>{{ props.item.FirstName }}&nbsp;{{ props.item.LastName }}</td>
            <td class="text-xs-right">{{ props.item.Gender }}</td>
            <td class="text-xs-right">{{ props.item.MobileNumber }}</td>
            <td class="text-xs-right">{{ believerStatus[props.item.BelieverStatus].text }}</td>
            <td class="text-xs-right">
              <v-btn color="success">Edit</v-btn>
            </td>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li
                  class="flex-item"
                  data-label="Name"
                >{{ props.item.FirstName }}&nbsp;{{ props.item.LastName }}</li>
                <li class="flex-item" data-label="Gender">{{ props.item.Gender }}</li>
                <li class="flex-item" data-label="Mobile">{{ props.item.MobileNumber }}</li>
                <li
                  class="flex-item"
                  data-label="Status"
                >{{ believerStatus[props.item.BelieverStatus].text }}</li>
                <li class="flex-item" data-label="More">
                  <v-btn color="success">Edit</v-btn>
                </li>
              </ul>
            </td>
          </tr>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["postcode"],
  query: {
    language: "Tagalog",
    status: "",
    decision: ""
  },
  computed: {
    ...mapState([
      "loading",
      "Church",
      "FullName",
      "ageGroups",
      "ageGroupsMap",
      "believerStatus",
      "decisionText"
    ])
  },
  data: () => ({
    contacts: [],
    filterDrawer: false,
    pagination: {
      sortBy: "name",
      rowsPerPage: -1
    },
    selected: [],
    search: "",
    searchTerm: null,

    isMobile: false,
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      {
        text: "Gender",
        value: "gender"
      },
      {
        text: "Mobile",
        value: "mobile"
      },
      {
        text: "Status",
        value: "status"
      },

      {
        text: "More",
        value: "more"
      }
    ]
  }),
  created() {
    const data = this.postcode;
    console.log(this.postcode);
    this.fetchContacts(data)
      .then(res => {
        this.contacts = res;
        this.setLoading(false);
      })
      .catch(error => {
        console.log("There was an error fetching Contacts:", error.response);
      });
  },
  watch: {
    $route(to, from) {
      this.searchTerm = to.query;
    }
  },
  methods: {
    ...mapActions(["updateContact", "fetchContacts"]),
    ...mapMutations(["setDrawerRight"]),
    onToggleFilter() {
      this.setDrawerRight(!this.$store.state.drawerRight);
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
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.contacts.slice();
    },
    changeSort(column) {
      console.log(column);
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style scoped>
.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}
</style>