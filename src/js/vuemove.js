var Tool = require("./tool")
var t = Tool.default
var Player = require("./player")
var pl = Player.default.pll
var Enemy = require("./enemy")
var ell = Enemy.default.ell
var UpdateEnemy = Enemy.default.UpdateEnemy
var Npc = require("./npc")
var npc = Npc.default.npc
var Updatenpc = Npc.default.Updatenpc
var Hit = require("./hit")
var HitJudgement = Hit.default.HitJudgement

import player_options from './data/player_options.json'
var PlayerOptions = player_options
import player_data from './data/player_data.json'
var PlayerSkillData = player_data[1]

var IsMove = 0
var rotateNum = 180; //旋转角度

document.onkeydown = function (event) {
	if (pl.loading) { return } //加载中静止操作角色
	event = event || window.event
	switch (event.keyCode) {
		case 39: //→
			pl.d = true;
			IsMove += 1;
			pl.realfx = true;
			if (IsMove == 1 && !pl.IsFlash) {
				ChangePlayerState(pl, 'move')
				if (pl.realfx != pl.imgfx) {
					pl.imgfx = true;
					$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
					$('#skill-body').css({ transition: "transform 0.1s", transform: "rotateY(" + rotateNum + "deg)" })
					rotateNum += 180;
				}
			}
			break;
		case 37: //←
			pl.a = true;
			IsMove += 1;
			pl.realfx = false;
			if (IsMove == 1 && !pl.IsFlash) {
				ChangePlayerState(pl, 'move')
				if (pl.realfx != pl.imgfx) {
					pl.imgfx = false;
					$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
					$('#skill-body').css({ transition: "transform 0.1s", transform: "rotateY(" + rotateNum + "deg)" })
					rotateNum -= 180;
				}
			}
			break;
		case 38: //↑
			pl.w = true;
			IsMove += 1;
			if (IsMove == 1 && !pl.IsFlash) {
				ChangePlayerState(pl, 'move')
			}
			break;
		case 40: //↓
			pl.s = true;
			IsMove += 1;
			if (IsMove == 1 && !pl.IsFlash) {
				ChangePlayerState(pl, 'move')
			}
			break;
		case 67: //C
			ChangeMap()
			break;
		case 88: //X
			if (pl.IsFlash == false) {
				flash(pl, 'skillX')
				GetAudio('pl', 'atk', 3)
			}
			break;
		case 90: //Z
			if (pl.IsFlash == false) {
				flash(pl, 'skillZ')
				GetAudio('pl', 'atk', 3)
			}
			break;
		case 65: //A
			if (pl.IsFlash == false) {
				if (pl.CD_a == 0) {
					GetUseCDMP(pl, 0)
					pl.IsMana = t.UseSkillMP(pl, pl.needMP)
					if (pl.IsMana) {
						flash(pl, 'skillA')
						CDSkill(pl, 0, pl.needCD)
						GetAudio('pl', 'skill_a')
					}
				} else if (pl.CD_flag == 0) {
					CDSkill(pl, -1, 20)
					GetAudio('pl', 'cd')
				}
			}
			break;
		case 83: //S
			if (pl.IsFlash == false) {
				if (pl.CD_s == 0) {
					GetUseCDMP(pl, 1)
					pl.IsMana = t.UseSkillMP(pl, pl.needMP)
					if (pl.IsMana) {
						flash(pl, 'skillS')
						CDSkill(pl, 1, pl.needCD)
						GetAudio('pl', 'skill_s')
					}
				} else if (pl.CD_flag == 0) {
					CDSkill(pl, -1, 20)
					GetAudio('pl', 'cd')
				}
			}
			break;
		case 68: //D
			if (pl.IsFlash == false) {
				if (pl.CD_d == 0) {
					GetUseCDMP(pl, 2)
					pl.IsMana = t.UseSkillMP(pl, pl.needMP)
					if (pl.IsMana) {
						flash(pl, 'skillD', 540)
						CDSkill(pl, 2, pl.needCD)
						GetAudio('pl', 'skill_d')
					}
				} else if (pl.CD_flag == 0) {
					CDSkill(pl, -1, 20)
					GetAudio('pl', 'cd')
				}
			}
			break;
		case 70: //F
			if (pl.IsFlash == false) {
				if (pl.CD_f == 0) {
					GetUseCDMP(pl, 3)
					pl.IsMana = t.UseSkillMP(pl, pl.needMP)
					if (pl.IsMana) {
						flash(pl, 'skillF')
						CDSkill(pl, 3, pl.needCD)
						GetAudio('pl', 'skill_f1')
						setTimeout(function () { GetAudio('pl', 'skill_f2') }, 600)
					}
				} else if (pl.CD_flag == 0) {
					CDSkill(pl, -1, 20)
					GetAudio('pl', 'cd')
				}
			}
			break;
		case 49: //1
			if (pl.CD_bag == 0) {
				GetBagNum(pl, 0)
				if (pl.bagNum) {
					UpdateBag(pl, 0, 1)
					t.UseConsumables(pl, pl.bagStyle, pl.bagValue);
					CDBag(pl);
					GetAudio("pl", "skill_a");
				}
			} else if (pl.CD_flag == 0) {
				CDBag(pl, true);
				GetAudio("pl", "cd");
			}
			break;
		case 50: //2
			if (pl.CD_bag == 0) {
				GetBagNum(pl, 1)
				if (pl.bagNum) {
					UpdateBag(pl, 1, 1)
					t.UseConsumables(pl, pl.bagStyle, pl.bagValue);
					CDBag(pl);
					GetAudio("pl", "skill_a");
				}
			} else if (pl.CD_flag == 0) {
				CDBag(pl, true);
				GetAudio("pl", "cd");
			}
			break;
		case 51: //3
			if (pl.CD_bag == 0) {
				GetBagNum(pl, 2)
				if (pl.bagNum) {
					UpdateBag(pl, 2, 1)
					t.UseConsumables(pl, pl.bagStyle, pl.bagValue);
					CDBag(pl);
					GetAudio("pl", "skill_a");
				}
			} else if (pl.CD_flag == 0) {
				CDBag(pl, true);
				GetAudio("pl", "cd");
			}
			break;
		case 52: //4
			if (pl.CD_bag == 0) {
				GetBagNum(pl, 3)
				if (pl.bagNum) {
					UpdateBag(pl, 3, 1)
					t.UseConsumables(pl, pl.bagStyle, pl.bagValue, pl.bagTemporary, pl.bagTime);
					CDBag(pl);
					GetAudio("pl", "skill_a");
				}
			} else if (pl.CD_flag == 0) {
				CDBag(pl, true);
				GetAudio("pl", "cd");
			}
			break;
		case 53: //5
			if (pl.CD_bag == 0) {
				GetBagNum(pl, 4)
				if (pl.bagNum) {
					UpdateBag(pl, 4, 1)
					t.UseConsumables(pl, pl.bagStyle, pl.bagValue, pl.bagTemporary, pl.bagTime);
					CDBag(pl);
					GetAudio("pl", "skill_a");
				}
			} else if (pl.CD_flag == 0) {
				CDBag(pl, true);
				GetAudio("pl", "cd");
			}
			break;
		case 54: //6
			if (pl.CD_bag == 0) {
				GetBagNum(pl, 5)
				if (pl.bagNum) {
					UpdateBag(pl, 5, 1)
					t.UseConsumables(pl, pl.bagStyle, pl.bagValue);
					CDBag(pl);
					GetAudio("pl", "skill_a");
				}
			} else if (pl.CD_flag == 0) {
				CDBag(pl, true);
				GetAudio("pl", "cd");
			}
			break;
	}
}

