export default {
  AccessToken: null,
  Role: null,
  UserName: null, // logged-in user FullName
  Church: null, // object for current church
  Contacts: null, // list of contacts for current church
  Churches: null,
  ageGroups: {
    A: "6 yo and below",
    B: "7-12 yo",
    C: "13-16 yo",
    D: "17-25 yo",
    E: "26-35 yo",
    F: "36-49 yo",
    G: "50 yo and above"
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
    "1": { text: "pending", color: "warning lighten-2" },
    "2": { text: "contacted", color: "success" },
    "3": { text: "closed", color: "grey lighten-2" },
    "4": { text: "reassign", color: "primary lighten-3" }
  },
  decisionText: {
    A: "Prayed and received Christ",
    B: "Rededicated",
    C: "Interested",
    D: "Like to join church"
  }
};
