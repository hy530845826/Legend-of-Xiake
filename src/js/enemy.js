var ell = new CreateEnemy(-130, -130);
var Hit = require("./hit")
var HitJudgement = Hit.default.HitJudgement

EnemyMove(ell)

window.console.log(ell)
import enemy_data from './enemy_data.json'
var EnemyData = enemy_data
window.console.log(EnemyData)//已经是一个json对象了

var Player = require("./player")
var pl = Player.default.pll

function CreateEnemy(plx, ply, lv, hpmax, hp, mpmax, mp, exp, atk, atkmax, def, str, agi, intt) {
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

    this.ATK = atk
    this.ATKMAX = atkmax
    this.DEF = def
    this.STR = str
    this.AGI = agi
    this.INT = intt

    this.speed = 10

    this.ellstandx = 0
    this.ellstandy = 0
    this.ellmovex = 0
    this.ellmovey = 0
    this.ellbackx = 0
    this.ellbacky = 0
    this.ellhitedx = 0
    this.ellhitedy = 0
    this.ellhitedt = 0
    this.elldeadx = 0
    this.elldeady = 0
    this.elldeadt = 0

    this.ellattack1x = 0
    this.ellattack1y = 0
    this.ellattack1t = 0
}

function UpdateEnemy(obj, uid) {
    $('#enemy-body').attr('class', 'ellstand')
    var enemydata = EnemyData[uid]
    for (var index in obj) {
        obj[index] = enemydata[index]
    }
    if (pl.plx < obj.plx) {
        obj.imgfx = false
        $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(" + 180 + "deg)" })
    } else { obj.imgfx = true }
    obj.hited = false
    obj.IsFlash = false
    $('#enemy-hp .progress-bar').css('width', 100 + '%')
    window.console.log(obj)
}

function EnemyMove(obj) {
    var fx = RandomFX(0, 5); //停止、下左上右、攻击为012345
    //随机数[m~n]
    function RandomFX(m, n) {
        var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
        return num;
    }

    //0.5秒随机更改方向
    obj.randomfx = setInterval(function () {
        fx = RandomFX(0, 5)
    }, 500);
    var tempspeed = obj.speed

    obj.randommove = setInterval(function () {
        $('#enemy-body.ellstand').css({ 'width': obj.ellstandx + 'px', 'height': obj.ellstandy + 'px', 'background-image': 'url(static/images/e' + obj.UID + 'stand.gif)' })
        $('#enemy-body.ellmove').css({ 'width': obj.ellmovex + 'px', 'height': obj.ellmovey + 'px', 'background-image': 'url(static/images/e' + obj.UID + 'move.gif)' })
        $('#enemy-body.ellback').css({ 'width': obj.ellbackx + 'px', 'height': obj.ellbacky + 'px', 'background-image': 'url(static/images/e' + obj.UID + 'back.gif)' })
        $('#enemy-body.ellhited').css({ 'width': obj.ellhitedx + 'px', 'height': obj.ellhitedy + 'px', 'background-image': 'url(static/images/e' + obj.UID + 'hited.gif)' })
        $('#enemy-body.elldead').css({ 'width': obj.elldeadx + 'px', 'height': obj.elldeady + 'px', 'background-image': 'url(static/images/e' + obj.UID + 'dead.gif)' })
        $('#enemy-body.ellattack1').css({ 'width': obj.ellattack1x + 'px', 'height': obj.ellattack1y + 'px', 'background-image': 'url(static/images/e' + obj.UID + 'attack1.gif)' })

        obj.speed = tempspeed

        pl.plx < obj.plx ? obj.realfx = true : obj.realfx = false
        if (obj.realfx == obj.imgfx) {
            obj.imgfx = !obj.imgfx
            pl.plx < obj.plx ? $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(180deg)" }) : $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(0deg)" })
        }

        if (obj.IsFlash == false) {
            if (obj.hited == true) {
                $('#enemy-body').attr('class', 'ellhited')
                obj.speed = 0
            } else if (obj.HP <= 0 && obj.hited == false) {
                $('#enemy-body').attr('class', 'elldead')
            } else if (fx == 0) {
                $('#enemy-body').attr('class', 'ellstand')
                obj.speed = 0
            } else if (fx == 1 && obj.ply < 540 && obj.ply >= 0) {
                $('#enemy-body').attr('class', 'ellmove')
                obj.ply += obj.speed
            } else if (fx == 3 && obj.ply > 380) {
                $('#enemy-body').attr('class', 'ellmove')
                obj.ply -= obj.speed
            } else if (fx == 2 && obj.plx > 0) {
                obj.realfx ? $('#enemy-body').attr('class', 'ellmove') : $('#enemy-body').attr('class', 'ellback')
                obj.plx -= obj.speed
            } else if (fx == 4 && obj.plx < 1070 && obj.plx >= 0) {
                obj.realfx ? $('#enemy-body').attr('class', 'ellback') : $('#enemy-body').attr('class', 'ellmove')
                obj.plx += obj.speed
            } else if (fx == 5) {
                $('#enemy-body').attr('class', 'ellattack1')
                obj.speed = 0
                obj.IsFlash = true
                var tempwidth = obj.ellattack1x - obj.ellstandx
                if (obj.realfx == true) { //位置补正
                    obj.plx -= tempwidth
                    setTimeout(() => { obj.plx += tempwidth }, obj.ellattack1t);
                }

                HitJudgement(obj, pl, false)
                setTimeout(() => { obj.IsFlash = false }, obj.ellattack1t);
            } else if (fx != 5) {
                fx = RandomFX(0, 5);
            }
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