<template>
  <div id="GameBox">
    <audio src="./static/sound/map-1.mp3" id="BGM" class="bgmusic" loop autoplay></audio>
    <main-interface />
    <action-bar />
    <status-bar :pl_lv="st.LV" @openWindowMenu="zdy($event)" ref="StatusBar" />
    <introduction v-show="WindowName=='introduction'" @openWindowMenu="zdy2($event)" />
    <div id="WindowMenu">
      <div v-show="WindowName=='MenuB'">
        <div id="Bdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              包裹
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <div class="BagBox">
            <ul>
              <li>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
              <li>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
              <li>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
              <li>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
            <div class="Bag-Introduction">装备介绍</div>
            <div class="Bag-Money">
              铜钱：
              <span id="money">0</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="WindowName=='MenuI'">
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
      <div v-show="WindowName=='MenuK'">
        <div id="Kdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              技能
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <div class="SkillBox">
            <div class="SkillCheckBox" id="SkillCheckBox">
              <ul>
                <li class="checked" @click="ChangeSkillPage($event)"></li>
                <li @click="ChangeSkillPage($event)"></li>
              </ul>
            </div>
            <div class="Skill-Content">
              <ul class="Skill-page0">
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(A)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">二刀流·鹰波：</div>
                    <div class="Skill-Introduction">地裂波动剑</div>
                  </div>
                </li>
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(S)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">一刀流·居合·狮子歌歌：</div>
                    <div class="Skill-Introduction">拔刀斩</div>
                  </div>
                </li>
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(D)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">青龙吟·流水：</div>
                    <div class="Skill-Introduction">三段斩</div>
                  </div>
                </li>
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(F)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">一刀流·鬼斩：</div>
                    <div class="Skill-Introduction">鬼斩</div>
                  </div>
                </li>
              </ul>
              <ul class="Skill-page1 hidden">
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(Q)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">阿修罗·壹雾银：</div>
                    <div class="Skill-Introduction">buff</div>
                  </div>
                </li>
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(W)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">三刀流·百八烦恼风</div>
                    <div class="Skill-Introduction">推波</div>
                  </div>
                </li>
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(E)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">奥义·三千世界：</div>
                    <div class="Skill-Introduction">幻影剑舞</div>
                  </div>
                </li>
                <li>
                  <div class="Skill-L">
                    <span class="Skill-Icon"></span>
                    <div class="Skill-Key">(R)</div>
                  </div>
                  <div class="Skill-R">
                    <div class="Skill-Name">一大·三千·大千世界：</div>
                    <div class="Skill-Introduction">Stand·The World</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-show="WindowName=='MenuM'">
        <div id="Mdiv" class="MenuDiv">
          <div class="MenuTitle">
            <div class="MenuName">
              地图
              <span class="MenuClose" @click="ReturnGame">X</span>
            </div>
          </div>
          <table id="MapContent">
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-3">木人巷1</td>
              <td id="map-4">木人巷2</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-1" class="Player-Position">少林1</td>
              <td id="map-2">少林2</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td id="map-19">魔教</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-5">嵩山1</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td id="map-17">大沙漠2</td>
              <td id="map-18">大沙漠1</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-6">嵩山2</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td colspan="5" rowspan="4" id="map-0">中原</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-10">铁掌峰</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td id="map-12">蜀南竹海2</td>
              <td id="map-11">蜀南竹海1</td>
              <td id="map-7">武当1</td>
              <td id="map-8">武当2</td>
              <td id="map-9">武当道场</td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td id="map-13">唐门</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-16">峨眉</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td id="map-14">绝情谷1</td>
              <td id="map-15">绝情谷2</td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
            <tr>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
              <td class="no-space"></td>
            </tr>
          </table>
        </div>
      </div>
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
import Introduction from "./Introduction.vue";
import Player from "../js/player";
import Enemy from "../js/enemy";
import Npc from "../js/npc";
import "../js/vueblank";

export default {
  name: "game",
  data: function() {
    return {
      WindowName: "null",
      st: Player.pll,
      stenemy: Enemy.ell,
      npc_data: Npc.npc,
      MusicFlag: true,
      MusicFlagText: "开"
    };
  },
  components: {
    MainInterface,
    ActionBar,
    StatusBar,
    Introduction
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
        $(".bgmusic")[0].play();
      } else {
        this.MusicFlagText = "关";
        $(".bgmusic")[0].pause();
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
    },
    ChangeSkillPage: function(e) {
      var target = e.currentTarget;
      var nowIndex = $(target).index();
      $(target)
        .siblings()
        .removeClass("checked");
      $(target).addClass("checked");
      $(".Skill-Content ul").addClass("hidden");
      $(".Skill-Content ul:eq(" + nowIndex + ")").removeClass("hidden");
    }
  },
  mounted() {
    this.LoadingSkillIcon();
  }
};
</script>
<style>