<template>
  <div id="GameBox">
    <main-interface />
    <action-bar />
    <status-bar  @openI="zdy($event)" />
    <div id="abcdefg">
      <h1 v-if="flag">123</h1>
    </div>
  </div>
  
</template>

<script>
import MainInterface from "./MainInterface.vue";
import ActionBar from "./ActionBar.vue";
import StatusBar from "./StatusBar.vue";
export default {
  name: "game",
  data: function() {
    return { flag: false };
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