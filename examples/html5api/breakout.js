'use strict';

var canvas = document.getElementById('breakout');
var ctx = canvas.getContext('2d');

var rightPressed = false;
var leftPressed = false;

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener('keyup', keyUpHandler);
document.addEventListener('keydown', keyDownHandler);

function Ball(_x, _y, _r, _c, _dx, _dy) {

  this.x = val => _x = val || _x;
  this.y = val => _y = val || _y;
  this.dx = val => _dx = val || _dx;
  this.dy = val => _dy = val || _dy;
  this.radius = val => _r = val || _r;
  this.color = val => _c = val || _c;

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x(), this.y(), this.radius(), 0, Math.PI*2);
    ctx.fillStyle = this.color();
    ctx.fill();
    ctx.closePath();
  };

  Ball.prototype.move = function(board) {
    this.move.crossed = this.move.crossed || false;
    if(this.y() - this.radius() + this.dy() <= 0) {
      this.dy(this.dy() * (0-1));
    } else if(this.y() + this.radius() + this.dy() >= canvas.height - 100) {
      if(this.y() < canvas.height - 100 && this.x() > board.x() && this.x() <= board.x() + board.w()) {
        this.dy(this.dy() * (0-1));
      }
    }
    if(this.x() + this.dx() <  this.radius() || this.x() + this.dx() > canvas.width - this.radius()) {
      this.dx(this.dx() * (0-1));
    } else if( (this.y() > board.y() && this.y() < board.y() + board.h() && this.x() + this.radius() + this.dx() >= board.x())
              && (this.y() > board.y() && this.y() < board.y() + board.h() && this.x() - this.radius() + this.dx() <= board.x() + board.w()) ) {
      this.dx(this.dx() * (0-1));
    }

    this.x(this.x() + this.dx());
    this.y(this.y() + this.dy());
    console.log('(x, y) => (' + this.x() + ', ' + this.y() + ', ' + this.dy() + ')');
  };
  Ball.prototype.registance = function() {
    return 0.9;
  }
}

function Board(_x, _y, _w, _h, _dx, _color) {
  this.x = val => _x = val || _x;
  this.y = val => _y = val || _y;
  this.w = val => _w = val || _w;
  this.h = val => _h = val || _h;
  this.dx = val => _dx = val || _dx;
  this.color = val => _color = val || _color;

  Board.prototype.move = function() {
    if(rightPressed) {
      this.dx(Math.abs(this.dx()));
      // console.log('r: ');
    } else if(leftPressed){
      this.dx(Math.abs(this.dx()) * (0-1));
      // console.log('l: ');
    } else {
      return;
    }
    if(this.x() + this.dx() <  0 || this.x() + this.w() + this.dx() > canvas.width)
      return;

    this.x(this.x() + this.dx());
  };
  Board.prototype.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x(), this.y(), this.w(), this.h());
    ctx.fillStyle = this.color();
    ctx.fill();
    ctx.closePath();
  }
}

function BrickFactory(_r, _c, _w, _h, _color, _padding, _offsetTop, _offsetLeft) {
  function Brick(_x, _y, _w, _h, _c, _durability) {
    this.x = val => _x = val || _x;
    this.y = val => _y = val || _y;
    this.w = val => _w = val || _w;
    this.h = val => _h = val || _h;
    this.c = val => _c = val || _c;
    this.durability = val => _durability = _durability || val;

    Brick.prototype.draw = Brick.prototype.draw || function() {
      ctx.beginPath();
      ctx.rect(this.x(), this.y(), this.w(), this.h());
      ctx.fillStyle = this.c();
      ctx.fill();
      ctx.closePath();
    };
  }

  var bricks = [];
  for(var c = 0; c < _c; c++) {
    bricks[c] = [];
    for(var r = 0; r < _r; r++) {
      var brickX = c * (_w + _padding) + _offsetLeft;
      var brickY = r * (_h + _padding) + _offsetTop;
      var durability = 1;
      bricks[c][r] = new Brick(brickX, brickY, _w, _h, _color, durability);
    }
  }

  this.getBricks = () => bricks;
  this.drawBricks = () => {
    for(var c = 0; c < _c; c++) {
      for(var r = 0; r < _r; r++) {
        bricks[c][r].draw();
      }
    }
  };
  this.getBrick = (x, y) => bricks[x][y];
}

// (function() {
  function isOver(ball, intervalId) {
    if(ball.y() - ball.radius() > canvas.height || ball.x() - ball.radius() < 0 || ball.x()  + ball.radius() > canvas.height) {
      alert('GAME OVER');
      clearInterval(intervalId);
    }
  }

  var ball = new Ball(100, 100, 10, 'darkgray', 0.5, 0.5);
  var board = new Board(250, 500, 120, 10, 3, 'rgba(36, 68, 38, 0.8)');
  var bricks = new BrickFactory(4, 4, 80, 20, 'lightgray', 30, 100, 25);

  var intervalId = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bricks.drawBricks();

    ball.move(board);
    ball.draw();
    board.move();
    board.draw();
    isOver(ball, intervalId);
  }, 10);
// })();
