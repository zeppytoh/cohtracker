<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import BarChart from "@/Barchart.js";

export default {
  components: {
    BarChart
  },
  props: {
    churchStats: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      datacollection: null,
      options: {
        tooltips: {
          mode: "index",
          intersect: false
        },
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },

        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        title: {
          display: true,
          fontColor: "#999",
          text: "Leaders"
        },
        legend: {
          position: "right",

          labels: {
            // This more specific font property overrides the global property
            fontColor: "white"
          }
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["Leaders", "Enquirers"],
        datasets: [
          {
            label: "English",
            backgroundColor: "#C4E4DE",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Mandarin",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Hindi",
            backgroundColor: "#FC0",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
