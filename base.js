const board = document.querySelector(".board");
const pleyer = document.querySelector("#pleyer");
const pleyerWhite = document.querySelector("#pleyerWhite");
const time = document.querySelector("#time");

const whiteTime = document.querySelector("#whiteTime");
const blackTime = document.querySelector("#blackTime");

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
  const takenByOponent = e.target.firstChild?.classList.contains(curentMove);
  const valid = checkValid(e.target);

  if (!corectMove) {
    if (takenByOponent && valid) {
      e.target.parentNode.append(dragElement);
      e.target.remove();
      changeColorMove();
      checkWin();
      startWatch();

      return;
    }
    if (taken && takenByOponent) {
      return;
    }
    if (valid) {
      e.target.append(dragElement);
      changeColorMove();
      checkWin();
      startWatch();
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
  // console.log(targetId);
  // console.log(startId);
  // console.log(piece);
  const startTarget = dragElement.firstChild.classList.contains(
    "black" || "white"
  );
  const target = targeting.firstChild?.classList.contains("black" || "white");
  if (startTarget == target) {
    // vconsole.log("the same color!");
    console.log(target, "targeting", startTarget, "start target");
    return;
  }

  const width = 8;

  switch (piece) {
    case "pawn":
      const startRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (startRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[squerid="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild)
      ) {
        if (
          startId + width === targetId &&
          document.querySelector(`[squerId="${startId + width}"]`).firstChild
        ) {
          console.log("tonieto");
          return;
        } else {
          return true;
        }
      }
      break;
    case "knight":
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width + 2 === targetId ||
        startId + width - 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width + 2 === targetId ||
        startId - width - 2 === targetId
      ) {
        return true;
      }
      break;
    case "bishop":
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 6 + 6}"]`)
            .firstChild) ||
        //first duration

        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 6 - 6}"]`)
            .firstChild) ||
        //second duration

        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 6 + 6}"]`)
            .firstChild) ||
        //three duration

        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 6 - 6}"]`)
            .firstChild)
      ) {
        return true;

        //do poprawy skos pierwszego wlwmntu
      }
      break;
    case "rook":
      if (
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 6}"]`)
            .firstChild) ||
        //secound

        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4}"]`)
            .firstChild) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5}"]`)
            .firstChild) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 6}"]`)
            .firstChild) ||
        // third
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 4}"]`).firstChild) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 5}"]`).firstChild) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 5}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 6}"]`).firstChild) ||
        // four
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 4}"]`).firstChild) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 5}"]`).firstChild) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 5}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 6}"]`).firstChild)
      ) {
        return true;
      }
      break;
    case "king":
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width + 1 === targetId ||
        startId - width + 1 === targetId ||
        startId + width - 1 === targetId ||
        startId - width - 1 === targetId
      ) {
        return true;
      }
      break;
    case "queen":
      if (
        // queen like rook
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[squerId="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 6}"]`)
            .firstChild) ||
        //secound

        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4}"]`)
            .firstChild) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5}"]`)
            .firstChild) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[squerId="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 6}"]`)
            .firstChild) ||
        // third
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 4}"]`).firstChild) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 5}"]`).firstChild) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[squerId="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 5}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId + 6}"]`).firstChild) ||
        // four
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 4}"]`).firstChild) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 5}"]`).firstChild) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[squerId="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 5}"]`).firstChild &&
          !document.querySelector(`[squerId="${startId - 6}"]`).firstChild) ||
        //queen like bishop

        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[squerId="${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 6 + 6}"]`)
            .firstChild) ||
        //first duration

        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[squerId="${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 6 - 6}"]`)
            .firstChild) ||
        //second duration

        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[squerId="${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId - width * 6 + 6}"]`)
            .firstChild) ||
        //three duration

        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[squerId="${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[squerId="${startId + width * 6 - 6}"]`)
            .firstChild)
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

