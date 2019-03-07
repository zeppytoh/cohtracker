import { set, toggle } from "@/utils/vuex";

export default {
  setDrawer: set("drawer"),
  setImage: set("image"),
  setColor: set("color"),
  setLoading: set("loading"),
  toggleDrawer: toggle("drawer"),
  toggleLoading: toggle("loading")
};
