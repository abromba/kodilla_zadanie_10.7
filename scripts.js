// start button
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

//player's choice
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {
    playerPick('kamień')
});
pickPaper.addEventListener('click', function() {
    playerPick('papier')
});
pickScissors.addEventListener('click', function() {
    playerPick('nożyce')
});

//start values
var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

//game elements
var newGameBtn = document.getElementById('js-newGameButton');
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}
setGameElements();

//Game start
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

// new game, restart
function newGame() {
    player.name = prompt('Wpisz swoje imię', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

// comp's choice
function getComputerPick() {
    var x = Math.random();
    var possiblePicks = ['kamień', 'papier', 'nożyce'];
    return possiblePicks[Math.floor(x * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//Game logic
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    var winnerIs = 'player';
    if (playerPick == computerPick) {
        winnerIs = 'noone';
        playerResultElem.innerHTML = "Remis!";
        computerResultElem.innerHTML = "Remis!";
    } else if (
        (computerPick == 'kamień' && playerPick == 'nożyce') ||
        (computerPick == 'nożyce' && playerPick == 'papier') ||
        (computerPick == 'papier' && playerPick == 'kamień')) {
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }
    setGamePoints();
    checkGameWinner();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

//result update
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner() {
    var winnerIs = player.score === 5 ? player.name : "komputer";
    if ((player.score == 5) || (computer.score == 5)) {
        alert('Koniec gry. 5 punktów zdobył i tym samym wygrał rundę: ' + winnerIs);
        gameState = 'ended';
        setGameElements();
    }
};