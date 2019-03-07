export default {
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

  UserName: state => state.UserName
  // getContactById: (state, id) => {
  //   return _.findWhere(state.Contacts, { id: id });
  // }
};
