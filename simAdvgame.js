const buttonColors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "azure",
];

let level;
level = 0;

highest = 0;

let started = false;

let gamePattern = [];
console.log(buttonColors);

let userClickedPattern = [];

//start the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    $(".btn").css("cursor", "pointer");
    $(".startbtn").css("display", "none");
  }
});

$(".startbtn").click(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    $(".btn").css("cursor", "pointer");
    $(".startbtn").css("display", "none");
  }
});

//game logic
$(".btn").click(function () {
  if (started) {
    const userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    animationPress(userChosenColor);
    // console.log(userClickedPattern.length-1);
    // checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern.lastIndexOf(userChosenColor));
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
  }
});

//generate a new sequence (adding a random chosen color)
function nextSequence() {
  //reset user clicker pattern after new sequence starts
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  const randomNumber = Math.floor(Math.random() * 7);
  console.log(randomNumber);
  const randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  console.log(gamePattern.lastIndexOf(randomChosenColor));

  if (
    randomChosenColor === "purple" ||
    randomChosenColor === "orange" ||
    randomChosenColor === "azure"
  ) {
    $("." + randomChosenColor).addClass("brightLarge--smaller");
  } else {
    $("." + randomChosenColor).addClass("brightLarge");
  }
  setTimeout(function () {
    $("." + randomChosenColor).removeClass("brightLarge");
    $("." + randomChosenColor).removeClass("brightLarge--smaller");
  }, 500);

  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animationPress(currentColor) {
  if (
    currentColor === "purple" ||
    currentColor === "orange" ||
    currentColor === "azure"
  ) {
    $("#" + currentColor).addClass("pressed--smaller");
  } else {
    $("#" + currentColor).addClass("pressed");
  }

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed--smaller");
    $("#" + currentColor).removeClass("pressed");
  }, 400);
}

function checkAnswer(lastColor) {
  if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      console.log(userClickedPattern.length, gamePattern.length);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log(userClickedPattern[lastColor], gamePattern[lastColor]);
    console.log("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    playSound("wrong");
    setTimeout(function () {
      $(".modal").removeClass("hidden");
    }, 1000);
    $("#level-title").text("GAME OVER");
    if (level - 1 > highest) {
      highest = level - 1;
      $(".newHigh").removeClass("hidden");
      $(".totalLv").text(level - 1);
      $(".highLv").text(highest);
    } else {
      $(".newHigh").addClass("hidden");
      $(".totalLv").text(level - 1);
      $(".highLv").text(highest);
    }
    $(document).keypress(function () {
      retry();
      if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
        $(".btn").css("cursor", "pointer");
        $(".startbtn").css("display", "none");
      }
    });
  }
}

function retry() {
  $(".modal").addClass("hidden");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $("#level-title").text("Press A Key to Start");
  $(".startbtn").css("display", "block");
  $(".btn").css("cursor", "default");
}

$(".retrybtncontainer").click(function () {
  retry();
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    $(".btn").css("cursor", "pointer");
    $(".startbtn").css("display", "none");
  }
});
