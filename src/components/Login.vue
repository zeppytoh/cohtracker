<template>
  <v-card class="elevation-3">
    <v-toolbar dark flat color="secondary">
      <v-toolbar-title>Sign in</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          prepend-icon="person"
          name="username"
          label="Username"
          type="username"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          name="password"
          label="Password"
          id="password"
          type="password"
          required
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-3">
      <span v-if="feedback">{{ feedback }}</span>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click.prevent.stop="submit" @keyup="submit">submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      feedback: null,
      username: "dillon@cru.org.sg",
      password: "469717",

      user: [],
      errors: []
    };
  },
  mounted() {
    this.feedback = null;
  },
  methods: {
    ...mapActions(["authUser"]),
    submit() {
      this.feedback = "Checking credentials...";
      this.authUser({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style>
</style>
