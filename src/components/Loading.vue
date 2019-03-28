<template>
  <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
    <v-container fill-height>
      <v-layout row justify-center align-center>
        <v-progress-circular indeterminate :size="50" :width="4" color="accent"></v-progress-circular>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["loading"])
  }
};
</script>

<style scoped>
</style>