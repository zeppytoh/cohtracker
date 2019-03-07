import cohservice from "@/services/cohservice.js";
import router from "@/router";

export default {
  setLogoutTimer({ dispatch }, expireTime) {
    setTimeout(() => {
      dispatch("logout");
    }, expireTime * 1000);
  },
  authUser({ commit, dispatch }, authData) {
    cohservice
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

        if (res.data.Role === "church-admin") router.replace("churchadmin");
        else router.replace("dashboard");
        console.log("set logout timer");
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
      return;
    } else {
      console.log("tryAutoLogin valid token found");
      const expireDate = localStorage.getItem("expireDate");
      const now = new Date();
      if (now >= expireDate) {
        return;
      }
      const data = {
        token: token,
        role: localStorage.getItem("role"),
        name: localStorage.getItem("name"),
        church: JSON.parse(localStorage.getItem("church"))
      };
      commit("authUser", data);
      router.replace("dashboard");
    }
  },
  setChurch({ commit }, payload) {
    commit("setChurch", payload);
  },
  logout({ commit }) {
    commit("clearAuthData");
    router.replace("/");
  },
  updateContact({ state }, payload) {
    const data = {
      RandomID: payload.RandomID,
      ChurchPostcode: payload.Postcode,
      BelieverStatus: payload.BelieverStatus,
      ChangeLog: payload.ChangeLog,
      AccessToken: state.AccessToken
    };
    console.log(data);
    cohservice
      .updateContact(data)
      .then(res => {
        console.log(res);
        // commit("updateContact", data);
      })
      .catch(error => console.log(error));
  },
  fetchContact({ state }, payload) {
    console.log(payload);
    const data = {
      AccessToken: state.AccessToken,
      RandomID: payload
    };
    return cohservice
      .fetchContact(data)
      .then(res => {
        console.log("In Fetch Contact (History)", res.data);
        return res.data;
      })
      .catch(error => console.log(error));
  },
  fetchContacts({ commit, state }, postcode) {
    var data = "";
    console.log(postcode);
    if (!state.AccessToken) {
      return;
    } else {
      if (state.Role === "church-admin") {
        data = {
          AccessToken: state.AccessToken,
          ChurchPostcode: state.Church.Postcode
        };
      } else {
        data = {
          AccessToken: state.AccessToken,
          ChurchPostcode: postcode
        };
      }
      console.log(data);
      return cohservice
        .fetchContacts(data)
        .then(res => {
          console.log("In Fetch Contacts", res.data);
          const data = res.data;
          const contacts = [];
          for (let key in data) {
            const contact = data[key];
            contact.id = key;
            contacts.push(contact);
          }
          commit("setContacts", contacts);
          return contacts;
        })
        .catch(error => console.log(error));
    }
  },
  fetchChurches({ commit, state }) {
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
};
