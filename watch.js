const pleyerWhite = document.querySelector("#pleyerWhite");
const time = document.querySelector("#time");
const pleyerWhiteTime = document.querySelector("#pleyerWhiteTime");
const pleyerBlackTime = document.querySelector("#pleyerBlackTime");
const whiteTime = document.querySelector("#whiteTime");
const blackTime = document.querySelector("#blackTime");

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

pleyerWhiteTime.addEventListener("click", () => switchPlayer(true));
pleyerBlackTime.addEventListener("click", () => switchPlayer(false));
