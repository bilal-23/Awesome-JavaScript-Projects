alert("Instructions:\n1)Press UP key or blue button to jump\n2)Tap the screen or red button to shoot\n3)Pop the balloons to gain points\n4)Avoid obstacles"); 

var c = document.querySelector('canvas');
var cc = c.getContext("2d");
var b1 = document.querySelector(".b1");
var b2 = document.querySelector(".b2");
var w, h;

var bgImg = new Image();
var bg = {
    x: 0,
    y: 0,
    width: w,
    height: h
}
bgImg.src = "https://i.ibb.co/4fCcssh/scene.png";

var playerImg = new Image();
var player = {
    x: w/2-(35/100*w),
    y: h/2+(6.5/100*h),
    vy: 0,
    width: 7/100*w,
    height: 15/100*h
}
playerImg.src = "https://i.ibb.co/ZT3NZKH/player.png";

var balloonImg = new Image();
var balloon = {
    x: Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100))),
    y: Math.floor(Math.random()*((4*h)-h)+h),
    width: 10/100*w,
    height: 15/100*h 
}
var balloon2 = {
    x: Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100))),
    y: Math.floor(Math.random()*((3*h)-h)+h),
    width: 10/100*w,
    height: 15/100*h 
}
var balloon3 = {
    x: Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100))),
    y: Math.floor(Math.random()*((2*h)-h)+h),
    width: 10/100*w,
    height: 15/100*h 
}
balloonImg.src = "https://i.ibb.co/r76JHCM/balloon.png";

var bulletImg = new Image();
var bullet = {
    x: player.x+5,
    y: player.y+5/100*h,
    vx: 0,
    width: 2/100*w,
    height: 2/100*h
}
bulletImg.src = "https://i.ibb.co/sVnS8V8/bullet.png";

var windImg = new Image();
var wind = {
    x: Math.floor(Math.random()*((5*w)-w)+w),
    y: h/2,
    vx: 5,
    width: 10/100*w,
    height: 10/100*w
}
windImg.src = "https://i.ibb.co/bvBxrcb/wind.png";

score = 0;
hscore = 0;

function move(b){
    b.y -= 5;

    if (b.y <= h-(h+100)){
        b.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
        b.y = Math.floor(Math.random()*((4*h)-h)+h);
    }
}

function bulletpos(){
    if (bullet.x > w || bullet.x == player.x+5 || (
        bullet.x <= (balloon.x + balloon.width)
        && balloon.x <= (bullet.x + bullet.width)
        && bullet.y <= (balloon.y + balloon.height)
        && balloon.y <= (bullet.y + bullet.height)
        )||
(
        bullet.x <= (balloon2.x + balloon2.width)
        && balloon2.x <= (bullet.x + bullet.width)
        && bullet.y <= (balloon2.y + balloon2.height)
        && balloon2.y <= (bullet.y + bullet.height)
        )||
(
        bullet.x <= (balloon3.x + balloon3.width)
        && balloon3.x <= (bullet.x + bullet.width)
        && bullet.y <= (balloon3.y + balloon3.height)
        && balloon3.y <= (bullet.y + bullet.height)
        )
){
        bullet.y = player.y+(7/100*h);
    }    
}

function update(){
    bullet.x += bullet.vx;
    wind.x -= wind.vx;
    player.y -= player.vy;

    if (player.y <= h/2-(18/100*h)){
        player.y = h/2-(18/100*h);
    }

    if (player.y >= h/2+(6.5/100*h)){
        player.y = h/2+(6.5/100*h);
    }

    if (bullet.x >= w){
        bullet.x = player.x+5;
        bullet.vx = 0;
    }    

    if (
        bullet.x <= (balloon.x + balloon.width)
        && balloon.x <= (bullet.x + bullet.width)
        && bullet.y <= (balloon.y + balloon.height)
        && balloon.y <= (bullet.y + bullet.height)
        ){
        balloon.y = Math.floor(Math.random()*((4*h)-h)+h);
        balloon.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
        bullet.x = player.x+5;
        bullet.vx = 0;
        score += 1;
    }

    if (
        bullet.x <= (balloon2.x + balloon2.width)
        && balloon2.x <= (bullet.x + bullet.width)
        && bullet.y <= (balloon2.y + balloon2.height)
        && balloon2.y <= (bullet.y + bullet.height)
        ){
        balloon2.y = Math.floor(Math.random()*((3*h)-h)+h);
        balloon2.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
        bullet.x = player.x+5;
        bullet.vx = 0;
        score += 1;
    }
    if (
        bullet.x <= (balloon3.x + balloon3.width)
        && balloon3.x <= (bullet.x + bullet.width)
        && bullet.y <= (balloon3.y + balloon3.height)
        && balloon3.y <= (bullet.y + bullet.height)
        ){
        balloon3.y = Math.floor(Math.random()*((2*h)-h)+h);
        balloon3.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
        bullet.x = player.x+5;
        bullet.vx = 0;
        score += 1;
    }

    if (wind.x < -100){
        wind.x = Math.floor(Math.random()*((5*w)-w)+w);
    }

    if (
        player.x <= (wind.x + wind.width)
        && wind.x <= (player.x + player.width)
        && player.y <= (wind.y + wind.height)
        && wind.y <= (player.y + player.height)
        ){
        wind.x = Math.floor(Math.random()*((5*w)-w)+w);
        if (hscore <= score){
            hscore = score;
        }
        score = 0;
    }
        
    if (
        wind.x <= (balloon3.x + balloon3.width)
        && balloon3.x <= (wind.x + wind.width)
        && wind.y <= (balloon3.y + balloon3.height)
        && balloon3.y <= (wind.y + wind.height)
        ){
        balloon3.y = Math.floor(Math.random()*((2*h)-h)+h);
        balloon3.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
        }
    if (
        wind.x <= (balloon2.x + balloon2.width)
        && balloon2.x <= (wind.x + wind.width)
        && wind.y <= (balloon2.y + balloon2.height)
        && balloon2.y <= (wind.y + wind.height)
        ){
        balloon2.y = Math.floor(Math.random()*((3*h)-h)+h);
        balloon2.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
        }
    if (
        wind.x <= (balloon.x + balloon.width)
        && balloon.x <= (wind.x + wind.width)
        && wind.y <= (balloon.y + balloon.height)
        && balloon.y <= (wind.y + wind.height)
        ){    
        balloon.y = Math.floor(Math.random()*((4*h)-h)+h);
        balloon.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));                    
        }    
}

