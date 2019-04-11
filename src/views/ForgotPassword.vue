<template>
  <v-content class="contentGradient">
    <div class="changepassword">
      <v-form>
        <v-container fluid fill-height>
          <v-layout justify-center>
            <v-flex xs12 sm8 md6 lg4>
              <v-card class="elevation-1 pa-3">
                <v-card-text>
                  <div class="layout column align-center">
                    <img src="static/COH_Eng_Brand-300.png" alt="Celebration of Hope" width="180">
                    <h1 class="flex my-4 grey--text">Enter your Username</h1>
                    <p
                      class="flex grey--text"
                    >A new password will be sent to your email address with further instructions.</p>
                  </div>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      clearable
                      prepend-icon="person"
                      label="User Name*"
                      v-model="username"
                      @input="$v.username.$touch()"
                      @blur="$v.username.$touch()"
                      required
                      :error-messages="nameErrors"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="$v.$invalid"
                        color="primary"
                        @click.prevent="onSubmit"
                        :loading="loading"
                      >Reset Password</v-btn>
                      <v-btn color="secondary" @click.prevent="onCancel">Cancel</v-btn>
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
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  mixins: [validationMixin],
  data() {
    return {
      username: ""
    };
  },
  validations: {
    username: {
      required,
      email
    }
  },
  computed: {
    ...mapState(["loading"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required &&
        errors.push("Please enter a valid username");
      !this.$v.username.email &&
        errors.push("Username must be a valid email address");
      return errors;
    }
  },
  methods: {
    ...mapActions(["resetPassword"]),
    onSubmit() {
      const payload = {
        UserName: this.username
      };
      //call the API

      this.resetPassword(payload)
        .then(res => {
          //successfully reset'
          console.log(res);
          this.$router.replace("/");
        })
        .catch(error => {
          console.log(error);
          this.onClear();
        });
    },
    onCancel() {
      console.log("Cancel clicked");
      this.$router.replace("/");
    },
    onClear() {
      this.$v.$reset();
      this.username = "";
    }
  }
};
</script>

<style>
.changepassword {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>