setInterval(function () {
	if (!pl.IsFlash) {
		if (pl.s && pl.ply < pl.stop_b) {
			pl.ply += pl.speed;
		} else if (pl.w && pl.ply > pl.stop_t) {
			pl.ply -= pl.speed;
		} else if (pl.a && pl.plx > pl.stop_l) {
			pl.plx -= pl.speed;
		} else if (pl.d && pl.plx < pl.stop_r) {
			pl.plx += pl.speed;
		}
		if (pl.ply > pl.stop_b) { pl.ply = pl.stop_b }
		if (pl.ply < pl.stop_t) { pl.ply = pl.stop_t }
		if (pl.plx < pl.stop_l) { pl.plx = pl.stop_l }
		if (pl.plx > pl.stop_r) { pl.plx = pl.stop_r }
		if (pl.plx > pl.Audio_move_l && pl.plx < pl.Audio_move_r) {
			if (npc.CD_audio == 0 && npc.moveAudioFlag == false) {
				npc.moveAudioFlag == true
				t.CDAudio(npc, false);
				GetAudio("npc", "npc" + npc.UID + "_move", npc.style_move);
			}
		}
		if (pl.realfx != pl.imgfx) {
			if (pl.realfx) {
				pl.imgfx = true;
				$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
				$('#skill-body').css({ transition: "transform 0.1s", transform: "rotateY(" + rotateNum + "deg)" })
				rotateNum += 180;
			} else {
				pl.imgfx = false;
				$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
				$('#skill-body').css({ transition: "transform 0.1s", transform: "rotateY(" + rotateNum + "deg)" })
				rotateNum -= 180;
			}
		}
	}
	$('#role').css('top', pl.ply + "px")
	$('#role').css('left', pl.plx + "px")
	$('#role').css('z-index', pl.ply)
}, 40);

