<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="primary">Login</v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>User: {{ UserName }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>
