var ell = new CreateEnemy(-200, -200);
var Hit = require("./hit")
var HitJudgement = Hit.default.HitJudgement

import enemy_data from './enemy_data.json'
var EnemyData = enemy_data
var EnemyOptions

var Player = require("./player")
var pl = Player.default.pll

function CreateEnemy(plx, ply, lv, hpmax, hp, mpmax, mp, exp, atk, atkmax, def, str, agi, intt) {
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

    this.div_width = 0
    this.div_height = 0
    this.stand_x = 0
    this.stand_y = 0
}

function UpdateEnemy(obj, PortalToMapID) {
    DeleteEnemy(obj)
    var uid = CheckCreateMap(PortalToMapID)
    if (uid == undefined) {
        window.console.log('map-' + PortalToMapID + 'safe')
        return 0
    }
    $('#enemy-body').attr('class', 'stand')
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
    //获取数据有延迟
    setTimeout(function () {
        $('#enemy').css('width', ell.div_width)//为name提供宽度
        $('#enemy-body').css({ 'width': ell.div_width + 'px', 'height': ell.div_height + 'px' })
        $('#enemy-hp .progress-bar').css('width', 100 + '%')
        $('#enemy-hp').css({ 'width': 2 * ell.stand_x + 'px', 'left': - (0.5 * ell.stand_x) + 'px' })
        var name_left = parseInt((ell.stand_x - parseInt($('#enemy-name').css('width'))) / 2)
        $('#enemy-name').css({ 'left': name_left + 'px', 'top': (ell.stand_y + 5) + 'px' })
        EnemyMove(obj)
    }, 50)
}

function DeleteEnemy(obj) {
    clearInterval(obj.randomfx_timer)
    clearInterval(obj.ellMove_timer)
    clearInterval(obj.ellflash)
    obj.plx = -200;
    obj.ply = 400;
    $('#enemy-body').css({ transition: "transform 0.1s", transform: "rotateY(0deg)" })
    $('#enemy-body').attr('class', 'stand')
    $('#enemy').css('top', obj.ply + "px")
    $('#enemy').css('left', obj.plx + "px")
}

function CheckCreateMap(PortalToMapID) {
    window.console.log(PortalToMapID)
    var CreateEnemyUID
    for (var index in EnemyData) {
        var datamsg = ((EnemyData[index])[0])[0]
        var CreateMapID = datamsg.CreateMap
        if (CreateMapID == PortalToMapID) {
            CreateEnemyUID = datamsg.UID
            break
        }
    }
    window.console.log(CreateEnemyUID + "   x:  ")
    return CreateEnemyUID
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
            ell.hited_left = target.hited_left
            ell.hited_top = target.hited_top
            ell.hit_x = target.hit_x || 0
            ell.hit_y = target.hit_y || 0
            ell.hit_left = target.hit_left || 0
            ell.hit_top = target.hit_top || 0
            ell.div_width = data[0].div_width
            ell.div_height = data[0].div_height
            ell.TikTok_sum = data[0].TikTok_sum
            ell.farme = data[0].farme
            if (ell.imgfx == false) {
                // 移动反向图像左边距，保持右边不变
                var changeX = 0
                if (TikTok > 1) {
                    changeX = target.hited_x - data[TikTok - 1].hited_x
                } else if (StateName != 'move') {
                    changeX = target.hited_x + target.hited_left - ell.stand_x //ellstand宽度
                }
                ell.plx -= changeX
                $('#enemy').css('left', ell.plx + "px")
                //反向图像重新校正left
                ell.img_x = (target.img_x + target.hited_x - imgWidth)
                ell.hited_left = - target.hited_left
                ell.hit_left = (target.hited_x - target.hit_left - target.hit_x) || 0
            }
            ChangeEnemyCSS(StateName)
            if (ell.hit_x != 0 && ell.hit_y != 0) {
                HitJudgement(ell, pl, false, target.hit_ID)
            }
            break;
        }
    }
}
function ChangeEnemyCSS(StateName) {
    $('#enemy-body').css({
        'left': ell.img_x + 'px',
        'top': ell.img_y + 'px'
    })
    $('#enemy-hited-judge').css({
        'width': ell.hited_x + 'px',
        'height': ell.hited_y + 'px',
        'left': ell.hited_left + 'px',
        'top': ell.hited_top + 'px'
    })
    $('#enemy-hit-judge').css({
        'width': ell.hit_x + 'px',
        'height': ell.hit_y + 'px',
        'left': ell.hit_left + 'px',
        'top': ell.hit_top + 'px'
    })
    if (StateName == 'stand' || StateName == 'move') {
        $('#enemy.' + StateName + ' #enemy-body').css({ 'background-image': 'url(static/images/e' + ell.UID + '-' + StateName + '.gif)' })
    } else {
        $('#enemy.' + StateName + ' #enemy-body').css({ 'background-image': 'url(static/images/e' + ell.UID + '-' + StateName + '.png)' })
    }
}

