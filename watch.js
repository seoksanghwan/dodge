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