document.onkeyup = function (event) {
	event = event || window.event;
	switch (event.keyCode) {
		case 39:
			pl.d = false;
			IsMove = 0;
			if (IsMove == 0 && pl.IsFlash == false) {
				ChangePlayerState(pl, 'stand')
			}
			break; //→
		case 37:
			pl.a = false;
			IsMove = 0;
			if (IsMove == 0 && pl.IsFlash == false) {
				ChangePlayerState(pl, 'stand')
			}
			break; //←
		case 38:
			pl.w = false;
			IsMove = 0;
			if (IsMove == 0 && pl.IsFlash == false) {
				ChangePlayerState(pl, 'stand')
			}
			break; //↑
		case 40:
			pl.s = false;
			IsMove = 0;
			if (IsMove == 0 && pl.IsFlash == false) {
				ChangePlayerState(pl, 'stand')
			}
			break; //↓
	}
}

function flash(obj, StateName, check_x) {
	obj.IsFlash = true
	obj.IsMove = false
	var i = 1, j = 0
	var base_x = pl.plx, base_y = pl.ply
	if (check_x != undefined) {
		obj.imgfx ? base_x += check_x : base_x -= check_x
	}
	ChangePlayerState(obj, StateName)
	clearInterval(plflash)
	let TikTok_sum = obj.TikTok_sum
	let div_width = obj.div_width
	let skill_start_TikTok = obj.skill_start_TikTok
	let skill_TikTok_sum = obj.skill_TikTok_sum
	let skill_width = obj.skill_width

	// let div_width = obj.div_width / TikTok_sum
	var plflash

	if (i == skill_start_TikTok) {
		$('#skill-body').css('background-position', (-skill_width * j) + 'px ')
		j++
	}
	plflash = setInterval(function () {
		i++
		if ((j > 0 && j < skill_TikTok_sum) || (i == skill_start_TikTok)) {
			$('#skill-body').css('background-position', (-skill_width * j) + 'px ')
			j++
		} else {
			$('#skill-body').css('background-position', 1000 + 'px ')
		}
		if (i > TikTok_sum) {
			clearInterval(plflash)
			obj.IsFlash = false
			obj.IsMove = true
			pl.plx = base_x
			pl.ply = base_y
			pl.hit_ID = 0
			setTimeout(function () {
				if (obj.IsFlash == false) {
					(pl.w || pl.a || pl.s || pl.d) ? ChangePlayerState(obj, 'move') : ChangePlayerState(obj, 'stand')
					$('#role-body').css('background-position', 0 + 'px ')
				}
			}, 50)
		} else {
			$('#role-body').css('background-position', (-div_width * (i - 1)) + 'px ')
			CheckPlayerHit(obj, StateName, i)
		}
	}, obj.farme);

}

