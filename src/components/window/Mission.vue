<template>
  <div id="Mission" class="Mission">
    <div class="MenuTitle">
      <div class="MenuName">
        委托
        <span class="MenuClose" @click="RefuseMission">X</span>
      </div>
    </div>
    <div class="MissionContent">
      <b>{{mission.name}}</b>
      <div v-if="mission_UID==0">
        <div>
          我是
          <span>{{npc.name}}</span>，这少林寺的扫地僧。欢迎你前来寒寺……
        </div>
        <div>&lt;{{npc.name}}翻阅着信件。&gt;</div>
        <div>
          <span>{{pl.name}}</span>
          。你是{{pl.name}}吧？
        </div>
        <div>
          嗯……看来距离魔教教主
          <span>蔡徐坤</span>修炼完成
          <span>天上天下无双功</span>一统江湖时日不多，吾等现在需要集结
          <span>少林</span>、
          <span>武当</span>、
          <span>唐门</span>、
          <span>峨眉</span>江湖四大正派的力量，立即进攻西域魔教。
        </div>
        <div>
          进入我身旁
          <span>木人巷1</span>去找
          <span>成昆</span>。出发！
        </div>
      </div>
      <div v-if="mission_UID==1">
        <div>
          贫僧收到了来自
          <span>无名</span>的消息。不过在讨伐魔教之前，贫僧想要看看阁下的实力。阁下能在少林
          <span>木人巷1</span>里坚持多久呢？
        </div>
      </div>
    </div>
    <div class="MissionContent">
      <b>任务目标：</b>
      <div v-if="mission_UID==0">
        向
        <span>木人巷1</span>里的
        <span>成昆</span>报到。
      </div>
      <div v-if="mission_UID==1">
        消灭
        <span>{{mission.target_num}}</span>个
        <span>稻草人</span>。
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
      window.console.log(this.mission.target_UID);
      if (this.mission.style == 3) {
        Enemy.UpdateEnemy(Enemy.ell, this.mission.target_UID);
      }
    }
  }
};
</script>