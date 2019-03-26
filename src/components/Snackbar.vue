<template>
  <v-snackbar bottom vertical v-model="show" :timeout="3000" :color="color">
    {{ snack }}
    <v-btn flat @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      show: false,
      message: ""
    };
  },
  computed: {
    ...mapState(["snack", "color"])
  },
  methods: {
    ...mapMutations(["setSnack", "setColor"])
  },
  watch: {
    snack() {
      const msg = this.snack;
      if (msg !== "") {
        this.setColor("secondary");
        this.message = msg;
        this.show = true;
      }
    },
    show() {
      if (this.show === false) {
        this.setSnack("");
      }
    }
  }
};
</script>

<style scoped>
</style>