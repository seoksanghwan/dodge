// Canvas Avoid the Bullets
// http://www.psyonline.kr

var isapple=(/applewebkit/i).test(navigator.userAgent); //safari,chrome


try{ //for ie


var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');

context.lineWidth=1;
context.strokeStyle='rgba(255,255,255,0.5)';

//stars [color, x, y, speed]
var stars=100;
var star=[];
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
        context.fillStyle=star[i][0];
        context.fillRect(star[i][1],star[i][2],1,1);
        star[i][2]=star[i][2]+star[i][3];
        if(star[i][2]>canvas.height){
            star[i][1]=canvas.width*Math.random();
            star[i][2]=0;
        }
    }
}


//spaceship [x, y, w, h, colors, speed]
var spaceship=[
    canvas.width/2-6,
    canvas.height/2-4,
    12,
    8,
    [
        [0,8,'#B2B2B2'],
        [0,8,'#FFF'],
        [3,2,'#7C7C7C'],
        [3,2,'#575757'],
        [1,6,'#7C7C7C'],
        [1,6,'#B2B2B2'],
        [1,6,'#FFF'],
        [1,6,'#FFF'],
        [3,2,'#FFF'],
        [3,2,'#7C7C7C'],
        [0,8,'#B2B2B2'],
        [0,8,'#FFF'],
    ],
    2
];

//draw spaceship
function drawspaceship(){

    if(game.status=='ing'){

        if(key.left) spaceship[0]=spaceship[0]-spaceship[5];
        if(key.up) spaceship[1]=spaceship[1]-spaceship[5];
        if(key.right) spaceship[0]=spaceship[0]+spaceship[5];
        if(key.down) spaceship[1]=spaceship[1]+spaceship[5];
        if(spaceship[0]<0) spaceship[0]=0;
        else if(spaceship[0]+spaceship[2]>canvas.width) spaceship[0]=canvas.width-spaceship[2];
        if(spaceship[1]<0) spaceship[1]=0;
        else if(spaceship[1]+spaceship[3]>canvas.height) spaceship[1]=canvas.height-spaceship[3];

        spaceship[0]=parseInt(spaceship[0]*100)/100;
        spaceship[1]=parseInt(spaceship[1]*100)/100;

        game.save[game.saveno].push(spaceship[0]);
        game.save[game.saveno].push(spaceship[1]);

    }else if(game.status=='end' || game.status=='addscore'){

        if(spaceship[1]+spaceship[3]<canvas.height+spaceship[3]) spaceship[1]+=1;

    }else if(game.status=='replay'){

        spaceship[0]=game.replaycoords[game.replayno][0];
        spaceship[1]=game.replaycoords[game.replayno][1];

    }

    for(var i=0; i<spaceship[2]; i++){
        context.fillStyle=spaceship[4][i][2];
        context.fillRect(spaceship[0]+i,spaceship[1]+spaceship[4][i][0],1,spaceship[4][i][1]);
    }

    context.beginPath();
    context.rect(spaceship[0],spaceship[1],spaceship[2],spaceship[3]);
    context.closePath();

}


//bullets [x, y, speed, moveangle, max x, max y]
var bullets,savebullets;
var bullet=[];
var killerbullet=0;
var savekillerbullet=0;
var killercr=2;

//add bullet
function addbullet(){
    var i=bullet.length;
    bullet.push([
        (canvas.width/2)+Math.cos(i*(360/bullets))*(canvas.width/1.5),
        (canvas.height/2)+Math.sin(i*(360/bullets))*(canvas.height/1.5),
        0.5*Math.random()+1.5
    ]);
    bullet[i].push(Math.atan2((canvas.width/2)-30+60*Math.random()-bullet[i][0],(canvas.height/2)-30+60*Math.random()-bullet[i][1]));
    bullet[i].push((bullet[i][0]>0)? 0 : canvas.width);
    bullet[i].push((bullet[i][1]>0)? 0 : canvas.height);
}

