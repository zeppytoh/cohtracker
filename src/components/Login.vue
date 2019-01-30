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
      <v-btn color="primary" :disabled="!valid" @click.prevent.stop="submit">submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "@/axios-auth";
export default {
  data() {
    return {
      valid: false,
      feedback: null,
      username: null,
      password: null,

      user: [],
      errors: []
    };
  },
  mounted() {
    this.feedback = null;
  },
  methods: {
    submit() {
      this.feedback = "Checking credentials...";
      axios
        .post("/login", {
          UserName: this.username,
          Password: this.password
        })
        .then(res => {
          this.user = res.data;
          this.feedback = "User loaded!";
          if (this.user["Role"] === "super-admin") {
            this.$router.push({
              name: "churches",
              params: { user: this.user }
            });
          } else {
            this.$router.push({
              name: "believers",
              // params: { accessToken: this.user["AccessToken"] }
              params: { user: this.user }
            });
          }
        })
        .catch(error => {
          this.feedback = "You entered a wrong username / password";
          this.errors.push(error);
        });
    }
  }
};
</script>

<style>
</style>
