import Vue from "vue";
import Vuex from "vuex";
import { set, toggle } from "@/utils/vuex";

import cohservice from "@/services/cohservice.js";
import router from "@/router.js";

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
      A: "6 years old and below",
      B: "7-12 years old",
      C: "13-16 years old",
      D: "17-25 years old",
      E: "26-35 years old",
      F: "36-49 years old",
      G: "50-64 years old",
      H: "65 years old and above"
    },
    rallyTime: {
      A: "Friday, 17 May 7:30PM (English)",
      B: "Saturday, 18 May 10:30AM (Children & Families)",
      C: "Saturday, 18 May 7:30PM (Chinese)",
      D: "Saturday, 18 May 7:30PM (Tamil)",
      E: "Sunday, 19 May 10:30AM (Filipino/English)",
      F: "Sunday, 19 May 2:00PM (Hindi)",
      G: "Sunday, 19 May 7:30PM (English)",
      H: "None"
    },
    believerStatus: {
      "0": { text: "unassigned", color: "primary darken-1" },
      "1": { text: "pending", color: "warning lighten-1" },
      "2": { text: "contacted", color: "success darken-1" },
      "3": { text: "unreachable", color: "grey lighten-1" },
      "4": { text: "reassign", color: "primary lighten-1" }
    },
    decisionText: {
      A: "Prayed and received Christ",
      B: "Rededicated",
      C: "Interested",
      D: "Like to join church",
      E: "Other"
    },
    drawer: null,
    drawerRight: null,
    isMobile: false,
    loading: false,
    snack: "",
    color: "success",
    image:
      "static/brand-image-copy.jpg"
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
    resetPassword({ commit }, payload) {
      commit("setLoading", true);
      commit("setSnack", "Checking if that is a valid username");

      return cohservice
        .resetPassword(payload)
        .then(res => {
          commit(
            "setSnack",
            "Instructions to reset your password have been sent to your email"
          );
          return res;
        })
        .catch(error => {
          commit(
            "setSnack",
            "Sorry, that is not a valid username. Perhaps check your typing?"
          );
          return error;
        });
    },
    changePassword({ commit, state }, payload) {
      commit("setLoading", true);
      commit("setSnack", "Changing Password");
      const data = {
        AccessToken: state.AccessToken,
        OldPassword: payload.OldPassword,
        NewPassword: payload.NewPassword
      };
      return cohservice
        .changePassword(data)
        .then(res => {
          commit("setSnack", "Password Changed");
          return res;
        })
        .catch(error => {
          commit("setSnack", "Error: Password could not be changed");
          return error;
        });
    },
    authUser({ commit, dispatch }, authData) {
      commit("setLoading", true);
      commit("setSnack", "Authenticating User");
      return cohservice
        .authUser(authData)
        .then(res => {
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
          return res;
        })
        .catch(err => {
          commit("setLoading", false);
          commit(
            "setSnack",
            "Failed to login. Check your password or username"
          );

          return err;
        });
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
      router.push({path: "/"});
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
    setSnackMessage({ commit }, message) {
      commit("setSnack", message);
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
            const data = res.data;
            const churches = [];
            function add(accumulator, a) {
              return accumulator + a;
            }
            for (let key in data) {
              const church = data[key];
              church.id = key;
              church.TotalLeaders = [
                church.EnglishLeaderSize,
                church.FilipinoLeaderSize,
                church.HindiLeaderSize,
                church.IndonesianLeaderSize,
                church.MandarinLeaderSize,
                church.TamilLeaderSize,
                church.ChildrenLeaderSize
              ].reduce(add);
              church.TotalEnquirers = [
                church.Stat.StatusOneCount,
                church.Stat.StatusTwoCount,
                church.Stat.StatusThreeCount,
                church.Stat.StatusFourCount
              ].reduce(add);
              churches.push(church);
            }
            commit("setChurches", churches);
            return churches;
          })
          .catch(error => console.log(error));
      }
    },
    fetchChurchesCompleted({ state, commit }) {
      if (state.AccessToken) {
        return cohservice
          .fetchChurches({ AccessToken: state.AccessToken })
          .then(res => {
            const data = res.data;
            const churches = [];
            function add(accumulator, a) {
              return accumulator + a;
            }
            for (let key in data) {
              const church = data[key];
              church.id = key;
              church.TotalLeaders = [
                church.EnglishLeaderSize,
                church.FilipinoLeaderSize,
                church.HindiLeaderSize,
                church.IndonesianLeaderSize,
                church.MandarinLeaderSize,
                church.TamilLeaderSize,
                church.ChildrenLeaderSize
              ].reduce(add);
              church.TotalEnquirers = [
                church.Stat.StatusOneCount,
                church.Stat.StatusTwoCount,
                church.Stat.StatusThreeCount,
                church.Stat.StatusFourCount
              ].reduce(add);

              // Check if it must be pushed
              if (church.Stat.StatusOneCount == 0) {
                churches.push(church);
              }
            }
            commit("setChurches", churches);
            return churches;
          })
          .catch(error => console.log(error));
      }
    },
    fetchChurchesPending({ state, commit }) {
      if (state.AccessToken) {
        return cohservice
          .fetchChurches({ AccessToken: state.AccessToken })
          .then(res => {
            const data = res.data;
            const churches = [];
            function add(accumulator, a) {
              return accumulator + a;
            }
            for (let key in data) {
              const church = data[key];
              church.id = key;
              church.TotalLeaders = [
                church.EnglishLeaderSize,
                church.FilipinoLeaderSize,
                church.HindiLeaderSize,
                church.IndonesianLeaderSize,
                church.MandarinLeaderSize,
                church.TamilLeaderSize,
                church.ChildrenLeaderSize
              ].reduce(add);
              church.TotalEnquirers = [
                church.Stat.StatusOneCount,
                church.Stat.StatusTwoCount,
                church.Stat.StatusThreeCount,
                church.Stat.StatusFourCount
              ].reduce(add);

              // Check if it must be pushed
              if (church.Stat.StatusOneCount > 0) {
                churches.push(church);
              }
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
  }
});
