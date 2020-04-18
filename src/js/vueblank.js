var Player = require("./player")
var pl = Player.default.pll

var hp_timer = setInterval(function () {
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
        Player.default.LevelUP()
    }
    //死亡HP=0
    if (pl.HP <= 0) {
        $('#JdtHP .progress-bar').css({ width: 0 + "%" })
        window.console.log("DEAD")
        clearInterval(hp_timer)
    }
}, 100)

export default {

}