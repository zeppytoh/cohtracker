import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Login from "./views/Login";

Vue.use(VueRouter);

const router = new VueRouter({
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
        // Churches
        {
          path: "",
          name: "dashboard",
          components: {
            default: () =>
              import(/* webpackChunkName: "routes" */ "./components/Churches")
          },
          props: { default: true },
          beforeEnter: (to, from, next) => {
            if (store.state.AccessToken) {
              store.commit("setLoading", true);
              if (store.state.Role == "super-admin") {
                store
                  .dispatch("fetchChurches")
                  .then(res => {
                    store.commit("setLoading", false);

                    next();
                  })
                  .catch(error => {
                    console.log(
                      "There was an error in fetchChurches:",
                      error.response
                    );
                  });
              } else if (store.state.Role == "church-admin") {
                store.commit("setLoading", false);
                // next("/dashboard/contacts/");
                store
                  .dispatch("fetchChurches")
                  .then(res => {
                    store.commit("setLoading", false);

                    next();
                  })
                  .catch(error => {
                    console.log(
                      "There was an error in fetchChurches:",
                      error.response
                    );
                  });
              }
            } else next(false);
          }
        },
        // Churches - Completed
        {
          path: "churches/completed/",
          components: {
            default: () =>
              import(/* webpackChunkName: "routes" */ "./components/churches/ChurchesCompleted")
          },
          props: { default: true },
          beforeEnter: (to, from, next) => {
            if (store.state.AccessToken) {
              store.commit("setLoading", true);
              if (store.state.Role == "super-admin") {
                store
                  .dispatch("fetchChurchesCompleted")
                  .then(res => {
                    store.commit("setLoading", false);

                    next();
                  })
                  .catch(error => {
                    console.log(
                      "There was an error in fetchChurches:",
                      error.response
                    );
                  });
              }
            } else next(false);
          }
        },
        // Churches - Pending
        {
          path: "churches/pending/",
          components: {
            default: () =>
              import(/* webpackChunkName: "routes" */ "./components/churches/ChurchesPending")
          },
          props: { default: true },
          beforeEnter: (to, from, next) => {
            if (store.state.AccessToken) {
              store.commit("setLoading", true);
              if (store.state.Role == "super-admin") {
                store
                  .dispatch("fetchChurchesPending")
                  .then(res => {
                    store.commit("setLoading", false);

                    next();
                  })
                  .catch(error => {
                    console.log(
                      "There was an error in fetchChurches:",
                      error.response
                    );
                  });
              }
            } else next(false);
          }
        },
        // Inquirers
        {
          path: "contacts/:churchid?",
          components: {
            default: () =>
              import(/* webpackChunkName: "routes" */ "./components/Contacts")
          },
          props: { default: true },
          beforeEnter: (to, from, next) => {
            if (store.state.AccessToken) {
              store.commit("setLoading", true);
              store
                .dispatch("fetchContacts", to.params.churchid)
                .then(res => {
                  store.commit("setContacts", res.data);
                  next();
                })
                .catch(error => {
                  console.log(
                    "There was an error in fetchContacts:",
                    error.response
                  );
                  next(false);
                });
            } else {
              next(false);
            }
          }
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
      path: "/changepassword",
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/Example.vue")
    },
    {
      path: "/forgotpassword",
      component: () =>
        import(/* webpackChunkName: "routes" */ "./views/ForgotPassword.vue")
    }
  ]
});
router.afterEach(() => {
  console.log("Route after each");
  store.commit("setLoading", false);
});
export default router;
