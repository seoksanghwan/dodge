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


function makeBullet () {
  for(var idx = 0; idx < 100; idx++){
	var div = document.createElement('div')
	div.className = 'bullet';
	main.appendChild(div);
  }
}
makeBullet ()


function moveBullet (dx, dy) {
 let bullet = main.querySelectorAll('.bullet');
 bullet.forEach( function (idx) {
 	idx.style.left = Math.floor(Math.random()*1000) + 'px';
 	idx.style.right = Math.floor(Math.random()*1000) + 'px';
 	idx.style.top = Math.floor(Math.random()*1000) + 'px';
 	idx.style.bottom = Math.floor(Math.random()*1000) + 'px';
 });
}

setInterval(function(){
  moveBullet();
}, 1000);