import Vue from "vue";
import Vuetify, { VExpansionPanel, VLayout } from "vuetify/lib";
import "@/stylus/main.styl";

Vue.use(Vuetify, {
  components: {
    VExpansionPanel,
    VLayout
  },
  theme: {
    primary: "#F26A1B",
    secondary: "#5C73B9",
    accent: "#C4E4DE",
    error: "#FF5252",
    info: "#394464",
    success: "#D4F4EE",
    warning: "#BF1F2C"
  },
  options: {
    customProperties: true
  },
  iconfont: "md"
});
