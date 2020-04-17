<template>
  <div id="Mission" class="Mission">
    <div class="MenuTitle">{{mission.name}}</div>
    <div class="MissionContent">
      <div>{{mission.introduction}}</div>
      <div>
        <b>任务说明:</b>
        <span v-if="mission_UID==0">勇士<em>{{pl.name}}</em>你好啊</span>
        <span v-if="mission_UID==1">我要挖菜</span>
      </div>
    </div>
    <div class="MissionBottom">
      <span @click="AcceptMission">接受委托</span>
      <span @click="RefuseMission">拒绝委托</span>
    </div>
  </div>
</template>
<script>
import Player from "../../js/player";
import Npc from "../../js/npc";
import Enemy from "../../js/enemy";
import m from "../../js/mission";
import v from "../../js/vuemove";
import t from "../../js/tool";
export default {
  name: "mission",
  data: function() {
    return {
      pl: Player.pll,
      npc: Npc.npc,
      mission: m.mission
    };
  },
  props: ["mission_UID"],
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMission", "MenuP");
    },
    RefuseMission: function() {
      this.$emit("openWindowMission", false);
      if (this.npc.CD_audio == 0 || this.npc.CD_audio > this.npc.CD_audio) {
        t.CDAudio(this.npc, true);
        v.GetAudio("npc", "npc" + this.npc.UID + "_over", this.npc.style_over);
      }
    },
    AcceptMission: function() {
      this.$emit("openWindowMission", false);
      if (this.npc.CD_audio == 0 || this.npc.CD_audio > this.npc.CD_audio) {
        t.CDAudio(this.npc, true);
        v.GetAudio("npc", "npc" + this.npc.UID + "_over", this.npc.style_over);
      }
      Enemy.UpdateEnemy(Enemy.ell, 3);
    }
  }
};
</script>