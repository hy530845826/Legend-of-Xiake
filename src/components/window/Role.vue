<template>
  <div id="Idiv" class="MenuDiv">
    <div class="MenuTitle">
      <div class="MenuName">
        角色
        <span class="MenuClose" @click="CloseWindow">X</span>
      </div>
    </div>
    <div class="RoleHead">
      <div class="Iimg">
        <img src="../../assets/images/plstand.gif" />
      </div>
      <div class="RoleName">
        <ul>
          <li>〓{{pl.appellation}}〓</li>
          <li>{{pl.name}}</li>
          <li>
            LV.
            <span id="LV">1</span>
          </li>
          <li>
            历练：
            <span id="EXP">{{pl.EXP}}</span> /
            <span id="EXPMAX">{{pl.EXPMAX}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="RoleBox">
      <div class="RoleBoxL">
        <ul>
          <li>
            体力：
            <span id="CON">{{pl.HP}}</span> /
            <span id="CONMAX">{{pl.HPMAX}}</span>
          </li>
          <li>
            攻击：
            <span id="ATK">{{pl.ATK}}</span> ~
            <span id="ATKMAX">{{pl.ATKMAX}}</span>
          </li>
          <li>
            精准：
            <span id="HIT">{{pl.HIT}}</span>
          </li>
          <li>
            力量：
            <span id="STR">{{pl.STR}}</span>
          </li>
          <li>
            敏捷：
            <span id="AGI">{{pl.AGI}}</span>
          </li>
          <li>
            学识：
            <span id="INT">{{pl.INT}}</span>
          </li>
        </ul>
      </div>
      <div class="RoleBoxR">
        <ul>
          <li>
            内力：
            <span id="MAG">{{pl.MP}}</span> /
            <span id="MAGMAX">{{pl.MPMAX}}</span>
          </li>
          <li>
            防御：
            <span id="DEF">{{pl.DEF}}</span>
          </li>
          <li>
            身法：
            <span id="DEX">{{pl.DEX}}</span>
          </li>
          <li>
            意志：
            <span id="WIL">{{pl.WIL}}</span>
          </li>
          <li>
            感知：
            <span id="PER">{{pl.PER}}</span>
          </li>
          <li>
            福缘：
            <span id="LUK">{{pl.LUK}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../../js/player";
export default {
  name: "window-role",
  data: function() {
    return {
      pl: Player.pll
    };
  },
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMenu", "null");
    }
  }
};
</script>