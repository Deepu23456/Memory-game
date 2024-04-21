const cards = document.querySelectorAll('.memory-card');
const game = document.querySelector('.memory-game')
const moves = document.querySelector('.move')
const movesCard = document.querySelector('.moveCard')
const button = document.querySelector('button')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let totalMoves = 25;

const mainAudio = new Audio()
mainAudio.src = "./audio/melodyloops-preview-the-christmas-holiday-2m30s.mp3"
const clickAudio = new Audio()
clickAudio.src = "./audio/beep-22.mp3"
const removeAudio = new Audio()
removeAudio.src = "./audio/button-3.mp3"

function flipCard() {
    mainAudio.play()
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
        
    }

    secondCard = this;
    
    checkForMatch();
}

function checkForMatch() {
    if(totalMoves >= 0){
        totalMoves--
        moves.textContent = totalMoves
        if(totalMoves === 0 ){
            movesCard.style.display = 'block'
            button.addEventListener('click', () => {
                window.location.reload()
            })
        }
    }



    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        removeAudio.play()
        resetBoard();
    }, 800);
    
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 2);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// if(game === null || game === '') {
//     window.location.reload()
// }
