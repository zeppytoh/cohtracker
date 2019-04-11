<template>
  <v-content class="contentGradient">
    <div id="login">
      <v-form>
        <v-container fluid fill-height>
          <v-layout justify-center>
            <v-flex xs12 sm8 md6 lg4>
              <v-card class="elevation-1 pa-3">
                <v-card-text>
                  <div class="layout column align-center">
                    <img src="static/COH_Eng_Brand-300.png" alt="Celebration of Hope" width="180">
                    <h1 class="flex my-4 grey--text">Gather Login</h1>
                  </div>
                </v-card-text>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      clearable
                      prepend-icon="person"
                      :error-messages="nameerror"
                      name="login"
                      label="Username"
                      type="text"
                      v-model="username"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      prepend-icon="lock"
                      :error-messages="passworderror"
                      name="password"
                      label="Password"
                      id="password"
                      :type="showpassword ? 'text' : 'password'"
                      v-model="password"
                      :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                      @click:append="showpassword = !showpassword"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-card-actions>
                      <v-btn color="primary" flat router to="/forgotpassword">Forgot password</v-btn>

                      <v-spacer></v-spacer>
                      <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </v-content>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    nameerror: "",
    passworderror: "",
    showpassword: false
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
      })
        .then(res => {
          this.$router.replace("dashboard");
        })
        .catch((error, res) => {
          this.nameerror = "Please check your name";
          this.passworderror = "Please check your password";
          console.log("Error In Login,vue");
          console.log(error);
          console.log(res);
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
