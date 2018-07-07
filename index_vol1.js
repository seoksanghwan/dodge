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

  //setTimeout(watch,500);
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
let bullets = document.getElementsByClassName('bullet');
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

//puts element on specified coardinate
function put(x, y, el) {
  el.style.top = y + "px";
  el.style.left = x + "px";
}


function makeBullet (id, text, cl) {
  let el;
  el = document.createElement('div');
  el.className = 'bullet';
  main.appendChild(el)
  el.style.top = Math.floor(Math.random() * screenHeight) + 'px';
  el.style.left = Math.floor(Math.random() * screenWidth) + 'px';  
}


function moveBullet() {
  score = 0;
  let i = 0;
  let speed = 0;
  loop = setInterval(function() {
    i++;
    for (let idx = 0; idx < bullets.length; idx++) {
      let left = bullets[idx].offsetLeft;
      let top = bullets[idx].offsetTop;
      let leftNum = Number(bullets[idx].style.left.split('px').join(""));
      let topNum =  Number(bullets[idx].style.top.split('px').join(""));

      if (idx % 2 === 0) {
        bullets[idx].style.left = left - (5 + speed) + "px"
        bullets[idx].style.top = top - (5 + speed) + "px";
      }else {
        bullets[idx].style.left = left + (5 + speed) + "px"
        bullets[idx].style.top = top + (5 + speed) + "px";
      }
    }

    console.log()
      // every 1/3 of a sec
      if (i % 12 === 0 && i !== 0) {
        makeBullet("id", "", "bullet");
      } else if (bullets.length === 10){
        return false
      }
  }, 16);
}
//moveBullet();


