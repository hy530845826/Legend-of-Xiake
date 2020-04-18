<template>
  <div id="GameBox">
    <audio src id="BGM" class="bgmusic" loop autoplay></audio>
    <audio src id="EnAudio" class="bgmusic" loop autoplay></audio>
    <main-interface />
    <action-bar />
    <status-bar :pl_lv="pl.LV" @openWindowMenu="zdy($event)" ref="StatusBar" />
    <introduction v-show="WindowName=='introduction'" @openWindowMenu="zdy2($event)" />
    <div id="WindowMenu">
      <window-role v-show="WindowName=='MenuI'" @openWindowMenu="zdy2($event)" />
      <window-bag v-show="WindowName=='MenuB'" @openWindowMenu="zdy2($event)" />
      <window-skill v-show="WindowName=='MenuK'" @openWindowMenu="zdy2($event)" />
      <window-map v-show="WindowName=='MenuM'" @openWindowMenu="zdy2($event)" />
      <div v-show="WindowName=='MenuP'">
        <div id="Pdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">设置</div>
          </div>
          <div class="SettingBox">
            <ul>
              <li @click="ReturnGame">返回游戏</li>
              <li id="SettingMusic" @click="SettingMusic()">音乐：{{MusicFlagText}}</li>
              <li id="SettingIntroduction" @click="SettingIntroduction()">游戏说明</li>
              <li id="SettingSaveGame" @click="SaveGame()">保存游戏</li>
              <li id="SettingLoadGame" @click="LoadGame()">读取游戏</li>
              <li id="SettingQuitGame" @click="SettingConfirm($event)">退出游戏</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainInterface from "./MainInterface.vue";
import ActionBar from "./ActionBar.vue";
import StatusBar from "./StatusBar.vue";
import Introduction from "./window/Introduction.vue";
import WindowRole from "./window/Role.vue";
import WindowBag from "./window/Bag.vue";
import WindowSkill from "./window/Skill.vue";
import WindowMap from "./window/Map.vue";
import Player from "../js/player";
import Enemy from "../js/enemy";
import Npc from "../js/npc";
import v from "../js/vuemove";
import "../js/vueblank";

export default {
  name: "game",
  data: function() {
    return {
      WindowName: "null",
      pl: Player.pll,
      ell: Enemy.ell,
      npc_data: Npc.npc,
      MusicFlag: true,
      MusicFlagText: "开"
    };
  },
  components: {
    MainInterface,
    ActionBar,
    StatusBar,
    Introduction,
    WindowRole,
    WindowBag,
    WindowSkill,
    WindowMap
  },
  methods: {
    zdy(msg) {
      this.WindowName = msg;
    },
    zdy2(msg) {
      this.WindowName = msg;
      this.$refs.StatusBar.MenuFlag = "null";
    },
    ReturnGame: function() {
      this.WindowName = "null";
      this.$refs.StatusBar.MenuFlag = "null"; //修改子组件flag值 解决设置再次打开需要2次的bug
    },
    SettingMusic: function() {
      this.MusicFlag = !this.MusicFlag;
      if (this.MusicFlag) {
        this.MusicFlagText = "开";
        $("#BGM")[0].play();
      } else {
        this.MusicFlagText = "关";
        $("#BGM")[0].pause();
      }
    },
    SettingIntroduction: function() {
      this.WindowName = "introduction";
    },
    SettingConfirm: function(e) {
      var SettingID = e.currentTarget.id;
      switch (SettingID) {
        case "SettingQuitGame":
          if (confirm("确定要退出游戏吗？当前进度可能尚未保存") == true) {
            this.$router.push({ path: "/Home" });
          }
          break;
      }
    },
    SaveGame: function() {
      this.ReturnGame();
      if (confirm("确定要保存游戏吗？保存进度将会被覆盖") == true) {
        var objpl = this.pl;
        var BAG_DATA = this.pl.BAG;
        localStorage.setItem("BAG_DATA", JSON.stringify(BAG_DATA));
        var PL_DATA = [];
        PL_DATA.push({
          appellation: objpl.appellation,
          name: objpl.name,
          plx: objpl.plx,
          ply: objpl.ply,
          LV: objpl.LV,
          HPMAX: objpl.HPMAX,
          HP: objpl.HP,
          MPMAX: objpl.MPMAX,
          MP: objpl.MP,
          EXPMAX: objpl.EXPMAX,
          EXP: objpl.EXP,
          WEAP: objpl.WEAP,
          ARMOR: objpl.ARMOR,
          ATK: objpl.WEAP + objpl.STR,
          ATKMAX: objpl.WEAP + objpl.STR * 3,
          HIT: objpl.HIT,
          DEF: objpl.ARMOR + objpl.DEX,
          DEX: objpl.DEX,
          STR: objpl.STR,
          AGI: objpl.AGI,
          INT: objpl.INT,
          WIL: objpl.WIL,
          PER: objpl.PER,
          LUK: objpl.LUK
        });
        localStorage.setItem("PL_DATA", JSON.stringify(PL_DATA));
        var MAP_DATA = [];
        var MapIDNumber = v.GetMapIDNumber();
        var MapBGMNumber = v.GetMapBGMNumber(MapIDNumber);
        var AudioName = v.GetAudioName(MapIDNumber);
        MAP_DATA.push({
          PortalToMapID: MapIDNumber,
          PortalMusicID: MapBGMNumber,
          AudioName: AudioName,
          MapIDNumber: -1,
          MapBGMNumber: -1
        });
        localStorage.setItem("MAP_DATA", JSON.stringify(MAP_DATA));
        return true;
      }
    },
    LoadGame: function() {
      this.ReturnGame();
      if (confirm("确定要读取游戏吗？当前进度可能尚未保存") == true) {
        var BAG_DATA = localStorage.getItem("BAG_DATA");
        var PL_DATA = localStorage.getItem("PL_DATA");
        var MAP_DATA = localStorage.getItem("MAP_DATA");
        var pl_data = JSON.parse(PL_DATA)[0];
        var map_data = JSON.parse(MAP_DATA)[0];
        Object.assign(this.pl, pl_data);
        this.pl.BAG = JSON.parse(BAG_DATA);
        v.Loading(
          map_data.MapIDNumber,
          map_data.PortalToMapID,
          map_data.MapBGMNumber,
          map_data.PortalMusicID,
          map_data.AudioName,
          false,
          false
        );
        return true;
      }
    },
    LoadingSkillIcon: function() {
      var SkillIconArr = $("#Kdiv .SkillBox li .Skill-Icon");
      var sum = SkillIconArr.length;
      for (let i = 0; i < sum; i++) {
        $(SkillIconArr[i]).css(
          "background-image",
          "url(static/images/skill/skill-" + i + ".png)"
        );
      }
    }
  },
  mounted() {
    this.LoadingSkillIcon();
    $("#BGM")[0].volume = 0.25;
    $("#EnAudio")[0].volume = 0.25;
  }
};
</script>
<style>