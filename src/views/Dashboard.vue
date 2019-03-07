<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="school" title="100+" sub-title="Likes" color="#330000"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="person" title="150+" sub-title="Connections" color="red"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="work" title="200+" sub-title="Followers" color="light-blue"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="phone" title="50+" sub-title="Shots" color="purple"></mini-statistic>
        </v-flex>
        <!-- mini statistic  end -->
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xl class="my-2">
      <v-layout row wrap>
        <v-flex class="pa-2" xs12>
          <churches/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Churches from "@/components/Churches";

export default {
  data: () => ({
    components: {
      Churches
    },
    selectedTab: "tab-1",
    linearTrending: [
      {
        subheading: "Sales",
        headline: "2,55",
        caption: "increase",
        percent: 15,
        icon: {
          label: "trending_up",
          color: "success"
        },
        linear: {
          value: 15,
          color: "success"
        }
      },
      {
        subheading: "Revenue",
        headline: "6,553",
        caption: "increase",
        percent: 10,
        icon: {
          label: "trending_down",
          color: "error"
        },
        linear: {
          value: 15,
          color: "error"
        }
      },
      {
        subheading: "Orders",
        headline: "5,00",
        caption: "increase",
        percent: 50,
        icon: {
          label: "arrow_upward",
          color: "info"
        },
        linear: {
          value: 50,
          color: "info"
        }
      }
    ],
    trending: [
      {
        subheading: "Email",
        headline: "15+",
        caption: "email opens",
        percent: 15,
        icon: {
          label: "email",
          color: "info"
        },
        linear: {
          value: 15,
          color: "info"
        }
      },
      {
        subheading: "Tasks",
        headline: "90%",
        caption: "tasks completed.",
        percent: 90,
        icon: {
          label: "list",
          color: "primary"
        },
        linear: {
          value: 90,
          color: "success"
        }
      },
      {
        subheading: "Issues",
        headline: "100%",
        caption: "issues fixed.",
        percent: 100,
        icon: {
          label: "bug_report",
          color: "primary"
        },
        linear: {
          value: 100,
          color: "error"
        }
      }
    ]
  }),
  computed: {}
};
</script>
