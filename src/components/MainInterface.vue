<template>
  <div id="map" class="map-1">
    <div id="role">
      <div id="role-body"></div>
      <!-- <div>{{st}}</div> -->
      <div>{{sk}}</div>
    </div>
  </div>
</template>
<script>
// import Player from "./player/Player.vue";
import sb from "../js/player";

export default {
  name: "main-interface",
  data: function() {
    return {
      sk: sb.hero,
      st: sb.pll,
      hero: document.getElementById("role")
    };
  },
  methods: {},
  mounted() {
    this.hero = $("#role")[0];
    window.console.log(this.hero);
    // },
    // components: {
    //   Player
  }
};
</script>