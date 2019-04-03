<template>
  <v-content class="contentGradient">
    <form action>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs8 md4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="static/COH_Eng_Brand-300.png" alt="Celebration of Hope" width="180">
                  <h1 class="flex my-4 grey--text">Change Password</h1>
                </div>
              </v-card-text>
              <v-flex xs12>
                <v-text-field
                  label="Current Password*"
                  v-model="currpwd"
                  @input="$v.currpwd.$touch()"
                  @blur="$v.currpwd.$touch()"
                  :type="showcurrpwd ? 'text' : 'password'"
                  :append-icon="showcurrpwd ? 'visibility' : 'visibility_off'"
                  @click:append="showcurrpwd = !showcurrpwd"
                  required
                  :error-messages="currpwdErrors"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="New Password*"
                  v-model="newpwd"
                  hint="At least 6 characters"
                  min="6"
                  :error-messages="newpwdErrors"
                  @input="$v.newpwd.$touch()"
                  @blur="$v.newpwd.$touch()"
                  @click:append="showpassword = !showpassword"
                  :type="showpassword ? 'text' : 'password'"
                  :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Confirm New Password*"
                  hint="Passwords must match"
                  v-model="repeatnewpwd"
                  @input="$v.repeatnewpwd.$touch()"
                  @blur="$v.repeatnewpwd.$touch()"
                  :type="showpassword ? 'text' : 'password'"
                  :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                  @click:append="showpassword = !showpassword"
                  required
                  :error-messages="passwordErrors"
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
                  >Change password</v-btn>
                  <v-btn color="secondary" @click.prevent="onCancel" :loading="loading">Cancel</v-btn>
                </v-card-actions>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </v-content>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  mixins: [validationMixin],
  data() {
    return {
      currpwd: "",
      newpwd: "",
      repeatnewpwd: "",
      showpassword: false,
      showcurrpwd: false
    };
  },
  validations: {
    currpwd: {
      required
    },
    newpwd: {
      required,
      minLength: minLength(6)
    },
    repeatnewpwd: {
      sameAsPassword: sameAs("newpwd")
    }
  },
  computed: {
    ...mapState(["loading"]),
    passwordErrors() {
      const errors = [];
      if (!this.$v.repeatnewpwd.$dirty) return errors;
      !this.$v.repeatnewpwd.sameAsPassword &&
        errors.push("Passwords must match");
      return errors;
    },
    currpwdErrors() {
      const errors = [];
      if (!this.$v.currpwd.$dirty) return errors;
      !this.$v.currpwd.required && errors.push("Current password is required");

      return errors;
    },
    newpwdErrors() {
      const errors = [];
      if (!this.$v.newpwd.$dirty) return errors;
      !this.$v.newpwd.required && errors.push("You must enter a new password");
      return errors;
    }
  },
  methods: {
    ...mapActions(["changePassword"]),
    onSubmit() {
      const payload = {
        OldPassword: this.currpwd,
        NewPassword: this.newpwd
      };
      //call the API

      this.changePassword(payload)
        .then(res => {
          //successfully changed'
          console.log(res);
          this.$router.replace("dashboard");
        })
        .catch(error => {
          console.log(error);
          this.onClear();
        });
    },
    onCancel() {
      this.$router.replace("dashboard");
    },
    onClear() {
      this.$v.$reset();
      this.currpwd = "";
      this.newpwd = "";
      this.repeatnewpwd = "";
    }
  }
};
</script>


