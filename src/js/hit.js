var Player = require("./player")
var pl = Player.default.pll
var Enemy = require("./enemy")
var enemy = Enemy.default.ell

function PlayerHitEnemy(obj, TopSpacing, JudegeHeight, LeftSpacing, JudgeWidth) {
    //左上角坐标+判定的长宽
    var t1, l1, r1, b1
    t1 = obj.ply + TopSpacing
    b1 = t1 + JudegeHeight
    //根据player方向定位
    obj.xfx ? l1 = obj.plx + LeftSpacing : l1 = obj.plx + 130 - LeftSpacing - JudgeWidth
    r1 = l1 + JudgeWidth

    var obj2 = enemy;

    var t2 = obj2.ply;
    var l2 = obj2.plx;
    var r2 = obj2.plx + 130;
    var b2 = obj2.ply + 130;

    // window.console.log("t1: " + t1 + " l1: " + l1 + " r1: " + r1 + " b1: " + b1)
    // window.console.log("t2: " + t2 + " l2: " + l2 + " r2: " + r2 + " b2: " + b2)
    if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) { /*表示没击中obj2*/ }
    else if (obj2.HP > 0) {
        window.console.log('击中')
        obj2.hited = true
        obj2.HP -= RandomDamage(obj.ATK, obj.ATKMAX)
        var enemy_hp_progress = parseInt((obj2.HP / obj2.HPMAX) * 100)
        $('#enemy-hp .progress-bar').css('width', enemy_hp_progress + '%')
        window.console.log(obj2.HP + "     -        " + enemy_hp_progress)
        setTimeout(() => {
            obj2.hited = false
            if (obj2.HP <= 0) {
                setTimeout(() => { PlayerKillEnemy(obj2) }, obj2.elldeadt)
            }
        }, obj2.ellhitedt)

    }
}

function PlayerKillEnemy(obj) {
    window.console.log("击杀");
    if (obj == enemy) {
        pl.EXP += obj.EXP
        enemy.plx = -130;
        enemy.ply = -130;
    }
}

//随机数[m~n]
function RandomDamage(m, n) {
    var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
    return num;
}
export default {
    PlayerHitEnemy
}