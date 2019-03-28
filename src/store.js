import Vue from "vue";
import Vuex from "vuex";
import { set, toggle } from "@/utils/vuex";

import cohservice from "@/services/cohservice.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    AccessToken: null,
    Role: null,
    FullName: null, // logged-in user FullName
    Church: null, // object for current church
    Contacts: null, // list of contacts for current church
    Churches: null, // list of church or churches that admin can access
    ageGroups: {
      A: "6 yo and below",

      B: "7-12 yo",
      C: "13-16 yo",
      D: "17-25 yo",
      E: "26-35 yo",
      F: "36-49 yo",
      G: "50 yo and above"
    },
    rallyTime: {
      A: "Friday, 17 May 7:30PM (English)",
      B: "Saturday, 18 May 10:30AM (Children & Families)",
      C: "Saturday, 18 May 7:30PM (Chinese)",
      D: "Saturday, 18 May 7:30PM (Tamil)",
      E: "Sunday, 19 May 10:30AM (Filipino/English)",
      F: "Sunday, 19 May 2:00PM (Hindi)",
      G: "Sunday, 19 May 7:30PM (English)"
    },
    ageGroupsMap: new Map([
      ["A", "6 yo and below"],
      ["B", "7-12 yo"],
      ["C", "13-16 yo"],
      ["D", "17-25 yo"],
      ["E", "26-35 yo"],
      ["F", "36-49 yo"],
      ["G", "50 yo and above"]
    ]),
    believerStatus: {
      "1": { text: "pending", color: "warning lighten-1" },
      "2": { text: "contacted", color: "success darken-1" },
      "3": { text: "missing", color: "grey lighten-1" },
      "4": { text: "reassign", color: "primary lighten-2" }
    },
    decisionText: {
      A: "Prayed and received Christ",
      B: "Rededicated",
      C: "Interested",
      D: "Like to join church"
    },
    drawer: null,
    drawerRight: null,
    isMobile: false,
    loading: false,
    snack: "",
    color: "success",
    image:
      "https://celebrationofhope.sg/wp-content/uploads/revslider/home-1-slider/brand-image-copy.jpg"
  },
  mutations: {
    authUser(state, userData) {
      state.AccessToken = userData.token;
      state.Role = userData.role;
      state.FullName = userData.name;
      state.Church = userData.church;
    },
    clearAuthData(state) {
      state.AccessToken = null;
      state.Role = null;
      state.FullName = null;
      state.Church = null;
    },
    setContacts(state, payload) {
      state.Contacts = payload;
    },
    setChurches(state, payload) {
      state.Churches = payload;
    },
    updateContact(state, contact) {
      this.getters.getContactById(contact.RandomID).BelieverStatus =
        contact.BelieverStatus;
    },
    setChurch(state, payload) {
      state.Church = payload;
    },
    setDrawer: set("drawer"),
    setDrawerRight: set("drawerRight"),
    toggleDrawerRight: toggle("drawerRight"),
    setImage: set("image"),
    setColor: set("color"),
    setSnack: set("snack"),
    setLoading: set("loading"),
    setMobile: set("isMobile"),
    toggleDrawer: toggle("drawer"),
    toggleLoading: toggle("loading"),
    toggleSnack: toggle("snack")
  },
  actions: {
    setLogoutTimer({ dispatch }, expireTime) {
      setTimeout(() => {
        dispatch("logout");
      }, expireTime * 1000);
    },
    authUser({ commit, dispatch }, authData) {
      commit("setLoading", true);
      commit("setSnack", "Authenticating User");
      return cohservice
        .authUser(authData)
        .then(res => {
          console.log(res);
          const stateData = {
            token: res.data.AccessToken,
            role: res.data.Role,
            name: res.data.FullName,
            church: res.data.Church
          };
          commit("authUser", stateData);
          commit("setLoading", false);
          commit("setSnack", "User Authenticated");

          const now = new Date();
          const expireDate = new Date(now.getTime() + 3600000);
          localStorage.setItem("token", res.data.AccessToken);
          localStorage.setItem("role", res.data.Role);
          localStorage.setItem("name", res.data.FullName);
          localStorage.setItem("church", JSON.stringify(res.data.Church));
          localStorage.setItem("expireDate", expireDate);
          dispatch("setLogoutTimer", 3600);
        })
        .catch(error => console.log(error));
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("AutoLogin failed");
        return false;
      } else {
        const expireDate = localStorage.getItem("expireDate");
        const now = new Date();
        if (now >= expireDate) {
          console.log("AutoLogin session has expired");
          localStorage.clear();

          return false;
        } else {
          const data = {
            token: token,
            role: localStorage.getItem("role"),
            name: localStorage.getItem("name"),
            church: JSON.parse(localStorage.getItem("church"))
          };
          console.log("tryAutoLogin valid token found");

          commit("authUser", data);
          return true;
        }
      }
    },
    setChurch({ commit }, payload) {
      commit("setChurch", payload);
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.clear();

      commit("setSnack", "Logging out");
    },
    updateContact({ commit, state }, payload) {
      const data = {
        AccessToken: state.AccessToken,
        BelieverID: payload.BelieverID,
        ChurchID: payload.ChurchID,
        BelieverStatus: payload.BelieverStatus,
        ChangeLog: payload.ChangeLog
      };
      console.log(data);
      cohservice
        .updateContact(data)
        .then(res => {
          console.log(res);
          // commit("updateContact", data);
          commit("setSnack", "Contact Saved");
        })
        .catch(error => console.log(error));
    },
    fetchContact({ state }, payload) {
      console.log(payload);
      const data = {
        AccessToken: state.AccessToken,
        BelieverID: payload
      };
      return cohservice
        .fetchContact(data)
        .then(res => {
          console.log("In Fetch Contact (History)", res.data);
          return res.data;
        })
        .catch(error => console.log(error));
    },
    fetchContacts({ commit, state }, churchid) {
      var data = "";
      console.log(churchid);
      if (!state.AccessToken) {
        return;
      } else {
        if (state.Role === "church-admin") {
          data = {
            AccessToken: state.AccessToken
          };
        } else {
          // is super-admin
          data = {
            AccessToken: state.AccessToken,
            ChurchID: churchid
          };
          console.log("Super-admin fetching contacts");
        }
        return cohservice
          .fetchContacts(data)
          .then(res => {
            console.log("In Fetch Contacts service", res.data);
            const data = res.data;
            const contacts = [];
            for (let key in data) {
              const contact = data[key];
              contact.id = key;
              contacts.push(contact);
            }
            commit("setContacts", contacts);
            return res;
          })
          .catch(error => console.log(error));
      }
    },
    fetchChurches({ state, commit }) {
      if (state.AccessToken) {
        return cohservice
          .fetchChurches({ AccessToken: state.AccessToken })
          .then(res => {
            console.log("In Fetch Churches", res.data);
            const data = res.data;
            const churches = [];
            for (let key in data) {
              const church = data[key];
              church.id = key;
              churches.push(church);
            }
            commit("setChurches", churches);
            return churches;
          })
          .catch(error => console.log(error));
      }
    }
  },
  getters: {
    AccessToken(state) {
      return state.AccessToken;
    },
    Church(state) {
      return state.Church;
    },
    Role(state) {
      return state.Role;
    },
    isAuthenticated(state) {
      return state.AccessToken !== null;
    },
    Contacts(state) {
      return state.Contacts;
    },

    FullName: state => state.FullName
    // getContactById: (state, id) => {
    //   return _.findWhere(state.Contacts, { id: id });
    // }
  }
});
