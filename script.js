const btnReset = document.querySelector('.js-reset-score-button');
const btnAutoPlay = document.querySelector('.js-auto-play-button');
const btnRock = document.querySelector('.js-rock-button');
const btnPaper = document.querySelector('.js-paper-button');
const btnScissors = document.querySelector('.js-scissors-button');
const gameResult = document.querySelector('.js-result');
const gameMove = document.querySelector('.js-moves');
const gameScore = document.querySelector('.js-score');

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

btnRock.addEventListener('click', () => {
    playGame('rock');
});

btnPaper.addEventListener('click', () => {
    playGame('paper');
});

btnScissors.addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

btnReset.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});

btnAutoPlay.addEventListener('click', () => {
    autoPlay();
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        } else {
            result = 'Tie.';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    gameResult.innerHTML = result;

    gameMove.innerHTML = `You
        <img src="${playerMove}-emoji.png" class="move-icon">
        <img src="${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function updateScoreElement() {
    gameScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}
