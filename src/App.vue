<template>
  <div id="app">
    <div id="screen">
      <router-view></router-view>
    </div>
    <div id="rrr">
      <button @click="jump">真正开始</button>
      <router-link to="/Home">开始游戏</router-link>
      <button @click="$goRoute('/Game')">真正开始</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    jump() {
      this.$router.push({ path: "/Game" });
    }
  }
};
</script>

<style>
@import "./assets/scss/main.scss";
#app {
  width: 1400px;
  height: 725px;
  margin: 75px auto 25px;
  position: relative;
}
#app #screen {
  float: left;
  background: #333;
  width: 1200px;
  height: 725px;
}
#app #rrr{
  float: left;
}
</style>
