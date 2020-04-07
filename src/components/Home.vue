<template>
  <div id="Home">
    <div id="HomeMenu">
      <div id="logoimg"></div>
      <ul>
        <li @click="$goRoute('/Game')">开始游戏</li>
        <li>读取游戏</li>
        <li>游戏说明</li>
      </ul>
    </div>
    <audio src="./static/sound/home.mp3" class="bgmusic" autoplay></audio>
  </div>
</template>
<script>
export default {
  name: "test"
};
</script>