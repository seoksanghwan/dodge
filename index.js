let keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39
keys.DOWN = 40;

let ship = {
	x: 280,
	y: 230,
	spped: 1,
	element: document.getElementById("ship")
};

let main = document.querySelector('main');
let screenWidth = main.offsetWidth;
let screenHeight = main.offsetHeight;
let loop;

document.body.onkeyup =
document.body.onkeydown = function(event){
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false; 
	}
	var kc = event.keyCode || event.which;
	keys[kc] = event.type == 'keydown';
}

var moveShip = function (dx, dy) {
  ship.x += (dx||0) * ship.spped;
  ship.y += (dy||0) * ship.spped;
  ship.element.style.left = ship.x + 'px';
  ship.element.style.top = ship.y + 'px';
}

var shipMoving = function () {
	if ( keys[keys.LEFT] ) {
	  !(ship.element.style.left === '0px') ? moveShip(-2, 0) : false;
  }
  if ( keys[keys.RIGHT] ) {
    !(ship.element.style.left === '580px') ? moveShip(2, 0) : false;
  }
  if ( keys[keys.UP] ) {
    !(ship.element.style.top === '0px') ? moveShip(0, -2) : false;	
  }
  if ( keys[keys.DOWN] ) {
    !(ship.element.style.top === '480px') ? moveShip(0, 2) : false;	
  }
}
moveShip();


var canvas = document.getElementById("bullet");
var ctx = canvas.getContext("2d");
var ships = document.getElementById("ship");

var bullet_r = 3;
var b_list = [[0,0,2,2]]
var b_count = 1;

setInterval(move, 10);

var times = 0;

var stars=100;
var star=[];

let shipLeft = Number(ships.style.left.split('px').join(''));
let shipTop = Number(ships.style.top.split('px').join(''));

var shipIco = [ship.x, ship.y, 9];
var buffer =  [ 0, 0, 0, 0 ];


function gameInit(){
  b_list = [ [0, 0, 2, 2] ];
  b_count = 1;
  buffer =  [ 0, 0, 0, 0 ];
  character = [ship.x, ship.y, 9];
  times = 0;
}

//bgstar
for(var i=0; i<stars; i++){
  star.push([
    canvas.width*Math.random(),
    canvas.height*Math.random(),
    10*Math.random()
  ]);
  var color=Math.round(100+(star[i][2]*10));
  star[i].unshift('rgba('+color+','+color+','+color+',1)');
}
//draw stars
function drawstars(){
  for(var i=0; i<stars; i++){
    ctx.fillStyle=star[i][0];
    ctx.fillRect(star[i][1],star[i][2],1,1);
    star[i][2]=star[i][2]+star[i][3];
    if(star[i][2]>canvas.height){
        star[i][1]=canvas.width*Math.random();
        star[i][2]=0;
    }
  }
}

function planetBackground (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 500);
  ctx.fill();
}

function drawBall(b_count, ctx) {
  for(var i=0;i<b_count;i++){
    ctx.beginPath();  

    let left = Math.floor(b_list[i][0]);
    let top =  Math.floor(b_list[i][1]);  

    b_list[i][0]+=b_list[i][2];
    b_list[i][1]+=b_list[i][3];

    if(b_list[i][0] > 600){
      b_list[i][0] = 600;
      b_list[i][2] *= -1;
      b_list[i][3] += Math.floor(Math.random()%2);

    }
    if(b_list[i][0] < 0){
      b_list[i][0] = 0;
      b_list[i][2] *= -1;
      b_list[i][3] += Math.floor(Math.random()%2);
    }
    if(b_list[i][1] > 500){
      b_list[i][1] = 500;
      b_list[i][3] *= -1;
      b_list[i][2] += Math.floor(Math.random()%2);
    }
    if(b_list[i][1] < 0){
      b_list[i][1] = 0;
      b_list[i][3] *= -1;
      b_list[i][2] += Math.floor(Math.random()%2);
    }

    ctx.fillStyle = "#0affb1";
    ctx.arc(b_list[i][0], b_list[i][1], bullet_r, 0 , 2*Math.PI);
    ctx.fill();
   }
}

function draw(){
  if (times%30 === 0) {
    var objtype = Math.floor(Math.random()*4);
    var dir = 0;
    
    Math.floor(Math.random()*100) === 0 ? dir = 1 : dir = -1;

    //if(type == 0)
    switch (objtype) {
      case 0 :
        //console.log('1');
        b_list[b_count] = [Math.floor(Math.random()*600), 2, dir*2, 2];
        break;
      case 1 :
        //console.log('2');
        b_list[b_count] = [Math.floor(Math.random()*600), 498, dir*2, -2];
        break;
      case 2 :
        //console.log('3')  
        b_list[b_count] = [2, Math.floor(Math.random()*500), 2, dir*2];
        break;
      default :
        //console.log('4')  
        b_list[b_count] = [598, Math.floor(Math.random()*500), -2, dir*2];

      b_count++;
    }
    
  }
}

function crushCheck (x,y) {
  let shipLeft = Number(ships.style.left.split('px').join(''));
  let shipTop = Number(ships.style.top.split('px').join(''));
  let dotLeft = b_list[0][0];
  let dotTop = b_list[0][1];
  //console.log(dotLeft)
  if((shipLeft == Math.floor(dotLeft)) && (shipTop == Math.floor(dotTop))){
    alert('a')
    return 1;
  }else{
    return 0;
  }
}


function move() {
  times = times + 1;
  shipMoving();
  planetBackground(ctx);
  drawBall(b_count, ctx);
  draw();
  drawstars();
  crushCheck();
  //(x,y)
}


move()
