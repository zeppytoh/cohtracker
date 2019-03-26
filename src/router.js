import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Login from "./views/Login.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",

      component: Login
    },
    {
      path: "/dashboard",
      props: true,
      component: () => import("./views/Dashboard.vue"),
      children: [
        {
          path: "",
          name: "dashboard",

          components: {
            default: () => import("./components/Churches")
          }
        },
        {
          path: "contacts/:churchid?",
          components: {
            default: () => import("./components/Contacts")
          },
          props: { default: true }
        },
        {
          path: "contacts/history/:id?",
          props: { default: true },
          components: {
            default: () => import("./components/Contact")
          }
        }
      ]
    },

    {
      path: "/churchadmin/:postcode?",
      name: "churchadmin",
      props: true,
      beforeEnter: (to, from, next) => {
        if (store.state.AccessToken) {
          console.log("about to route");
          next();
        } else {
          next({ name: "home" });
        }
      },
      component: () => {
        import(/* webpackChunkName: "routes" */ "./views/ChurchAdmin.vue");
      }
    }
  ]
});
