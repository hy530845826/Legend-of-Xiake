<template>
  <div id="Bdiv" class="MenuDiv">
    <div class="MenuTitle">
      <div class="MenuName">
        包裹
        <span class="MenuClose" @click="CloseWindow">X</span>
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
</template>
<script>
export default {
  name: "window-bag",
  data: function() {
    return {};
  },
  methods: {
    CloseWindow: function() {
      this.$emit("openWindowMenu", "null");
    }
  }
};
</script>