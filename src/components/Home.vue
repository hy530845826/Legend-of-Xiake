<template>
  <div id="Home">
    <div id="logoimg"></div>
    <div @click="$goRoute('/Game')">开始游戏</div>
    <div>读取游戏</div>
    <div>游戏说明</div>
    <audio src="./static/sound/01.mp3" class="bgmusic" autoplay></audio>
  </div>
</template>
<script>
export default {
  name: "test"
};
</script>