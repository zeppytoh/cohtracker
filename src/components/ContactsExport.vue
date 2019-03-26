<template>
  <v-btn color="success" @click="exportList">Export as XLS</v-btn>
</template>

<script>
export default {
  props: ["contacts"],
  methods: {
    exportList() {}
  }
};
</script>

<style scoped>
</style>