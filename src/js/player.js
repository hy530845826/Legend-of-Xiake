var pll = new CreatePlayer(0, 500,
	1, 50, 50, 50, 50, 100, 0,
	0, 0,
	90, 0, 1, 1, 1, 0, 0, 0)

function CreatePlayer(plx, ply, lv, hpmax, hp, mpmax, mp, expmax, exp, weap, armor, hit, dex, str, agi, intt, wil, per, luk) {
	this.appellation = '初入江湖'
	this.name = '黄富贵'
	this.plx = plx
	this.ply = ply

	this.LV = lv
	this.HPMAX = hpmax
	this.HP = hp
	this.MPMAX = mpmax
	this.MP = mp
	this.EXPMAX = expmax
	this.EXP = exp

	this.WEAP = weap
	this.ARMOR = armor

	this.ATK = weap + str
	this.ATKMAX = weap + str * 3
	this.HIT = hit
	this.DEF = armor + dex
	this.DEX = dex
	this.STR = str
	this.AGI = agi
	this.INT = intt
	this.WIL = wil
	this.PER = per
	this.LUK = luk

	this.speed = 10
	this.realfx = true //平移方向：右true左false
	this.imgfx = true
	this.hit_ID = 0 //技能伤害指示
	this.loading = false //是否加载地图
	this.IsFlash = false
	this.Audio_move_l = -200 //路过npc触发语音坐标
	this.Audio_move_r = -200
	this.IsMana = true //本次技能是否够蓝

	this.stand_x = 67
	this.stand_y = 124
	this.stop_l = 0
	this.stop_t = 0
	this.stop_r = 0
	this.stop_b = 0

	this.CD_flag = 0
	this.CD_a = 0
	this.CD_s = 0
	this.CD_d = 0
	this.CD_f = 0
	this.CD_bag = 0
	this.CD_bagMax = 20
}

function LevelUP() {
	pll.EXP = pll.EXP - pll.EXPMAX
	pll.HP = pll.HPMAX
	pll.MP = pll.MPMAX
	pll.LV += 1
	pll.ATK++
	pll.ATKMAX++
	$('#Level').innerHTML = "LV." + pll.LV
	window.console.log("LEVEL UP")
}

window.console.log(pll)
export default {
	pll, LevelUP
};