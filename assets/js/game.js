// Word bank - Songs featured on DDR Extreme
    var wordBank =      
        [
        "IRRESISTIBLEMENT",
        "TEARS",
        "SENORITA",
        "BAG",
        "MEMORIES",
        "COLORS",
        "TWINBEE",
        "XENON",
        "CRASH",
        "AIR",
        "JANEJANA",
        "KISSKISSKISS",
        "DAIKENKAI",
        "SAKURA",
        ];

// Starting life count
    const lives = 10;

// Container for letters guessed
    var lettersGuessed = [];

// Index of the current song in array
    var songIndex;

// Random word from word bank
    var randomSong = [];

// Lives remaining      
    var livesRemaining = 0;

// Score counter
    var score = 0;

// Boolean for 'press any key to try again' 
    var hasFinished = false;            

// Sounds + Music
    var menu = new Audio('./assets/sounds/menu.ogg');
    var guessSound = new Audio('./assets/sounds/guess.ogg');
    var winMusic = new Audio('./assets/sounds/win.ogg');
    var lossSound = new Audio('./assets/sounds/lose.mp3');

// Reset game to default 
    function resetGame() { // resetGame function start

// Pause win music
    winMusic.pause();

// Reset lives to 10
    livesRemaining = lives;

// Round the random number down to the nearest integer
    songIndex = Math.floor(Math.random() * (wordBank.length));

// Clear out arrays
    lettersGuessed = [];
    randomSong = [];

// Clear combo counter
    document.getElementById("combo").src = "";

// Reset word bank display by changing letters into underscores
    for (var i = 0; i < wordBank[songIndex].length; i++) {
        randomSong.push("_");
    }   

// Hide end game images and text
    document.getElementById("anyKey").style.cssText= "display: none";
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("victory").style.cssText = "display: none";

// clear scoreboard except wins if playing again
    updateScore();

    console.log("Game has been reset");

    }; // resetGame function end

//  Updates the score in column 1
    function updateScore() { // updateScore function start

// Update score on HTML document
    document.getElementById("score").innerText = score;

// Current word box, adds letters together as strings
    var randomSongText = "";

    for (var i = 0; i < randomSong.length; i++) {
        randomSongText += randomSong[i];
    } 

// Record inputs in HTML document
    document.getElementById("currentSong").innerText = randomSongText;
    document.getElementById("livesRemaining").innerText = livesRemaining;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    };


// Paths image to HTML document, image filenames are single numbers, uses math to dynamically change image url 
    function updatecombo() {
        document.getElementById("combo").src = "assets/images/" + (lives - livesRemaining) + ".png";

        console.log("Score has been updated");

    }; // updateScore function end

// Finds all instances of letter in the string and replaces them in the current song
    function checkLetter(letter) { // checkLetter function start

// Array to store position of letters in string
    var position = [];

// If letter matches, store the match and place it into the current word
    for (var i = 0; i < wordBank[songIndex].length; i++) {
        if(wordBank[songIndex][i] === letter) {
            position.push(i);
        }
    }

// If letter does not match, store the letter, subtact 1 life point and update combo counter
    if (position.length <= 0) {
        livesRemaining--;
        updatecombo();

    } else {

    //  Replace the '_' with a letter upon match.
    for (var i = 0; i < position.length; i++) {
            randomSong[position[i]] = letter;
            }
        }

        console.log("Letter check complete");
        console.log(i);
    }; // checkLetter function end


// Checks for a win by seeing if there are any remaining underscores in the randomSong we are building.

    function checkWin() { // checkWin function start

        //When all underscores are replaced with letters, game ends
        if(randomSong.indexOf("_") === -1) {
            score++;
            winMusic.play();
            document.getElementById("victory").style.cssText = "display: block";
            document.getElementById("anyKey").style.cssText= "display: block";
            document.getElementById("combo").style.cssText = "display :none";
            hasFinished = true;
        }

        console.log("Check for win complete");
    }; // checkWin function end


// Checks for a loss
function checkLoss() {  // checkLoss function start

    if(livesRemaining <= 0) {
        lossSound.play();
        hasFinished = true;
        document.getElementById("gameover").style.cssText = "display: block";
        document.getElementById("anyKey").style.cssText = "display: block";
        document.getElementById("combo").style.cssText = "display :none";
    }

    console.log("Check for loss complete");

} //checkLoss function end

// Check for lives and letter guess
    function guessLetter(letter) { // guessLetter function start

        if (livesRemaining > 0) {

        // Check for repeat guesses
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            checkLetter(letter);
            }
        }
    
        console.log("Lives is more than 0");
        console.log("Check for repeat letters complete");

    }; //guessLetter function end


// Upon keypress, check for user input and execution event function
    document.onkeydown = function(event) { // onkeydown function start

        // If user finished a game, press any key to restart game and reverse boolean
            if(hasFinished) {
            resetGame();
            hasFinished = false;

            } else {
        
        // Check for user input a-z and convert to uppercase
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                guessSound.play();
                guessLetter(event.key.toUpperCase());
                updateScore();
                checkWin();
                checkLoss();
            }
        }
    }; // onkeydown function end