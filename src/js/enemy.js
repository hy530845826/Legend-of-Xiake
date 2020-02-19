window.console.log(111111111);

var enemytank = new CreateEnemy(400, 400,
    1, 10, 10, 50, 50, 40,
    0, 0,
    90, 0, 1, 1, 1);

function CreateEnemy(plx, ply, lv, hpmax, hp, mpmax, mp, exp, weap, armor, hit, dex, str, agi, intt) {
    window.console.log('内部消息');
    this.plx = plx
    this.ply = ply

    this.LV = lv
    this.HPMAX = hpmax
    this.HP = hp
    this.MPMAX = mpmax
    this.MP = mp
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

    this.speed = 10
    this.xcd = 0
    this.xfx = 0 //平X方向：右0左1
    this.ccd = 0
}
setInterval(function () {
    $('#enemy').css('top', enemytank.plx + "px")
    $('#enemy').css('left', enemytank.ply + "px")
}, 500)

export default {
    enemytank
}