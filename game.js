const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const player={
    x:180,
    y:530,
    w:40,
    h:50,
    speed:7
};

let score=0;
let gameOver=false;

const keys={};

const enemies=[];

document.addEventListener("keydown",e=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});

function spawnEnemy(){

    enemies.push({
        x:Math.random()*360,
        y:-50,
        w:40,
        h:40,
        speed:3+Math.random()*4
    });

}

setInterval(spawnEnemy,700);

function update(){

    if(gameOver) return;

    if(keys["ArrowLeft"]||keys["a"])
        player.x-=player.speed;

    if(keys["ArrowRight"]||keys["d"])
        player.x+=player.speed;

    player.x=Math.max(0,Math.min(360,player.x));

    enemies.forEach(e=>{

        e.y+=e.speed;

        if(e.y>600){
            e.y=-50;
            e.x=Math.random()*360;
            score++;
        }

        if(
            player.x<e.x+e.w &&
            player.x+player.w>e.x &&
            player.y<e.y+e.h &&
            player.y+player.h>e.y
        ){
            gameOver=true;
        }

    });

}

function draw(){

    ctx.clearRect(0,0,400,600);

    // stars

    for(let i=0;i<80;i++){

        ctx.fillStyle="white";
        ctx.fillRect(Math.random()*400,Math.random()*600,2,2);

    }

    // player

    ctx.fillStyle="#00e5ff";
    ctx.beginPath();
    ctx.moveTo(player.x+20,player.y);
    ctx.lineTo(player.x,player.y+50);
    ctx.lineTo(player.x+40,player.y+50);
    ctx.fill();

    // enemies

    ctx.fillStyle="red";

    enemies.forEach(e=>{
        ctx.fillRect(e.x,e.y,e.w,e.h);
    });

    document.getElementById("score").innerText="Score: "+score;

    if(gameOver){

        ctx.fillStyle="white";
        ctx.font="40px Arial";
        ctx.fillText("GAME OVER",65,300);

        ctx.font="24px Arial";
        ctx.fillText("Refresh to play again",75,350);

    }

}

function loop(){

    update();
    draw();
    requestAnimationFrame(loop);

}

loop();
