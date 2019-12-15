<template>
  <div id="role">
    <div id="role-body"></div>
    <div>{{sk}}</div>
  </div>
</template>
<script>
import sb from "../../js/player";

export default {
  name: "role",
  data: function() {
    return {
      sk: sb.hero,
      st: sb.pll
    };
  }
};
</script>