<template>
  <div id="GameBox">
    <main-interface />
    <action-bar />
    <status-bar :mlgb="niceteam" @openI="zdy($event)" />
    <div id="abcdefg">
      <h1 v-if="flag">{{st}}</h1>
    </div>
  </div>
</template>

<script>

import MainInterface from "./MainInterface.vue";
import ActionBar from "./ActionBar.vue";
import StatusBar from "./StatusBar.vue";
import sb from "../js/player";
import "../js/vueblank";

export default {
  name: "game",
  data: function() {
    return {
      flag: false,
      st: sb.pll,
      niceteam: "fk"
    };
  },
  components: {
    MainInterface,
    ActionBar,
    StatusBar
  },
  methods: {
    zdy(msg) {
      this.flag = msg;
    }
  }
};
</script>
<style>