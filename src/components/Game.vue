<template>
  <div id="GameBox">
    <audio src="./static/sound/map-1.mp3" id="BGM" class="bgmusic" loop autoplay></audio>
    <main-interface />
    <action-bar />
    <status-bar :pl_lv="st.LV" @openWindowMenu="zdy($event)" ref="StatusBar" />
    <div id="WindowMenu">
      <div v-if="WindowName=='MenuB'">
        <div id="Bdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              包裹
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <div class="RoleBox">
            <div class="RoleBoxL">
              <ul>
                <li>
                  <span>图片</span>
                  <span>回手掏(A):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(S):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(D):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(F):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(A):</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="WindowName=='MenuI'">
        <div id="Idiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              角色
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <div class="RoleHead">
            <div class="Iimg">
              <img src="../assets/images/plstand.gif" />
            </div>
            <div class="RoleName">
              <ul>
                <li>〓{{st.appellation}}〓</li>
                <li>{{st.name}}</li>
                <li>
                  LV.
                  <span id="LV">1</span>
                </li>
                <li>
                  历练：
                  <span id="EXP">{{st.EXP}}</span> /
                  <span id="EXPMAX">{{st.EXPMAX}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="RoleBox">
            <div class="RoleBoxL">
              <ul>
                <li>
                  体力：
                  <span id="CON">{{st.HP}}</span> /
                  <span id="CONMAX">{{st.HPMAX}}</span>
                </li>
                <li>
                  攻击：
                  <span id="ATK">{{st.ATK}}</span> ~
                  <span id="ATKMAX">{{st.ATKMAX}}</span>
                </li>
                <li>
                  精准：
                  <span id="HIT">{{st.HIT}}</span>
                </li>
                <li>
                  力量：
                  <span id="STR">{{st.STR}}</span>
                </li>
                <li>
                  敏捷：
                  <span id="AGI">{{st.AGI}}</span>
                </li>
                <li>
                  学识：
                  <span id="INT">{{st.INT}}</span>
                </li>
              </ul>
            </div>
            <div class="RoleBoxR">
              <ul>
                <li>
                  内力：
                  <span id="MAG">{{st.MP}}</span> /
                  <span id="MAGMAX">{{st.MPMAX}}</span>
                </li>
                <li>
                  防御：
                  <span id="DEF">{{st.DEF}}</span>
                </li>
                <li>
                  身法：
                  <span id="DEX">{{st.DEX}}</span>
                </li>
                <li>
                  意志：
                  <span id="WIL">{{st.WIL}}</span>
                </li>
                <li>
                  感知：
                  <span id="PER">{{st.PER}}</span>
                </li>
                <li>
                  福缘：
                  <span id="LUK">{{st.LUK}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="WindowName=='MenuK'">
        <div id="Kdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              技能
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <div class="RoleBox">
            <div class="RoleBoxL">
              <ul>
                <li>
                  <span>图片</span>
                  <span>回手掏(A):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(S):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(D):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(F):</span>
                </li>
                <li>
                  <span>图片</span>
                  <span>回手掏(A):</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="WindowName=='MenuM'">
        <div id="Mdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              地图
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <div class="RoleBox">{{stenemy}}</div>
        </div>
      </div>
      <div v-if="WindowName=='MenuP'">
        <div id="Pdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">设置</div>
          </div>
          <div class="SettingBox">
            <ul>
              <li @click="ReturnGame">返回游戏</li>
              <li id="SettingMusic" @click="SettingMusic()">音乐：{{MusicFlagText}}</li>
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
import Player from "../js/player";
import Enemy from "../js/enemy";
import "../js/vueblank";

export default {
  name: "game",
  data: function() {
    return {
      WindowName: "null",
      st: Player.pll,
      stenemy: Enemy.ell,
      MusicFlag: true,
      MusicFlagText: "开"
    };
  },
  components: {
    MainInterface,
    ActionBar,
    StatusBar
  },
  methods: {
    zdy(msg) {
      this.WindowName = msg;
    },
    ReturnGame: function() {
      this.WindowName = "null";
      this.$refs.StatusBar.MenuFlag = "null"; //修改子组件flag值 解决设置再次打开需要2次的bug
    },
    SettingMusic: function() {
      this.MusicFlag = !this.MusicFlag;
      if (this.MusicFlag) {
        this.MusicFlagText = "开";
        $(".bgmusic")[0].play();
      } else {
        this.MusicFlagText = "关";
        $(".bgmusic")[0].pause();
      }
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
    }
  }
};
</script>
<style>