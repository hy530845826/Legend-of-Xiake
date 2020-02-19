<template>
  <div id="map" class="map-1">
    <div id="role">
      <div id="role-body"></div>
      <div>{{st}}</div>
    </div>
    <div id="npc">
      <div id="npc-body" @click="fuckyou"></div>
      <div>{{st}}</div>
    </div>
    <div id="enemy">
      <div id="enemy-body"></div>
      <div>{{st}}</div>
    </div>
    <div v-if="ShowMission">
      <div id="Mission" class="Mission">
        <div class="MenuTitle">委托name</div>
        <div class="MissionContent">
          <span>任务说明:</span>
          你好，勇士{{st.name}}
          //这里用变量确定委托的名字（可能需要组件）
        </div>
        <div class="MissionBottom">
          <span>接受委托</span>
          <span>拒绝委托</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../js/player";
import "../js/enemy";
import "../js/vuemove";

export default {
  name: "main-interface",
  data: function() {
    return {
      st: Player.pll,
      ShowMission: false
    };
  },
  methods: {
    fuckyou: function() {
      this.ShowMission = !this.ShowMission;
    }
  },
  mounted() {
    window.console.log(this.st.ATK);
  }
};
</script>