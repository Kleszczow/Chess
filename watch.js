const pleyerWhite = document.querySelector("#pleyerWhite");
const time = document.querySelector("#time");
const pleyerWhiteTime = document.querySelector("#pleyerWhiteTime");

const stopWatch = () => {
  getTime();
};

const getTime = () => {
  let minutes;
  let second;
  let timeString = time.textContent.split("");
  timeString = timeString.filter((dots) => dots !== ":");

  if (timeString.length === 3) {
    minuts = timeString[0];
    second = timeString.slice(-2).join("");

    let allMinuts = minuts - 1;
    let intervlMinuts = Number(minuts) * 60;
    let allTime = 5;

    let interval = setInterval(() => {
      allTime--;

      time.textContent = `${allMinuts}:${allTime.toString().padStart(2, "0")}`;
      console.log(allTime.toString().padStart(2, "0"), "alltime");
      if (allMinuts === 0 && allTime === 0) {
        console.log("koniec czasu!!!!!!!");
        clearInterval(interval);
      } else if (allTime === 0) {
        allTime = 15;
        allMinuts--;
        console.log(allMinuts, "allminuts");
      }
    }, 1000);
  }

  if (timeString.length === 4) {
    minutes = timeString.slice(0, 2).join("");
    seconds = timeString.slice(2).join("");
    console.log(second);
  }
};

pleyerWhiteTime.addEventListener("click", stopWatch);
