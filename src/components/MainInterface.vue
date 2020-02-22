<template>
  <div id="map" class="map-1">
    <div id="role">
      <div id="role-body"></div>
      <div>{{st}}</div>
    </div>
    <div id="npc">
      <div id="npc-body" @click="RefuseMission"></div>
      <div>{{el_name}}</div>
    </div>
    <div id="enemy">
      <div id="enemy-body"></div>
      <div>{{el_name}}</div>
    </div>
    <div v-if="ShowMission">
      <div id="Mission" class="Mission">
        <div class="MenuTitle">委托name</div>
        <div class="MissionContent">
          <div>这是一个很长的故事巴拉巴拉巴拉，在很久很久以前有一个蓝精灵，他重来也不骑小毛驴。</div>
          <div>
            <span>任务说明:</span>
            你好，勇士{{st.name}}//这里用变量确定委托的名字（可能需要组件）
          </div>
        </div>
        <div class="MissionBottom">
          <span @click="AcceptMission">接受委托</span>
          <span @click="RefuseMission">拒绝委托</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../js/player";
import Enemy from "../js/enemy";
import "../js/vuemove";

export default {
  name: "main-interface",
  data: function() {
    return {
      st: Player.pll,
      ShowMission: false,
      el_name: Enemy.ell.name
    };
  },
  methods: {
    RefuseMission: function() {
      this.ShowMission = !this.ShowMission;
    },
    AcceptMission: function() {
      Enemy.UpdateEnemy(Enemy.ell, 1);
    }
  },
  mounted() {
    window.console.log(this.st.ATK);
  }
};
</script>