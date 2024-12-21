// This was hard as hell

const arrayColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickPattern = [];

var level = 0;

var gameStarts = false

// Starts the game and never active the key press down.
$(document).on("keydown", function(){
    
    if (gameStarts === false){
        $("h1").text("Level " + level);
        nextSequence();
        gameStarts = true
    }
})

// This will trigger each sequence for the sequence to follow
const nextSequence = () => {
    
    userClickPattern = [];
    level++;
    
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = arrayColors[randomNumber];

    gamePattern.push(randomColor);

    animatePress(randomColor);
    playSound(randomColor);
    console.log(gamePattern);
    
}

// This is triggered when the player presses the button
$(".btn").on("click", function(){

    var userColor = this.id;
    userClickPattern.push(userColor);
    console.log(userClickPattern);

    playSound(userColor);

    animatePress(userColor);

    checkAnswer(userClickPattern.length - 1);
})

// This function plays the sound of the button

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    return audio.play();
}

// This function animates the button
function animatePress(currentColor){
    $("." + currentColor).addClass("pressed")
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(byLevel){
    if (gamePattern[byLevel] === userClickPattern[byLevel]){
         console.log("winning")

        if(gamePattern.length === userClickPattern.length)
            setTimeout( () => {
                nextSequence()
            }, 1000);
        
    } else {
        var playerLost = "wrong"
        $("body").addClass("game-over")
        playSound(playerLost)
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game over, Press Any Key to Restart")
        restartGame()
        
    }
}

function restartGame() {
    level = 0;
    gamePattern = [];
    gameStarts = false;
}