function ChangePlayerState(obj, StateName) {
	$('#role').attr('class', StateName)
	CheckPlayerHit(obj, StateName)
}

function CheckPlayerHit(obj, StateName, TikTok) {
	TikTok = TikTok || 1
	var imgWidth = parseInt($('#role-body').css('width'))
	var skillimgWidth = parseInt($('#skill-body').css('width'))

	for (let index in PlayerOptions) {
		let data = PlayerOptions[index]
		if (StateName == data[0].UName) {
			let target = data[TikTok]
			if (target.check_y != undefined) {
				obj.ply += target.check_y
				$('#role').css('top', obj.ply + "px")
			}
			if (target.check_x != undefined) {
				obj.imgfx ? obj.plx += target.check_x : obj.plx -= target.check_x
				$('#role').css('left', obj.plx + "px")
			}
			obj.img_x = -target.img_x
			obj.img_y = -target.img_y
			obj.hited_x = target.hited_x
			obj.hited_y = target.hited_y
			obj.hited_left = target.hited_left
			obj.hited_top = target.hited_top
			obj.hit_x = target.hit_x || 0
			obj.hit_y = target.hit_y || 0
			obj.hit_left = target.hit_left || 0
			obj.hit_top = target.hit_top || 0
			obj.skill_left = -target.skill_left
			obj.skill_top = -target.skill_top
			obj.div_width = data[0].div_width
			obj.TikTok_sum = data[0].TikTok_sum
			obj.farme = data[0].farme
			obj.skill_start_TikTok = data[0].skill_start_TikTok
			obj.skill_TikTok_sum = data[0].skill_TikTok_sum
			obj.skill_width = data[0].skill_width
			if (obj.imgfx == false) {
				// 移动反向图像左边距，保持右边不变
				var changeX = 0
				if (TikTok > 1) {
					changeX = target.hited_x - data[TikTok - 1].hited_x
				} else if (StateName != 'move') {
					changeX = target.hited_x - obj.stand_x
				}
				obj.plx -= changeX
				$('#role').css('left', obj.plx + "px")

				//反向图像重新校正left
				obj.img_x = (target.img_x + target.hited_x - imgWidth)
				obj.hit_left = (target.hited_x - target.hit_left - target.hit_x) || 0
				obj.skill_left = (target.skill_left + target.hited_x - skillimgWidth)
			}
			ChangePlayerCSS()
			if (obj.hit_x != 0 && obj.hit_y != 0) {
				if (obj === pl) {
					HitJudgement(pl, ell, true, target.hit_ID)
				} else if (obj === ell) {
					//HitJudgement(pl, enemy, true)
				}
			}
			break;
		}
	}
}

function ChangePlayerCSS() {
	$('#role-body').css({
		'left': pl.img_x + 'px',
		'top': pl.img_y + 'px'
	})
	$('#role-hited-judge').css({
		'width': pl.hited_x + 'px',
		'height': pl.hited_y + 'px',
		'left': pl.hited_left + 'px',
		'top': pl.hited_top + 'px'
	})
	$('#role-hit-judge').css({
		'width': pl.hit_x + 'px',
		'height': pl.hit_y + 'px',
		'left': pl.hit_left + 'px',
		'top': pl.hit_top + 'px'
	})
	$('#skill-body').css({
		'left': pl.skill_left + 'px',
		'top': pl.skill_top + 'px '
	})
}

