var ell = new CreateEnemy(-130, -130);
EnemyMove(ell)

window.console.log(ell)
import enemy_data from './enemy_data.json'
var EnemyData = enemy_data
window.console.log(EnemyData)//已经是一个json对象了

function CreateEnemy(plx, ply, lv, hpmax, hp, mpmax, mp, exp, weap, armor, hit, dex, str, agi, intt) {
    window.console.log('内部消息');
    this.UID = 0
    this.name = 'null'

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
    this.xfx = true //平X方向：右true左false
    this.imgfx = true
    this.ccd = 0

}

function UpdateEnemy(obj, uid) {
    var enemydata = EnemyData[uid]
    for (var sb in obj) {
        obj[sb] = enemydata[sb]
    }
    window.console.log(obj)
}

function EnemyMove(obj) {
    var fx = RandomFX(0, 4); //停止、下左上右为01234
    //随机数[m~n]
    function RandomFX(m, n) {
        var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
        return num;
    }

    //0.2秒随机更改方向
    obj.randomfx = setInterval(function () {
        fx = RandomFX(0, 4);
    }, 200);
    var tempspeed = obj.speed

    var rotateNum = 180; //旋转角度
    obj.randommove = setInterval(function () {
        obj.speed = tempspeed
        if (fx == 0) {
            obj.speed = 0
            $('#enemy-body').css('background-image', 'url(static/images/e1stand.gif)')
        } else if (fx == 1 && obj.ply < 540 && obj.ply > 0) {
            obj.ply += obj.speed;
            $('#enemy-body').css('background-image', 'url(static/images/e1move.gif)')
        } else if (fx == 3 && obj.ply > 380) {
            obj.ply -= obj.speed;
            $('#enemy-body').css('background-image', 'url(static/images/e1move.gif)')
        } else if (fx == 2 && obj.plx > 0) {
            obj.xfx = false;
            if (obj.xfx != obj.imgfx) {
                obj.imgfx = false;
                $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
                rotateNum += 180;
            }
            obj.plx -= obj.speed;
            $('#enemy-body').css('background-image', 'url(static/images/e1move.gif)')
        } else if (fx == 4 && obj.plx < 1070 && obj.plx > 0) {
            obj.xfx = true;
            if (obj.xfx != obj.imgfx) {
                obj.imgfx = true;
                $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
                rotateNum += 180;
            }
            obj.plx += obj.speed;
            $('#enemy-body').css('background-image', 'url(static/images/e1move.gif)')
        } else {
            fx = RandomFX(0, 4);
        }
        $('#enemy').css('top', obj.ply + "px")
        $('#enemy').css('left', obj.plx + "px")
        $('#enemy').css('z-index', ell.ply)
    }, 50);
    window.console.log('mmmmmmmmmmmmmmm')
}

export default {
    ell, UpdateEnemy
}