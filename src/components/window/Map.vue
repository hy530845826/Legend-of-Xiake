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
        <td id="map-3" @click="ClickMap($event)">木人巷1</td>
        <td id="map-4" @click="ClickMap($event)">木人巷2</td>
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
        <td id="map-1" class="Player-Position" @click="ClickMap($event)">少林1</td>
        <td id="map-2" @click="ClickMap($event)">少林2</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-19" @click="ClickMap($event)">魔教</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-5" @click="ClickMap($event)">嵩山1</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-18" @click="ClickMap($event)">大沙漠2</td>
        <td id="map-17" @click="ClickMap($event)">大沙漠1</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-6" @click="ClickMap($event)">嵩山2</td>
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
        <td colspan="5" rowspan="4" id="map-0" @click="ClickMap($event)">中原</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-10" @click="ClickMap($event)">铁掌峰</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-12" @click="ClickMap($event)">蜀南竹海2</td>
        <td id="map-11" @click="ClickMap($event)">蜀南竹海1</td>
        <td id="map-7" @click="ClickMap($event)">武当1</td>
        <td id="map-8" @click="ClickMap($event)">武当2</td>
        <td id="map-9" @click="ClickMap($event)">武当道场</td>
        <td class="no-space"></td>
      </tr>
      <tr>
        <td class="no-space"></td>
        <td id="map-13" @click="ClickMap($event)">唐门</td>
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
        <td id="map-16" @click="ClickMap($event)">峨眉</td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td class="no-space"></td>
        <td id="map-14" @click="ClickMap($event)">绝情谷1</td>
        <td id="map-15" @click="ClickMap($event)">绝情谷2</td>
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
import v from "../../js/vuemove";
export default {
  name: "window-map",
  data: function() {
    return {};
  },
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMenu", "null");
    },
    ClickMap: function(e) {
      var target = e.currentTarget.id;
      var PortalToMapID = parseInt(target.replace(/[^0-9]/gi, ""));
      var PortalMusicID = v.GetMapBGMNumber(PortalToMapID);
      var AudioName = v.GetAudioName(PortalToMapID);
      var MapIDNumber = v.GetMapIDNumber();
      var MapBGMNumber = v.GetMapBGMNumber(MapIDNumber);
      v.Loading(
        MapIDNumber,
        PortalToMapID,
        MapBGMNumber,
        PortalMusicID,
        AudioName,
        true
      );
      this.CloseWindow();
    }
  }
};
</script>