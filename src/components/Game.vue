<template>
  <div id="GameBox">
    <main-interface />
    <action-bar />
    <status-bar :mlgb="niceteam" @openWindowMenu="zdy($event)" />
    <div id="WindowMenu">
      <div v-if="WindowName=='MenuB'">
        <div id="Bdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              包裹
              <span class="MenuClose">X</span>
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
              <span class="MenuClose">X</span>
            </div>
          </div>
          <div class="RoleHead">
            <div class="Iimg">
              <img src="../assets/images/plstand.gif" />
            </div>
            <div class="RoleName">
              <ul>
                <li>〓初入江湖〓</li>
                <li>黄富贵</li>
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
              <span class="MenuClose">X</span>
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
              <span class="MenuClose">X</span>
            </div>
          </div>
          <div class="RoleBox">
            {{stenemy}}
            {{st}}
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
      stenemy: Enemy.enemytank,
      niceteam: "fk"
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
    }
  }
};
</script>
<style>