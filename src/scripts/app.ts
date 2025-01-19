interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

// Define variables in a block scope to avoid redeclaration issues
(() => {
  const cards: Card[] = [];
  const cardValues = ["♥️A", "♠️K", "♦️10", "♥️A", "♠️K", "♦️10"];
  let attemptsLeft = 3;
  let flippedCards: Card[] = [];

  function initializeGame(): void {
    const cardGrid = document.getElementById("card-grid");
    if (!cardGrid) return;

    cardGrid.innerHTML = "";

    // Clear the cards array and shuffle card values
    cards.length = 0;
    const shuffledValues = cardValues.sort(() => Math.random() - 0.5);
    shuffledValues.forEach((value, index) => {
      cards.push({ id: index, value, isFlipped: false });
    });

    // Create card elements
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.id = card.id.toString();
      cardElement.textContent = "❓"; // Face-down card
      cardElement.addEventListener("click", () => handleCardClick(card));
      cardGrid.appendChild(cardElement);
    });

    // Reset attempts
    attemptsLeft = 3;
    const attemptsElement = document.getElementById("attempts");
    if (attemptsElement) {
      attemptsElement.textContent = attemptsLeft.toString();
    }
  }

  function handleCardClick(card: Card): void {
    if (flippedCards.length === 2 || card.isFlipped) return;

    // Flip card
    card.isFlipped = true;
    flippedCards.push(card);

    const cardElement = document.querySelector(`[data-id='${card.id}']`);
    if (cardElement) {
      cardElement.textContent = card.value;
    }

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch(): void {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.value === secondCard.value) {
      flippedCards = [];
      if (cards.every((card) => card.isFlipped)) {
        setTimeout(() => alert("You won!"), 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach((card) => {
          card.isFlipped = false;
          const cardElement = document.querySelector(`[data-id='${card.id}']`);
          if (cardElement) {
            cardElement.textContent = "❓";
          }
        });
        flippedCards = [];
        attemptsLeft--;
        const attemptsElement = document.getElementById("attempts");
        if (attemptsElement) {
          attemptsElement.textContent = attemptsLeft.toString();
        }

        if (attemptsLeft === 0) {
          setTimeout(() => {
            alert("Game Over! Try Again.");
            initializeGame();
          }, 500);
        }
      }, 1000);
    }
  }

  const restartButton = document.getElementById("restart");
  if (restartButton) {
    restartButton.addEventListener("click", initializeGame);
  }

  // Initialize the game on page load
  initializeGame();
})();
