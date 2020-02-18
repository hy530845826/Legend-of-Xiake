window.console.log(111111111);

var enemytank = new Enemytank(400, 400);

function Enemytank(tankx, tanky) {
    window.console.log('内部消息');
    this.tankx = tankx;
    this.tanky = tanky;

    this.hp = 100;
    this.score = 100;
    // this.move = function () {
    //     enemymove(this, this.tankx, this.tanky);
    // }
}
setInterval(function () {
    $('#enemy').css('top', enemytank.tankx + "px")
    $('#enemy').css('left', enemytank.tanky + "px")
}, 500)

export default {
    enemytank
}