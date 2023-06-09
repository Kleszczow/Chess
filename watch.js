const pleyerWhite = document.querySelector("#pleyerWhite");
const time = document.querySelector("#time");
const pleyerWhiteTime = document.querySelector("#pleyerWhiteTime");
const pleyerBlackTime = document.querySelector("#pleyerBlackTime");

let interval;
let isRunning = false;
let firstRun = true;

const stopWatch = () => {
  if (!isRunning) {
    isRunning = true;
    getTime();
  }
};

const getTime = () => {
  console.log(isRunning);
  let minutes;
  let seconds;

  let timeString = time.textContent.split("");
  timeString = timeString.filter((dots) => dots !== ":");

  if (timeString.length === 3) {
    minutes = timeString[0];
    seconds = timeString.slice(-2).join("");

    let allMinutes;
    if (firstRun) {
      allMinutes = minutes - 1;
      firstRun = false;
    } else {
      allMinutes = minutes;
    }
    if (seconds == "00") {
      seconds = 60;
    }
    let allTime = seconds;

    interval = setInterval(() => {
      allTime--;

      time.textContent = `${allMinutes}:${allTime.toString().padStart(2, "0")}`;
      console.log(allTime.toString().padStart(2, "0"), "alltime");

      if (allMinutes === 0 && allTime === 0) {
        console.log("koniec czasu!!!!!!!");
        clearInterval(interval);
        isRunning = false;
      } else if (allTime === 0) {
        allTime = 60;
        allMinutes--;
        console.log(allMinutes, "allminutes");
      }
    }, 1000);
  }

  if (timeString.length === 4) {
    minutes = timeString.slice(0, 2).join("");
    seconds = timeString.slice(2).join("");
    console.log(seconds);
  }
};

const stopTimer = () => {
  clearInterval(interval);
  isRunning = false; // Zatrzymanie odliczania
};

pleyerWhiteTime.addEventListener("click", stopWatch);
pleyerBlackTime.addEventListener("click", stopTimer);
