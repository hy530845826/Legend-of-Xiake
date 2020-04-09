var ell = new CreateEnemy(-200, -200);
var Hit = require("./hit")
var HitJudgement = Hit.default.HitJudgement

EnemyMove(ell)

window.console.log(ell)
import enemy_data from './enemy_data.json'
var EnemyData = enemy_data
var EnemyOptions

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

    this.speed = 0

    this.ell_width = 0
    this.ell_height = 0
    this.img_x = 0
    this.img_y = 0
    this.hited_x = 0
    this.hited_y = 0
    this.hited_top = 0
}

function UpdateEnemy(obj, uid) {
    $('#enemy-body').attr('class', 'ellstand')
    EnemyOptions = EnemyData[uid]
    let datamsg = (EnemyOptions[0])[0]
    for (let index in obj) {
        obj[index] = datamsg[index]
    }
    if (pl.plx < obj.plx) {
        obj.imgfx = false
        $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(" + 180 + "deg)" })
    } else { obj.imgfx = true }
    obj.hited = false
    obj.IsFlash = false
    $('#enemy').css('width', ell.ell_width)
    $('#enemy-body').css({ 'width': ell.ell_width + 'px', 'height': ell.ell_height + 'px' })
    $('#enemy-hp .progress-bar').css('width', 100 + '%')
    $('#enemy-hp').css({ 'width': 2 * ell.hited_x + 'px', 'left': - (0.5 * ell.hited_x) + 'px' })

}

function ChangeEnemyState(StateName) {
    $('#enemy').attr('class', StateName)
    CheckEnemyHit(StateName)
}

function CheckEnemyHit(StateName, TikTok) {
    TikTok = TikTok || 1
    var imgWidth = parseInt($('#enemy-body').css('width'))
    for (let index in EnemyOptions) {
        let data = EnemyOptions[index]
        if (StateName == data[0].UName) {
            let target = data[TikTok]
            if (target.check_y != undefined) {
                ell.ply += target.check_y
                $('#enemy').css('top', ell.ply + "px")
            }
            ell.img_x = -target.img_x
            ell.img_y = -target.img_y
            ell.hited_x = target.hited_x
            ell.hited_y = target.hited_y
            ell.hited_top = target.hited_top
            ell.hit_x = target.hit_x || 0
            ell.hit_y = target.hit_y || 0
            ell.hit_left = target.hit_left || 0
            ell.hit_top = target.hit_top || 0
            ell.name_left = parseInt((ell.hited_x - parseInt($('#enemy-name').css('width'))) / 2)
            if (ell.imgfx == false) {
                // 移动反向图像左边距，保持右边不变
                // var changeX = 0
                // if (TikTok > 1) {
                //     changeX = target.hited_x - data[TikTok - 1].hited_x
                // } else if (StateName != 'plmove') {
                //     changeX = target.hited_x - 1111 //plstand宽度
                // }
                // ell.plx -= changeX
                $('#enemy').css('left', ell.plx + "px")
                //反向图像重新校正left
                ell.img_x = (target.img_x + target.hited_x - imgWidth)
                ell.hit_left = (target.hited_x - target.hit_left - target.hit_x) || 0
            }
            ChangeEnemyCSS()
            // if (pl.hit_x != 0 && pl.hit_y != 0) {
            //     HitJudgement(pl, enemy, true)
            // }
            break;
        }
    }
}
function ChangeEnemyCSS() {
    $('#enemy-body').css({
        'left': ell.img_x + 'px',
        'top': ell.img_y + 'px'
    })
    $('#enemy-hited-judge').css({
        'width': ell.hited_x + 'px',
        'height': ell.hited_y + 'px',
        'top': ell.hited_top + 'px'
    })
    $('#enemy-hit-judge').css({
        'width': ell.hit_x + 'px',
        'height': ell.hit_y + 'px',
        'left': ell.hit_left + 'px',
        'top': ell.hit_top + 'px'
    })
    $('#enemy-name').css({
        'left': ell.name_left + 'px',
        'top': (ell.hited_y + 5) + 'px'
    })
}

function EnemyMove(obj) {
    //var fx = RandomFX(0, 5); //停止、下左上右、攻击为012345
    var fx = 0
    //随机数[m~n]
    function RandomFX(m, n) {
        var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
        return num;
    }

    //0.5秒随机更改方向
    // obj.randomfx = setInterval(function () {
    //     fx = RandomFX(0, 5)
    // }, 500);
    var tempspeed = obj.speed

    obj.randommove = setInterval(function () {
        $('#enemy-body').css({ 'width': obj.ell_width + 'px', 'height': obj.ell_height + 'px' })
        $('#enemy.ellstand #enemy-body').css({ 'background-image': 'url(static/images/e' + obj.UID + '-stand.gif)' })

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
                ChangeEnemyState('ellstand')
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
    }, 1000);
}

export default {
    ell, UpdateEnemy
}