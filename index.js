(function watch () {	
  let today = new Date();
  let month = today.getMonth();
  let date = today.getDate();
  let day = today.getDay();//today.toString().slice(0,3).toLowerCase();
  let dayName = ["일", "월", "화", "수", "목", "금", "토"]
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let AmPm = '';
  
  hour >= 13 && hour < 24 ? AmPm = '오후' : AmPm = '오전';
  min < 10 ? min = '0' + min : min;
  sec < 10 ? sec = '0' + sec : sec;
  
  if(hour > 12){
    hour -=12
  } else if (hour === 0) {
    hour = 12;
  }
  
  let time = document.querySelector('.time');
  
  time.innerHTML = `${month+1}월 ${date}일 (${dayName[day]}) ${AmPm}<div class='num'> <span>${hour}</span>:<span>${min}</span>:<span>${sec}</span> </div>`

  setTimeout(watch,500);
})();

let keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39
keys.DOWN = 40;

let ship = {
	x: 280,
	y: 230,
	spped: 2,
	element: document.getElementById("ship")
};

let main = document.querySelector('main');
//let bullets = document.getElementsByClassName('bullet');
let screenWidth = main.offsetWidth;
let screenHeight = main.offsetHeight;
let loop;
let stepSize = 15;

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
	  !(ship.element.style.left === '0px') ? moveShip(-1, 0) : false;
  }
  if ( keys[keys.RIGHT] ) {
    !(ship.element.style.left === '580px') ? moveShip(1, 0) : false;
  }
  if ( keys[keys.UP] ) {
    !(ship.element.style.top === '0px') ? moveShip(0, -1) : false;	
  }
  if ( keys[keys.DOWN] ) {
    !(ship.element.style.top === '480px') ? moveShip(0, 1) : false;	
  }
}
moveShip();

setInterval(function(){
  shipMoving();
}, 1000/500);

var canvas = document.getElementById("bullet");
var ctx = canvas.getContext("2d");
var ships = document.getElementById("ship");

var bullet_r = 3;
var b_list = [[0,0,2,2]]
var b_count = 1;

setInterval(move, 15);

var times = 0;

var stars=100;
var star=[];

var shipIco = [600/2-10, 500/2-10, 13];

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

    b_list[i][0]+=b_list[i][2];
    b_list[i][1]+=b_list[i][3];

    if(b_list[i][0] > 600){
      b_list[i][0] = 600;
      b_list[i][2] *= -1;
      b_list[i][3] += Math.random()%2;

    }
    if(b_list[i][0] < 0){
      b_list[i][0] = 0;
      b_list[i][2] *= -1;
      b_list[i][3] += Math.random()%2;
    }
    if(b_list[i][1] > 500){
      b_list[i][1] = 500;
      b_list[i][3] *= -1;
      b_list[i][2] += Math.random()%2;
    }
    if(b_list[i][1] < 0){
      b_list[i][1] = 0;
      b_list[i][3] *= -1;
      b_list[i][2] += Math.random()%2;
    }

   //console.log(shipLeft)
   //console.log(left)

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


function move() {
  times = times + 1;
  planetBackground(ctx);
  drawBall(b_count, ctx);
  draw();
  drawstars();
}



