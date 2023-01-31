var colours = ["green", "red", "yellow", "blue"];
var gameChoice = [];
var userChoice = [];
var started = false;
var level = 0;


$(document).keydown(function () {

    if (!started) {
        nextSequence();
        started = true;
    }

});

function nextSequence() {

    level++;
    userChoice = [];
    $("#level-title").text("Level "+level);
    console.log("level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = colours[randomNumber];
    gameChoice.push(randomColour);
    console.log(gameChoice);
    
    $("#" + randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}

function animatePress(colour){

    $("#"+colour).addClass("pressed");
    setTimeout(() => {
        $("#"+colour).removeClass("pressed");
    }, 100);

}

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userChoice.push(userChosenColour);
    console.log(userChoice);
    animatePress(userChosenColour);
    check(userChoice.length-1);

})

function check(colour){

    if(userChoice[colour]===gameChoice[colour]){
        console.log("success");
        if (userChoice.length === gameChoice.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
    }

}


