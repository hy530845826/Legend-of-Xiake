window.console.log('blankjs里面函数')
var abc = require("./player")
var pl = abc.default.pll

var timer = setInterval(function () {
    var HPNow = parseInt((pl.HP / pl.HPMAX) * 100)
    var MPNow = parseInt((pl.MP / pl.MPMAX) * 100)
    var EXPNow = parseInt((pl.EXP / pl.EXPMAX) * 100)
    $('#JdtHP .progress-bar').css('width', HPNow + '%')
    $('#JdtMP .progress-bar').css({ width: MPNow + "%" })
    $('#JdtEXP .progress-bar').css({ width: EXPNow + "%" })
    $('#JdtHP .progress-bar').text(HPNow + '%')
    $('#JdtMP .progress-bar').text(MPNow + '%')
    $('#JdtEXP .progress-bar').text(EXPNow + '%')


    //升级
    if (pl.EXP >= pl.EXPMAX) {
        pl.EXP = pl.EXP - pl.EXPMAX
        pl.HP = pl.HPMAX
        pl.LV += 1
        $('#Level').innerHTML = "LV." + pl.LV
        window.console.log("LEVEL UP")
    }
    //死亡HP=0
    if (pl.HP <= 0) {
        $('#JdtHP .progress-bar').css({ width: 0 + "%" })
        alert("死")
        window.console.log("DEAD")
        clearInterval(timer)
    }
}, 200)

function clickJ () {
    window.console.log('menuj')
    pl.HP -= 1
    pl.EXP += 22
}
// MenuI.onclick = function() {
//     console.log( $('#rrr'))
//     flag=true
// }
export default{
    clickJ
}