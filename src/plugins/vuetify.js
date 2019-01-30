import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '../stylus/main.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#F26A1B',
    secondary: '#5C73B9',
    accent: '#D4F4EE',
    error: '#FF5252',
    info: '#394464',
    success: '#D4F4EE',
    warning: '#BF1F2C'
  },
  iconfont: 'md',
  options: {
    customProperties: true
  }
})
