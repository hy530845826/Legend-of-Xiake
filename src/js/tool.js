import Map_options from './data/map_data.json'
var MapOptions = Map_options

//随机整数[m~n]
function RandomNumber(m, n) {
    var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
    return num;
}
//随机整数(m~n)
function RandomNumber2(m, n) {
    var num = Math.floor(Math.random() * (m - n + 1) + n);
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

//获取新地图可移动区域
function UpdateStopPosition(obj, PortalToMapID) {
    var datamsg = MapOptions[PortalToMapID]
    obj.stop_l = datamsg.stop_left
    obj.stop_t = datamsg.stop_top - obj.stand_y
    obj.stop_r = obj.stop_l + datamsg.stop_width - obj.stand_x
    obj.stop_b = obj.stop_t + datamsg.stop_height
}

function CDAudio(obj, cdFlag) {
    clearInterval(obj.cd_timer);
    obj.CD_audio = 1
    var cd
    cdFlag ? cd = obj.CD_audio_talk : cd = obj.CD_audio_move //3s和15s
    obj.cd_timer = setInterval(function () {
        obj.CD_audio++
        if (obj.CD_audio >= cd) {
            obj.CD_audio = 0;
            if (obj.moveAudioFlag) { obj.moveAudioFlag = false }
            clearInterval(obj.cd_timer);
        }
    }, 1000);
}

function DeleteEnemy(obj) {
    clearInterval(obj.randomfx_timer)
    clearInterval(obj.ellMove_timer)
    clearInterval(obj.ellflash)
    obj.plx = -200;
    obj.ply = -200;
    $('#enemy-body').css({ transition: "transform 0.1s", transform: "rotateY(0deg)" })
    $('#enemy').css('top', obj.ply + "px")
    $('#enemy').css('left', obj.plx + "px")
}

function UseSkillMP(obj, needMP) {
    if (obj.MP >= needMP) {
        obj.MP -= needMP
        return true
    } else {
        return false
    }
}

function UseConsumables(obj, style, value, temporary, buff_time) {
    temporary = temporary || false
    buff_time = buff_time * 1000 || 0
    if (temporary) {
        switch (style) {
            case "HPMAX": obj.HPMAX += value; setTimeout(() => { obj.HPMAX -= value }, buff_time); break;
            case "MPMAX": obj.MPMAX += value; setTimeout(() => { obj.MPMAX -= value }, buff_time); break;
            case "ATK": obj.ATK += value; obj.ATKMAX += value; setTimeout(() => { obj.ATK -= value; obj.ATKMAX -= value; }, buff_time); break;
            case "DEF": obj.DEF += value; setTimeout(() => { obj.DEF -= value }, buff_time); break;
            case "HIT": obj.HIT += value; setTimeout(() => { obj.HIT -= value }, buff_time); break;
            case "DEX": obj.DEX += value; setTimeout(() => { obj.DEX -= value }, buff_time); break;
            case "STR": obj.STR += value; setTimeout(() => { obj.STR -= value }, buff_time); break;
            case "AGI": obj.AGI += value; setTimeout(() => { obj.AGI -= value }, buff_time); break;
            case "INT": obj.INT += value; setTimeout(() => { obj.INT -= value }, buff_time); break;
            case "WIL": obj.WIL += value; setTimeout(() => { obj.WIL -= value }, buff_time); break;
            case "PER": obj.PER += value; setTimeout(() => { obj.PER -= value }, buff_time); break;
            case "LUK": obj.LUK += value; setTimeout(() => { obj.LUK -= value }, buff_time); break;
            case "SPE": obj.speed += value; setTimeout(() => { obj.speed -= value }, buff_time); break;
        }
    }
    else {
        switch (style) {
            case "HP": ((obj.HP + value) > obj.HPMAX) ? obj.HP = obj.HPMAX : obj.HP += value; break;
            case "MP": ((obj.MP + value) > obj.MPMAX) ? obj.MP = obj.MPMAX : obj.MP += value; break;
            case "HPMAX": obj.HPMAX += value; break;
            case "MPMAX": obj.MPMAX += value; break;
            case "ATK": obj.ATK += value; obj.ATKMAX += value; break;
            case "DEF": obj.DEF += value; break;
            case "HIT": obj.HIT += value; break;
            case "DEX": obj.DEX += value; break;
            case "STR": obj.STR += value; break;
            case "AGI": obj.AGI += value; break;
            case "INT": obj.INT += value; break;
            case "WIL": obj.WIL += value; break;
            case "PER": obj.PER += value; break;
            case "LUK": obj.LUK += value; break;
            case "SPE": obj.speed += value; break;
        }
    }
    if (style == "HP/MP") {
        UseConsumables(obj, "HP", value)
        UseConsumables(obj, "MP", value)
    } else { TipsConsumables(obj, style, value) }
}

function TipsConsumables(obj, style, value) {
    var top = obj.ply + obj.hited_top;
    var left = obj.plx + obj.hited_left;
    var random_class = RandomCode(8)
    $("#map").prepend("<div class='TipsBag bag-" + style + " " + random_class + "'>" + style + "+" + value + "</div>")

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
    RandomNumber, RandomNumber2, RandomCode, UpdateStopPosition, CDAudio, DeleteEnemy, UseSkillMP, UseConsumables
}