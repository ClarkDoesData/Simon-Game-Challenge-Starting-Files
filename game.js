var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

var started = false;
var gamePattern = [];
var userClickedPattern = [];
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  showLevel();
  level++;
}

function animatePress(color) {
  const element = document.getElementById(color);

  element.style.opacity = 0; 
  element.style.transition = "opacity 0.1s"; 

  
  setTimeout(() => {
    element.style.opacity = 1; // Fade in
    setTimeout(() => {
      element.style.opacity = 0; // Fade out
      setTimeout(() => {
        element.style.opacity = 1; // Fade in again
      }, 100);
    }, 100);
  }, 0);
}

function playSound(randomChosenColour) {
  var sound = new Audio(`sounds/${randomChosenColour}.mp3`);
  sound.play();
}

function animateClick(currentColour){
  document.getElementById(currentColour).classList.add("pressed");
  setTimeout (function () {
    document.getElementById(currentColour).classList.remove("pressed");
  }, 100);
}

for (var i = 0; i < document.getElementsByClassName("btn").length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateClick(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });
}

 
window.addEventListener("keydown", keyPress);
function keyPress(e){
  if (!started) {
    nextSequence();
    started = true;
  }
}



function showLevel() {
  document.getElementById('level-title').innerHTML = `Level ${level+1}`;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('great');
    if (currentLevel === level-1){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  document.body.classList.add("game-over");
  setTimeout(function (){
    document.body.classList.remove("game-over")
  }, 100);
  document.getElementById('level-title').innerHTML = 'Game Over, Press Any Key to Restart';
  var wrong = new Audio(src='sounds/wrong.mp3');
  wrong.play();
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
