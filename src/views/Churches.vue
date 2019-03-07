<template>
  <v-container fluid grid-list-xl class="my-2">
    <v-layout row wrap>
      <v-flex class="pa-2" lg8 sm6 xs12>
        <churches/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Churches from "@/components/Churches";

export default {
  data() {
    return {};
  },
  components: {
    Churches
  }
};
</script>

<style>
</style>
