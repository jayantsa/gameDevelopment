var game=(function(){//here take care of not running the javascript before formation of DOM
var canvas;
var ctx;
var x,y,dx,dy;
var ballradius=10;
var color="red";
var barHeight=10;
var barWidth=75;
var barStart;
var rightPressed=false;
var leftPressed=false;
var brickRowCount=3;
var brickColumnCount=5;
var score=0,lives=3;
var brickWidth=70,brickPadding=20,brickHeight=20,brickOffsetTop=30,brickOffsetLeft=30;
var bricks=[];
for(c=0;c<brickColumnCount;c++)
{
	bricks[c]=[];
	for(r=0;r<brickRowCount;r++)
		bricks[c][r]={x:0,y:0,status:1};
}

function fetch(){
    canvas=document.getElementById('mycanvas');
    console.log(canvas);
    ctx=canvas.getContext('2d');
    x=canvas.width/2;
    y=canvas.height-30;
    barStart=(canvas.width-barWidth)/2;
    dx=2;
    dy=-2;

}
function drawLives(){
	ctx.font="16px Arial";
	ctx.fillStyle="red";
	ctx.fillText("LIVES:"+lives,canvas.width-65,20);
}
function drawBricks(){
	for(c=0;c<brickColumnCount;c++)
	{
		for(r=0;r<brickRowCount;r++)
		{
			if(bricks[c][r].status==1){
			var brickx=(c*(brickWidth+brickPadding))+brickOffsetLeft;
			var bricky=(r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x=brickx;
			bricks[c][r].y=bricky;
			ctx.beginPath();
			ctx.rect(brickx,bricky,brickWidth,brickHeight);
			ctx.fillStyle="green";
			ctx.fill();
			ctx.closePath();
		  }
		}
	}
}
function drawBar(){
	ctx.beginPath();
	ctx.rect(barStart,canvas.height-barHeight,barWidth,barHeight);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();
}
function drawBall(){
	ctx.beginPath();
    ctx.arc(x,y,ballradius,0,(Math.PI)*2,false);
	ctx.fillStyle=color;
	ctx.fill();
	ctx.closePath();
}
function drawScore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="red";
	ctx.fillText("SCORE:"+score,8,20);
}
function keyDownHandler(e)
{
	if(e.keyCode==39)
	{
		rightPressed=true;
	}
	else if(e.keyCode==37)
	{
		leftPressed=true;
	}
}
function keyUpHandler(e)
{
	if(e.keyCode==39)
	{
		rightPressed=false;
	}
	else if(e.keyCode==37)
	{
		leftPressed=false;
	}
}
function collision()
{
	for(c=0;c<brickColumnCount;c++)
	{
		for(r=0;r<brickRowCount;r++)
		{

			var b=bricks[c][r];
			if(b.status==1&&x>b.x && x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
				dy=-dy;
				b.status=0;
				score++;
			}

		}
	}
}
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBricks();
    drawBall();
    drawBar();
    collision();
    drawScore();
    drawLives();
    
    
	if(y+dy<ballradius)
	{
		dy=-dy;
		color="green";

	}
	else if(y+dy>canvas.height-ballradius)
	{
		if(x>barStart&&x<barStart+barWidth)
		{
			dy=-dy;
		}
		else
		{
			lives--;
			if(!lives){
		    alert("Game Over");
		    document.location.reload();
	        }
	        else
	        {
	        	x=canvas.width/2;
                y=canvas.height-30;
                barStart=(canvas.width-barWidth)/2;

	        }

	    }

	}
	if(x+dx<ballradius||x+dx>canvas.width-ballradius)
	{
		dx=-dx;
		color="pink";
	}
	if(rightPressed&&(barStart<canvas.width-barWidth))
	{
		barStart+=6;
	}
	else if(leftPressed&&barStart>0)
	{
		barStart-=6;
	}

	x+=dx;
	y+=dy;
}

return{
	init:function(){
		fetch();
		draw();
		setInterval(draw,10);
		window.addEventListener("keydown",keyDownHandler,false);
		window.addEventListener("keyup",keyUpHandler,false);
	}
}

}());
