var cards = [];
var cardValues = ["♥️A", "♠️K", "♦️10", "♥️A", "♠️K", "♦️10"];
var attemptsLeft = 3;
var flippedCards = [];
function initializeGame() {
    var cardGrid = document.getElementById("card-grid");
    cardGrid.innerHTML = "";
    // Clear the cards array and shuffle card values
    cards.length = 0;
    var shuffledValues = cardValues.sort(function () { return Math.random() - 0.5; });
    shuffledValues.forEach(function (value, index) {
        cards.push({ id: index, value: value, isFlipped: false });
    });
    // Create card elements
    cards.forEach(function (card) {
        var cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id.toString();
        cardElement.innerText = "❓"; // Face-down card
        cardElement.addEventListener("click", function () { return handleCardClick(card); });
        cardGrid.appendChild(cardElement);
    });
    // Reset attempts
    attemptsLeft = 3;
    document.getElementById("attempts").innerText =
        attemptsLeft.toString();
}
function handleCardClick(card) {
    if (flippedCards.length === 2 || card.isFlipped)
        return;
    // Flip card
    card.isFlipped = true;
    flippedCards.push(card);
    var cardElement = document.querySelector("[data-id='".concat(card.id, "']"));
    cardElement.innerText = card.value;
    if (flippedCards.length === 2) {
        checkMatch();
    }
}
function checkMatch() {
    var firstCard = flippedCards[0], secondCard = flippedCards[1];
    if (firstCard.value === secondCard.value) {
        flippedCards = [];
        if (cards.every(function (card) { return card.isFlipped; })) {
            setTimeout(function () { return alert("You won!"); }, 500);
        }
    }
    else {
        setTimeout(function () {
            flippedCards.forEach(function (card) {
                card.isFlipped = false;
                var cardElement = document.querySelector("[data-id='".concat(card.id, "']"));
                cardElement.innerText = "❓";
            });
            flippedCards = [];
            attemptsLeft--;
            document.getElementById("attempts").innerText =
                attemptsLeft.toString();
            if (attemptsLeft === 0) {
                setTimeout(function () {
                    alert("Game Over! Try Again.");
                    initializeGame();
                }, 500);
            }
        }, 1000);
    }
}
document.getElementById("restart").addEventListener("click", initializeGame);
// Initialize the game on page load
initializeGame();
