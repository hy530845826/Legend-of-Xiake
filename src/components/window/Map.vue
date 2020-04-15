<template>
  <div id="Mdiv" class="MenuDiv">
    <div class="MenuTitle">
      <div class="MenuName">
        地图
        <span class="MenuClose" @click="CloseWindow">X</span>
      </div>
    </div>
    <table id="MapContent">
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-3">木人巷1</td>
        <td id="map-4">木人巷2</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-1" class="Player-Position">少林1</td>
        <td id="map-2">少林2</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-19">魔教</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-5">嵩山1</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-17">大沙漠2</td>
        <td id="map-18">大沙漠1</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-6">嵩山2</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td colspan="5" rowspan="4" id="map-0">中原</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-10">铁掌峰</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-12">蜀南竹海2</td>
        <td id="map-11">蜀南竹海1</td>
        <td id="map-7">武当1</td>
        <td id="map-8">武当2</td>
        <td id="map-9">武当道场</td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-13">唐门</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-16">峨眉</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-14">绝情谷1</td>
        <td id="map-15">绝情谷2</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "window-map",
  data: function() {
    return {};
  },
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMenu", "null");
    }
  }
};
</script>