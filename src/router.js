import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",

      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/Dashboard.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/About.vue")
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
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/ChurchAdmin.vue")
    },
    {
      path: "/churches",
      name: "churches",
      props: true,
      beforeEnter: (to, from, next) => {
        if (store.state.AccessToken) {
          next();
        } else {
          next({ name: "home" });
        }
      },
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/Churches.vue")
    }
  ]
});
