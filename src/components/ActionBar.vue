<template>
  <div id="action-bar">
    <ul id="action-skill-bar">
      <li>A</li>
      <li>S</li>
      <li>D</li>
      <li>F</li>
      <li>Q</li>
      <li>W</li>
      <li>E</li>
      <li>R</li>
    </ul>
    <ul id="action-skillcd-bar">
      <li @click="ClickSkill($event)"></li>
      <li @click="ClickSkill($event)"></li>
      <li @click="ClickSkill($event)"></li>
      <li @click="ClickSkill($event)"></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <ul id="action-bag-bar">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>
    <ul id="action-bagnum-bar">
      <li>{{bagnum_data[0]}}</li>
      <li>{{bagnum_data[1]}}</li>
      <li>{{bagnum_data[2]}}</li>
      <li>{{bagnum_data[3]}}</li>
      <li>{{bagnum_data[4]}}</li>
      <li>{{bagnum_data[5]}}</li>
    </ul>
    <ul id="action-bagcd-bar">
      <li @click="ClickBag($event)"></li>
      <li @click="ClickBag($event)"></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
import Player from "../js/player";
var pl = Player.pll;
import v from "../js/vuemove";
import t from "../js/tool";
import player_data from "../js/data/player_data.json";
var PlayerSkillData = player_data[1];
export default {
  name: "action-bar",
  data: function() {
    return {
      mp_data: [],
      bagnum_data: [3, 3, 0, 0, 0, 0]
    };
  },
  methods: {
    LoadingSkillBar: function() {
      var SkillIconArr = $("#action-skill-bar li");
      var SkillCDArr = $("#action-skillcd-bar li");
      var sum = SkillIconArr.length;
      for (let i = 0; i < sum; i++) {
        $(SkillIconArr[i]).css(
          "background-image",
          "url(static/images/skill/skill-" + i + ".png)"
        );
        $(SkillCDArr[i]).css("left", 54 * i + "px");
      }
    },
    LoadingBagBar: function() {
      var BagIconArr = $("#action-bag-bar li");
      var BagCDArr = $("#action-bagcd-bar li");
      var sum = BagIconArr.length;
      $(BagIconArr[0]).css(
        "background-image",
        "url(static/images/bag/potion-hp-0.jpg)"
      );
      $(BagIconArr[1]).css(
        "background-image",
        "url(static/images/bag/potion-mp-0.jpg)"
      );
      for (let i = 0; i < sum; i++) {
        $(BagCDArr[i]).css("left", 54 * i + "px");
      }
    },
    ClickSkill: function(e) {
      if (pl.loading) {
        return;
      }
      var target = e.currentTarget;
      var nowIndex = $(target).index();
      switch (nowIndex) {
        case 0: //A
          if (pl.IsFlash == false) {
            if (pl.CD_a == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillA");
                v.CDSkill(pl, 0, pl.needCD);
                v.GetAudio("pl", "skill_a");
              }
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 1: //S
          if (pl.IsFlash == false) {
            if (pl.CD_s == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillS");
                v.CDSkill(pl, 1, pl.needCD);
                v.GetAudio("pl", "skill_s");
              }
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 2: //D
          if (pl.IsFlash == false) {
            if (pl.CD_d == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillD", 540);
                v.CDSkill(pl, 2, pl.needCD);
                v.GetAudio("pl", "skill_d");
              }
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 3: //F
          if (pl.IsFlash == false) {
            if (pl.CD_f == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillF");
                v.CDSkill(pl, 3, pl.needCD);
                v.GetAudio("pl", "skill_f1");
              }
              setTimeout(function() {
                v.GetAudio("pl", "skill_f2");
              }, 600);
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
      }
    },
    ClickBag: function(e) {
      if (pl.loading) {
        return;
      }
      var target = e.currentTarget;
      var nowIndex = $(target).index();
      var bagFlag = false;
      if (pl.CD_bag == 0) {
        if (this.bagnum_data[nowIndex]) {
          this.$set(this.bagnum_data, nowIndex, this.bagnum_data[nowIndex] - 1);
          bagFlag = true;
          v.CDBag(pl, nowIndex);
          v.GetAudio("pl", "skill_a");
        }
      } else if (pl.CD_flag == 0) {
        v.CDBag(pl, -1);
        v.GetAudio("pl", "cd");
      }
      if (bagFlag) {
        switch (nowIndex) {
          case 0: //1
            t.UseConsumables(pl, "HP", 10);
            break;
          case 1: //2
            t.UseConsumables(pl, "MP", 20);
            break;
        }
      }
    },
    LoadingSkillContent: function() {
      for (let index in PlayerSkillData) {
        var data = PlayerSkillData[index];
        this.mp_data.push(data[0].UseMP);
      }
    },
    CheckSkillMP: function() {
      var that = this;
      setInterval(function() {
        var SkillIconArr = $("#action-skill-bar li");
        var plMP = pl.MP;
        for (let index in that.mp_data) {
          var needMP = that.mp_data[index];
          if (plMP < needMP) {
            $(SkillIconArr[index]).attr("class", "nomana");
          } else {
            $(SkillIconArr[index]).attr("class", "");
          }
        }
      }, 500);
    },
    CheckBagNum: function() {
      var that = this;
      setInterval(function() {
        var BagNumArr = $("#action-bagnum-bar li");
        for (let index in that.bagnum_data) {
          var bagnum = that.bagnum_data[index];
          bagnum
            ? $(BagNumArr[index]).attr("class", "")
            : $(BagNumArr[index]).attr("class", "nomana");
        }
      }, 500);
    }
  },
  mounted() {
    this.LoadingSkillBar();
    this.LoadingBagBar();
    this.LoadingSkillContent();
    this.CheckSkillMP();
    this.CheckBagNum();
  }
};
</script>