function windmov(){
    wind.vx = 5;
}

b1.addEventListener("pointerdown",jump);
b1.addEventListener("pointerup",jumpdown);
b2.addEventListener("pointerdown",shoot);
document.addEventListener("keydown",jumpc);
document.addEventListener("keyup",jumpdownc);
c.addEventListener("click",shoot);

function jp(){
    player.vy = 15;
}

function jd(){
    player.vy = -15;
}

function jump(e){
    jp();
}

function jumpdown(e){
    jd();
}
function jumpc(e){
    if (e.keyCode == 38){
        jp();
    }
}
function jumpdownc(e){
    if (e.keyCode == 38){
        jd();
    }
}

function shoot(){
    bullet.vx = 10;
}

function render(){
    cc.drawImage(bgImg,bg.x,bg.y,bg.width,bg.height);
    cc.drawImage(bulletImg,bullet.x,bullet.y,bullet.width,bullet.height);    
    cc.drawImage(playerImg,player.x,player.y,player.width,player.height);
    cc.drawImage(balloonImg,balloon.x,balloon.y,balloon.width,balloon.height);    
    cc.drawImage(balloonImg,balloon2.x,balloon2.y,balloon2.width,balloon2.height);
    cc.drawImage(balloonImg,balloon3.x,balloon3.y,balloon3.width,balloon3.height);    
    cc.drawImage(windImg,wind.x,wind.y,wind.width,wind.height);

    cc.fillStyle = "black";
    cc.font = "25px Aerial";
    cc.fillText("Score: "+score+"   HighScore: "+hscore,w/2-40/100*w,h/2-40/100*h);
}

function loop(){
    render();
    update();
    move(balloon);
    move(balloon2);    
    move(balloon3);
    bulletpos();
}

setInterval(loop,1000/60);

window.onload = function(){
    init();
    window.addEventListener("resize",init,false);
}

function init(){
    w = window.innerWidth - 20;
    h = window.innerHeight - 70;
    c.width = w;
    c.height = h;
    bg.width = w;
    bg.height = h;
    player.x =  w/2-(35/100*w);
    player.y = h/2+(6.5/100*h);
    player.width = 7/100*w;
    player.height = 15/100*h;
    balloon.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
    balloon.y = Math.floor(Math.random()*((4*h)-h)+h);
    balloon.width = 10/100*w;
    balloon.height = 15/100*h;
    balloon2.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
    balloon2.y = Math.floor(Math.random()*((3*h)-h)+h);
    balloon2.width = 10/100*w;
    balloon2.height = 15/100*h;
    balloon3.x = Math.floor(Math.random()*((w/2+20/100*w)-(w/2-(20/100*w)))+(w/2-(20/100)));
    balloon3.y = Math.floor(Math.random()*((2*h)-h)+h);
    balloon3.width = 10/100*w;
    balloon3.height = 15/100*h;        
    bullet.x = player.x+5;
    bullet.y = player.y+5/100*h;
    bullet.width = 2/100*w;
    bullet.height = 2/100*h;
    wind.x = Math.floor(Math.random()*((5*w)-w)+w);
    wind.y = h/2;
    wind.width = 10/100*w;
    wind.height = 10/100*h;    
}