function ChangeMap() {
	var PortalNumber = GetPortalNumber()
	var l1, r1, b1

	b1 = pl.ply + pl.stand_y
	l1 = pl.plx
	r1 = pl.plx + pl.stand_x

	for (let i = 0; i < PortalNumber; i++) { //根据传送门个数判定是否进入
		var t2, l2, r2, b2
		var targetObj = $('.Portal')[i]
		t2 = targetObj.offsetTop;
		l2 = targetObj.offsetLeft;
		r2 = l2 + 100;
		b2 = t2 + 80;

		if (b1 < (b2 - 30) || b1 > (b2 + 10) || l1 < (l2 - 10) || r1 > (r2 + 10)) { /*没碰到*/ }
		else {
			var PortalToMapID = parseInt(targetObj.className.match(/to-map-(\S*)/)[1]) //获取传送门的to-mapID
			// var PortalMusicID = parseInt(targetObj.className.match(/music-(\S*)/)[1]) //获取bgmID
			var PortalMusicID = GetMapBGMNumber(PortalToMapID)
			var AudioName = GetAudioName(PortalToMapID)
			var MapIDNumber = GetMapIDNumber()
			var MapBGMNumber = GetMapBGMNumber(MapIDNumber)
			Loading(MapIDNumber, PortalToMapID, MapBGMNumber, PortalMusicID, AudioName, false)
		}
	}
}

function Loading(MapIDNumber, PortalToMapID, MapBGMNumber, PortalMusicID, AudioName, FlyFlag, MoveFlag = true) {
	//0.禁止角色操作，黑屏显示loading
	$('#loading-screen').css('display', 'block')
	pl.loading = true
	var i = 10
	$('#loading-screen .progress-bar').css('width', i + '%')
	//0.5删除enemy
	t.DeleteEnemy(ell)
	//1.加载地图
	window.console.log("当前地图map-" + MapIDNumber + "	切换至:map-" + PortalToMapID)
	$('#map').attr('class', 'map-' + PortalToMapID)
	//1.8获取新地图可移动区域
	t.UpdateStopPosition(pl, PortalToMapID)
	//2.计时器timer结束执行-ChangeBGM(200ms)
	var timer = setInterval(function () {
		i += 2
		if (i >= 50) {
			clearInterval(timer)
			window.console.log("当前BGM:" + MapBGMNumber + ".mp3	切换至:" + PortalMusicID + ".mp3")
			ChangeBGM(MapBGMNumber, PortalMusicID)
			//2.5修改小地图坐标
			$('#map-' + MapIDNumber).attr('class', '')
			$('#map-' + PortalToMapID).attr('class', 'Player-Position')
			//3.计时器timer2结束执行-CreatePortal(3200ms)
			//3.5获取环境音乐
			var timer2 = setInterval(function () {
				i++
				if (i >= 90) {
					clearInterval(timer2)
					CreatePortal(PortalToMapID)
					GetEnAudio('environment', AudioName)
					//4.计时器timer3结束执行-UpdateEnemy、Updatenpc、MovePlayer(2000ms)
					var timer3 = setInterval(function () {
						i += 2
						if (i >= 100) {
							clearInterval(timer3)
							UpdateEnemy(ell, PortalToMapID)
							Updatenpc(npc, PortalToMapID)
							pl.Audio_move_l = npc.plx - 100
							pl.Audio_move_r = npc.plx + npc.div_width + 100
							if (MoveFlag) { FlyFlag ? MovePlayer() : MovePlayer(MapIDNumber) }
							//5.允许角色操作，黑屏关闭loading
							$('#loading-screen').css('display', 'none')
							pl.loading = false
						}
						$('#loading-screen .progress-bar').css('width', i + '%')
					}, 400)
				}
				$('#loading-screen .progress-bar').css('width', i + '%')
			}, 80)
		}
		$('#loading-screen .progress-bar').css('width', i + '%')
	}, 10)
}

