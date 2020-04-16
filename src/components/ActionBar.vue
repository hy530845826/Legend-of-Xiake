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
  </div>
</template>
<script>
import Player from "../js/player";
var pl = Player.pll;
import v from "../js/vuemove";
export default {
  name: "test",
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
    ClickSkill: function(e) {
      if (pl.loading) { return }
      var target = e.currentTarget;
      var nowIndex = $(target).index();
      switch (nowIndex) {
        case 0: //A
          if (pl.IsFlash == false) {
            if (pl.CD_a == 0) {
              v.flash(pl, "skillA");
              v.CDSkill(pl, 0, 60);
              v.GetAudio("pl", "skill_a");
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 1: //S
          if (pl.IsFlash == false) {
            if (pl.CD_s == 0) {
              v.flash(pl, "skillS");
              v.CDSkill(pl, 1, 120);
              v.GetAudio("pl", "skill_s");
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 2: //D
          if (pl.IsFlash == false) {
            if (pl.CD_d == 0) {
              v.flash(pl, "skillD", 540);
              v.CDSkill(pl, 2, 120);
              v.GetAudio("pl", "skill_d");
            } else if (pl.CD_flag == 0) {
              v.CDSkill(pl, -1, 20);
              v.GetAudio("pl", "cd");
            }
          }
          break;
        case 3: //F
          if (pl.IsFlash == false) {
            if (pl.CD_f == 0) {
              v.flash(pl, "skillF");
              v.CDSkill(pl, 3, 60);
              v.GetAudio("pl", "skill_f1");
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
    }
  },
  mounted() {
    this.LoadingSkillBar();
  }
};
</script>