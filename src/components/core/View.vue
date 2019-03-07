<template>
  <v-content id="core-view" class="contentGradient">
    <v-fade-transition mode="out-in">
      <router-view/>
    </v-fade-transition>
  </v-content>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("ui", ["image", "color"])
  },
  metaInfo() {
    return {
      title: "Celebration of Hope"
    };
  }
};
</script>

<style lang="scss">
#core-view.contentGradient {
  background-image: linear-gradient(
    to bottom,
    var(--v-accent-base),
    var(--v-secondary-base)
  );
}
</style>
