<template>
  <div id="app">
    <main-interface />
    <action-bar />
    <status-bar />
  </div>
</template>

<script>
import MainInterface from "./components/MainInterface.vue";
import ActionBar from "./components/ActionBar.vue";
import StatusBar from "./components/StatusBar.vue";
export default {
  name: "app",
  components: {
    MainInterface,
    ActionBar,
    StatusBar
  }
};
</script>

<style>
@import "./assets/scss/main.scss";
#app {
  background: #ace;
  width: 1200px;
  height: 725px;
  margin: 75px auto 25px;
  position: relative;
}
</style>