//draw bullets
function drawbullets(){
    context.fillStyle='#FF7';
    for(var i=0,random=0,isdie=false; i<bullets; i++){

        if(game.status=='ing'){

            if(
                context.isPointInPath(bullet[i][0],bullet[i][1]) ||
                context.isPointInPath(bullet[i][0]+2,bullet[i][1]) ||
                context.isPointInPath(bullet[i][0],bullet[i][1]+2) ||
                context.isPointInPath(bullet[i][0]+2,bullet[i][1]+2)
            ){
                killerbullet=savekillerbullet=i;
                isdie=true;
            }

            bullet[i][0]=bullet[i][0]+(bullet[i][2]*Math.sin(bullet[i][3]));
            bullet[i][1]=bullet[i][1]+(bullet[i][2]*Math.cos(bullet[i][3]));

            bullet[i][0]=parseInt(bullet[i][0]*100)/100;
            bullet[i][1]=parseInt(bullet[i][1]*100)/100;

            game.save[game.saveno].push(bullet[i][0]);
            game.save[game.saveno].push(bullet[i][1]);

            if(
                (!bullet[i][4] && bullet[i][0]<-10) || (bullet[i][4] && bullet[i][0]>canvas.width+10) ||
                (!bullet[i][5] && bullet[i][1]<-10) || (bullet[i][5] && bullet[i][1]>canvas.height+10)
            ){
                random=bullets*Math.random();
                bullet[i][0]=(canvas.width/2)+Math.cos(random*(360/bullets))*(canvas.width);
                bullet[i][1]=(canvas.height/2)+Math.sin(random*(360/bullets))*(canvas.height);
                bullet[i][3]=Math.atan2(spaceship[0]-30+(60*Math.random())-bullet[i][0],spaceship[1]-30+(60*Math.random())-bullet[i][1]);
                bullet[i][4]=(bullet[i][0]>0)? 0 : canvas.width;
                bullet[i][5]=(bullet[i][1]>0)? 0 : canvas.height;
            }

        }else if(game.status=='end' || game.status=='addscore'){
            if(bullet[i][1]<canvas.height+15){
                bullet[i][1]+=1;
            }
        }else if(game.status=='replay'){
            if(game.replaycoords[game.replayno][(i+1)*2]){
                bullet[i][0]=game.replaycoords[game.replayno][(i+1)*2];
                bullet[i][1]=game.replaycoords[game.replayno][(i+1)*2+1];
            }else{
                bullet[i][0]=-2;
                bullet[i][1]=-2;
            }
        }
        if(game.status=='end' || game.status=='replayend'){
            if(i==killerbullet){
                killercr=(killercr>=15)? 2 : killercr+0.5;
                context.beginPath();
                context.arc(bullet[i][0]+1,bullet[i][1]+1,killercr,Math.PI*2,0,false);
                context.stroke();
                context.closePath();
            }
        }

        context.fillRect(bullet[i][0],bullet[i][1],2,2);

    }

    if(isdie) game.die();

}


//keyboard
var key={
    left : false,
    up : false,
    right : false,
    down : false
}
document.documentElement.onkeydown=function(e){
    var keycode=e.keyCode;
    if(keycode==13 || keycode==32){
        if(game.status=='ready') game.start();
        else if(game.status=='addscore'){
            if(keycode==32) return true;
            else score.send();
        }
        else if(game.status=='end' || game.status=='replay' || game.status=='replayend') game.reset();
    }
    if(keycode==37) key.left=true;
    if(keycode==38) key.up=true;
    if(keycode==39) key.right=true;
    if(keycode==40) key.down=true;
    if(keycode==32 || keycode==37 || keycode==38 || keycode==39 || keycode==40 || keycode==13){
        e.preventDefault();
        e.returnValue=false;
        return false;
    }
}
document.documentElement.onkeyup=function(e){
    var keycode=e.keyCode;
    if(keycode==37) key.left=false;
    if(keycode==38) key.up=false;
    if(keycode==39) key.right=false;
    if(keycode==40) key.down=false;
    if(keycode==32 || keycode==37 || keycode==38 || keycode==39 || keycode==40 || keycode==13){
        e.preventDefault();
        e.returnValue=false;
        return false;
    }
}
document.documentElement.onkeypress=function(e){
    var keycode=e.keyCode;
    if(keycode==32 || keycode==37 || keycode==38 || keycode==39 || keycode==40 || keycode==13){
        e.preventDefault();
        e.returnValue=false;
        return false;
    }
}

