var npc = new CreateNPC(0, 0);

import npc_data from './data/npc_data.json'
var NPCData = npc_data
var NPCOptions

function CreateNPC(plx, ply, lv, hpmax, hp, mpmax, mp, atk, atkmax, def, str, agi, intt) {
    this.UID = 0
    this.appellation = 'null'
    this.name = 'null'

    this.plx = plx
    this.ply = ply

    this.LV = lv
    this.HPMAX = hpmax
    this.HP = hp
    this.MPMAX = mpmax
    this.MP = mp

    this.ATK = atk
    this.ATKMAX = atkmax
    this.DEF = def
    this.STR = str
    this.AGI = agi
    this.INT = intt

    this.speed = 0

    this.div_width = 0
    this.div_height = 0
    this.realfx = true

    this.CD_talk = 0
    this.CD_over = 0
    this.CD_move = 0
}

function Updatenpc(obj, PortalToMapID) {
    DeleteEnemy(obj)
    var uid = CheckCreateMap(PortalToMapID)
    if (uid == undefined) {
        window.console.log('map-' + PortalToMapID + ':no-npc')
        return 0
    }
    NPCOptions = NPCData[uid]
    let datamsg = (NPCOptions[0])
    for (let index in obj) {
        obj[index] = datamsg[index]
    }
    obj.realfx ? $('#npc-body').css("transform", "rotateY(" + 0 + "deg)") : $('#npc-body').css("transform", "rotateY(" + 180 + "deg)")
    obj.CD_audio = 0
    //获取数据有延迟
    setTimeout(function () {
        $('#npc').css({ 'width': npc.div_width, 'top': obj.ply + "px", 'left': obj.plx + "px", 'z-index': npc.ply })//为name提供宽度
        $('#npc-body').css({ 'width': npc.div_width + 'px', 'height': npc.div_height + 'px' })
        var name_left = parseInt((npc.div_width - parseInt($('#npc-name').css('width'))) / 2)
        $('#npc-name').css({ 'left': name_left + 'px', 'top': (npc.div_height + 5) + 'px' })
        $('#npc-body').css({ 'background-image': 'url(static/images/npc' + npc.UID + '.gif)' })
    }, 50)
}

function DeleteEnemy(obj) {
    obj.plx = -200;
    obj.ply = 200;
    $('#npc').css('top', obj.ply + "px")
    $('#npc').css('left', obj.plx + "px")
}

function CheckCreateMap(PortalToMapID) {
    var CreateEnemyUID
    for (var index in NPCData) {
        var datamsg = (NPCData[index])[0]
        var CreateMapID = datamsg.CreateMap
        if (CreateMapID == PortalToMapID) {
            CreateEnemyUID = datamsg.UID
            break
        }
    }
    return CreateEnemyUID
}

export default {
    npc, Updatenpc
}