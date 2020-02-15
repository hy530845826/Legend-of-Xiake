<template>
  <div id="map" class="map-1">
    <div id="role">
      <div id="role-body"></div>
      <div>{{hero}}</div>
      <div>{{sk}}</div>
      <div>{{st}}</div>
    </div>
  </div>
</template>
<script>
import sb from "../js/player";
import nc from "../js/vuemove";

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
    window.console.log(111+this.hero);
    nc;
  }
};
</script>