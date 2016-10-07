User Story:
Help Dash the Dachshund defend his master’s home from the invading kitty army!

Steps taken:

1) Set game canvas, define var canvas and var ctx to utilize canvas' 2D rendering effect
2) Set setInterval to 10 milliseconds as the time frame to "draw" the canvas
3) Draw a ball (later subbed with an image of a tennis ball) by setting x and y coordinates
   of the start point of the ball, add speed of ball by setting how much x and y moves every
   frame change
4) Set collision course within all sides of the wall (later took out the bottom side of
   that function)
5) Create paddle by making a rectangle block (later subbed with an image) and setting the
   initial X and Y coordinates and width and height
6) Create buttons: 2 boonlean vars for left and right clicks, set eventlisteners for presses;
   associate presses with movement on xaxis at 7px/10milliseconds
7) Create bricks using for loops to create arrays based on set width, height, padding between
   each brick (change brick rects to images after)
8) Set collision and status for bricks inside for loops so that bricks disappear after being hit





Game credits:
MDN 2D Breakout Game Tutorial:https://developer.mozilla.org/en-US/docs/Games/Introduction

Image credits:
Tennis ball image - http://www.freeiconspng.com/free-images/tennis-png-1816
Background image - http://www.123rf.com/photo_5237062_colorful-fenced-in-row-houses-with-blue-sky.html
Dashshund image - https://2milliondogsblog.files.wordpress.com/2013/08/cartoon-dachshund.jpg
cat image - http://thumb101.shutterstock.com/display_pic_with_logo/483673/483673,1287949494,3/stock-vector-angry-cat-cartoon-63722698.jpg