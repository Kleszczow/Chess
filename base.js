const board = document.querySelector(".board");
const pleyer = document.querySelector("#pleyer");

let startBoard = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
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
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];
let curentMove = "white";

const spawn = () => {
  startBoard.forEach((element, i) => {
    const cards = document.createElement("div");
    cards.classList.add("card");
    cards.innerHTML = element;
    cards.setAttribute("squerId", i);
    board.appendChild(cards);
    const row = Math.floor((63 - i) / 8) + 1;

    cards.firstChild?.setAttribute("draggable", true);

    //set color of board

    if (row % 2 == 0) {
      cards.classList.add(i % 2 == 0 ? "darkCards" : "whiteCards");
    } else {
      cards.classList.add(i % 2 === 0 ? "whiteCards" : "darkCards");
    }

    //set color of piece

    if (i <= 15) {
      cards.firstChild.firstChild.classList.add("black");
    }
    if (i >= 48) {
      cards.firstChild.firstChild.classList.add("white");
    }
  });

  pleyer.textContent = "white";
};
spawn();

let dragElement;
let startPosition;

const boardSqueres = document.querySelectorAll(".card");

const dragStart = (e) => {
  startPosition = e.target.parentNode.getAttribute("squerId");
  dragElement = e.target;
};
const dragOver = (e) => {
  e.preventDefault();
};
const dragDrop = (e) => {
  e.stopPropagation();
  const corectMove = dragElement.firstChild.classList.contains(curentMove);
  const taken = e.target.classList.contains("piece");
  const oponentMove = curentMove == "white" ? "black" : "white";
  const takenByOponent = e.target.firstChild?.classList.contains(curentMove);
  const valid = checkValid(e.target);

  if (!corectMove) {
    //  console.log(curentMove, "curentMove");
    //console.log(oponentMove, "oponentMove");
    //    console.log(takenByOponent, "takenbyOpomet");
    if (takenByOponent && valid) {
      console.log("first");
      e.target.parentNode.append(dragElement);
      e.target.remove();

      changeColorMove();
      return;
    }
    if (taken && takenByOponent) {
      console.log("secound");
      return;
    }
    if (valid) {
      console.log("third");
      e.target.append(dragElement);
      changeColorMove();
      return;
    }
  } else {
    pleyer.textContent = "incorect move";
    setTimeout(() => {
      pleyer.textContent = curentMove;
    }, 2000);
  }
};

const checkValid = (targeting) => {
  const targetId =
    Number(targeting.getAttribute("squerId")) ||
    Number(targeting.parentNode.getAttribute("squerId"));
  const startId = Number(startPosition);
  const piece = dragElement.id;
  console.log(targetId);
  console.log(startId);
  //  console.log(piece);

  switch (piece) {
    case "pawn":
      const startRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (startRow.includes(startId) && startId + 8 * 2 === targetId) ||
        startId + 8 === targetId ||
        (startId + 7 === targetId &&
          document.querySelector(`[squerid="${startId + 7}"]`).firstChild) ||
        (startId + 9 === targetId &&
          document.querySelector(`[squerId="${startId + 9}"]`).firstChild)
      ) {
        if (
          startId + 8 === targetId &&
          document.querySelector(`[squerId="${startId + 8}"]`).firstChild
        ) {
          console.log("tonieto");
          return;
        } else {
          return true;
        }
        break;
      }
    case "knight":
      if (
        startId + 8 * 2 + 1 === targetId ||
        startId + 8 * 2 - 1 === targetId ||
        startId + 8 + 2 === targetId ||
        startId + 8 - 2 === targetId ||
        startId - 8 * 2 + 1 === targetId ||
        startId - 8 * 2 - 1 === targetId ||
        startId - 8 + 2 === targetId ||
        startId - 8 - 2 === targetId
      ) {
        return true;
      }
      break;
  }
};

boardSqueres.forEach((squer) => {
  squer.addEventListener("dragstart", dragStart);
  squer.addEventListener("dragover", dragOver);
  squer.addEventListener("drop", dragDrop);
});

const changeColorMove = () => {
  if (curentMove === "white") {
    curentMove = "black";
    changeDirection();
    pleyer.textContent = curentMove;
  } else {
    curentMove = "white";
    backDirection();
    pleyer.textContent = curentMove;
  }
};

const changeDirection = () => {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((element, i) => {
    element.setAttribute("squerId", 63 - i);
  });
};
const backDirection = () => {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((element, i) => {
    element.setAttribute("squerId", i);
  });
};
