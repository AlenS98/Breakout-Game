const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
let timerId;
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const startPosition = [230, 10];
let currentPosition = startPosition;
const boardWidth = 560;
const boardHeight = 300;
const ballStart = [270, 35];
let ballCurrent = ballStart;
let xDirection = -2;
let yDirection = 2;
let score = 0;

//Create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}
//All Blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
//Adding block Function
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

//Adding User
const user = document.createElement("div");
user.classList.add("user");
user.style.left = currentPosition[0] + "px";
user.style.bottom = currentPosition[1] + "px";
grid.appendChild(user);

// Draw user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//Moving User
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        user.style.left = currentPosition[0] + "px";
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

//Adding the ball
const ball = document.createElement("div");
ball.classList.add("ball");
ball.style.left = ballCurrent[0] + "px";
ball.style.bottom = ballCurrent[1] + "px";
grid.appendChild(ball);

function moveBall() {
  ballCurrent[0] += xDirection;
  ballCurrent[1] += yDirection;
  ball.style.left = ballCurrent[0] + "px";
  ball.style.bottom = ballCurrent[1] + "px";
  checkCollisions();
}
timerId = setInterval(moveBall, 20);

function checkCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrent[0] > blocks[i].bottomLeft[0] &&
      ballCurrent[0] < blocks[i].bottomRight[0] &&
      ballCurrent[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrent[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You Win!";
        clearInterval(timerId);
      }
    }
  }
  if (
    ballCurrent[0] >= boardWidth - ballDiameter ||
    ballCurrent[1] >= boardHeight - ballDiameter ||
    ballCurrent[0] <= 0
  ) {
    changeDirection();
  }
  if (
    ballCurrent[0] > currentPosition[0] &&
    ballCurrent[0] < currentPosition[0] + blockWidth &&
    ballCurrent[1] > currentPosition[1] &&
    ballCurrent[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  if (ballCurrent[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lost!";
    document.removeEventListener("keydown", moveUser);
  }
}
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection == 2 && yDirection == -2) {
    xDirection = -2;
    return;
  }
  if (xDirection == -2 && yDirection == -2) {
    yDirection = 2;
    return;
  }
  if (xDirection == -2 && yDirection == 2) {
    xDirection = 2;
    return;
  }
}
function refreshPage() {
  window.location.reload();
}
