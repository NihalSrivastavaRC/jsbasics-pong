const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var ballRadius = 10;
const paddleHeight = 75;
const paddleWidth = 10;

let paddle_X_Y = (canvas.clientHeight - paddleHeight) / 2;
let paddle_Y_Y = (canvas.clientHeight - paddleHeight) / 2;
var x = canvas.clientWidth / 2;
var y = canvas.clientHeight - 30;

var dx = 2;
var dy = -2;

let wPressed = false;
let sPressed = false;

let upPressed = false;
let downPressed = false;

let score_X = 0;
let score_Y = 0;

let done = false;
let single_player = false;

function pause() {
  done = false;
}

function playSinglePlayer() {
  done = true;
  single_player = true;
  window.requestAnimationFrame(draw);
}

function playDualPlayer() {
  done = true;
  single_player = false;
  window.requestAnimationFrame(draw);
}

function reset() {
  score_X = 0;
  score_Y = 0;
  x = canvas.clientWidth / 2;
  y = canvas.clientHeight - 30;
  done = false;
}

function keyDownHandler(e) {
  if (e.key === "w") {
    wPressed = true;
  } else if (e.key == "s") {
    sPressed = true;
  } else if (e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "w") {
    wPressed = false;
  } else if (e.key === "s") {
    sPressed = false;
  } else if (e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "ArrowDown") {
    downPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = "#331e38";
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawPlayerX() {
  ctx.beginPath();
  ctx.fillStyle = "#331e38";
  ctx.rect(0, paddle_X_Y, paddleWidth, paddleHeight);
  ctx.fill();
  ctx.closePath();
}

function drawPlayerY() {
  ctx.beginPath();
  ctx.fillStyle = "#331e38";
  ctx.rect(
    canvas.clientWidth - paddleWidth,
    paddle_Y_Y,
    paddleWidth,
    paddleHeight
  );
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "26px serif";
  ctx.textAlign = "center";
  ctx.fillText(score_X + " - PONG - " + score_Y, canvas.clientWidth / 2, 25);
}

function draw(timeStamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  drawBall();
  drawPlayerX();
  drawPlayerY();

  drawScore();

  if (x + dx > canvas.clientWidth - ballRadius) {
    if (y > paddle_Y_Y && y < paddle_Y_Y + paddleHeight) {
      dx = -dx;
    } else {
      score_X += 1;
      x = canvas.clientWidth / 2;
      y = canvas.clientHeight - 30;
    }
  } else if (x + dx < ballRadius) {
    if (y > paddle_X_Y && y < paddle_X_Y + paddleHeight) {
      dx = -dx;
    } else {
      score_Y += 1;
      x = canvas.clientWidth / 2;
      y = canvas.clientHeight - 30;
    }
  }
  if (y + dy > canvas.clientHeight - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (sPressed) {
    paddle_X_Y += 7;
    if (paddle_X_Y + paddleHeight > canvas.clientHeight) {
      paddle_X_Y = canvas.clientHeight - paddleHeight;
    }
  } else if (wPressed) {
    paddle_X_Y -= 7;
    if (paddle_X_Y < 0) {
      paddle_X_Y = 0;
    }
  }

  if (single_player) {
    if (y > paddle_Y_Y) {
      while (y >= paddle_Y_Y) {
        paddle_Y_Y += 7;
        if (paddle_Y_Y + paddleHeight > canvas.clientHeight) {
          paddle_Y_Y = canvas.clientHeight - paddleHeight;
          break;
        }
      }
    }

    if (y < paddle_Y_Y) {
      while (y <= paddle_Y_Y) {
        paddle_Y_Y -= 7;
        if (paddle_Y_Y < 0) {
          paddle_Y_Y = 0;
        }
      }
    }
  } else {
    if (downPressed) {
      paddle_Y_Y += 7;
      if (paddle_Y_Y + paddleHeight > canvas.clientHeight) {
        paddle_Y_Y = canvas.clientHeight - paddleHeight;
      }
    } else if (upPressed) {
      paddle_Y_Y -= 7;
      if (paddle_Y_Y < 0) {
        paddle_Y_Y = 0;
      }
    }
  }

  x += dx;
  y += dy;
  if (done) {
    window.requestAnimationFrame(draw);
  }
}

window.requestAnimationFrame(draw);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
