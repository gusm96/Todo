// Clock Form
const clock = document.querySelector(".clock");
const days = document.querySelector(".days");

// Clock Function
function getNowDate() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = WEEKDAY[now.getDay()];
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  days.innerText = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }-${day}`;
}

function init() {
  getNowDate();
  setInterval(getNowDate, 1000);
}
init();
