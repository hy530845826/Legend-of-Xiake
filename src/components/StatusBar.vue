<template>
  <div id="Setting">
    <div id="Blank3">
      <div id="BlankHP" class="BlankBox">
        <p>精</p>
        <div id="JdtHP" class="JdtBox">
          <div class="progress">
            <div
              id="axe"
              class="progress-bar progress-bar-striped bg-danger progress-bar-animated"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width:0%"
            >null</div>
          </div>
        </div>
      </div>
      <div id="BlankMP" class="BlankBox">
        <p>气</p>
        <div id="JdtMP" class="JdtBox">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 0%"
            >null</div>
          </div>
        </div>
      </div>
      <div id="BlankEXP" class="BlankBox">
        <p>神</p>
        <div id="JdtEXP" class="JdtBox">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped bg-warning progress-bar-animated"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 100%"
            >null</div>
          </div>
        </div>
      </div>
    </div>
    <div id="Level">LV.1</div>
    <div id="Menu">
      <ul id="Menuul">
        <li id="MenuJ" @click="addexp">委托(J)</li>
        <li id="MenuI" @click="toParent($event)">角色(I)</li>
        <!-- <li id="MenuB">包裹(B)</li> -->
        <li id="MenuB" @click="toParent($event)">{{mlgb}}</li>
        <li id="MenuK" @click="toParent($event)">技能(K)</li>
        <li id="MenuM" @click="toParent($event)">地图(M)</li>
        <li id="MenuP">设置(P)</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "test",
  data: function() {
    return {
      MenuFlag: "null"
    };
  },
  props: ["mlgb"],
  methods: {
    toParent: function(e) {
      var FlagID = e.currentTarget.id;
      //传输到父组件的值用来判定v-if（WindowName）
      if (this.MenuFlag === FlagID) {
        this.MenuFlag = "null";
        this.$emit("openWindowMenu", "null");
      } else {
        this.MenuFlag = FlagID;
        this.$emit("openWindowMenu", FlagID);
      }
    },
    addexp: function() {}
  }
};
</script>