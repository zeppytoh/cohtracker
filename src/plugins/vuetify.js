import Vue from "vue";
import Vuetify, { VExpansionPanel, VLayout } from "vuetify/lib";
import "@/stylus/main.styl";

// Vue.use(Vuetify, {
//   theme: {
//     primary: '#ee44aa',
//     secondary: '#424242',
//     accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107'
//   },
//   options: {
//     customProperties: true
//   },
//   iconfont: 'md',
// })

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
