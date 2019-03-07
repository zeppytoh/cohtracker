<template>
  <div class="believers">
    <v-container class="my-5">
      <h1 class="subheading grey--text">{{ user.FullName }}</h1>

      <v-layout class="mb-3" row>
        <v-btn small flat color="grey" @click="sortBy('DecisionMade')">
          <v-icon left small>folder</v-icon>
          <span class="caption text-lowercase">By status</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('FullName')">
          <v-icon left small>person</v-icon>
          <span class="caption text-lowercase">By name</span>
        </v-btn>
      </v-layout>
      <v-card
        flat
        v-for="person in believers"
        :key="person.RandomID"
        :class="`person ${decisionText(person.DecisionMade)}`"
      >
        <v-layout row wrap justify-start class="pa-3">
          <v-flex xs12 md6>
            <div class="caption grey--text">Name</div>
            <span class="title">{{ person.FullName }}</span>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Mobile</div>
            <div>{{ person.MobileNumber }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Updated</div>
            <div>{{ getDate(person.UpdatedAt) }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div>
              <v-chip
                small
                :class="`${decisionText(person.DecisionMade)} white--text caption my-2`"
              >{{ decisionText(person.DecisionMade) }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <believer-detail :believer="person"/>
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>

      <Churches/>
    </v-container>
    <!-- <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex sm6 lg3 v-for="(i, id) in believers" :key="i.RandomID">
          <v-card dark>
            <v-card-text class="px-3">
              {{id+1}}: {{i.FullName}}, {{i.RandomID}}
              <span class="right" @click="toggleLighten">
                <v-icon>email</v-icon>
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="mx-0">
            <v-card-title class="px-3">
              <h1 class="display-2">Hello World</h1>
            </v-card-title>
            <v-card-text class="body-4">
              <p>Some body text</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ut, fugit doloribus quae, atque quas consequuntur placeat optio, minus ex ea voluptates eum commodi at quaerat. Eaque praesentium possimus ad!</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>-->
  </div>
</template>

<script>
import axios from "@/plugins/axios-auth";
import Churches from "@/components/Churches";
import BelieverDetail from "@/components/BelieverDetail";
export default {
  name: "Believers",
  components: {
    Churches,
    BelieverDetail
  },
  props: ["user"],
  data() {
    return {
      believers: [],
      errors: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // var settings = {
      //   url:
      //     "https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/believers?AccessToken=d78985fdc79388a1854ffb133dd4f619",
      //   method: "GET",
      //   timeout: 0,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     APIKey: "f912f198-e443-11e8-a9c5-89e884cb2e41"
      //   }
      // };
      // axios(settings)
      //   .then(res => {
      //     this.believers = res.data;
      //   })
      //   .catch(error => this.errors.push(error));
      axios
        .get("/believers", {
          params: {
            AccessToken: this.user.AccessToken
          }
        })
        .then(res => {
          this.believers = res.data;
        })
        .catch(error => this.errors.push(error));
    },
    decisionText: function(code) {
      switch (code) {
        case "A":
          return "prayed";
        case "B":
          return "rededicated";
        case "C":
          return "interested";
        case "D":
          return "church";
        default:
          return "default";
      }
    },
    getDate: function(value) {
      var d = new Date(value);
      return d.toDateString();
    },
    sortBy(prop) {
      this.believers.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style>
.person.prayed {
  border-left: 4px solid #3cd1c2;
}
.person.rededicated {
  border-left: 4px solid orange;
}
.person.interested {
  border-left: 4px solid pink;
}
.person.church {
  border-left: 4px solid maroon;
}
.person.default {
  border-left: 4px solid grey;
}
.v-chip.prayed {
  background-color: #3cd1c2;
}
.v-chip.rededicated {
  background-color: orange;
}
.v-chip.interested {
  background-color: pink;
}
.v-chip.church {
  background-color: maroon;
}
.v-chip.default {
  background-color: grey;
}
</style>