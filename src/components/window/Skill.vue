<template>
  <div id="Kdiv" class="MenuDiv">
    <div class="MenuTitle">
      <div class="MenuName">
        技能
        <span class="MenuClose" @click="CloseWindow">X</span>
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
              <div class="Skill-Introduction">
                向前方敌人快速释放波动剑，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>5</span>真气，冷却时间:
                <span>3</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(S)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">一刀流·居合·狮子歌歌：</div>
              <div class="Skill-Introduction">
                拔刀并快速向周围敌人发出强威力的斩击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>15</span>真气，冷却时间:
                <span>6</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(D)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">青龙吟·流水：</div>
              <div class="Skill-Introduction">
                以极快的速度向前移动一段距离并斩击敌人，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>20</span>真气，冷却时间:
                <span>6</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(F)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">一刀流·鬼斩：</div>
              <div class="Skill-Introduction">
                把鬼神召唤到武器上，并向前方敌人发出强威力的斩击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>10</span>真气，冷却时间:
                <span>3</span>秒
              </div>
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
              <div class="Skill-Introduction">
                用心神洞察万物，可以增加
                <span>{{pl.ATK}}</span>点攻击，效果持续
                <span>20</span>秒。
                冷却时间:
                <span>3</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(W)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">三刀流·百八烦恼风</div>
              <div class="Skill-Introduction">
                挥剑向前方敌人发出巨大的剑气攻击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                冷却时间:
                <span>3</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(E)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">奥义·三千世界：</div>
              <div class="Skill-Introduction">
                在原地向敌人发出迅猛的连续斩击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                冷却时间:
                <span>3</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(R)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">一大·三千·大千世界：</div>
              <div class="Skill-Introduction">Stand·The World</div>冷却时间:
              <span>3</span>秒
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../../js/player";
export default {
  name: "window-skill",
  data: function() {
    return {
      pl: Player.pll
    };
  },
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMenu", "null");
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
  }
};
</script>