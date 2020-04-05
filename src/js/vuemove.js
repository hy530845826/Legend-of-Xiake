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

var rotateNum = 180; //旋转角度

document.onkeydown = function (event) {
	event = event || window.event
	switch (event.keyCode) {
		case 39: //→
			d = true;
			IsMove += 1;
			pl.xfx = true;
			if (IsMove == 1 && !IsFlash) {
				$('#role-body').css('background-image', 'url(static/images/plmove.gif)')
				if (pl.xfx != pl.imgfx) {
					pl.imgfx = true;
					pl.pdx = 5
					pl.pdy = 40
					pl.pdw = 120
					$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
					rotateNum += 180;
				}
			}
			break;
		case 37: //←
			a = true;
			IsMove += 1;
			pl.xfx = false;
			if (IsMove == 1 && !IsFlash) {
				$('#role-body').css('background-image', 'url(static/images/plmove.gif)')
				if (pl.xfx != pl.imgfx) {
					pl.imgfx = false;
					pl.pdx = 130 - 60 - 5
					pl.pdy = 40
					pl.pdw = 120
					$('#role-body').css({ transition: "transform 0.5s", transform: "rotateY(" + rotateNum + "deg)" })
					rotateNum += 180;
				}
			}
			break;
		case 38: //↑
			w = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				pl.pdy = 40
				pl.pdw = 120
				$('#role-body').css('background-image', 'url(static/images/plmove.gif)')
			}
			break;
		case 40: //↓
			s = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				pl.pdy = 40
				pl.pdw = 120
				$('#role-body').css('background-image', 'url(static/images/plmove.gif)')
			}
			break;
		case 67: //C
			ChangeMap()
			break;
		case 65: //A
			if (IsFlash == false) {
				$('#role-body').css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(0, 6, 1)
				HitJudgement(pl, enemy, true, 30, 20, 60, 50)
			}
			break;
		case 83: //S
			if (IsFlash == false) {
				$('#role-body').css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(1, 6, 0)
				HitJudgement(pl, enemy, true, 30, 70, 60, 50)
			}
			break;
		case 68: //D
			if (IsFlash == false) {
				$('#role-body').css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(2, 6, 0)
				HitJudgement(pl, enemy, true, 55, 35, 60, 60)
			}
			break;
		case 70: //F
			if (IsFlash == false) {
				$('#role-body').css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(3, 6, 1)
				HitJudgement(pl, enemy, true, 50, 20, 60, 70)
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
				pl.pdy = 27
				pl.pdw = 60
				$('#role-body').css('background-image', 'url(static/images/plstand.gif)')
			}
			break; //→
		case 37:
			a = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				pl.pdy = 27
				pl.pdw = 60
				$('#role-body').css('background-image', 'url(static/images/plstand.gif)')
			}
			break; //←
		case 38:
			w = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				pl.pdy = 27
				pl.pdw = 60
				$('#role-body').css('background-image', 'url(static/images/plstand.gif)')
			}
			break; //↑
		case 40:
			s = false;
			IsMove = 0;
			if (IsMove == 0 && IsFlash == false) {
				pl.pdy = 27
				pl.pdw = 60
				$('#role-body').css('background-image', 'url(static/images/plstand.gif)')
			}
			break; //↓
	}
}

function flash(num, timer, style) {
	IsFlash = true
	var i = 0
	clearInterval(plflash)
	var plflash
	//style 0顺序逆序 1顺序
	if (style == 0) {
		plflash = setInterval(function () {
			if (i >= 0) {
				$('#role-body').css('background-position', (-130 * i) + 'px ' + (-130 * num) + 'px')
				i++
				if (i == timer) {
					i = -i
				}
			} else {
				$('#role-body').css('background-position', (130 * i) + 'px ' + (-130 * num) + 'px')
				i++
				if (i == 0) {
					clearInterval(plflash)
					IsFlash = false
					$('#role-body').css('background-image', 'url(static/images/plstand.gif)')
					$('#role-body').css('background-position', 0 + 'px ' + 0 + 'px')
				}
			}
		}, 100);
	} else if (style == 1) {
		plflash = setInterval(function () {
			$('#role-body').css('background-position', (-130 * i) + 'px ' + (-130 * num) + 'px')
			i++
			if (i > timer + 1) {
				clearInterval(plflash)
				IsFlash = false
				$('#role-body').css('background-image', 'url(static/images/plstand.gif)')
				$('#role-body').css('background-position', 0 + 'px ' + 0 + 'px')
			}
		}, 100);
	}
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
			var PortalToMapID = parseInt(targetObj.className.replace(/[^0-9]/ig, "")) //传送门的to-mapID
			// var PortalToMapPosition = targetObj.className.match(/mapPosition-(\S*)/)[1] //获取传送位置
			// window.console.log("传送门的to-mapID:" + PortalToMapID + "	传送门的位置:" + PortalToMapPosition)
			var NowMapIDNumber = GetMapIDNumber()
			window.console.log("进入地图map-" + PortalToMapID)
			$('#map').attr('class', 'map-' + PortalToMapID)
			CreatePortal(NowMapIDNumber)
		}
	}
}

function CreatePortal(LastMapIDNumber) {
	$('.Portal').remove('#map .Portal')
	var NowMapIDNumber = GetMapIDNumber()
	switch (NowMapIDNumber) {
		case 1:
			$("#map").prepend("<div class='Portal Portal-R to-map-2 mapPosition-left'> </div>");
			break;
		case 2:
			$("#map").prepend("<div class='Portal Portal-L to-map-1 mapPosition-right'> </div>");
			$("#map").prepend("<div class='Portal Portal-R to-map-3 mapPosition-left'> </div>");
			break;
	}

	var targetObj = $('.to-map-' + LastMapIDNumber)[0]
	var t2 = targetObj.offsetTop
	var l2 = targetObj.offsetLeft
	pl.plx = l2
	pl.ply = t2 - 70

	window.console.log($('#BGM').attr('src'))
	$('#BGM').attr('src', './static/sound/map-' + NowMapIDNumber + '.mp3')
	window.console.log($('#BGM').attr('src'))

}

function GetMapIDNumber() {
	var MapID = $("#map").attr("class")
	var NowMapIDNumber = parseInt(MapID.replace(/[^0-9]/ig, "")) //map-1→1
	return NowMapIDNumber
}

function GetPortalNumber() {
	var NowMapIDNumber = GetMapIDNumber()
	var PortalNumber //传送门个数
	switch (NowMapIDNumber) {
		case 1: PortalNumber = 1; break;
		case 2: PortalNumber = 2; break;
	}
	return PortalNumber
}

export default {
	onkeydown, onkeyup
};

