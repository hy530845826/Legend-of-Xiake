# Legend-of-Xiake（侠客风云传）
```
By Han$on(cqupt)
```
## 开发进度（45/66）

### 系统配置
+ `**主体框架架构**`
+ `**路由跳转**`
+ `**插件jq引入**`
+ `**插件bootstrap引入**`
+ `**webpack配置**`
+ `git关联`

### 文件架构
+ `目录`
+ `**组件**`
+ `**静态数据引用**`

### 角色移动
+ `**方向移动**`
+ `优化按键延迟`
+ `**碰撞判定**`

### 图像显示
+ `**主页**`
+ `**状态条**`
+ `状态页面`
+ `操作说明`
+ `**图像转向**`
+ `z-index覆盖`
+ `**Loading**`

### 打斗
+ `按键出招`
+ `优化按键延迟`
+ `**打斗判定**`
+ `-HP提示`
+ !音效绑定!

### 敌人
+ `随机移动`
+ !更多数据!
+ !更多图像!
+ !**靠近角色寻路算法**!
+ `**敌人姓名等级血条绑定**`

### 背包
+ `背包页面`
+ !道具使用!
+ !道具图标!
+ !数据绑定!

### 技能
+ `技能页面`
+ `多动作条`
+ !技能CD转动!
+ `技能图标`
+ !数据绑定!

### 任务
+ !任务页面!
+ `接取任务界面`
+ !**跨地图任务实现**!
+ !道具任务逻辑!
+ !杀敌任务逻辑!

### 地图
+ `地图页面`
+ `**传送门**`
+ !**地图背景**!
+ !**不同地图可移动范围**!

### 音乐
+ `音乐开关`
+ `**音乐切换**`
+ `**背景音乐**`
+ !**战斗音效**!

### 文案
+ !**文案**!

### 数据存储
+ !**数据存储**!
+ !**数据读取**!

### 2.0系统大改：
支持任意大小player，不再固定130x130，判定系统彻底重做
+ `**new-图像补正**`
+ `**new-图像转向**`
+ `**new-被击每帧区域动态改变**`
+ `**new-打击每帧区域动态改变**`
+ `**new-技能动作捕捉**`
+ !**new-打斗判定**!
+ !new-技能特效!
+ 解决逆向plx-bug
+ **new-取消打斗多次判定-bug**
+ *new-敌人2.0图像绑定重做*
+ `new-NPC框架`
+ `new-根据地图加载敌人NPC数据`