<template>
  <div id="app">
    <main-interface />
  </div>
</template>

<script>
import MainInterface from './components/MainInterface.vue'

export default {
  name: 'app',
  components: {
    MainInterface
  }
}
</script>

<style>
  @import "./assets/scss/main.scss";
</style>
