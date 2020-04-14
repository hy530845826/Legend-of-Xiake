//随机数[m~n]
function RandomNumber(m, n) {
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
    RandomNumber, RandomCode
}