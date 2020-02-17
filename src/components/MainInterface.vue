<template>
  <div id="map" class="map-1">
    <div id="role">
      <div id="role-body"></div>
      <div>{{st}}</div>
    </div>
  </div>
</template>
<script>
import Player from "../js/player";
import "../js/vuemove";

export default {
  name: "main-interface",
  data: function() {
    return {
      st: Player.pll,
      // hero: document.getElementById("role")
    };
  },
  methods: {},
  mounted() {
    // this.hero = $("#role")[0];
    // window.console.log(111 + this.hero);
    window.console.log(this.st.ATK)
  }
};
</script>