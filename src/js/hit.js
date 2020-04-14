function HitJudgement(obj, obj2, HitFlag, hit_ID) {
    var t1, l1, r1, b1
    var t2, l2, r2, b2
    var random_damage
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

            random_damage = RandomDamage(obj.ATK, obj.ATKMAX)
            obj2.HP -= random_damage

            TipsHP(t2, l2, random_damage, HitFlag)

            if (HitFlag) {//pl打ell
                obj2.hited = true
                obj2.hitedNumber += 1
                //HP_progress
                var enemy_hp_progress = parseInt((obj2.HP / obj2.HPMAX) * 100)
                $('#enemy-hp .progress-bar').css('width', enemy_hp_progress + '%')
                setTimeout(() => {
                    if (obj2.hitedNumber == 1) {//连续hit
                        obj2.hited = false
                        obj2.IsFlash = false
                        obj2.hitedNumber = 0
                        if (obj2.HP <= 0) {
                            setTimeout(() => { KillJudgement(obj, obj2, HitFlag) }, obj2.dead_time)
                        }
                    } else {
                        obj2.hitedNumber -= 1
                    }
                }, obj2.hited_time)
            }
        }
    }
}

function KillJudgement(obj, obj2, HitFlag) {
    if (HitFlag) {
        obj.EXP += obj2.EXP
        clearInterval(obj2.randomfx_timer)
        clearInterval(obj2.ellMove_timer)
        clearInterval(obj2.ellflash)
        obj2.plx = -200;
        obj2.ply = 400;
        $('#enemy-body').css({ transition: "transform 0.1s", transform: "rotateY(0deg)" })
        $('#enemy').css('top', obj2.ply + "px")
        $('#enemy').css('left', obj2.plx + "px")
    }
}

function TipsHP(top, left, random_damage, HitFlag) {
    var random_class = RandomCode(8)
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

//随机数[m~n]
function RandomDamage(m, n) {
    var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
    return num;
}

//产生x位数验证码
function RandomCode(codelength) {
    var randomcode = "";
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codelength; i++) {
        var index = Math.floor(Math.random() * 36); //取得索引0~35
        randomcode += random[index]; //組合字符串
    }
    return randomcode;
}

export default {
    HitJudgement
}