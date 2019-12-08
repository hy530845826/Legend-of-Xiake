<template>
  <div id="app">
    <button @click='jump'>真正开始</button>
    <router-link to="/Game">开始游戏</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods:{
    jump(){
      this.$router.push({path:'/Game'})
    }
  }
};
</script>

<style>
@import "./assets/scss/main.scss";
#app {
  background: #333;
  width: 1200px;
  height: 725px;
  margin: 75px auto 25px;
  position: relative;
}
</style>
