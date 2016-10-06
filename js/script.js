// Created by inspiration from MDN's Alleyway tutorial

function init () {

  // defining canvas for game
  var canvas = document.getElementById('myCanvas')
  var ctx = canvas.getContext('2d')

  // defining startpoint & position of the ball
  var x = canvas.width / 2
  var y = canvas.height - 30
  // defines the speed of the ball every time the canvas is drawn
  var dx = 3
  var dy = -3

  // collison detection
  var ballRadius = 7

  // paddle to hit the ball
  var paddleHeight = 30
  var paddleWidth = 100
  var paddleStart = (canvas.width - paddleWidth) / 2
  // ? get a better understanding of paddleStart's purpose

  // Key press functionality

  var rightKeyPressed = false
  var leftKeyPressed = false

  // Key brick defintions

  var brickTotalRows = 3
  var brickTotalColumns = 8
  var brickHeight = 30
  var brickWidth = 75
  var brickPadding = 10
  var brickTopMargin = 30
  var brickLeftMargin = 30

  // Making of the brick

  var bricks = []
  for (var c = 0; c < brickTotalColumns; c++) {
    bricks[c] = []
    for (var r = 0; r < brickTotalRows; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1, }
    }
  }
// score functionality
  var score = 0;

// lives functionality
var lives = 3;

// image list

var img = {};
img.tennisBall = new Image();
img.tennisBall.src = "../images/tennisball.png"
var tennisBall = img.tennisBall;

img.angryCat = new Image();
img.angryCat.src = "../images/angrycat2.png"
var angryCat = img.angryCat;

img.dogPaddle = new Image();
img.dogPaddle.src = "../images/dach2.png"
var dogPaddle = img.dogPaddle;


  // Key press functionality
  document.addEventListener('keydown', keyDownHandler)
  document.addEventListener('keyup', keyUpHandler)

  function keyDownHandler (e) {
    if (e.keyCode === 39) {
      rightKeyPressed = true
    } else if (e.keyCode === 37) {
      leftKeyPressed = true
    }
  }

  function keyUpHandler (e) {
    if (e.keyCode === 39) {
      rightKeyPressed = false
    } else if (e.keyCode === 37) {
      leftKeyPressed = false
    }
  }

  function collisionDetection() {
    for(c = 0; c < brickTotalColumns; c++) {
        for(r = 0; r < brickTotalRows; r++) {
            var b = bricks[c][r];
            // b = brickPositions
            if(bricks[c][r].status === 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score ++ ;
            }
          }
        }
    }
}

function drawScore () {
  ctx.font = '14px Helvetica';
  ctx.fillStyle = 'white';
  ctx.fillText("Score: "+score + " evil kitties defeated!", 8, 20);
}
  // functions of the game
  function drawBall () {
    ctx.beginPath()
    // ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.drawImage(tennisBall, x - ballRadius, y - ballRadius , ballRadius * 2, ballRadius * 2);
    // ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
  }

  function drawPaddle () {
    ctx.beginPath()
    // ctx.rect(paddleStart, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.drawImage(dogPaddle, paddleStart, canvas.height - paddleHeight, paddleWidth, paddleHeight)

    // ctx.fillStyle = '#FF0000'
    ctx.fill()
    ctx.closePath()
  }

  function drawBricks () {
    for (c = 0; c < brickTotalColumns; c++) {
      for (r = 0; r < brickTotalRows; r++) {
         if(bricks[c][r].status === 1) {
             var brickX = (c * (brickWidth + brickPadding)) + brickLeftMargin
             var brickY = (r * (brickHeight + brickPadding)) + brickTopMargin
             bricks[c][r].x = brickX
             bricks[c][r].y = brickY
             ctx.beginPath()
            //  ctx.rect(brickX, brickY, brickWidth, brickHeight)
             ctx.drawImage(angryCat, brickX, brickY, brickWidth, brickHeight)
            //  ctx.fillStyle = '#0095DD'
             ctx.fill()
             ctx.closePath()
         }
      }
    }
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    drawBall()
    drawPaddle()
    drawScore()
    drawLives()
    collisionDetection()
    x += dx
    y += dy

    //checking for collision every draw
    // loop the bricks
  //  for()

    // setting movement criteria for the paddle

    if (rightKeyPressed && paddleStart < canvas.width - paddleWidth) {
      paddleStart += 7
    } else if (leftKeyPressed && paddleStart > 0) {
      paddleStart -= 7
    }

    // check if ball remains within the canvas, if not, reverse motion

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx
    }
    // Setting of collison course with paddle

    if (y + dy < ballRadius) {
      dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleStart && x < paddleStart + paddleWidth) {
        dy = -dy
      } else {
               lives--;
               if(!lives) {
               alert('Game over!')
               document.location.reload()

             } else {
                      x = canvas.width/2;
                      y = canvas.height-30;
                      dx = 3;
                      dy = -3;
                      paddleStart = (canvas.width-paddleWidth)/2;
             }

      }
    }
  }

  setInterval(draw, 10)
}

document.addEventListener('DOMContentLoaded', init)
