<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <h3>Celebration of Hope</h3>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
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
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <span>{{feedback}}</span>
            <v-spacer></v-spacer>
            <v-btn color="secondary" :disabled="!valid" @click.prevent.stop="submit">Proceed</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      valid: false,
      feedback: "",
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ],
      user: [],
      errors: []
    };
  },

  methods: {
    submit() {
      this.feedback = "Checking credentials...";
      axios
        .post(
          "https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/login",
          {
            UserName: this.email,
            Password: this.password
          }
        )
        .then(res => {
          this.user = res.data;
          this.feedback = "User loaded!";
        })
        .catch(error => this.errors.push(error));
    }
  }
};
</script>

<style>
</style>