function CreatePortal(PortalToMapID) {
	$('.Portal').remove('#map .Portal')
	switch (PortalToMapID) {
		case 0:
			$("#map").prepend("<div class='Portal Portal-songshan to-map-6'> </div>");
			$("#map").prepend("<div class='Portal Portal-wudang to-map-7'> </div>");
			$("#map").prepend("<div class='Portal Portal-tiezhangfeng to-map-10'> </div>");
			$("#map").prepend("<div class='Portal Portal-shunanzhuhai to-map-11'> </div>");
			$("#map").prepend("<div class='Portal Portal-jueqinggu to-map-14'> </div>");
			$("#map").prepend("<div class='Portal Portal-emei to-map-16'> </div>");
			$("#map").prepend("<div class='Portal Portal-dashamo to-map-17'> </div>");
			break;
		case 1:
			$("#map").prepend("<div class='Portal Portal-birth to-map-2'> </div>");
			break;
		case 2:
			$("#map").prepend("<div class='Portal Portal-L to-map-1'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-5'> </div>");
			$("#map").prepend("<div class='Portal Portal-M to-map-3'> </div>");
			break;
		case 3:
			$("#map").prepend("<div class='Portal Portal-L to-map-2'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-4'> </div>");
			break;
		case 4:
			$("#map").prepend("<div class='Portal Portal-L to-map-3'> </div>");
			break;
		case 5:
			$("#map").prepend("<div class='Portal Portal-L to-map-2'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-6'> </div>");
			break;
		case 6:
			$("#map").prepend("<div class='Portal Portal-L to-map-5'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-0'> </div>");
			break;
		case 7:
			$("#map").prepend("<div class='Portal Portal-L to-map-0'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-8'> </div>");
			$("#map").prepend("<div class='Portal Portal-M to-map-10'> </div>");
			break;
		case 8:
			$("#map").prepend("<div class='Portal Portal-L to-map-7'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-9'> </div>");
			break;
		case 9:
			$("#map").prepend("<div class='Portal Portal-L to-map-8'> </div>");
			break;
		case 10:
			$("#map").prepend("<div class='Portal Portal-L to-map-0'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-7'> </div>");
			break;
		case 11:
			$("#map").prepend("<div class='Portal Portal-L to-map-12'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-0'> </div>");
			break;
		case 12:
			$("#map").prepend("<div class='Portal Portal-L to-map-13'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-11'> </div>");
			break;
		case 13:
			$("#map").prepend("<div class='Portal Portal-R to-map-12'> </div>");
			break;
		case 14:
			$("#map").prepend("<div class='Portal Portal-L to-map-0'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-15'> </div>");
			break;
		case 15:
			$("#map").prepend("<div class='Portal Portal-L to-map-14'> </div>");
			break;
		case 16:
			$("#map").prepend("<div class='Portal Portal-M to-map-0'> </div>");
			break;
		case 17:
			$("#map").prepend("<div class='Portal Portal-L to-map-18'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-0'> </div>");
			break;
		case 18:
			$("#map").prepend("<div class='Portal Portal-M to-map-19'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-17'> </div>");
			break;
		case 19:
			$("#map").prepend("<div class='Portal Portal-L to-map-18'> </div>");
			break;
	}
}

function ChangeBGM(MapBGMNumber, PortalMusicID) {
	if (MapBGMNumber != PortalMusicID) {
		if (PortalMusicID != undefined) {
			$('#BGM').attr('src', './static/sound/bgm/map-' + PortalMusicID + '.mp3')
		} else {
			$('#BGM').attr('src', '')
		}
	}
}

function MovePlayer(MapIDNumber) {
	if (MapIDNumber != undefined) {
		var targetObj = $('.to-map-' + MapIDNumber)[0]
		window.console.log($('.to-map-' + MapIDNumber))
		var t2 = targetObj.offsetTop
		var l2 = targetObj.offsetLeft
		pl.plx = l2 + 15
		pl.ply = t2 - 60
	} else {
		pl.plx = t.RandomNumber2(pl.stop_l, pl.stop_r)
		pl.ply = t.RandomNumber2(pl.stop_t, pl.stop_b)
	}
}


function GetAudioName(MapID) {
	var AudioName
	switch (MapID) {
		case 0: AudioName = undefined; break;
		case 1: AudioName = 'garden'; break;
		case 2: AudioName = 'wind_1'; break;
		case 3: case 4: AudioName = 'wind_1'; break;
		case 5: case 6: AudioName = 'wind_1'; break;
		case 7: case 8: AudioName = 'wind_1'; break;
		case 9: AudioName = 'wind_1'; break;
		case 10: AudioName = 'wind_1'; break;
		case 11: case 12: AudioName = 7; break;
		case 13: AudioName = 8; break;
		case 14: case 15: AudioName = 9; break;
		case 16: AudioName = 10; break;
		case 17: case 18: AudioName = 11; break;
		case 19: AudioName = 12; break;
	}
	return AudioName
}