//util
var util={
    onend : document.getElementById('onend'),
    nameinput : document.getElementById('nameinput'),
    replay : document.getElementById('btn_replay'),
    addscore : document.getElementById('btn_addscore'),
    cancel : document.getElementById('btn_cancel'),
    toimage : document.getElementById('btn_toimage'),
    message : document.getElementById('message')
}

if(isapple) util.nameinput.style.marginTop='2px';
util.nameinput.onfocus=function(){
    if(this.value=='이름 입력') this.value='';
}
util.cancel.style.display='none';


//game
var game={

    status : 'ready',

    starttime : null,
    endtime : null,
    replaytime : null,
    addbullettime : null,

    time : [0,0,0],
    timer : null,

    save : [],
    saveno : -1,
    savetime : null,

    replayno : 0,
    replaycoords : null,

    processingop : 0.1,

    reset : function(){

        game.status='ready';
        game.starttime=null;
        game.time=[0,0,0];
        bullets=50;
        bullet=[];
        for(var i=0; i<bullets; i++) addbullet();
        spaceship[0]=canvas.width/2-6;
        spaceship[1]=canvas.height/2-4;
        game.run();

        game.saveno=-1;
        game.save=new Array();

        util.onend.style.display='none';
        util.nameinput.style.display='none';
        util.message.innerHTML='&nbsp;';

    },

    start : function(){
        game.status='ing';
        game.starttime=game.addbullettime=new Date().getTime();
        game.run();
    },

    run : function (){

        clearTimeout(game.timer);

        //clear
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle='#000';
        context.fillRect(0,0,canvas.width,canvas.height);

        //draw stars
        drawstars();

        //write info
        context.textAlign='left';
        context.font='11px tahoma';
        context.fillStyle='rgba(255,255,255,0.65)';

        //write bullet.length
        context.fillText('Bullets : '+bullets,7,14);

        //write time
        context.fillText('Time : '+timetostring(),canvas.width-82,14);

        if(game.status=='ready'){

            context.fillStyle='#FFF';
            context.textAlign='center';
            context.font='bold 24px 돋움';
            context.fillText('총알피하기',canvas.width/2,canvas.height/2-7);
            context.font='11px tahoma';
            context.fillStyle='rgba(255,255,255,0.65)';
            context.fillText('Press Enter or Spacebar to Start',canvas.width/2,canvas.height/2+18);
            context.fillStyle='rgba(255,255,255,0.3)';
            context.fillRect(165,152,170,1);

        }else if(game.status=='ing'){

            game.saveno++;
            game.save.push([]);

            var t=new Date().getTime()-game.starttime;
            var ms=Math.round(t/10);
            game.time[0]=Math.floor(ms/6000);
            game.time[1]=Math.floor(ms/100)%60;
            game.time[2]=ms%100;
            game.savetime=game.time;

            drawspaceship();

            drawbullets();

            if(new Date().getTime()-game.addbullettime>5000){
                addbullet();
                bullets++;
                game.addbullettime=new Date().getTime();
            }

        }else if(game.status=='end' || game.status=='addscore'){

            drawspaceship();

            drawbullets();

            context.textAlign='center';
            context.fillStyle='rgba(255,255,255,0.65)';
            context.font='bold 23px tahoma';
            context.fillText('GAME OVER',canvas.width/2,canvas.height/2-7);
            context.fillStyle='#FFF';
            context.font='bold 32px tahoma';
            context.fillText(timetostring(),canvas.width/2,canvas.height/2+33);
            context.fillStyle='rgba(255,255,255,0.3)';
            context.fillRect(165,152,170,1);
            context.font='11px tahoma';
            context.fillText('Press Enter or Spacebar to Reset Game',canvas.width/2,canvas.height-15);

        }else if(game.status=='replay' || game.status=='replayend'){

            game.replayno=Math.round((new Date().getTime()-game.replaytime)/10);

            if(game.replayno>=game.replaycoords.length){
                game.replayno=game.replaycoords.length-1;
                game.status='replayend';
            }

            drawspaceship();
            drawbullets();

            context.textAlign='center';
            context.fillStyle='rgba(255,255,255,0.3)';
            context.font='11px tahoma';
            context.fillText('Press Enter or Spacebar to Stop replay and Reset game',canvas.width/2,canvas.height-15);

        }else if(game.status=='loading' || game.status=='saving'){

            game.processingop=(game.processingop>=1)? 0.1 : game.processingop+=0.1;
            context.textAlign='center';
            context.fillStyle='rgba(255,255,255,'+game.processingop+')';
            context.font='bold 23px tahoma';
            context.fillText(game.status.toUpperCase()+'...',canvas.width/2+7,canvas.height/2+9);

        }

        game.timer=setTimeout(game.run,10);

    },

    die : function(){

        game.status='end';

        savebullets=bullets;

        game.endtime=new Date().getTime();

        util.onend.style.display='block';

    },

    replay : function(){

        game.status='replay';

        bullets=savebullets;
        killerbullet=savekillerbullet;

        game.time=game.savetime;

        game.replaycoords=game.save;
        game.replaytime=new Date().getTime();

    },

    replayhighscores : function(){

        game.status='replay';
        game.processingop=0.1;

        var data=eval('('+ajax.responseText+')');
        var hsbullets=data.bullets;
        if(hsbullets>bullets){
            for(var i=0; i<hsbullets-bullets; i++) addbullet();
        }
        bullets=hsbullets;
        killerbullet=data.killerbullet;

        game.time=data.score.split(':');
        for(var i=0; i<3; i++) game.time[i]=parseInt(game.time[i]);


        game.replaycoords=eval('new Array(['+data.coords.replace(/:::/g,'],[')+'])');
        game.replaytime=new Date().getTime();

    },

    toimage : function(){
        window.open(canvas.toDataURL());
    }

}