function EnemyMove(obj) {
    //停止、下左上右、攻击为012345
    var fx = 0
    //随机数[m~n]
    function RandomFX(m, n) {
        var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
        return num;
    }

    //0.5秒随机更改方向
    obj.randomfx_timer = setInterval(function () {
        fx = RandomFX(0, 5)
    }, 500);
    var tempspeed = obj.speed
    obj.ellMove_timer = setInterval(function () {
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
                ChangeEnemyState('stand')
                obj.speed = 0
            } else if (fx == 1 && obj.ply < 540 && obj.ply >= 0) {
                $('#enemy-body').attr('class', 'move')
                obj.ply += obj.speed
            } else if (fx == 3 && obj.ply > 380) {
                $('#enemy-body').attr('class', 'move')
                obj.ply -= obj.speed
            } else if (fx == 2 && obj.plx > 0) {
                obj.realfx ? $('#enemy-body').attr('class', 'move') : $('#enemy-body').attr('class', 'ellback')
                obj.plx -= obj.speed
            } else if (fx == 4 && obj.plx < 1070 && obj.plx >= 0) {
                obj.realfx ? $('#enemy-body').attr('class', 'ellback') : $('#enemy-body').attr('class', 'move')
                obj.plx += obj.speed
            } else if (fx == 5) {
                enemyflash('attack2')
                obj.speed = 0
                // obj.IsFlash = true
                // var tempwidth = obj.ellattack1x - obj.ellstandx
                // if (obj.realfx == true) { //位置补正
                //     obj.plx -= tempwidth
                //     setTimeout(() => { obj.plx += tempwidth }, obj.ellattack1t);
                // }

                // setTimeout(() => { obj.IsFlash = false }, obj.ellattack1t);
            } else if (fx != 5) {
                window.console.log('wrg?')
                fx = RandomFX(0, 5);
            }
        }
        $('#enemy').css('top', obj.ply + "px")
        $('#enemy').css('left', obj.plx + "px")
        $('#enemy').css('z-index', ell.ply)
    }, 50);
}

function enemyflash(StateName, skillstart, skillfarme, skillwidth) {
    ell.IsFlash = true
    var i = 1, j = 0
    var xxx = ell.plx, yyy = ell.ply
    ChangeEnemyState(StateName)
    let TikTok_sum = ell.TikTok_sum
    let div_width = ell.div_width / TikTok_sum
    if (i == skillstart) {
        $('#skill-body').css('background-position', (-skillwidth * j) + 'px ')
        j++
    }
    ell.ellflash = setInterval(function () {
        i++
        if ((j > 0 && j < skillfarme) || (i == skillstart)) {
            $('#skill-body').css('background-position', (-skillwidth * j) + 'px ')
            j++
        } else {
            $('#skill-body').css('background-position', skillwidth + 'px ')
        }
        if (i > TikTok_sum) {
            clearInterval(ell.ellflash)
            ell.IsFlash = false
            ell.plx = xxx
            ell.ply = yyy
            ell.hit_ID = 0
            setTimeout(function () {
                if (ell.IsFlash == false) {
                    ChangeEnemyState('stand')
                    $('#enemy-body').css('background-position', 0 + 'px ')
                }
            }, 50)
        } else {
            $('#enemy-body').css('background-position', (-div_width * (i - 1)) + 'px ')
            CheckEnemyHit(StateName, i)
        }
    }, ell.farme);
}

export default {
    ell, UpdateEnemy
}