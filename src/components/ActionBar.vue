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
export default {
  name: "test",
  methods: {
    LoadingSkillBar: function() {
      var SkillIconArr = $("#action-skill-bar li");
      var sum = SkillIconArr.length;
      for (let i = 0; i < sum; i++) {
        $(SkillIconArr[i]).css(
          "background-image",
          "url(static/images/skill-" + i + ".png)"
        );
      }
    }
  },
  mounted() {
    this.LoadingSkillBar();
  }
};
</script>