game.reset();


}catch(e){ //for ie

    var img=new Image();
    img.src='sample030.png';
    img.alt='총알피하기 게임 화면';
    img.style.marginTop='20px';
    document.body.replaceChild(img,document.getElementsByTagName('canvas')[0]);
    document.body.removeChild(document.getElementsByTagName('p')[0]);
    var nsment=document.createElement('p');
    nsment.className='iement';
    nsment.innerHTML='브라우저가 Canvas 태그를 지원하지 않습니다. 최신 브라우저로 업그레이드하세요.<br />브라우저 다운로드 바로가기 : <a href="http://www.google.com/chrome/index.html?brand=CHNY&utm_campaign=en&utm_source=en-et-youtube&utm_medium=et" target="_blank">크롬</a> <a href="http://www.mozilla.or.kr/ko/" target="_blank">파이어폭스</a> <a href="http://www.opera.com/browser/" target="_blank">오페라</a> <a href="http://www.apple.com/safari/" target="_blank">사파리</a>';
    document.body.insertBefore(nsment,document.getElementsByTagName('h2')[0]);
    var game={
        replayhighscores : function(){
            alert('브라우저가 Canvas 태그를 지원하지 않습니다.');
        }
    }

}


// score
var score={

    nowpage : 1,

    btn_prev : null,
    btn_next : null,

    add : function(){

        game.status='addscore';

        util.replay.style.display='none';
        util.nameinput.value='이름 입력';
        util.nameinput.style.display='';
        util.cancel.style.display='';
        util.addscore.onclick=score.send;

    },

    cancel : function(){

        util.onend.style.display=util.replay.style.display='';
        util.nameinput.style.display=util.cancel.style.display='none';
        util.addscore.onclick=score.add;

        game.status='end';

    },

    send : function(){

        //name, score, bullets, killerbullet, coords

        if(util.nameinput.value=='이름 입력' || !util.nameinput.value.match(/\S/)){
            alert('이름을 입력해 주세요');
            util.nameinput.value='';
            util.nameinput.focus();
            return false;
        }

        game.status='saving';

        util.onend.style.display='none';
        util.nameinput.style.display='none';
        util.addscore.onclick=null;
        //messenger.send('/psyonline/record_avoidthebullets.php','mode=add&name='+util.nameinput.value+'&score='+timetostring()+'&bullets='+bullets+'&killerbullet='+killerbullet+'&coords='+game.save.join(':::'),score.receive);
        messenger.send('/psyonline/record_avoidthebullets.php','mode=add&name='+util.nameinput.value+'&score='+timetostring()+'&bullets='+bullets+'&killerbullet='+killerbullet, score.receive);

    },

    receive : function(){

        game.processingop=0.1;

        var rank=parseInt(ajax.responseText)+1;
        score.get(Math.ceil(rank/5));
        util.onend.style.display=util.replay.style.display='';
        if(11>rank)  util.message.innerHTML='와우! <strong>'+rank+'<\/strong>위! ( +ㅂ+) b';
        else util.message.innerHTML='<strong>'+rank+'<\/strong>위에 등록 되었습니다.';
        util.addscore.onclick=score.add;
        util.cancel.style.display='none';

        game.status='end';

    },

    get : function(page){

        messenger.send('/psyonline/record_avoidthebullets.php','mode=get&page='+page,score.set);

    },

    set : function(){

        var data=eval('('+ajax.responseText+')');
        var ul=document.getElementById('scores');
        var inhtml='';
        for(var i=0; i<data.length; i++){
            inhtml+='<li><span>'+data[i].rank+'.<\/span> <em>'+data[i].name+'<\/em> <strong>'+data[i].score+'<\/strong> ';
            //if(data[i].score!='00:00:00') inhtml+='<button onclick="score.replay('+data[i].id+');">Replay<\/button>';
            //else inhtml+='<button>No Data<\/button>';
            inhtml+='<\/li>';
        }
        ul.innerHTML=inhtml;
        score.nowpage=data.page;
        score.total=data.total;
        score.btnsetting();

    },

    btnsetting : function(){
        if(score.nowpage==1){
            score.btn_prev.disabled='disabled';
            score.btn_next.disabled='';
        }else if(Math.ceil(score.total/5)==score.nowpage){
            score.btn_prev.disabled='';
            score.btn_next.disabled='disabled';
        }else{
            score.btn_prev.disabled='';
            score.btn_next.disabled='';
        }
    },

    movepage : function(tg){
        if(tg.id=='btn_prevpage') score.get(score.nowpage-1);
        else if(tg.id=='btn_nextpage') score.get(score.nowpage+1);
    },

    replay : function(id){

        //game.status='loading';

        //messenger.send('record_avoidthebullets.php','mode=getreplay&id='+id,game.replayhighscores);

    }

}

//ajax control
var ajax;
function ajaxcontrol(){
    this.afterfunction=null;
    this.send=function(url,query,afterfunction){
        this.afterfunction=afterfunction;
        ajax=(window.ActiveXObject)? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        ajax.open('POST',url,true);
        ajax.onreadystatechange=this.readystatechange;
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=euc-kr");
        //ajax.send(query);
    }
    this.readystatechange=function(){
        if(ajax.readyState==4){
            if(ajax.status==200){
                messenger.afterfunction();
            }
        }
    }
}
var messenger=new ajaxcontrol();

//add '0'
function timetostring(){
    var rv='';
    for(i=0; i<3; i++){
        rv+=(10>game.time[i])? '0'+game.time[i] : game.time[i];
        if(i!=2) rv+=':';
    }
    return rv;
}

window.onload=function(){
    score.btn_prev=document.getElementById('btn_prevpage');
    score.btn_prev.onclick=function(){
        score.movepage(this);
    }
    score.btn_next=document.getElementById('btn_nextpage');
    score.btn_next.onclick=function(){
        score.movepage(this);
    }
    score.get(1);
}