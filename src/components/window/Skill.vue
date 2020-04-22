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
          <li @click="ChangeSkillPage($event)"></li>
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
              <div class="Skill-Introduction">向前方敌人快速释放波动剑。挥剑与波动剑气均能造成伤害。</div>
              <div class="Skill-Value">
                <p>
                  伤害：
                  <span>({{pl.ATK}} - {{pl.ATK + 2}}) × 2</span>点
                </p>
                <p>
                  消耗：
                  <span>{{mp_data[0]}}</span>真气
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[0]}}</span>秒
                </p>
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
                拔刀并快速向周围敌人发出强威力的斩击。每次斩击必定
                <b>双倍暴击</b>。技能伤害受到角色
                <b>感知</b>额外加成。
              </div>
              <div class="Skill-Value">
                <p>
                  伤害：
                  <span>({{pl.ATK}} - {{pl.ATKMAX}}) + {{pl.PER}}</span>点
                </p>
                <p>
                  消耗：
                  <span>{{mp_data[1]}}</span>真气
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[1]}}</span>秒
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul class="Skill-page1 hidden">
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(D)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[2]}}：</div>
              <div class="Skill-Introduction">
                以极快的速度向前移动一段距离并斩击敌人，移动过程中
                <b>无视</b>所有伤害。技能伤害受到角色
                <b>敏捷</b>额外加成。
              </div>
              <div class="Skill-Value">
                <p>
                  伤害：
                  <span>{{pl.ATK + (pl.AGI * 2) - pl.LV}} - {{pl.ATKMAX + (pl.AGI * 2) - pl.LV}}</span>点
                </p>
                <p>
                  消耗：
                  <span>{{mp_data[2]}}</span>真气
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[2]}}</span>秒
                </p>
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
                把鬼神召唤到武器上，并向前方敌人发出强威力的斩击。技能伤害受到角色
                <b>力量</b>额外加成。
              </div>
              <div class="Skill-Value">
                <p>
                  伤害：
                  <span>{{pl.ATK + (pl.STR) + 2 - pl.LV}} - {{pl.ATKMAX + (pl.STR) + 1 - pl.LV}}</span>点
                </p>
                <p>
                  消耗：
                  <span>{{mp_data[3]}}</span>真气
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[3]}}</span>秒
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul class="Skill-page2 hidden">
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(Q)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[4]}}：</div>
              <div class="Skill-Introduction">
                用心神洞察万物。在一定时间内提升角色
                <b>攻击</b>。技能效果受到角色
                <b>等级</b>额外加成。
              </div>
              <div class="Skill-Value">
                <p>
                  提升攻击：
                  <span>{{pl.LV*2}}</span>点
                </p>
                <p>
                  消耗：
                  <span>{{mp_data[4]}}</span>真气
                </p>
                <p>
                  持续时间：
                  <span>10</span>秒
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[4]}}</span>秒
                </p>
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
                挥剑向前方敌人发出巨大的剑气攻击。技能飞行距离受到角色
                <b>等级</b>额外加成。
              </div>
              <div class="Skill-Value">
                <p>
                  伤害：
                  <span>{{pl.ATK + 3}} - {{pl.ATKMAX + 2}}</span>点
                </p>
                <p>
                  消耗：
                  <span>{{mp_data[5]}}</span>真气
                </p>
                <p>
                  飞行距离：
                  <span>500</span>码
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[5]}}</span>秒
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul class="Skill-page3 hidden">
          <li>
            <div class="Skill-L">
              <span class="Skill-Icon"></span>
              <div class="Skill-Key">(E)</div>
            </div>
            <div class="Skill-R">
              <div class="Skill-Name">{{name_data[6]}}：</div>
              <div class="Skill-Introduction">在原地向敌人发出迅猛的连续斩击。</div>
              <div class="Skill-Value">
                <p>
                  伤害：
                  <span>({{pl.ATK}} - {{pl.ATK + 1}}) × 13</span>点
                </p>
                <p>
                  消耗：
                  <span>30%</span>最大真气
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[6]}}</span>秒
                </p>
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
              <div class="Skill-Introduction">
                Stand·The World(ザ·ワールド)的能力可以
                <b>暂停时间</b>数秒，在被暂停的时间中只有替身及其本体可以行动。
              </div>
              <div class="Skill-Value">
                <p>
                  消耗：
                  <span>50%</span>最大真气
                </p>
                <p>
                  冷却时间：
                  <span>{{cd_data[7]}}</span>秒
                </p>
              </div>
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