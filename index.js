const clock = document.querySelector(".clock");
const days = document.querySelector(".days");

function getNowDate() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const year = now.getFullYear();
  const month = ("0" + (1 + now.getMonth())).slice(-2);
  const date = ("0" + now.getDate()).slice(-2);
  const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = WEEKDAY[now.getDay()];
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  days.innerText = `${year}-${month}-${date}-${day}`;
}

function init() {
  getNowDate();
  setInterval(getNowDate, 1000);
}
init();
