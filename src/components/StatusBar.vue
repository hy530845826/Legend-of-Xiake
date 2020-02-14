<template>
    <div id="Setting">
      <div id="Blank3">
        <div id="Blank3">
					<div id="BlankHP" class="BlankBox">
						<p>精</p>
						<div id="JdtHP" class="JdtBox">
							<div class="layui-progress layui-progress-big" lay-filter="JdtHP" lay-showPercent="true">
								<div class="layui-progress-bar layui-bg-red" lay-percent="100%"></div>
							</div>
						</div>
					</div>
					<div id="BlankMP" class="BlankBox">
						<p>气</p>
						<div id="JdtMP" class="JdtBox">
							<div class="layui-progress layui-progress-big" lay-filter="JdtMP" lay-showPercent="true">
								<div class="layui-progress-bar layui-bg-blue" lay-percent="100%"></div>
							</div>
						</div>
					</div>
					<div id="BlankEXP" class="BlankBox">
						<p>神</p>
						<div id="JdtEXP" class="JdtBox">
							<div class="layui-progress layui-progress-big" lay-filter="JdtEXP" lay-showPercent="true" id="zz">
								<div class="layui-progress-bar layui-bg-orange" lay-percent="0%"></div>
							</div>
						</div>
					</div>
				</div>
      </div>
      <div id="Level">LV.1</div>
      <div id="Menu">
        <ul id="Menuul">
          <li id="MenuJ">委托(J)</li>
          <li id="MenuI">角色(I)</li>
          <li id="MenuB">包裹(B)</li>
          <li id="MenuK">技能(K)</li>
          <li id="MenuM">地图(M)</li>
          <li id="MenuP">设置(P)</li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name: "test"
};
</script>