var w = false
var a = false
var s = false
var d = false
var IsMove = 0
var IsFlash = false
var Player = require("./player")
var pl = Player.default.pll
var Enemy = require("./enemy")
var enemy = Enemy.default.ell
var Hit = require("./hit")
var HitJudgement = Hit.default.HitJudgement

import player_options from './player_options.json'
var PlayerOptions = player_options

var rotateNum = 180; //旋转角度

document.onkeydown = function (event) {
	if (pl.loading) { return } //加载中静止操作角色
	event = event || window.event
	switch (event.keyCode) {
		case 39: //→
			d = true;
			IsMove += 1;
			pl.realfx = true;
			if (IsMove == 1 && !IsFlash) {
				ChangePlayerState('plmove')
				if (pl.realfx != pl.imgfx) {
					pl.imgfx = true;
					$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
					$('#skill-body').css({ transition: "transform 0.1s", transform: "rotateY(" + rotateNum + "deg)" })
					rotateNum += 180;
				}
			}
			break;
		case 37: //←
			a = true;
			IsMove += 1;
			pl.realfx = false;
			if (IsMove == 1 && !IsFlash) {
				ChangePlayerState('plmove')
				if (pl.realfx != pl.imgfx) {
					pl.imgfx = false;
					$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
					$('#skill-body').css({ transition: "transform 0.1s", transform: "rotateY(" + rotateNum + "deg)" })
					rotateNum += 180;
				}
			}
			break;
		case 38: //↑
			w = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				ChangePlayerState('plmove')
			}
			break;
		case 40: //↓
			s = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				ChangePlayerState('plmove')
			}
			break;
		case 67: //C
			ChangeMap()
			break;
		case 88: //X
			if (IsFlash == false) {
				flash('plskill-x', 10, 80, 192, 1)
			}
			break;
		case 90: //Z
			if (IsFlash == false) {
				flash('plskill-z', 6, 120, 192, 1)
			}
			break;
		case 65: //A
			if (IsFlash == false) {
				flash('plskill-a', 9, 80, 192, 1, 1, 9, 250)
			}
			break;
		case 83: //S
			if (IsFlash == false) {
				flash('plskill-z', 6, 120, 192, 1)
			}
			break;
		case 68: //D
			if (IsFlash == false) {
				$('#role-body').css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(130, 2, 6, 0)
			}
			break;
		case 70: //F
			if (IsFlash == false) {
				flash('plskill-f', 8, 110, 192, 1, 4, 5, 384)
			}
			break;
	}
}
setInterval(function () {
	if (s && !IsFlash && pl.ply < 540) {
		pl.ply += pl.speed;
	} else if (w && !IsFlash && pl.ply > 380) {
		pl.ply -= pl.speed;
	} else if (a && !IsFlash && pl.plx > 0) {
		pl.plx -= pl.speed;
	} else if (d && !IsFlash && pl.plx < 1070) {
		pl.plx += pl.speed;
	}
	$('#role').css('top', pl.ply + "px")
	$('#role').css('left', pl.plx + "px")
	$('#role').css('z-index', pl.ply)
}, 40);

document.onkeyup = function (event) {
	event = event || window.event;
	switch (event.keyCode) {
		case 39:
			d = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				ChangePlayerState('plstand')
			}
			break; //→
		case 37:
			a = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				ChangePlayerState('plstand')
			}
			break; //←
		case 38:
			w = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				ChangePlayerState('plstand')
			}
			break; //↑
		case 40:
			s = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				ChangePlayerState('plstand')
			}
			break; //↓
	}
}

function flash(StateName, TikTok, farme, width, style, skillstart, skillfarme, skillwidth) {
	IsFlash = true
	var i = 1, j = 0
	var xxx = pl.plx, yyy = pl.ply
	ChangePlayerState(StateName)
	clearInterval(plflash)
	var plflash
	//style 0顺序逆序 1顺序
	if (style == 0) {
		plflash = setInterval(function () {
			if (i >= 0) {
				$('#role-body').css('background-position', (-width * i) + 'px ')
				i++
				if (i == TikTok - 1) {
					i = -i
				}
			} else {
				$('#role-body').css('background-position', (width * i) + 'px ')
				i++
				if (i == 0) {
					clearInterval(plflash)
					IsFlash = false
					$('#role-body').css('background-position', 0 + 'px ')
					setTimeout(function () {
						window.console.log("panding!!!!!!!!!!!!" + IsFlash)
						if (IsFlash == false) {
							ChangePlayerState('plstand')
						}
					}, 500)
				}
			}
		}, farme);
	} else if (style == 1) {
		if (i == skillstart) {
			$('#skill-body').css('background-position', (-skillwidth * j) + 'px ')
			j++
		}
		plflash = setInterval(function () {
			i++
			if ((j > 0 && j < skillfarme) || (i == skillstart)) {
				$('#skill-body').css('background-position', (-skillwidth * j) + 'px ')
				j++
			} else {
				$('#skill-body').css('background-position', skillwidth + 'px ')
			}
			if (i > TikTok) {
				clearInterval(plflash)
				IsFlash = false
				pl.plx = xxx
				pl.ply = yyy
				setTimeout(function () {
					if (IsFlash == false) {
						ChangePlayerState('plstand')
						$('#role-body').css('background-position', 0 + 'px ')
					}
				}, 50)
			} else {
				$('#role-body').css('background-position', (-width * (i - 1)) + 'px ')
				CheckPlayerHit(StateName, i)
			}
		}, farme);
	}
}

