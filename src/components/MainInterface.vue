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
      <div id="npc-body" @click="ShowMission"></div>
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
    <Mission v-if="MissionFlag" :mission_UID="npc.mission_UID" @openWindowMission="zdy($event)" />
  </div>
</template>
<script>
import Mission from "./window/Mission.vue";
import Player from "../js/player";
import Enemy from "../js/enemy";
import Npc from "../js/npc";
import v from "../js/vuemove";
import t from "../js/tool";
import m from "../js/mission";

export default {
  name: "main-interface",
  data: function() {
    return {
      pl: Player.pll,
      npc: Npc.npc,
      MissionFlag: false,
      el_data: [Enemy.ell.LV, Enemy.ell.name],
      npc_data: [Npc.npc.appellation, Npc.npc.name]
    };
  },
  components: {
    Mission
  },
  methods: {
    zdy(msg) {
      this.MissionFlag = msg;
    },
    ShowMission: function() {
      this.MissionFlag = !this.MissionFlag;
      if (this.npc.CD_audio == 0 || this.npc.CD_audio > this.npc.CD_audio) {
        if (this.MissionFlag == true) {
          m.UpdateMission(this.npc.mission_UID);
          t.CDAudio(this.npc, true);
          v.GetAudio(
            "npc",
            "npc" + this.npc.UID + "_talk",
            this.npc.style_talk
          );
        }
      }
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