const checkWin = () => {
  const kings = Array.from(document.querySelectorAll("#king"));
  if (!kings.some((king) => king.firstChild.classList.contains("black"))) {
    pleyer.textContent = "black wins!";
    blockCards();
  }
  if (!kings.some((king) => king.firstChild.classList.contains("white"))) {
    pleyer.textContent = "white wins!";
    blockCards();
  }
};

const blockCards = () => {
  boardSqueres.forEach((element) => (element.style.pointerEvents = "none"));
};

let whiteInterval;
let blackInterval;
let whiteIsRunning = false;
let blackIsRunning = false;
let whiteFirstRun = true;
let blackFirstRun = true;
let whitePlay = true;
let blackPlay = false;
let whiteFirstClick = true;
let blackFirstClick = true;

const startWhiteWatch = () => {
  if (!whiteIsRunning) {
    whiteIsRunning = true;
    whiteGetTime();
  }
};

const startBlackWatch = () => {
  if (!blackIsRunning) {
    blackIsRunning = true;
    blackGetTime();
  }
};

const whiteGetTime = () => {
  let minutes;
  let seconds;
  whiteTime.style.color = "red";
  blackTime.style.color = "white";
  let timeString = whiteTime.textContent.split("");
  timeString = timeString.filter((dots) => dots !== ":");

  if (timeString.length === 3 || timeString.length === 4) {
    minutes = timeString[0];
    seconds = timeString.slice(-2).join("");

    let allMinutes;
    if (whiteFirstRun) {
      allMinutes = minutes - 1;
      whiteFirstRun = false;
    } else {
      allMinutes = minutes;
    }
    if (seconds === "00") {
      seconds = 60;
    }
    let allTime = seconds;

    whiteInterval = setInterval(() => {
      allTime--;

      whiteTime.textContent = `${allMinutes}:${allTime
        .toString()
        .padStart(2, "0")}`;

      if (allMinutes === 0 && allTime === 0) {
        console.log("Koniec czasu dla gracza białego!");
        clearInterval(whiteInterval);
        whiteIsRunning = false;
      } else if (allTime === 0) {
        allTime = 60;
        allMinutes--;
      }
    }, 1000);
  }
};
const blackGetTime = () => {
  let minutes;
  let seconds;
  blackTime.style.color = "red";
  whiteTime.style.color = "white";
  let timeString = blackTime.textContent.split("");
  timeString = timeString.filter((dots) => dots !== ":");

  if (timeString.length === 3 || timeString.length === 4) {
    minutes = timeString[0];
    seconds = timeString.slice(-2).join("");
    let allMinutes;
    if (blackFirstRun) {
      allMinutes = minutes - 1;
      blackFirstRun = false;
    } else {
      allMinutes = minutes;
    }
    if (seconds === "00") {
      seconds = 60;
    }
    let allTime = seconds;

    blackInterval = setInterval(() => {
      allTime--;

      blackTime.textContent = `${allMinutes}:${allTime
        .toString()
        .padStart(2, "0")}`;

      if (allMinutes === 0 && allTime === 0) {
        console.log("Koniec czasu dla gracza czarnego!");
        clearInterval(blackInterval);
        blackIsRunning = false;
      } else if (allTime === 0) {
        allTime = 60;
        allMinutes--;
      }
    }, 1000);
  }
};

const stopWhiteTimer = () => {
  clearInterval(whiteInterval);
  whiteIsRunning = false;
};

const stopBlackTimer = () => {
  clearInterval(blackInterval);
  blackIsRunning = false;
};

const switchPlayer = (isWhitePlayer) => {
  if (isWhitePlayer && !whiteIsRunning) {
    startWhiteWatch();
    stopBlackTimer();
    whitePlay = true;
    blackPlay = false;
  } else if (!isWhitePlayer && !blackIsRunning) {
    startBlackWatch();
    stopWhiteTimer();
    whitePlay = false;
    blackPlay = true;
  }
};

let currentPlayer = "white";

const startWatch = () => {
  if (currentPlayer === "white") {
    switchPlayer(true);
    currentPlayer = "black";
  } else {
    switchPlayer(false);
    currentPlayer = "white";
  }
};
