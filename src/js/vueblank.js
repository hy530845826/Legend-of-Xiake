$(function () {
    window.console.log('blankjs里面函数')
    var abc = require("./player")
    var pl = abc.default.pll
    layui.use(['layer', 'element'], function () {
        var layer = layui.layer,
            element = layui.element;

        var timer = setInterval(function () {
            var HPNow = parseInt((pl.HP / pl.HPMAX) * 100)
            var MPNow = parseInt((pl.MP / pl.MPMAX) * 100)
            var EXPNow = parseInt((pl.EXP / pl.EXPMAX) * 100)
            element.progress("JdtHP", HPNow + "%")
            element.progress("JdtMP", MPNow + "%")
            element.progress("JdtEXP", EXPNow + "%")

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
                element.progress("JdtEXP", "0%")
                alert("死")
                window.console.log("DEAD")
                clearInterval(timer)
            }
        }, 200)

        $('#MenuJ').onclick = function () {
            pl.HP -= 1
            pl.EXP += 22
        }
        // MenuI.onclick = function() {
        //     console.log( $('#rrr'))
        //     flag=true

        // }

    })


})