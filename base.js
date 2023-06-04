const board = document.querySelector(".board");

let startBoard = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "pawn",
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook",
];

const spawn = () => {
  startBoard.forEach((element, id) => {
    const cards = document.createElement("div");
    cards.classList.add("card");
    cards.textContent = element;
    cards.setAttribute("squerID", id);
    board.appendChild(cards);
    const row = Math.floor((63 - id) / 8) + 1;

    if (row % 2 == 0) {
      cards.classList.add(id % 2 == 0 ? "czarne" : "biale");
    } else {
      cards.classList.add(id % 2 === 0 ? "biale" : "czarne");
    }
  });
};
spawn();
console.log(startBoard[7]);
