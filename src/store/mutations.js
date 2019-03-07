export default {
  authUser(state, userData) {
    state.AccessToken = userData.token;
    state.Role = userData.role;
    state.UserName = userData.name;
    state.Church = userData.church;
  },
  clearAuthData(state) {
    state.AccessToken = null;
    state.Role = null;
    state.UserName = null;
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
  }
};
