<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">Login</v-btn>
    <v-card class="pa-3">
      <v-card-title>
        <h2>Login to Celebration of Hope Tracker</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            @click:append="show = !show"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat>Sign-up</v-btn>
        <v-btn class="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      name: "",
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  }
};
</script>

<style>
</style>
