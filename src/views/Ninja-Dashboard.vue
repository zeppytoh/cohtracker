<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subheading grey--text">Dashboard</h1>
      <v-layout class="mb-3" row>
        <v-btn small flat color="grey">
          <v-icon left small>folder</v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
        <v-btn small flat color="grey">
          <v-icon left small>person</v-icon>
          <span class="caption text-lowercase">By person</span>
        </v-btn>
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap justify-start :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">By</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: "Create a New Website",
          person: "Tsan Yao",
          due: "10-Mar-219",
          status: "ongoing"
        },
        {
          title: "Research a new Persona",
          person: "Andrew Yu",
          due: "5-Apr-2019",
          status: "complete"
        },
        {
          title: "Next MPDx Tool",
          person: "Tataihono N",
          due: "1-May-2019",
          status: "ongoing"
        },
        {
          title: "Digital Marketing for JCCC",
          person: "Victor Toh",
          due: "31-July-2019",
          status: "overdue"
        }
      ]
    };
  }
};
</script>

<style scope>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background-color: #3cd1c2;
}
.v-chip.ongoing {
  background-color: orange;
}
.v-chip.overdue {
  background-color: tomato;
}
</style>