function GetMapBGMNumber(MapID) {
	var MapBGMNumber
	switch (MapID) {
		case 0: MapBGMNumber = 0; break;
		case 1: MapBGMNumber = undefined; break;
		case 2: MapBGMNumber = 1; break;
		case 3: case 4: MapBGMNumber = 2; break;
		case 5: case 6: MapBGMNumber = 3; break;
		case 7: case 8: MapBGMNumber = 4; break;
		case 9: MapBGMNumber = 5; break;
		case 10: MapBGMNumber = 6; break;
		case 11: case 12: MapBGMNumber = 7; break;
		case 13: MapBGMNumber = 8; break;
		case 14: case 15: MapBGMNumber = 9; break;
		case 16: MapBGMNumber = 10; break;
		case 17: case 18: MapBGMNumber = 11; break;
		case 19: MapBGMNumber = 12; break;
	}
	return MapBGMNumber
}

function GetMapIDNumber() {
	var MapID = $("#map").attr("class")
	var MapIDNumber = parseInt(MapID.replace(/[^0-9]/ig, "")) //map-1→1
	return MapIDNumber
}

// function GetMapBGMNumber() {
// 	var MapID = $("#BGM").attr("src")
// 	var MapBGMNumber = parseInt(MapID.match(/(\d*)\.mp3/)[1]) //map-1.mp3→1
// 	return MapBGMNumber
// }

function GetPortalNumber() {
	var MapIDNumber = GetMapIDNumber()
	var PortalNumber //传送门个数
	switch (MapIDNumber) {
		case 1: case 4: case 9: case 13: case 15: case 16: case 19: PortalNumber = 1; break;
		case 3: case 5: case 6: case 8: case 10: case 11: case 12: case 14: case 17: case 18: PortalNumber = 2; break;
		case 2: case 7: PortalNumber = 3; break;
		case 0: PortalNumber = 7; break;
	}
	return PortalNumber
}

function GetEnAudio(dirName, StateName) {
	if (StateName != undefined) {
		$('#EnAudio').attr('src', './static/sound/audio/' + dirName + '/' + StateName + '.mp3')
	} else {
		$('#EnAudio').attr('src', '')
	}
}

function GetAudio(dirName, StateName, RandomNumber) {
	RandomNumber = RandomNumber || 0
	let audio = new Audio()
	if (RandomNumber == 0) {
		audio.src = "./static/sound/audio/" + dirName + "/" + StateName + ".mp3"
	}
	else {
		RandomNumber = t.RandomNumber(1, RandomNumber)
		audio.src = "./static/sound/audio/" + dirName + "/" + StateName + "_" + RandomNumber + ".mp3"
	}
	audio.play();
}

//技能CD(cd1s→20)
function CDSkill(obj, cdNumber, cd) {
	var cd_timer, cd_icon
	var targetIcon = $($("#action-skillcd-bar li")[cdNumber])
	targetIcon.attr('class', 'cding')
	switch (cdNumber) {
		case -1:
			cd_timer = setInterval(function () {
				obj.CD_flag++
				if (obj.CD_flag == cd) {
					obj.CD_flag = 0;
					clearInterval(cd_timer);
				}
			}, 50);
			break;
		case 0:
			cd_timer = setInterval(function () {
				cd_icon = parseInt((obj.CD_a / cd) * 100)
				targetIcon.css('top', cd_icon + '%')
				obj.CD_a++
				if (obj.CD_a == cd) {
					obj.CD_a = 0;
					SkillBling(targetIcon)
					clearInterval(cd_timer);
				}
			}, 50);
			break;
		case 1:
			cd_timer = setInterval(function () {
				cd_icon = parseInt((obj.CD_s / cd) * 100)
				targetIcon.css('top', cd_icon + '%')
				obj.CD_s++
				if (obj.CD_s == cd) {
					obj.CD_s = 0;
					SkillBling(targetIcon)
					clearInterval(cd_timer);
				}
			}, 50);
			break;
		case 2:
			cd_timer = setInterval(function () {
				cd_icon = parseInt((obj.CD_d / cd) * 100)
				targetIcon.css('top', cd_icon + '%')
				obj.CD_d++
				if (obj.CD_d == cd) {
					obj.CD_d = 0;
					SkillBling(targetIcon)
					clearInterval(cd_timer);
				}
			}, 50)
			break;
		case 3:
			cd_timer = setInterval(function () {
				cd_icon = parseInt((obj.CD_f / cd) * 100)
				targetIcon.css('top', cd_icon + '%')
				obj.CD_f++
				if (obj.CD_f == cd) {
					obj.CD_f = 0;
					SkillBling(targetIcon)
					clearInterval(cd_timer);
				}
			}, 50)
			break;
	}
}

