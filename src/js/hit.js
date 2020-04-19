var Tool = require("./tool")
var t = Tool.default

var UpdateEnemy, ChangePlayerState, GetAudio
setTimeout(() => {
    var Enemy = require("./enemy")
    var Vuemove = require("./vuemove")
    UpdateEnemy = Enemy.default.UpdateEnemy
    ChangePlayerState = Vuemove.default.ChangePlayerState
    GetAudio = Vuemove.default.GetAudio
}, 1000)

function HitJudgement(obj, obj2, HitFlag, hit_ID) {
    var t1, l1, r1, b1
    var t2, l2, r2, b2
    var damage
    if (obj2.hited_x != 0 && obj2.hited_y != 0) {
        t1 = obj.ply + obj.hit_top
        b1 = t1 + obj.hit_y
        l1 = obj.plx + obj.hit_left
        r1 = l1 + obj.hit_x

        t2 = obj2.ply + obj2.hited_top;
        b2 = t2 + obj2.hited_y;
        l2 = obj2.plx + obj2.hited_left;
        r2 = l2 + obj2.hited_x;
        // window.console.log("t1: " + t1 + " l1: " + l1 + " r1: " + r1 + " b1: " + b1)
        // window.console.log("t2: " + t2 + " l2: " + l2 + " r2: " + r2 + " b2: " + b2)
        if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) { /*表示没击中obj2*/ }
        else if (obj2.HP > 0 && obj.hit_ID != hit_ID) {
            obj.hit_ID = hit_ID
            // window.console.log('伤害判定：  ' + obj.name + '    第' + obj.hit_ID + '次：击中')
            damage = DamageJudgement(obj, HitFlag)
            obj2.HP -= damage

            HitFlash(obj, obj2, HitFlag)

            TipsHP(t2, l2, damage, HitFlag)
        }
    }
}

function DamageJudgement(obj, HitFlag) {
    var damageValue, damageMin, damageMax
    if (HitFlag) {
        switch (obj.damageStyle) {
            case "skillA":
                damageMin = obj.ATK
                damageMax = obj.ATK + 2
                break;
            case "skillS":
                damageMin = (obj.ATK * 2) + obj.PER
                damageMax = (obj.ATKMAX * 2) + obj.PER
                break;
            case "skillD":
                damageMin = obj.ATK + parseInt(obj.AGI * 1.5) - obj.LV
                damageMax = obj.ATKMAX + parseInt(obj.AGI * 1.5) - obj.LV
                break;
            case "skillF":
                damageMin = obj.ATK + (obj.STR) + 2
                damageMax = obj.ATKMAX + (obj.STR) + 1
                break;
            case "skillQ":
                break;
            case "skillW":
                break;
            case "skillE":
                break;
            case "skillR":
                break;
        }
    } else {
        damageMin = obj.ATK
        damageMax = obj.ATKMAX
    }
    damageValue = t.RandomNumber(damageMin, damageMax);
    return damageValue
}

function HitFlash(obj, obj2, HitFlag) {
    obj2.hited = true
    obj2.hitedNumber += 1
    //HP_progress
    if (HitFlag) {
        var enemy_hp_progress = parseInt((obj2.HP / obj2.HPMAX) * 100)
        $('#enemy-hp .progress-bar').css('width', enemy_hp_progress + '%')
        setTimeout(() => {
            if (obj2.hitedNumber == 1) {//连续hit
                obj2.hited = false
                if (obj2.IsMove == true) { obj2.IsFlash = false }
                obj2.hitedNumber = 0
                if (obj2.HP <= 0) {
                    setTimeout(() => { KillJudgement(obj, obj2, HitFlag) }, obj2.dead_time)
                }
            } else {
                obj2.hitedNumber -= 1
            }
        }, obj2.hited_time)
    } else {
        obj2.IsFlash = true
        if (obj2.IsMove == true) { ChangePlayerState(obj2, 'hited') }
        var HPNow = parseInt((obj2.HP / obj2.HPMAX) * 100)
        $('#JdtHP .progress-bar').css('width', HPNow + '%')
        $('#JdtHP .progress-bar').text(HPNow + '%')
        setTimeout(() => {
            if (obj2.hitedNumber == 1) {//连续hit
                obj2.hited = false
                if (obj2.IsMove == true && obj2.HP > 0) {
                    (obj2.w || obj2.a || obj2.s || obj2.d) ? ChangePlayerState(obj2, 'move') : ChangePlayerState(obj2, 'stand')
                    obj2.IsFlash = false
                }
                obj2.hitedNumber = 0
                if (obj2.HP <= 0) {
                    var bgm_value = $("#BGM")[0].volume
                    var bgm_timer = setInterval(function () {
                        bgm_value -= 0.01;
                        $("#BGM")[0].volume = bgm_value
                        if (bgm_value == 0) { clearInterval(bgm_timer) }
                    }, 100)
                    document.onkeydown = null
                    document.onkeyup = null
                    ChangePlayerState(obj2, 'dead')
                    GetAudio("pl", "dead")
                    setTimeout(() => { KillJudgement(obj, obj2, HitFlag) }, obj2.dead_time)
                }
            } else {
                obj2.hitedNumber -= 1
            }
        }, obj2.hited_time)
    }
}

function KillJudgement(obj, obj2, HitFlag) {
    if (HitFlag) {
        obj.EXP += obj2.EXP
        t.DeleteEnemy(obj2)
        setTimeout(() => { UpdateEnemy(obj2, obj2.CreateMap) }, 5000)
    } else {
        $("#EnAudio")[0].volume = 0.5;
        $('#EnAudio').attr('src', './static/sound/audio/environment/fire.mp3')
        $('#dead-screen').css('display', 'block')
        $('#dead-html').css({ 'display': 'block', 'height': $(window).height() })

        var opa = 0
        var dead_timer = setInterval(function () {
            opa += 0.01
            $('#dead-screen').css('opacity', opa)
            $('#dead-html').css('opacity', opa)
            if (opa > 1) {
                clearInterval(dead_timer)
            }
        }, 100)
    }
}

function TipsHP(top, left, random_damage, HitFlag) {
    var random_class = t.RandomCode(8)
    // var other_top
    //-HP提示
    if (HitFlag) {
        // other_top = $('.damage-font-enemy').css('top')
        // $('.damage-font-enemy').css('top', other_top -= 30 + 'px')
        $("#map").prepend("<div class='damage-font-enemy " + random_class + "'>" + random_damage + "</div>")
    } else {
        // other_top = $('.damage-font-player').css('top')
        // $('.damage-font-player').css('top', other_top -= 30 + 'px')
        $("#map").prepend("<div class='damage-font-player " + random_class + "'>" + random_damage + "</div>")
    }

    left += 10
    var opa = 1
    $('.' + random_class).css({ 'top': top + 'px', 'left': left + 'px' })
    var tik = setInterval(function () {
        top -= 1, opa -= 0.01
        $('.' + random_class).css({ 'top': top + "px", 'left': left + "px", 'opacity': opa })
    }, 30)
    setTimeout(function () {
        clearInterval(tik)
        $('.' + random_class).remove('#map .' + random_class)
    }, 1800)
}

export default {
    HitJudgement
}