<template>
  <div id="map" class="map-1">
    <div id="loading-screen">
      <div id="loading-progress" class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 10%;"
          aria-valuenow="10"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <div id="role" class="stand">
      <div id="role-body"></div>
      <div id="skill-body"></div>
      <div id="role-hit-judge"></div>
      <div id="role-hited-judge"></div>
      <div>{{pl.realfx}}</div>
      <div>{{pl.imgfx}}</div>
    </div>
    <div id="npc">
      <div id="npc-body" @click="RefuseMission"></div>
      <div id="npc-name">
        <span>{{npc_data[0]}}</span>
        {{npc_data[1]}}
      </div>
    </div>
    <div id="enemy" class="ellstand">
      <div id="enemy-body"></div>
      <div id="enemy-hit-judge"></div>
      <div id="enemy-hited-judge"></div>
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
    <div class="Portal Portal-birth to-map-2"></div>
    <div v-if="ShowMission">
      <div id="Mission" class="Mission">
        <div class="MenuTitle">委托name</div>
        <div class="MissionContent">
          <div>这是一个很长的故事巴拉巴拉巴拉，在很久很久以前有一个蓝精灵，他重来也不骑小毛驴。</div>
          <div>
            <span>任务说明:</span>
            你好，勇士{{pl.name}}//这里用变量确定委托的名字（可能需要组件）
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
import Npc from "../js/npc";
import v from "../js/vuemove";
import t from "../js/tool";

export default {
  name: "main-interface",
  data: function() {
    return {
      pl: Player.pll,
      npc: Npc.npc,
      ShowMission: false,
      el_data: [Enemy.ell.LV, Enemy.ell.name],
      npc_data: [Npc.npc.appellation, Npc.npc.name]
    };
  },
  methods: {
    RefuseMission: function() {
      this.ShowMission = !this.ShowMission;
      //说话
      if (this.npc.CD_audio == 0 || this.npc.CD_audio > 4) {
        if (this.ShowMission == true) {
          t.CDAudio(this.npc, true);
          v.GetAudio(
            "npc",
            "npc" + this.npc.UID + "_talk",
            this.npc.style_talk
          );
        } else {
          t.CDAudio(this.npc, true);
          v.GetAudio(
            "npc",
            "npc" + this.npc.UID + "_over",
            this.npc.style_over
          );
        }
      }
    },
    AcceptMission: function() {
      this.ShowMission = !this.ShowMission;
      if (this.npc.CD_audio == 0 || this.npc.CD_audio > 4) {
        t.CDAudio(this.npc, true);
        v.GetAudio("npc", "npc" + this.npc.UID + "_over", this.npc.style_over);
      }
      Enemy.UpdateEnemy(Enemy.ell, 3);
    },
    F5: function() {
      var that = this;
      //重新渲染名字和等级
      setInterval(function() {
        that.$set(that.el_data, 0, "LV." + Enemy.ell.LV);
        that.$set(that.el_data, 1, Enemy.ell.name);
        that.$set(that.npc_data, 0, Npc.npc.appellation);
        that.$set(that.npc_data, 1, Npc.npc.name);
      }, 100);
    }
  },
  mounted() {
    this.F5();
  }
};
</script>