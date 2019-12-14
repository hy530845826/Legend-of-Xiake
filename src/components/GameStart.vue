<template>
  <div id="Gamestart">
    <div id="logoimg"></div>
    <div @click="$goRoute('/Game')">开始游戏</div>
    <div>读取游戏</div>
    <div>游戏说明</div>
  </div>
</template>
<script>
export default {
  name: "test"
};
</script>