interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

const cards: Card[] = [];
const cardValues = ["♥️A", "♠️K", "♦️10", "♥️A", "♠️K", "♦️10"];
let attemptsLeft = 3;
let flippedCards: Card[] = [];

function initializeGame() {
  const cardGrid = document.getElementById("card-grid") as HTMLElement;
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
    cardElement.innerText = "❓"; // Face-down card
    cardElement.addEventListener("click", () => handleCardClick(card));
    cardGrid.appendChild(cardElement);
  });

  // Reset attempts
  attemptsLeft = 3;
  (document.getElementById("attempts") as HTMLElement).innerText =
    attemptsLeft.toString();
}

function handleCardClick(card: Card) {
  if (flippedCards.length === 2 || card.isFlipped) return;

  // Flip card
  card.isFlipped = true;
  flippedCards.push(card);

  const cardElement = document.querySelector(
    `[data-id='${card.id}']`
  ) as HTMLElement;
  cardElement.innerText = card.value;

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
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
        const cardElement = document.querySelector(
          `[data-id='${card.id}']`
        ) as HTMLElement;
        cardElement.innerText = "❓";
      });
      flippedCards = [];
      attemptsLeft--;
      (document.getElementById("attempts") as HTMLElement).innerText =
        attemptsLeft.toString();

      if (attemptsLeft === 0) {
        setTimeout(() => {
          alert("Game Over! Try Again.");
          initializeGame();
        }, 500);
      }
    }, 1000);
  }
}

document.getElementById("restart")!.addEventListener("click", initializeGame);

// Initialize the game on page load
initializeGame();
