<template>
  <div id="IntroductionDiv">
    <div class="MenuTitle">
      <div class="MenuName">
        游戏说明
        <span class="MenuClose" @click="CloseWindow">X</span>
      </div>
    </div>
    <div class="MenuContent">
      <ul>
        <li>
          角色移动：
          <span>↑</span>
          <span>↓</span>
          <span>←</span>
          <span>→</span>
        </li>
        <li>
          切换地图：位于传送点附近
          <span>C</span>
        </li>
        <li>
          普通攻击：
          <span>Z</span>
          <span>X</span>
        </li>
        <li>
          角色技能：
          <span>A</span>
          <span>S</span>
          <span>D</span>
          <span>F</span>
          <span>Q</span>
          <span>W</span>
          <span>E</span>
          <span>R</span>
        </li>
      </ul>
      <div
        class="little-font"
      >This is my graduation project: Design and implementation of Web RPG game based on Vue</div>
      <div class="logo"></div>
      <div id="author">
        <div>作者：黄尧</div>
        <div class="little-font">※Legend-of-Xiake※</div>
        <div class="little-font">BY：Han$on from CQUPT</div>
        <div>B站：BIG主教 / 直播间13715775</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "introduction",
  data: function() {
    return {};
  },
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMenu", "MenuP");
    }
  }
};
</script>