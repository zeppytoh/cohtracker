import Vue from "vue";
import './plugins/vuetify'
import './plugins/vuetify'
import "./plugins/axios";
import "./plugins/vuetify";
import { sync } from "vuex-router-sync";

import App from "@/App";
import router from "@/router";
import store from "@/store";

sync(store, router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
