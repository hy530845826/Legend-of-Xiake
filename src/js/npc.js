var npc = new CreateNPC();

//import npc_data from './npc_data.json'
// var NPCData = npc_data
// var NPCOptions

//var Player = require("./player")
//var pl = Player.default.pll

function CreateNPC() {
    this.UID = 0
    this.name = 'null'

    this.plx = 0
    this.ply = 0

    this.LV = 0
    this.HPMAX = 0
    this.HP = 0
    this.MPMAX = 0
    this.MP = 0

    this.ATK = 0
    this.ATKMAX = 0
    this.DEF = 0
    this.STR = 0
    this.AGI = 0
    this.INT = 0

    this.speed = 0

    this.div_width = 0
    this.div_height = 0
    this.stand_x = 0
    this.stand_y = 0
}

// function Updatenpc(obj, uid) {
//     $('#npc-body').attr('class', 'stand')
//     NPCOptions = NPCData[uid]
//     let datamsg = (NPCOptions[0])
//     for (let index in obj) {
//         obj[index] = datamsg[index]
//     }
//     if (pl.plx < obj.plx) {
//         obj.imgfx = false
//         $('#npc-body').css({ transition: "transform 0.5s", transform: "rotateY(" + 180 + "deg)" })
//     } else { obj.imgfx = true }
//     obj.hited = false
//     obj.IsFlash = false
//     //获取数据有延迟
//     setTimeout(function () {
//         $('#npc').css('width', npc.div_width)//为name提供宽度
//         $('#npc-body').css({ 'width': npc.div_width + 'px', 'height': npc.div_height + 'px' })
//         $('#npc-hp .progress-bar').css('width', 100 + '%')
//         $('#npc-hp').css({ 'width': 2 * npc.stand_x + 'px', 'left': - (0.5 * npc.stand_x) + 'px' })
//         var name_left = parseInt((npc.stand_x - parseInt($('#npc-name').css('width'))) / 2)
//         $('#npc-name').css({ 'left': name_left + 'px', 'top': (npc.stand_y + 5) + 'px' })
//         npcMove(obj)
//         ChecknpcHit()
//     }, 50)
// }

// function ChecknpcHit(StateName, TikTok) {
//     TikTok = TikTok || 1
//     var imgWidth = parseInt($('#npc-body').css('width'))
//     for (let index in NPCOptions) {
//         let data = NPCOptions[index]
//         if (StateName == data[0].UName) {
//             let target = data[TikTok]
//             if (target.check_y != undefined) {
//                 npc.ply += target.check_y
//                 $('#npc').css('top', npc.ply + "px")
//             }
//             npc.div_width = data[0].div_width
//             npc.div_height = data[0].div_height
//             if (npc.imgfx == false) {
//                 // 移动反向图像左边距，保持右边不变
//                 var changeX = 0
//                 if (TikTok > 1) {
//                     changeX = target.hited_x - data[TikTok - 1].hited_x
//                 } else if (StateName != 'move') {
//                     changeX = target.hited_x + target.hited_left - npc.stand_x //npcstand宽度
//                 }
//                 npc.plx -= changeX
//                 $('#npc').css('left', npc.plx + "px")
//                 //反向图像重新校正left
//                 npc.img_x = (target.img_x + target.hited_x - imgWidth)
//                 npc.hited_left = - target.hited_left
//                 npc.hit_left = (target.hited_x - target.hit_left - target.hit_x) || 0
//             }
//             ChangenpcCSS(StateName)

//             break;
//         }
//     }
// }
// function ChangenpcCSS(StateName) {
//     $('#npc-body').css({
//         'left': npc.img_x + 'px',
//         'top': npc.img_y + 'px'
//     })

//     if (StateName == 'stand' || StateName == 'move') {
//         $('#npc.' + StateName + ' #npc-body').css({ 'background-image': 'url(static/images/e' + npc.UID + '-' + StateName + '.gif)' })
//     } else {
//         $('#npc.' + StateName + ' #npc-body').css({ 'background-image': 'url(static/images/e' + npc.UID + '-' + StateName + '.png)' })
//     }
// }

// function npcMove(obj) {
//     obj.npcMove_timer = setInterval(function () {
//         pl.plx < obj.plx ? obj.realfx = true : obj.realfx = false
//         if (obj.realfx == obj.imgfx) {
//             pl.plx < obj.plx ? $('#npc-body').css({ transition: "transform 0.5s", transform: "rotateY(180deg)" }) : $('#npc-body').css({ transition: "transform 0.5s", transform: "rotateY(0deg)" })
//         }
//         $('#npc').css('top', obj.ply + "px")
//         $('#npc').css('left', obj.plx + "px")
//         $('#npc').css('z-index', npc.ply)
//     }, 50);
// }

export default {
    npc
}