import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Login from "./views/Login";
import ChangePassword from "./views/Example";

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
        {
          path: "",
          name: "dashboard",

          components: {
            default: () => import("./components/Churches")
          },
          props: { default: true },
          beforeEnter: (to, from, next) => {
            if (store.state.AccessToken) {
              store.commit("setLoading", true);
              if (store.state.Role == "super-admin") {
                store
                  .dispatch("fetchChurches")
                  .then(res => {
                    console.log(res);
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
                next("/dashboard/contacts/");
              }
            } else next(false);
          }
        },
        {
          path: "contacts/:churchid?",
          components: {
            default: () => import("./components/Contacts")
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
      component: ChangePassword
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
router.afterEach(() => {
  console.log("Route after each");
  store.commit("setLoading", false);
});
export default router;
