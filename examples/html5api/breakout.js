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

  this.x = function(val) {return _x = val || _x; };
  this.y = function(val) {return _y = val || _y; };
  this.dx = function(val) {return _dx = val || _dx; };
  this.dy = function(val) {return _dy = val || _dy; };
  this.radius = function(val) {return _r = val || _r; };
  this.color = function(val) {return _c = val || _c; };

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
  this.x = function(val) { return _x = val || _x; };
  this.y = function(val) { return _y = val || _y; };
  this.w = function(val) { return _w = val || _w; };
  this.h = function(val) { return _h = val || _h; };
  this.dx = function(val) { return _dx = val || _dx; };
  this.color = function(val) { return _color = val || _color; };

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


(function() {
  function isOver(ball, intervalId) {
    if(ball.y() - ball.radius() > canvas.height || ball.x() - ball.radius() < 0 || ball.x() + ball.radius() > canvas.height) {
      alert('GAME OVER');
      clearInterval(intervalId);
    }
  }

  var blue = new Ball(100, 100, 10, 'skyblue', 2, 3);
  var board = new Board(250, 500, 120, 10, 3, 'rgba(36, 68, 38, 0.8)');

  var intervalId = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blue.move(board);
    blue.draw();
    board.move();
    board.draw();
    isOver(blue, intervalId);
  }, 10);
})();
