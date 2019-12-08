<template>
  <div id="GameBox">
    <main-interface />
    <action-bar />
    <status-bar />
  </div>
</template>

<script>
import MainInterface from "./MainInterface.vue";
import ActionBar from "./ActionBar.vue";
import StatusBar from "./StatusBar.vue";
export default {
  name: "game",
  components: {
    MainInterface,
    ActionBar,
    StatusBar
  }
};
</script>