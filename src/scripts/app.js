// Selectors
const cardGrid = document.getElementById("card-grid");
const restartButton = document.getElementById("restart");
const attemptsLeft = document.getElementById("attempts");

// Game Variables
let cardValues = ["♥️A", "♠️K", "♦️10", "♥️A", "♠️K", "♦️10"];
let attempts = 3;
let flippedCards = [];
let matchedCards = [];

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize Game
function initializeGame() {
  // Reset variables
  attempts = 3;
  flippedCards = [];
  matchedCards = [];
  attemptsLeft.innerText = attempts;

  // Clear and shuffle cards
  cardGrid.innerHTML = "";
  const shuffledCards = shuffle([...cardValues]);

  // Generate card elements
  shuffledCards.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-face", "card-front");
    cardFront.innerText = "?";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-face", "card-back");
    cardBack.innerText = value;

    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardGrid.appendChild(card);

    // Add click event for flipping
    card.addEventListener("click", () => handleCardClick(card, value));
  });

  // Add flip functionality to all cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });
}

// Handle Card Click
function handleCardClick(card, value) {
  if (flippedCards.includes(card) || matchedCards.includes(card)) {
    return;
  }

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;

    // Check for a match
    if (
      firstCard.querySelector(".card-back").innerText ===
      secondCard.querySelector(".card-back").innerText
    ) {
      matchedCards.push(firstCard, secondCard);
      flippedCards = [];

      // Check if all cards are matched
      if (matchedCards.length === cardValues.length) {
        alert("You won! All pairs matched!");
        initializeGame();
      }
    } else {
      // No match
      attempts--;
      attemptsLeft.innerText = attempts;

      setTimeout(() => {
        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");
        flippedCards = [];
      }, 1000);

      // Check if attempts are over
      if (attempts === 0) {
        alert("Game Over! Try again.");
        initializeGame();
      }
    }
  }
}

// Restart Game
restartButton.addEventListener("click", initializeGame);

// Initialize game on page load
initializeGame();
