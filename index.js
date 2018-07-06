let canvas = document.getElementById("canvasbox");
let ctx = canvas.getContext("2d");
let ship = document.querySelector(".ship");

let movePoint = [0,0,0,0];
let shipFocus = [800/2-5,500/2-5, 8];

ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0,0,800, 500)
function spaceBackground (ctx) {

}
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

/*let theThing = document.querySelector(".fly");
let container = document.querySelector(".bulletGame");*/

let pos = 4;




window.addEventListener("keydown", ddd);

function ddd (event) {

	if(event.keyCode == 39){  
		ship.style.left += pos+'px'
		}

	if(event.keyCode == 37){  
		ship.style.left += pos+'px'
	}

	if(event.keyCode == 38){  
		ship.style.top += pos+'px'
	}

	if(event.keyCode == 40){  
		ship.style.top += pos+'px'
	}
	
}

setInterval(ddd,1)

/*
for(let idx = 0 ; idx < 50; idx++){
	let li = document.createElement('li');
	li.className = 'bullet';
	container.appendChild(li);
}

function bulletMove () {
	let li = document.querySelectorAll('.bullet');
	li.forEach(function (Li) {
		Li.style.left = Math.floor(Math.random()*800) + 'px';	
		Li.style.top = Math.floor(Math.random()*800) + 'px';	
		Li.style.bottom = Math.floor(Math.random()*800) + 'px';	
		Li.style.right = Math.floor(Math.random()*800) + 'px';	
	})
	
	setTimeout(bulletMove,500);
}
bulletMove ();

*/





//setInterval(updateKeys, 1);

/*function moveShip () {
	if(movePoint[0] === 1)shipFocus[1] -=4;
	if(movePoint[1] === 1)shipFocus[1] +=4;
	if(movePoint[2] === 1)shipFocus[0] -=4;
	if(movePoint[3] === 1)shipFocus[0] +=4;
}

function keyup(){
	if(event.keyCode == 38) movePoint[0] = 0;
	if(event.keyCode == 40) movePoint[1] = 0;
	if(event.keyCode == 37) movePoint[2] = 0;
	if(event.keyCode == 39) movePoint[3] = 0;
}
function keydown(){
	if(event.keyCode == 38) movePoint[0] = 1;
	if(event.keyCode == 40) movePoint[1] = 1;
	if(event.keyCode == 37) movePoint[2] = 1;
	if(event.keyCode == 39) movePoint[3] = 1;
}
*/


