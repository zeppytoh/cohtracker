import Vue from "vue";
import "./plugins";
import { sync } from "vuex-router-sync";
import "./components";

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
