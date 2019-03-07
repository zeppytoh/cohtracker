import axios from "axios";
const apiClient = axios.create({
  baseURL:
    "https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/",
  withCredentials: false
  // headers: {
  //   APIKey: "f912f198-e443-11e8-a9c5-89e884cb2e41",
  //   Accept: "application/json",
  //   "Content-Type": "application/json"
  // }
});

export default {
  authUser(authData) {
    // authenticate user from global login screen
    return apiClient.post("/login", {
      UserName: authData.username,
      Password: authData.password,
      returnSecureToken: true
    });
  },
  fetchContacts(data) {
    // fetch contacts with params = data.AccessToken and data.ChurchPostcode
    return apiClient.get(
      "/believers?AccessToken=" +
        data.AccessToken +
        "&ChurchPostcode=" +
        data.ChurchPostcode
    );
  },
  fetchChurches(data) {
    // fetch churches for super-admin with params = data.AccessToken
    // returns one object for church-admin role, but multiple objects for super-admin role
    return apiClient.get("/churches", {
      params: data
    });
  },
  fetchContact(data) {
    // fetch believer details and logs for one contact, with params = data.AccessToken and data.RandomID
    // returns response.data { Believer: object, BelieverLogs [objects]}
    return apiClient.get("/believer", {
      params: data
    });
  },
  updateContact(data) {
    console.log(data);
    // updates believer status for {AccessToken: String, RandomID: String, ChurchPostcode: String, BelieverStatus: String, ChangeLog: String}
    return apiClient.post("/believer/status", data);
  }
};
