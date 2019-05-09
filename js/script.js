const cards = document.querySelectorAll(".biathlon-sibling-card");


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsFlipped = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();

  // checks if cards match
  function checkForMatch () {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
      disableCards();
      cardsFlipped += 2;
      console.log(cardsFlipped);
    } else {
       unflipCards();
     }
  }

  // disables cards after match
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  // unflip cards if they don't match
  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockBoard = false;
    resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // if all cards are match, shows congrats pop-up and photo with info about the biathletes
  if (cardsFlipped === 16) {
    setTimeout(function() {
      document.getElementById('biathletes-info').style.visibility = 'visible';
      alert("Well done! After you close this pop-up window, you'll see few details about the biathletes siblings.");
    }, 1000);
  }
};


function closeBiathletesInfo() {
  document.getElementById('biathletes-info').style.visibility = 'hidden';
  lockBoard = false;
  resetGame();
}


function resetGame() {
  cards.forEach(card => {
    card.classList.toggle('flip');
    card.addEventListener('click', flipCard);
    cardsFlipped = 0;
})};


// shuffles the cards position on the board
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
