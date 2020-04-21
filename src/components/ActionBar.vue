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
      <li @click="ClickSkill($event)"></li>
      <li @click="ClickSkill($event)"></li>
      <li @click="ClickSkill($event)"></li>
      <li @click="ClickSkill($event)"></li>
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
      <li @click="ClickBag($event)"></li>
      <li @click="ClickBag($event)"></li>
      <li @click="ClickBag($event)"></li>
      <li @click="ClickBag($event)"></li>
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
var PlayerBagData = player_data[2];
export default {
  name: "action-bar",
  data: function() {
    return {
      mp_data: [],
      bagnum_data: []
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
      $(BagIconArr[2]).css(
        "background-image",
        "url(static/images/bag/potion-hmp-0.jpg)"
      );
      $(BagIconArr[3]).css(
        "background-image",
        "url(static/images/bag/food-fruit-0.jpg)"
      );
      $(BagIconArr[4]).css(
        "background-image",
        "url(static/images/bag/food-meat-0.jpg)"
      );
      $(BagIconArr[5]).css(
        "background-image",
        "url(static/images/bag/drug-flower-0.jpg)"
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
                v.CDSkill(pl, nowIndex, pl.needCD);
                v.GetAudio("pl", "skill_a", 2);
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
                v.CDSkill(pl, nowIndex, pl.needCD);
                v.GetAudio("pl", "skill_s1", 2);
                setTimeout(function() {
                  v.GetAudio("pl", "skill_s2");
                }, 300);
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
                v.CDSkill(pl, nowIndex, pl.needCD);
                v.GetAudio("pl", "skill_d1");
                setTimeout(function() {
                  v.GetAudio("pl", "skill_d2");
                }, 700);
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
                v.CDSkill(pl, nowIndex, pl.needCD);
                v.GetAudio("pl", "skill_f1");
                setTimeout(function() {
                  v.GetAudio("pl", "skill_f2");
                }, 700);
              }
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 4: //Q
          if (pl.IsFlash == false) {
            if (pl.CD_q == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillQ");
                v.CDSkill(pl, nowIndex, pl.needCD);
                t.UseConsumables(pl, "ATK", pl.LV, true, 10);
                v.GetAudio("pl", "skill_q", 2);
              }
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 5: //W
          if (pl.IsFlash == false) {
            if (pl.CD_w == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillW");
                v.CDSkill(pl, nowIndex, pl.needCD);
                v.GetAudio("pl", "skill_w", 2);
                setTimeout(function() {
                  v.CreateZD(pl, pl.plx, pl.ply - 50);
                }, 400);
              }
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 7: //R
          if (pl.IsFlash == false) {
            if (pl.CD_r == 0) {
              v.GetUseCDMP(pl, nowIndex);
              pl.IsMana = t.UseSkillMP(pl, pl.needMP);
              if (pl.IsMana) {
                v.flash(pl, "skillQ");
                v.CDSkill(pl, nowIndex, pl.needCD);
                v.GetAudio("pl", "skill_r");
                v.theWorld();
              }
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
      if (pl.CD_bag == 0) {
        v.GetBagNum(pl, nowIndex);
        if (pl.bagNum) {
          v.UpdateBag(pl, nowIndex, 1);
          this.$set(this.bagnum_data, nowIndex, pl.bagNum - 1);
          t.UseConsumables(
            pl,
            pl.bagStyle,
            pl.bagValue,
            pl.bagTemporary,
            pl.bagTime
          );
          v.CDBag(pl);
          v.GetAudio("pl", "bag");
        }
      } else if (pl.CD_flag == 0) {
        v.CDBag(pl, true);
        v.GetAudio("pl", "cd");
      }
    },
    LoadingSkillContent: function() {
      for (let index in PlayerSkillData) {
        var data = PlayerSkillData[index];
        this.mp_data.push(data.UseMP);
      }
    },
    LoadingBagContent: function() {
      for (let index in PlayerBagData) {
        var data = PlayerBagData[index];
        this.bagnum_data.push(data.Num);
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
    },
    Updatebagdata: function() {
      var that = this;
      setInterval(function() {
        for (let index in that.bagnum_data) {
          v.GetBagNum(pl, index);
          that.$set(that.bagnum_data, index, pl.bagNum);
        }
      }, 500);
    }
  },
  mounted() {
    this.LoadingSkillBar();
    this.LoadingBagBar();
    this.LoadingSkillContent();
    this.LoadingBagContent();
    this.CheckSkillMP();
    this.CheckBagNum();
    this.Updatebagdata();
  }
};
</script>