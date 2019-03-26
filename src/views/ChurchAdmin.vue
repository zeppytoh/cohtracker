<template>
  <v-container class="ma-3 mx-3">
    <contacts-list :contacts="contacts"/>
    <filter-drawer/>
  </v-container>
</template>


<script>
import ContactsList from "@/components/ContactsList";
import FilterDrawer from "@/components/FilterDrawer";
import XLSX from "xlsx";

import { mapActions, mapState } from "vuex";

export default {
  name: "ChurchAdmin",
  components: {
    ContactsList,
    FilterDrawer
  },
  computed: {
    ...mapState(["Church", "loading", "believerStatus"])
  },
  data() {
    return {
      contacts: []
    };
  },
  props: ["postcode"],
  created() {
    const data = this.postcode || this.Church.Postcode;
    this.fetchContacts(data)
      .then(res => {
        this.contacts = res;
        this.setLoading(false);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
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
</style>