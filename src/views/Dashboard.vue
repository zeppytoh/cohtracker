<template>
  <v-content class="contentGradient">
    <router-view/>
  </v-content>
</template>

<script>
import XLSX from "xlsx";

import { mapActions, mapState } from "vuex";

export default {
  name: "Dashboard",
  components: {},
  computed: {
    ...mapState(["Church", "loading", "believerStatus"])
  },
  data() {
    return {
      contacts: []
    };
  },
  props: ["postcode"],
  created() {},
  methods: {
    ...mapActions(["fetchContacts"]),
    onExport() {
      let contactsWS = XLSX.utils.json_to_sheet(this.contacts);
      let wb = XLSX.utils.book_new(); // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, contactsWS, "contacts");
      // add Worksheet to Workbook
      XLSX.writeFile(wb, "book.xlsx"); // name of the file is 'book.xlsx'
    }
  }
};
</script>

<style scoped>
.contentGradient {
  background-image: linear-gradient(
    to bottom,
    var(--v-accent-base),
    var(--v-secondary-base)
  );
}
</style>