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

export default {
    RandomNumber, RandomNumber2, RandomCode, UpdateStopPosition
}