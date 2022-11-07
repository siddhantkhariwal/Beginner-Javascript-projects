var gamePattern = [];
var buttonColors = ["red","blue","yellow","green"];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
})

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random()*3)+1;
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}



$(".btn").click(function(){
var userChosenColor = $(this).attr('id');
userClickedPattern.push(userChosenColor);
animatePress(userChosenColor);
playSound(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});



function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}



function animatePress(currentColor){
$("#" + currentColor).addClass("pressed");
setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("succes");
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    console.log("mehhhh");
    startOver();
}
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}