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
        var random_damage = RandomDamage(obj.ATK, obj.ATKMAX)
        obj2.HP -= random_damage

        //-HP提示
        $("#map").prepend("<div class='damage-font'>" + random_damage + "</div>")
        l2 += 10
        var opa = 1
        $('.damage-font').css({ 'top': t2 + 'px', 'left': l2 + 'px' })
        var tik = setInterval(function () {
            t2 -= 1, opa -= 0.01
            $('.damage-font').css({ 'top': t2 + "px", 'left': l2 + "px", 'opacity': opa })
        }, 10)
        setTimeout(function () {
            clearInterval(tik)
            $(".damage-font").remove("#map .damage-font")
        }, 500)

        //HP_progress
        var enemy_hp_progress = parseInt((obj2.HP / obj2.HPMAX) * 100)
        $('#enemy-hp .progress-bar').css('width', enemy_hp_progress + '%')

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