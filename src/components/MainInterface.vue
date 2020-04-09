<template>
  <div id="map" class="map-1">
    <div id="loading-screen">
      <div id="loading-progress" class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 100%;"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <div id="role" class="plstand">
      <div id="role-body"></div>
      <div id="skill-body"></div>
      <div id="role-hit-judge"></div>
      <div id="role-hited-judge"></div>
      <div>{{st.realfx}}</div>
      <div>{{st.imgfx}}</div>
    </div>
    <div id="npc">
      <div id="npc-body" @click="RefuseMission"></div>
      <div>{{el_data}}</div>
    </div>
    <div id="enemy">
      <div id="enemy-body" class="ellstand"></div>
      <div id="enemy-hp" class="progress">
        <div
          class="progress-bar bg-danger"
          role="progressbar"
          style="width: 100%;"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div id="enemy-name">{{el_data[0]}} {{el_data[1]}}</div>
    </div>
    <div class="Portal Portal-R to-map-2 music-1"></div>
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
      el_data: [Enemy.ell.LV, Enemy.ell.name]
    };
  },
  methods: {
    RefuseMission: function() {
      this.ShowMission = !this.ShowMission;
    },
    AcceptMission: function() {
      this.ShowMission = !this.ShowMission;
      var fx = RandomFX(0, 0);
      function RandomFX(m, n) {
        var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
        return num;
      }
      Enemy.UpdateEnemy(Enemy.ell, fx);
      //重新渲染名字和等级
      this.$set(this.el_data, 0, "LV." + Enemy.ell.LV);
      this.$set(this.el_data, 1, Enemy.ell.name);
    }
  },
  mounted() {
    window.console.log(this.st.ATK);
  }
};
</script>