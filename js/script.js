//Created by inspiration from MDN's Alleyway tutorial

function init () {

//defining canvas for game
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// ? understand ctx and getContext

//defining start point and speed of ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//collison detection
var ballRadius = 10;

// paddle to hit the ball
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// ? get a better understanding of paddleX's purpose

// Key press functionality
var rightKeyPressed = false;
var leftKeyPressed = false;


// functions of the game
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    if(rightKeyPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
    else if(leftKeyPressed && paddleX > 0) {
    paddleX -= 7;
}

//check if ball remains within the canvas, if not,
//reverse motion

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
      alert('Game over!');
      document.location.reload();
    }
}

// ? Understand key press functionality
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightKeyPressed = true;
    }
    else if(e.keyCode == 37) {
        leftKeyPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightKeyPressed = false;
    }
    else if(e.keyCode == 37) {
        leftKeyPressed = false;
    }
}

setInterval(draw, 10);


}

init()
