import axios from "axios";
import Vue from "vue";

const instance = axios.create({
  baseURL:
    "https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/"
  // headers: {
  //   "APIKey": "f912f198-e443-11e8-a9c5-89e884cb2e41",
  //   "Content-Type": "application/json",
  //   "Accept": "application/json"
  // }
});
// Vue.use(require('axios'))

export default instance;
