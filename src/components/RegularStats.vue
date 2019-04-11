<template>
  <v-card class="ma-2 elevation-0" dark color="secondary darken-1" v-if="props.expanded">
    <v-card-text>
      <div>Follow-up Leaders Available</div>
      <v-badge overlap color="accent darken-1" right>
        <template v-slot:badge>
          <span class="caption black--text">400</span>
        </template>
        <v-chip>English</v-chip>
      </v-badge>
      <v-badge overlap color="accent darken-1" right>
        <template v-slot:badge>
          <span>50</span>
        </template>
        <v-chip>Filipino</v-chip>
      </v-badge>
      <v-badge overlap color="accent darken-1" right>
        <template v-slot:badge>
          <span>100</span>
        </template>
        <v-chip>Mandarin</v-chip>
      </v-badge>
      <!-- <ChurchStat/> -->

      <div v-if="props.item.EnglishLeaderSize > 0">
        <v-progress-linear
          background-color="success darken-2"
          :height="22"
          color="success"
          :value="((props.item.EnglishLeaderSize / props.item.TotalLeaders) * 100)"
        ></v-progress-linear>
        <span class="progress-bar-text">English: {{ props.item.EnglishLeaderSize }}</span>
      </div>
      <div v-if="props.item.FilipinoLeaderSize > 0">
        <v-progress-linear
          background-color="success darken-2"
          :height="22"
          color="success"
          :value="((props.item.FilipinoLeaderSize / props.item.TotalLeaders) * 100)"
        ></v-progress-linear>
        <span class="progress-bar-text">Filipino: {{ props.item.FilipinoLeaderSize }}</span>
      </div>
      <div v-if="props.item.HindiLeaderSize > 0">
        <v-progress-linear
          background-color="success darken-2"
          :height="22"
          color="success"
          :value="((props.item.HindiLeaderSize / props.item.TotalLeaders) * 100)"
        ></v-progress-linear>
        <span class="progress-bar-text">Hindi: {{ props.item.HindiLeaderSize }}</span>
      </div>
      <div v-if="props.item.TamilLeaderSize > 0">
        <v-progress-linear
          background-color="success darken-2"
          :height="22"
          color="success"
          :value="((props.item.TamilLeaderSize / props.item.TotalLeaders) * 100)"
        ></v-progress-linear>
        <span class="progress-bar-text">Tamil: {{ props.item.TamilLeaderSize }}</span>
      </div>
      <div v-if="props.item.MandarinLeaderSize > 0">
        <v-progress-linear
          background-color="success darken-2"
          :height="22"
          color="success"
          :value="((props.item.MandarinLeaderSize / props.item.TotalLeaders) * 100)"
        ></v-progress-linear>
        <span class="progress-bar-text">Mandarin: {{ props.item.MandarinLeaderSize }}</span>
      </div>
      <div v-if="props.item.IndonesianLeaderSize > 0">
        <v-progress-linear
          background-color="success darken-2"
          :height="22"
          color="success"
          :value="((props.item.IndonesianLeaderSize / props.item.TotalLeaders) * 100)"
        ></v-progress-linear>
        <span class="progress-bar-text">Indonesian: {{ props.item.MandarinLeaderSize }}</span>
      </div>
      <v-badge overlap color="warning" right>
        <template v-slot:badge>
          <span>{{props.item.Stat.StatusOneCount}}</span>
        </template>
        <v-progress-circular
          :rotate="270"
          :size="80"
          :width="15"
          :value="((props.item.Stat.StatusOneCount / props.item.TotalEnquirers) * 100)"
          color="accent"
          background-color="secondary"
        >
          <v-icon>contact_phone</v-icon>
        </v-progress-circular>
      </v-badge>
      <v-progress-circular
        :rotate="270"
        :size="80"
        :width="15"
        :value="((props.item.Stat.StatusTwoCount / props.item.TotalEnquirers) * 100)"
        color="warning"
        background-color="secondary"
      >{{ props.item.Stat.StatusTwoCount }}/{{ props.item.TotalEnquirers }}</v-progress-circular>
      <!-- <ChurchStat/> -->
      <v-progress-linear
        background-color="accent darken-2"
        :height="22"
        color="accent"
        :value="((props.item.Stat.StatusTwoCount / props.item.Stat.StatusOneCount) * 100)"
      ></v-progress-linear>
      <span
        class="progress-bar-text"
      >{{ props.item.Stat.StatusTwoCount }}/{{ props.item.Stat.StatusOneCount }}</span>
      <ul>
        <li class="caption grey--text" v-for="i in props.item.Stat" :key="i">{{ i }}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
</style>