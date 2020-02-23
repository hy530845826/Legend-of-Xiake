var ell = new CreateEnemy(-130, -130);
EnemyMove(ell)

window.console.log(ell)
import enemy_data from './enemy_data.json'
var EnemyData = enemy_data
window.console.log(EnemyData)//已经是一个json对象了

function CreateEnemy(plx, ply, lv, hpmax, hp, mpmax, mp, exp, atk, atkmax, def, str, agi, intt) {
    window.console.log('内部消息');
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

    this.speed = 10

    this.ellstandx = 0
    this.ellstandy = 0
    this.ellmovex = 0
    this.ellmovey = 0
    this.ellhitedx = 0
    this.ellhitedy = 0
    this.elldeadx = 0
    this.elldeady = 0
}

function UpdateEnemy(obj, uid) {
    $('#enemy-body').attr('class', 'ellstand')
    var enemydata = EnemyData[uid]
    for (var index in obj) {
        obj[index] = enemydata[index]
    }
    $('#qwea').innerHTML = "LV."

    obj.xfx = true //平X方向：右true左false
    obj.imgfx = true
    obj.hited = false
    window.console.log(obj)
}

function EnemyMove(obj) {
    var fx = RandomFX(0, 4); //停止、下左上右为01234
    //随机数[m~n]
    function RandomFX(m, n) {
        var num = Math.floor(Math.random() * (m - n - 1) + n + 1);
        return num;
    }

    //0.2秒随机更改方向
    obj.randomfx = setInterval(function () {
        fx = RandomFX(0, 4);
    }, 200);
    var tempspeed = obj.speed

    var rotateNum = 180; //旋转角度
    obj.randommove = setInterval(function () {
        $('#enemy-body.ellstand').css({ 'width': obj.ellstandx + 'px', 'height': obj.ellstandy + 'px', 'background-image': 'url(static/images/e1stand.gif)' })
        $('#enemy-body.ellmove').css({ 'width': obj.ellmovex + 'px', 'height': obj.ellmovey + 'px', 'background-image': 'url(static/images/e1move.gif)' })
        $('#enemy-body.ellhited').css({ 'width': obj.ellhitedx + 'px', 'height': obj.ellhitedy + 'px', 'background-image': 'url(static/images/e1hited.gif)' })
        $('#enemy-body.elldead').css({ 'width': obj.elldeadx + 'px', 'height': obj.elldeady + 'px', 'background-image': 'url(static/images/e1dead.gif)' })

        obj.speed = tempspeed
        if (obj.hited == true) {
            $('#enemy-body').attr('class', 'ellhited')
            obj.speed = 0
        } else if (obj.HP <= 0 && obj.hited == false) {
            $('#enemy-body').attr('class', 'elldead')
        } else if (fx == 0) {
            $('#enemy-body').attr('class', 'ellstand')
            obj.speed = 0
        } else if (fx == 1 && obj.ply < 540 && obj.ply >= 0) {
            $('#enemy-body').attr('class', 'ellmove')
            obj.ply += obj.speed;
        } else if (fx == 3 && obj.ply > 380) {
            $('#enemy-body').attr('class', 'ellmove')
            obj.ply -= obj.speed;
        } else if (fx == 2 && obj.plx > 0) {
            $('#enemy-body').attr('class', 'ellmove')
            obj.xfx = false;
            if (obj.xfx != obj.imgfx) {
                obj.imgfx = false;
                $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
                rotateNum += 180;
            }
            obj.plx -= obj.speed;
        } else if (fx == 4 && obj.plx < 1070 && obj.plx >= 0) {
            $('#enemy-body').attr('class', 'ellmove')
            obj.xfx = true;
            if (obj.xfx != obj.imgfx) {
                obj.imgfx = true;
                $('#enemy-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
                rotateNum += 180;
            }
            obj.plx += obj.speed;
        } else {
            fx = RandomFX(0, 4);
        }
        $('#enemy').css('top', obj.ply + "px")
        $('#enemy').css('left', obj.plx + "px")
        $('#enemy').css('z-index', ell.ply)
    }, 50);
    window.console.log('mmmmmmmmmmmmmmm')
}

export default {
    ell, UpdateEnemy
}