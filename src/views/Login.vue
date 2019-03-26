<template>
  <div id="login">
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img src="static/COH_Eng_Brand-300.png" alt="Celebration of Hope" width="180">
                <h1 class="flex my-4 grey--text">Gather Login</h1>
              </div>
              <v-form>
                <v-text-field
                  append-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  append-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <p class="flex primary--text">Forgot password</p>
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    username: "pohlian@bbtc.com.sg",
    password: "469717"
  }),
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    ...mapActions(["authUser"]),
    login() {
      this.authUser({
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res);
        this.$router.replace("dashboard");
      });
    }
  }
};
</script>
<style scoped lang="scss">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
