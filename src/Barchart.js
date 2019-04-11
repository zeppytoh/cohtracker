import { mixins, HorizontalBar } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      tooltips: {
        mode: "index",
        intersect: false
      },
      legend: {
        labels: {
          boxWidth: 20
        }
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            },
            barPercentage: 0.9,
            categoryPercentage: 0.5
          }
        ]
      }
    }
  }),
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
