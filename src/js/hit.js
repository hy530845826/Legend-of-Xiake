// var Player = require("./player")
// var pl = Player.default.pll
var Enemy = require("./enemy")
var enemy = Enemy.default.enemytank

function PlayerHitEnemy(obj) {
	window.console.log(obj)
	var t1 = obj.ply;
	var l1 = obj.plx;
	var r1 = obj.plx + 130;
	var b1 = obj.ply + 130;

	var obj2 = enemy;

	var t2 = obj2.tanky;
	var l2 = obj2.tankx;
	var r2 = obj2.tankx + 130;
	var b2 = obj2.tanky + 130;

	window.console.log("t1: " + t1 + " l1: " + l1 + " r1: " + r1 + " b1: " + b1)
	window.console.log("t2: " + t2 + " l2: " + l2 + " r2: " + r2 + " b2: " + b2)
	if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) { /*表示没击中obj2*/ } else {
		obj2.hp -= 100;
		if (obj2.hp <= 0) {
			PlayerKillEnemy(obj2);
		}
	}
}

function PlayerKillEnemy(obj) {
	window.console.log("击中");
	if (obj == enemy) {
		enemy.tankx = -100;
		enemy.tanky = -100;
	}
}

export default {
    PlayerHitEnemy
}