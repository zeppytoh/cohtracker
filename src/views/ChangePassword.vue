<template>
  <v-content class="contentGradient">
    <div id="login">
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="static/COH_Eng_Brand-300.png" alt="Celebration of Hope" width="180">
                  <h1 class="flex my-4 grey--text">Password Change</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Type again"
                    id="password2"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="flex"
                  color="primary"
                  @click="onPasswordChange"
                  :loading="loading"
                >Change</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-content>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    ...mapMutations(["setSnack"]),

    onPasswordChange() {
      this.setSnack("Password cannot be changed at the moment");
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
