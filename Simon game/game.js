
//I create the array with the colors of the buttons
var buttonColours = ["red", "blue", "green","yellow"]; 

//I create the array with the color path of the game
var gamePattern = [];

//I create the array of the path chose by the user by clicking
var userClickedPattern = [];

//button click event listener
$(".btn").click(function(){

    //I store in a var the id of the button clicked
    var userChosenColour = $(this).attr("id");

    //I put the button's id in the array with the path chose by the user
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    //console.log(userClickedPattern);

});


function nextSequence(){

    //I create a random number from 0 to 3
    var randomNumber = Math.floor(Math.random()*4);

    //I take the element in the random number position from the array button colors
    var randomChosenColour =  buttonColours[randomNumber];

    //I put in the game path array the color chosen by random number
    gamePattern.push(randomChosenColour);

    //Flash effect
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


//Reusable playsound function
function playSound(name){

        //Audio activation based on the color
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();

}


function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(() => {
        
        $("#"+currentColour).removeClass("pressed");

    }, 100);

}

nextSequence();
