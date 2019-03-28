<template>
  <v-navigation-drawer fixed v-model="show" class="contentGradient" right clipped app>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-radio-group
          class="caption grey--text"
          label="Language"
          v-model="languageFilterValue"
          column
        >
          <div v-for="item in languageFilter" :key="item.name">
            <v-radio :label="item.name" :value="item.value" color="secondary"></v-radio>
          </div>
        </v-radio-group>
        <v-divider></v-divider>
        <v-radio-group class="caption grey--text" label="Status" v-model="statusFilterValue" column>
          <div v-for="item in statusFilter" :key="item.name">
            <v-radio :label="item.name" :value="item.value" color="secondary"></v-radio>
          </div>
        </v-radio-group>
        <v-divider></v-divider>
        <v-radio-group label="Decision" v-model="decisionFilterValue" column>
          <div v-for="item in decisionFilter" :key="item.name">
            <v-radio :label="item.name" :value="item.value" color="secondary"></v-radio>
          </div>
        </v-radio-group>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    languageFilter: [
      { name: "English", value: "English" },
      { name: "Mandarin", value: "Mandarin" },
      { name: "Tamil", value: "Tamil" },
      { name: "Indonesian", value: "Indonesian" },
      { name: "Hindi", value: "Hindi" },
      { name: "Tagalog", value: "Tagalog" },
      { name: "Children", value: "Children" },
      { name: "All", value: null }
    ],
    statusFilter: [
      { name: "Pending", value: "1" },
      { name: "Contacted", value: "2" },
      { name: "Missing", value: "3" },
      { name: "Reassign", value: "4" },
      { name: "All", value: null }
    ],
    decisionFilter: [
      { name: "PRC", value: "A" },
      { name: "Rededicated", value: "B" },
      { name: "Interested", value: "C" },
      { name: "Like to join a church", value: "D" },
      { name: "Others", value: "E" },
      { name: "All", value: null }
    ],
    statusFilterValue: null,
    languageFilterValue: null,
    decisionFilterValue: null
  }),
  computed: {
    ...mapState(["drawerRight"]),
    show: {
      get() {
        return this.drawerRight;
      },
      set(val) {
        this.setDrawerRight(val);
      }
    }
  },
  watch: {
    $route(to) {
      this.searchTerm = to.query;
    },
    languageFilterValue: function() {
      this.refreshContacts();
    },
    statusFilterValue: function() {
      this.refreshContacts();
    },
    decisionFilterValue: function() {
      this.refreshContacts();
    }
  },
  methods: {
    ...mapMutations(["setDrawerRight", "toggleDrawerRight"]),

    refreshContacts() {
      this.$router.push({
        path: this.$router.path,
        query: {
          language: this.languageFilterValue,
          status: this.statusFilterValue,
          decision: this.decisionFilterValue
        }
      });
    }
  }
};
</script>

<style scoped>
.contentGradient {
  background-image: linear-gradient(
    to bottom,
    var(--v-accent-base),
    var(--v-secondary-lighten1)
  );
}
</style>