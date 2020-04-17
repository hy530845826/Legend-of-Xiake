<template>
  <div id="Home">
    <div id="HomeMenu">
      <div id="logoimg"></div>
      <ul>
        <li @click="$goRoute('/Game')">开始游戏</li>
        <li>读取游戏</li>
        <li @click="SettingIntroduction()">游戏说明</li>
      </ul>
    </div>
    <introduction v-if="WindowName=='introduction'" @openWindowMenu="zdy($event)" />
    <audio src="./static/sound/bgm/home.mp3" id="HomeBGM" class="bgmusic" autoplay></audio>
  </div>
</template>
<script>
import Introduction from "./window/Introduction.vue";

export default {
  name: "home",
  data: function() {
    return {
      WindowName: "null"
    };
  },
  components: {
    Introduction
  },
  methods: {
    SettingIntroduction: function() {
      this.WindowName = "introduction";
    },
    zdy(msg) {
      this.WindowName = msg;
    }
  },
  mounted() {
    $("#HomeBGM")[0].volume = 0.6;
  }
};
</script>