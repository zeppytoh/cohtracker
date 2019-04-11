import Vue from "vue";
import Vuetify, { VLayout } from "vuetify/lib";
import "@/stylus/main.styl";
import theme from "@/theme";
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
    VLayout
  },
  theme,
  options: {
    customProperties: true
  },
  iconfont: "md"
});