function ChangePlayerState(StateName) {
	$('#role').attr('class', StateName)
	CheckPlayerHit(StateName)
}

function CheckPlayerHit(StateName, TikTok) {
	TikTok = TikTok || 1
	var imgWidth = parseInt($('#role-body').css('width'))
	var skillimgWidth = parseInt($('#skill-body').css('width'))

	for (let index in PlayerOptions) {
		let data = PlayerOptions[index]
		if (StateName == data[0].UName) {
			let target = data[TikTok]
			if (target.check_y != undefined) {
				pl.ply += target.check_y
				$('#role').css('top', pl.ply + "px")
			}
			pl.img_x = -target.img_x
			pl.img_y = -target.img_y
			pl.hited_x = target.hited_x
			pl.hited_y = target.hited_y
			pl.hited_top = target.hited_top
			pl.hit_x = target.hit_x || 0
			pl.hit_y = target.hit_y || 0
			pl.hit_left = target.hit_left || 0
			pl.hit_top = target.hit_top || 0
			pl.skill_left = -target.skill_left
			pl.skill_top = -target.skill_top
			if (pl.imgfx == false) {
				// 移动反向图像左边距，保持右边不变
				var changeX = 0
				if (TikTok > 1) {
					changeX = target.hited_x - data[TikTok - 1].hited_x
				} else if (StateName != 'plmove') {
					changeX = target.hited_x - 67 //plstand宽度
				}
				pl.plx -= changeX
				$('#role').css('left', pl.plx + "px")
				//反向图像重新校正left
				pl.img_x = (target.img_x + target.hited_x - imgWidth)
				pl.hit_left = (target.hited_x - target.hit_left - target.hit_x) || 0
				pl.skill_left = (target.skill_left + target.hited_x - skillimgWidth)
			}
			ChangePlayerCSS()
			if (pl.hit_x != 0 && pl.hit_y != 0) {
				HitJudgement(pl, enemy, true)
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
	var tempPosition = 20

	b1 = pl.ply + 130
	l1 = pl.plx
	r1 = pl.plx + 130

	for (let i = 0; i < PortalNumber; i++) { //根据传送门个数判定是否进入
		var t2, l2, r2, b2
		var targetObj = $('.Portal')[i]
		t2 = targetObj.offsetTop;
		l2 = targetObj.offsetLeft;
		r2 = l2 + 100;
		b2 = t2 + 80;

		if ((b1 + tempPosition) < b2 || (b1 - tempPosition) > b2 || (l1 - tempPosition) > l2 || (r1 + tempPosition) < r2) { /*没碰到*/ }
		else {
			var PortalToMapID = parseInt(targetObj.className.match(/to-map-(\S*)/)[1]) //获取传送门的to-mapID
			var PortalMusicID = parseInt(targetObj.className.match(/music-(\S*)/)[1]) //获取bgmID
			var MapIDNumber = GetMapIDNumber()
			var MapBGMNumber = GetMapBGMNumber()

			Loading(MapIDNumber, PortalToMapID, MapBGMNumber, PortalMusicID)
			// $('#map').attr('class', 'map-' + PortalToMapID)
			// ChangeBGM(MapBGMNumber, PortalMusicID) //切换BGM
			// CreatePortal(PortalToMapID)
			// window.console.log(Loading)
		}
	}
}

function Loading(MapIDNumber, PortalToMapID, MapBGMNumber, PortalMusicID) {
	//0.禁止角色操作，黑屏显示loading
	$('#loading-screen').css('display', 'block')
	pl.loading = true
	var i = 10
	$('#loading-screen .progress-bar').css('width', i + '%')
	//1.加载地图
	window.console.log("当前地图map-" + MapIDNumber + "	切换至:map-" + PortalToMapID)
	$('#map').attr('class', 'map-' + PortalToMapID)
	//1.5修改小地图坐标
	$('#map-' + MapIDNumber).attr('class', '')
	$('#map-' + PortalToMapID).attr('class', 'Player-Position')
	//2.计时器timer结束执行-ChangeBGM(200ms)
	var timer = setInterval(function () {
		i += 2
		if (i >= 50) {
			clearInterval(timer)
			window.console.log("当前BGM:" + MapBGMNumber + ".mp3	切换至:" + PortalMusicID + ".mp3")
			ChangeBGM(MapBGMNumber, PortalMusicID)
			//3.计时器timer2结束执行-CreatePortal(3200ms)
			var timer2 = setInterval(function () {
				i++
				if (i >= 90) {
					clearInterval(timer2)
					CreatePortal(PortalToMapID)
					//4.计时器timer3结束执行-MovePlayer(2000ms)
					var timer3 = setInterval(function () {
						i += 2
						if (i >= 100) {
							clearInterval(timer3)
							MovePlayer(MapIDNumber)
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
			$("#map").prepend("<div class='Portal Portal-songshan to-map-6 music-3'> </div>");
			$("#map").prepend("<div class='Portal Portal-wudang to-map-7 music-4'> </div>");
			$("#map").prepend("<div class='Portal Portal-tiezhangfeng to-map-10 music-6'> </div>");
			$("#map").prepend("<div class='Portal Portal-shunanzhuhai to-map-11 music-7'> </div>");
			$("#map").prepend("<div class='Portal Portal-jueqinggu to-map-14 music-9'> </div>");
			$("#map").prepend("<div class='Portal Portal-emei to-map-16 music-10'> </div>");
			$("#map").prepend("<div class='Portal Portal-dashamo to-map-17 music-11'> </div>");
			break;
		case 1:
			$("#map").prepend("<div class='Portal Portal-R to-map-2 music-1'> </div>");
			break;
		case 2:
			$("#map").prepend("<div class='Portal Portal-L to-map-1 music-1'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-5 music-3'> </div>");
			$("#map").prepend("<div class='Portal Portal-M to-map-3 music-2'> </div>");
			break;
		case 3:
			$("#map").prepend("<div class='Portal Portal-L to-map-2 music-1'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-4 music-2'> </div>");
			break;
		case 4:
			$("#map").prepend("<div class='Portal Portal-L to-map-3 music-2'> </div>");
			break;
		case 5:
			$("#map").prepend("<div class='Portal Portal-L to-map-2 music-1'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-6 music-3'> </div>");
			break;
		case 6:
			$("#map").prepend("<div class='Portal Portal-L to-map-5 music-3'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-0 music-0'> </div>");
			break;
		case 7:
			$("#map").prepend("<div class='Portal Portal-L to-map-0 music-0'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-8 music-4'> </div>");
			$("#map").prepend("<div class='Portal Portal-M to-map-10 music-6'> </div>");
			break;
		case 8:
			$("#map").prepend("<div class='Portal Portal-L to-map-7 music-4'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-9 music-5'> </div>");
			break;
		case 9:
			$("#map").prepend("<div class='Portal Portal-L to-map-8 music-4'> </div>");
			break;
		case 10:
			$("#map").prepend("<div class='Portal Portal-L to-map-0 music-0'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-7 music-4'> </div>");
			break;
		case 11:
			$("#map").prepend("<div class='Portal Portal-L to-map-12 music-7'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-0 music-0'> </div>");
			break;
		case 12:
			$("#map").prepend("<div class='Portal Portal-L to-map-13 music-8'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-11 music-7'> </div>");
			break;
		case 13:
			$("#map").prepend("<div class='Portal Portal-R to-map-12 music-7'> </div>");
			break;
		case 14:
			$("#map").prepend("<div class='Portal Portal-L to-map-0 music-0'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-15 music-9'> </div>");
			break;
		case 15:
			$("#map").prepend("<div class='Portal Portal-L to-map-14 music-9'> </div>");
			break;
		case 16:
			$("#map").prepend("<div class='Portal Portal-M to-map-0 music-0'> </div>");
			break;
		case 17:
			$("#map").prepend("<div class='Portal Portal-L to-map-18 music-11'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-0 music-0'> </div>");
			break;
		case 18:
			$("#map").prepend("<div class='Portal Portal-M to-map-19 music-12'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-17 music-11'> </div>");
			break;
		case 19:
			$("#map").prepend("<div class='Portal Portal-L to-map-18 music-11'> </div>");
			break;
	}
}

function ChangeBGM(MapBGMNumber, PortalMusicID) {
	if (MapBGMNumber != PortalMusicID) {
		$('#BGM').attr('src', './static/sound/map-' + PortalMusicID + '.mp3')
	}
}

function MovePlayer(MapIDNumber) {
	var targetObj = $('.to-map-' + MapIDNumber)[0]
	window.console.log($('.to-map-' + MapIDNumber))
	var t2 = targetObj.offsetTop
	var l2 = targetObj.offsetLeft
	pl.plx = l2
	pl.ply = t2 - 70
}

function GetMapIDNumber() {
	var MapID = $("#map").attr("class")
	var MapIDNumber = parseInt(MapID.replace(/[^0-9]/ig, "")) //map-1→1
	return MapIDNumber
}

function GetMapBGMNumber() {
	var MapID = $("#BGM").attr("src")
	var MapBGMNumber = parseInt(MapID.match(/(\d*)\.mp3/)[1]) //map-1.mp3→1
	return MapBGMNumber
}

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

export default {
	onkeydown, onkeyup
};

