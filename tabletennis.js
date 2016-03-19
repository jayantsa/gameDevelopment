var game=(function(){
var canvas;
var ballRadius;
var ctx;
var x,y,dx,dy;
var barHeight1=10,barHeight2=10;
var barWidth1=70,barWidth2=70;
var barStart1,barStart2;
var right1=0,right2=0,left1=0,left2=0;
var score1=0;score2=0;

function fetch()
{
	canvas=document.getElementById('mycanvas');
	ctx=canvas.getContext('2d');
	x=canvas.width/2;
	y=canvas.height/2;
	ballRadius=10;
	barStart1=(canvas.width-barWidth1)/2;
	barStart2=(canvas.width-barWidth2)/2;
	dx=2;
	dy=-2;
}

function drawBar1()
{
	ctx.beginPath();
	ctx.rect(barStart1,canvas.height-barHeight1,barWidth1,barHeight1);
    ctx.fillStyle="blue";
    ctx.fill();
    ctx.closePath();
}
function drawBar2()
{
	ctx.beginPath();
	ctx.rect(barStart2,0,barWidth2,barHeight2);
    ctx.fillStyle="blue";
    ctx.fill();
    ctx.closePath();

}
function drawBall()
{
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2,false);
	ctx.fillStyle="blue";
	ctx.fill();
	ctx.closePath();
}
function keyDownHandler(e)
{
	if(e.keyCode==39)
	{
		right1=1;
	}
	else if(e.keyCode==37)
	{
		left1=1;
	}
	else if(e.keyCode==68)
	{
		right2=1;
	}
	else if(e.keyCode==65)
	{
		left2=1;
	}
}
function keyUpHandler(e)
{
	if(e.keyCode==39)
	{
		right1=0;
	}
	else if(e.keyCode==37)
	{
		left1=0;
	}
	else if(e.keyCode==68)
	{
		right2=0;
	}
	else if(e.keyCode==65)
	{
		left2=0;
	}

}
function drawScore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="green";
	ctx.fillText("SCORE1:"+score1+" SCORE2:"+score2,0,canvas.height/2);
}
function draw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBall();
	drawBar1();
	drawBar2();
	drawScore();
	console.log("score1:"+score1+" score2:"+score2);
	if(x+dx<ballRadius||x+dx>canvas.width-ballRadius)
	{
		dx=-dx;
	}
	if(y+dy<ballRadius)
	{
		if((x>barStart2&&x<barStart2+barWidth2))
		{
			dy--;
       
		}
		else{
        score1++;
		
	}
     dy=-dy;

	}
	else if(y+dy>canvas.height-ballRadius)
	{
		if(!(x>barStart1&&x<barStart1+barWidth1))
		{
          score2++;
		}
		dy=-dy;

	}
	if(right1==1&&barStart1<canvas.width-barWidth1)
	{
		barStart1+=7;
	}
	if(right2==1&&barStart2<canvas.width-barWidth2)
	{
		barStart2+=7;
	}
	if(left1==1&&barStart1>0)
	{
		barStart1-=7;
	}
	if(left2==1&&barStart2>0)
	{
		barStart2-=7;
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