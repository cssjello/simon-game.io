$(".sirule").click(function () {
  $(".modal").removeClass("hidden");
});

// $(".modal").click(function(){
//     $(".modal").addClass("hidden");
// });

$(".closeRule").click(function () {
  $(".modal").addClass("hidden");
});

function playSound(name) {
  const audio = new Audio("sounds" + name + ".mp3");
  audio.play();
}

$(".sirule").click(function () {
  playSound("clicking");
});

$(".closeRule").click(function () {
  playSound("clicking");
});

// $(".diffBtn").click(function(){
//     playSound("clicking");
// })
// NOT WORKING
