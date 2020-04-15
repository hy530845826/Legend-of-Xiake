<template>
  <div id="GameBox">
    <audio src="./static/sound/bgm/map-1.mp3" id="BGM" class="bgmusic" loop autoplay></audio>
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
              <li id="SettingSaveGame" @click="SettingConfirm($event)">保存游戏</li>
              <li id="SettingLoadGame" @click="SettingConfirm($event)">读取游戏</li>
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
        case "SettingSaveGame":
          if (confirm("确定要保存游戏吗？保存进度将会被覆盖") == true) {
            return true;
          }
          break;
        case "SettingLoadGame":
          if (confirm("确定要读取游戏吗？当前进度可能尚未保存") == true) {
            return true;
          }
          break;
        case "SettingQuitGame":
          if (confirm("确定要退出游戏吗？当前进度可能尚未保存") == true) {
            this.$router.push({ path: "/Home" });
          }
          break;
      }
    },
    LoadingSkillIcon: function() {
      var SkillIconArr = $("#Kdiv .SkillBox li .Skill-Icon");
      var sum = SkillIconArr.length;
      for (let i = 0; i < sum; i++) {
        $(SkillIconArr[i]).css(
          "background-image",
          "url(static/images/skill-" + i + ".png)"
        );
      }
    }
  },
  mounted() {
    this.LoadingSkillIcon();
    $("#BGM")[0].volume = 0.1;
  }
};
</script>
<style>