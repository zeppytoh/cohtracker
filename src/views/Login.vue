<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <Login/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Login from "@/components/Login";
export default {
  components: {
    Login
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style>
</style>
