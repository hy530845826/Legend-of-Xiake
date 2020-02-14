window.console.log(1);
var $map = $('map');
window.console.log(map);
window.console.log($map);
var pl = new Player(0, 550,
	1, 50, 50, 50, 50, 100, 0,
	0, 0,
	1, 1, 1, 0, 0, 0)

function CreatePlayer() {
	var hero = document.createElement("div")
	var heroimg = document.createElement("div")

	hero.className = "hero"
	hero.id = "hero"
	hero.style.position = "absolute"

	heroimg.id = "heroimg"
	// $(heroimg).css('background-image','url(static/images/plstand.gif)')
	// heroimg.setAttribute("background", "static/images/plstand.gif")
	hero.appendChild(heroimg)
	map.appendChild(hero)

}

function Player(plx, ply, lv, hpmax, hp, mpmax, mp, expmax, exp, weap, armor, str, dex, intt, wil, per, luk) {
	CreatePlayer()
	window.console.log(1111111111+'外部utiles'+11111)

	this.plx = plx
	this.ply = ply
	hero.style.left = plx + "px"
	hero.style.top = ply + "px"

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
	this.DEF = armor + dex
	this.STR = str
	this.DEX = dex
	this.INT = intt
	this.WIL = wil
	this.PER = per
	this.LUK = luk

	this.speed = 10
	this.xcd = 0
	this.xfx = 0 //平X方向：右0左1
	this.ccd = 0

}