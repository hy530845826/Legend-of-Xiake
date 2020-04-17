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
              <div class="Skill-Name">{{name_data[0]}}：</div>
              <div class="Skill-Introduction">
                向前方敌人快速释放波动剑，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>{{mp_data[0]}}</span>真气，冷却时间:
                <span>{{cd_data[0]}}</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(S)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[1]}}：</div>
              <div class="Skill-Introduction">
                拔刀并快速向周围敌人发出强威力的斩击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>{{mp_data[1]}}</span>真气，冷却时间:
                <span>{{cd_data[1]}}</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(D)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[2]}}：</div>
              <div class="Skill-Introduction">
                以极快的速度向前移动一段距离并斩击敌人，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>{{mp_data[2]}}</span>真气，冷却时间:
                <span>{{cd_data[2]}}</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(F)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[3]}}：</div>
              <div class="Skill-Introduction">
                把鬼神召唤到武器上，并向前方敌人发出强威力的斩击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>{{mp_data[3]}}</span>真气，冷却时间:
                <span>{{cd_data[3]}}</span>秒
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
              <div class="Skill-Name">{{name_data[4]}}：</div>
              <div class="Skill-Introduction">
                用心神洞察万物，可以增加
                <span>{{pl.ATK}}</span>点攻击，效果持续
                <span>20</span>秒。
                消耗:
                <span>{{mp_data[4]}}</span>真气，冷却时间:
                <span>{{cd_data[4]}}</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(W)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[5]}}</div>
              <div class="Skill-Introduction">
                挥剑向前方敌人发出巨大的剑气攻击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>{{mp_data[5]}}</span>真气，冷却时间:
                <span>{{cd_data[5]}}</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(E)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[6]}}：</div>
              <div class="Skill-Introduction">
                在原地向敌人发出迅猛的连续斩击，造成
                <span>{{pl.ATK}}-{{pl.ATKMAX}}</span>点伤害。
                消耗:
                <span>{{mp_data[6]}}</span>真气，冷却时间:
                <span>{{cd_data[6]}}</span>秒
              </div>
            </div>
          </li>
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(R)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[7]}}：</div>
              <div class="Skill-Introduction">Stand·The World</div>冷却时间:
              消耗:
              <span>{{mp_data[7]}}</span>真气，冷却时间:
              <span>{{cd_data[7]}}</span>秒
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../../js/player";
import player_data from "../../js/data/player_data.json";
var PlayerSkillData = player_data[1];
export default {
  name: "window-skill",
  data: function() {
    return {
      pl: Player.pll,
      name_data: [],
      cd_data: [],
      mp_data: []
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
    },
    LoadingSkillContent: function() {
      for (let index in PlayerSkillData) {
        var data = PlayerSkillData[index];
        this.name_data.push(data.UName);
        this.cd_data.push(data.UseCD / 20);
        this.mp_data.push(data.UseMP);
      }
    }
  },
  mounted() {
    this.LoadingSkillContent();
  }
};
</script>