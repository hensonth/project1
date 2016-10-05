//Created by inspiration from MDN's Alleyway tutorial

function init() {

  //defining canvas for game
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  //defining start point and speed of ball
  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var dx = 2;
  var dy = -2;

  //collison detection
  var ballRadius = 10;

  // paddle to hit the ball
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleStart = (canvas.width - paddleWidth) / 2;
  // ? get a better understanding of paddleStart's purpose

  // Key press functionality
  var rightKeyPressed = false;
  var leftKeyPressed = false;

  // Key brick defintions

  var brickTotalRows = 3;
  var brickTotalColumns = 5;
  var brickHeight = 20;
  var brickWidth = 75;
  var brickPadding = 10;
  var brickTopMargin = 30;
  var brickLeftMargin = 30;

// Making of the brick

  var bricks = [];
  for(c=0; c<brickTotalColumns; c++) {
      bricks[c] = [];
      for(r=0; r<brickTotalRows; r++) {
          bricks[c][r] = { x: 0, y: 0 };
      }
  }
  // ? Understand key press functionality
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightKeyPressed = true;
    } else if (e.keyCode == 37) {
      leftKeyPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightKeyPressed = false;
    } else if (e.keyCode == 37) {
      leftKeyPressed = false;
    }
  }

  // functions of the game
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleStart, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
      for(c = 0; c<brickTotalColumns; c++) {
          for(r = 0; r<brickTotalRows; r++) {
              var brickX = (c*(brickWidth+brickPadding))+brickLeftMargin;
              var brickY = (r*(brickHeight+brickPadding))+brickTopMargin;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#0095DD";
              ctx.fill();
              ctx.closePath();
          }
      }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    //setting movement criteria for the paddle

    if (rightKeyPressed && paddleStart < canvas.width - paddleWidth) {
      paddleStart += 7;
    } else if (leftKeyPressed && paddleStart > 0) {
      paddleStart -= 7;
    }

    //check if ball remains within the canvas, if not, reverse motion

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    // Setting of collison course with paddle

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleStart && x < paddleStart + paddleWidth) {
        dy = -dy;

      } else {
        alert('Game over!');
        document.location.reload();
      }
    }

  }



setInterval(draw, 10);


}


init()