function CDBag(obj, cdBagFlag = false) {
	var cd_timer, cd_icon
	var AllIcon = $("#action-bagcd-bar li")
	AllIcon.attr('class', 'cding')
	if (cdBagFlag) {
		cd_timer = setInterval(function () {
			obj.CD_flag++
			if (obj.CD_flag == obj.CD_bagMax) {
				obj.CD_flag = 0;
				clearInterval(cd_timer);
			}
		}, 50);
	} else {
		cd_timer = setInterval(function () {
			cd_icon = parseInt((obj.CD_bag / obj.CD_bagMax) * 100)
			AllIcon.css('top', cd_icon + '%')
			obj.CD_bag++
			if (obj.CD_bag == obj.CD_bagMax) {
				obj.CD_bag = 0;
				AllIcon.css('top', 0)
				AllIcon.attr('class', '')
				clearInterval(cd_timer);
			}
		}, 50);
	}
}

function SkillBling(targetIcon) {
	targetIcon.css('top', 0)
	targetIcon.attr('class', 'bling')
	setTimeout(function () {
		targetIcon.attr('class', '')
		setTimeout(function () {
			targetIcon.attr('class', 'bling')
			setTimeout(function () {
				targetIcon.attr('class', '')
			}, 200)
		}, 150)
	}, 150)
}

function GetUseCDMP(obj, index) {
	let data = PlayerSkillData[index]
	obj.damageStyle = data.damageStyle
	obj.needCD = data.UseCD
	obj.needMP = data.UseMP
}

function GetBagNum(obj, index) {
	let data = obj.BAG[index]
	obj.bagNum = data.Num
	obj.bagValue = data.Value
	obj.bagStyle = data.Style
	obj.bagTemporary = data.Temporary
	obj.bagTime = data.Time
}

function UpdateBag(obj, key, Num, NumFlag = true) {
	var JSONArr = obj.BAG
	var JSONArr2 = []
	var tempJSON = {}
	for (let index in JSONArr) {
		tempJSON = {}
		tempJSON['value'] = JSONArr[index].document
		JSONArr2[index] = tempJSON
		tempJSON = {}
		tempJSON['UName'] = JSONArr[index].UName
		if (index == key) {
			if (NumFlag) {
				tempJSON['Num'] = JSONArr[index].Num - Num
			} else {
				tempJSON['Num'] = JSONArr[index].Num + Num
			}
		} else {
			tempJSON['Num'] = JSONArr[index].Num
		}
		tempJSON['Style'] = JSONArr[index].Style
		tempJSON['Value'] = JSONArr[index].Value
		tempJSON['Temporary'] = JSONArr[index].Temporary
		tempJSON['Time'] = JSONArr[index].Time
		JSONArr2[index] = tempJSON
	}
	obj.BAG = JSONArr2;
}

export default {
	GetUseCDMP, GetBagNum, UpdateBag, flash, CDSkill, CDBag, GetAudio, GetAudioName, GetMapBGMNumber, GetMapIDNumber, Loading, ChangePlayerState
};