var hero = $('#role')
var pll = new Player(0, 550,
	1, 50, 50, 50, 50, 100, 0,
	0, 0,
	90, 0, 1, 1, 1, 0, 0, 0)

function Player(plx, ply, lv, hpmax, hp, mpmax, mp, expmax, exp, weap, armor, hit, dex, str, agi, intt, wil, per, luk) {

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
	this.xcd = 0
	this.xfx = 0 //平X方向：右0左1
	this.ccd = 0

	this.weapom = 'jian'
}

window.console.log(pll)
export default {
    pll, hero
};