function HitJudgement(obj, obj2, objFlag) {
    var t1, l1, r1, b1
    var t2, l2, r2, b2
    var random_damage

    if (objFlag) {
        t1 = obj.ply + obj.hit_top
        b1 = t1 + obj.hit_y
        l1 = obj.plx + obj.hit_left
        r1 = l1 + obj.hit_x

        t2 = obj2.ply + obj2.hited_top;
        l2 = obj2.plx;
        r2 = obj2.plx + obj.hited_x;
        b2 = obj2.ply + obj.hited_y;

        window.console.log("t1: " + t1 + " l1: " + l1 + " r1: " + r1 + " b1: " + b1)
        window.console.log("t2: " + t2 + " l2: " + l2 + " r2: " + r2 + " b2: " + b2)
        if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) { /*表示没击中obj2*/ }
        else if (obj2.HP > 0) {
            window.console.log('击中')
            obj2.hited = true
            random_damage = RandomDamage(obj.ATK, obj.ATKMAX)
            obj2.HP -= random_damage

            TipsHP(t2, l2, random_damage, objFlag)

            //HP_progress
            var enemy_hp_progress = parseInt((obj2.HP / obj2.HPMAX) * 100)
            $('#enemy-hp .progress-bar').css('width', enemy_hp_progress + '%')

            setTimeout(() => {
                obj2.hited = false
                if (obj2.HP <= 0) {
                    setTimeout(() => { KillJudgement(obj, obj2, objFlag) }, obj2.elldeadt)
                }
            }, obj2.ellhitedt)
        }
    } else {
        //左上角坐标+判定的长宽
        t1 = obj.ply
        b1 = obj.ply + 130
        l1 = obj.plx
        r1 = obj.plx + 130

        t2 = obj2.ply + obj2.pdy;
        b2 = obj2.ply + 130;
        l2 = obj2.plx + obj2.pdx;
        r2 = obj2.plx + obj2.pdx + obj2.pdw;

        // window.console.log("t1: " + t1 + " l1: " + l1 + " r1: " + r1 + " b1: " + b1)
        // window.console.log("t2: " + t2 + " l2: " + l2 + " r2: " + r2 + " b2: " + b2)
        if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) { /*表示没击中obj2*/ }
        else if (obj2.HP > 0) {
            window.console.log('击中')
            random_damage = RandomDamage(obj.ATK, obj.ATKMAX)
            obj2.HP -= random_damage

            TipsHP(t2, l2, random_damage, objFlag)
        }
    }

}

function KillJudgement(obj, obj2, objFlag) {
    if (objFlag) {
        obj.EXP += obj2.EXP
        obj2.plx = -130;
        obj2.ply = -130;
    }
}

function TipsHP(top, left, random_damage, objFlag) {
    var random_class = RandomCode(8)
    //-HP提示
    if (objFlag) {
        $("#map").prepend("<div class='damage-font-enemy " + random_class + "'>" + random_damage + "</div>")
    } else {
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