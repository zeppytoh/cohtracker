<template>
  <v-fade-transition mode="out-in">
    <router-view/>
  </v-fade-transition>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "Celebration of Hope"
    };
  }
};
</script>

<style lang="scss">
</style>
