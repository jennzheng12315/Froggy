// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background
 *    colorMode, HSB, fill
 *    ellipse, rect
 *    random
 *    width, height
 *    keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,
 *    text, textSize
 *    collideRectCircle, collideCircleCircle,
 */

let backgroundColor, frogX, frogY, score, lives, gameIsOver, step;

//Could have used an array for cars in hindsight...
let car1X,
  car1Y,
  car1V,
  car2X,
  car2Y,
  car2V,
  car3X,
  car3Y,
  car3V,
  car4X,
  car4Y,
  car4V;
let powerup1X,
  powerup1Y,
  powerup2X,
  powerup2Y,
  powerupTimer,
  powerupOn,
  count1,
  count2;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 0;
  
  frogX = width / 2;
  frogY = height - 20;
  step = 10;
  score = 0;
  lives = 3;
  gameIsOver = false;
  
  car1X = 0;
  car1Y = 400;
  car1V = 2;
  car2X = 0;
  car2Y = 300;
  car2V = 3;
  car3X = 0;
  car3Y = 200;
  car3V = 4;
  car4X = 0;
  car4Y = 100;
  car4V = 5;
  
  powerup1X = random(10, width - 10);
  powerup1Y = random(100, 400);
  powerup2X = random(10, width - 10);
  powerup2Y = random(100, 400);
  powerupTimer = 150;
  powerupOn = false;
}

function draw() {
  background(backgroundColor);
  // Code for goal line
  fill(200, 80, 80);
  rect(0, 0, width, 50);

  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  powerups();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (keyCode === UP_ARROW && !gameIsOver) {
    if (frogY > 20) {
      frogY -= step;
    }
  }

  if (keyCode === DOWN_ARROW && !gameIsOver) {
    if (frogY < height - 20) {
      frogY += step;
    }
  }

  if (keyCode === LEFT_ARROW && !gameIsOver) {
    if (frogX > 20) {
      frogX -= step;
    }
  }

  if (keyCode === RIGHT_ARROW && !gameIsOver) {
    if (frogX < width - 20) {
      frogX += step;
    }
  }
}

function moveCars() {
  car1X += car1V;
  car2X += car2V;
  car3X += car3V;
  car4X += car4V;
  
  // Reset if it moves off screen
  if (car1X > width) {
    car1X = 0;
  }
  if (car2X > width) {
    car2X = 0;
  }
  if (car3X > width) {
    car3X = 0;
  }
  if (car4X > width) {
    car4X = 0;
  }
}

function drawCars() {
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  fill(30, 80, 80);
  rect(car2X, car2Y, 40, 30);
  fill(60, 80, 80);
  rect(car3X, car3Y, 40, 30);
  fill(280, 80, 80);
  rect(car4X, car4Y, 40, 30);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  let hit1 = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  let hit2 = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  let hit3 = collideRectCircle(car3X, car3Y, 40, 30, frogX, frogY, 20);
  let hit4 = collideRectCircle(car4X, car4Y, 40, 30, frogX, frogY, 20);
  if (hit1 == true) {
    frogX = width / 2;
    frogY = height - 20;
    lives--;
  }
  if (hit2) {
    frogX = width / 2;
    frogY = height - 20;
    lives--;
  }
  if (hit3 == true) {
    frogX = width / 2;
    frogY = height - 20;
    lives--;
  }
  if (hit4 == true) {
    frogX = width / 2;
    frogY = height - 20;
    lives--;
  }
  if (lives == 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  let goal = collideRectCircle(0, 0, width, 50, frogX, frogY, 20);
  if (goal) {
    frogX = width / 2;
    frogY = height - 20;
    score++;
    car1V += 0.5;
    car2V += 0.5;
    car3V += 0.5;
    car4V += 0.5;
  }
  
  if (score == 5) {
    gameIsOver = true;
    powerupOn = false;
    powerup1X = random(10, width - 10);
    powerup1Y = random(100, 400);
    powerup2X = random(10, width - 10);
    powerup2Y = random(100, 400);
  }
}

function displayScores() {
  textSize(12);
  fill(255);
  
  text(`Lives: ${lives}`, 10, 20);
  text(`Score: ${score}`, 10, 40);
  
  // Display game over message if the game is over
  if (gameIsOver) {
    textSize(20);
    if (score == 5) {
      text("You Win!", width / 2 - 20, height / 2);
      text(`Score: ${score}`, width / 2 - 20, height / 2 + 20);
    } else {
      text("Game Over", width / 2 - 20, height / 2);
      text(`Score: ${score}`, width / 2 - 20, height / 2 + 20);
    }
  }
}

function powerups() {
  fill(320, 80, 80);
  ellipse(powerup1X, powerup1Y, 10);
  fill(220, 80, 80);
  ellipse(powerup2X, powerup2Y, 10);

  let hit1 = collideCircleCircle(powerup1X, powerup1Y, 10, frogX, frogY, 20);
  let hit2 = collideCircleCircle(powerup2X, powerup2Y, 10, frogX, frogY, 20);

  if (hit1) {
    powerupOn = true;
    powerup1X = 0;
    powerup1Y = 0;
    step += 10;
  }

  if (hit2) {
    powerupOn = true;
    //Unfinished powerup 2
  }
  if (powerupOn) {
    powerupTime();
  }
}

//Timer countdown for activated powerup
function powerupTime() {
  powerupTimer--;
  textSize(20);
  fill(0, 80, 80);
  
  text(`Powerup Timer: ${powerupTimer}`, width / 2, 25);
  
  if (powerupTimer <= 0) {
    powerupOn = false;
    step = 10;
  }
}

//if powerup is not collected in time, it respawns
function timedOut() {
  count1++;
  count2++;

  if (count1 >= 80) {
    powerup1X = random(width);
    powerup1Y = random(height);
    count1 = 0;
  }

  if (count2 >= 50) {
    powerup2X = random(width);
    powerup2Y = random(height);
    count2 = 0;
  }
}
