var w = false
var a = false
var s = false
var d = false
var IsMove = 0
var IsFlash = false

document.onkeydown = function (event) {
	event = event || window.event
	switch (event.keyCode) {
		case 39:
			d = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				$(heroimg).css('background-image', 'url(static/images/plmove.gif)')
			}
			break; //→
		case 37:
			a = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				$(heroimg).css('background-image', 'url(static/images/plmove.gif)')
			}
			break; //←
		case 38:
			w = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				$(heroimg).css('background-image', 'url(static/images/plmove.gif)')
			}
			break; //↑
		case 40:
			s = true;
			IsMove += 1;
			if (IsMove == 1 && !IsFlash) {
				$(heroimg).css('background-image', 'url(static/images/plmove.gif)')
			}
			break; //↓
		case 65:
			if (IsFlash == false) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(0, 6, 1)
			}
			break;
		case 83:
			if (IsFlash == false) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(1, 6, 0)
			}
			break;
		case 68:
			if (IsFlash == false) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(2, 6, 0)
			}
			break;
		case 70:
			if (IsFlash == false) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				flash(3, 6, 1)
			}
			break;
	}
}
plmove = setInterval(function () {
	if (s && !IsFlash && pl.ply < 550) {
		pl.ply += pl.speed;
	} else if (w && !IsFlash && pl.ply > 380) {
		pl.ply -= pl.speed;
	} else if (a && !IsFlash && pl.plx > 0) {
		pl.plx -= pl.speed;
	} else if (d && !IsFlash && pl.plx < 1130) {
		pl.plx += pl.speed;
	}
	hero.style.top = pl.ply + "px";
	hero.style.left = pl.plx + "px";
}, 40);

document.onkeyup = function (event) {
	event = event || window.event;
	switch (event.keyCode) {
		case 39:
			d = false;
			IsMove = 0;
			if (IsMove == 0) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				$(heroimg).css('background-position', 0 + 'px ' + 0 + 'px')
			}
			break; //→
		case 37:
			a = false;
			IsMove = 0;
			if (IsMove == 0) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				$(heroimg).css('background-position', 0 + 'px ' + 0 + 'px')
			}
			break; //←
		case 38:
			w = false;
			IsMove = 0;
			if (IsMove == 0) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				$(heroimg).css('background-position', 0 + 'px ' + 0 + 'px')
			}
			break; //↑
		case 40:
			s = false;
			IsMove = 0;
			if (IsMove == 0) {
				$(heroimg).css('background-image', 'url(static/images/毕设打斗3.png)')
				$(heroimg).css('background-position', 0 + 'px ' + 0 + 'px')
			}
			break; //↓
	}
}

function flash(num, timer, style) {
	IsFlash = true
	var i = 0
	clearInterval(plflash)
	//style 0顺序逆序 1顺序
	if (style == 0) {
		var plflash = setInterval(function () {
			if (i >= 0) {
				$(heroimg).css('background-position', (-130 * i) + 'px ' + (-130 * num) + 'px')
				i++
				if (i == timer) {
					i = -i
					console.log('颠倒')
				}
			} else {
				$(heroimg).css('background-position', (130 * i) + 'px ' + (-130 * num) + 'px')
				i++
				if (i == 0) {
					clearInterval(plflash)
					IsFlash = false
					$(heroimg).css('background-position', 0 + 'px ' + 0 + 'px')
				}
			}
		}, 100);
	} else if (style == 1) {
		var plflash = setInterval(function () {
			$(heroimg).css('background-position', (-130 * i) + 'px ' + (-130 * num) + 'px')
			i++
			if (i > timer) {
				clearInterval(plflash)
				IsFlash = false
			}
		}, 100);
	}
}