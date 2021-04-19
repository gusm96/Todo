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
  // getMonth() 는 0 부터 11까지 return 하기때문에 1월부터 나오도록 하려면 + 1 을 해주어야한다.
  const date = now.getDate();
  const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = WEEKDAY[now.getDay()];
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  // `${hours < 10 ? `0${hours}` : hours}` Hours의 값이 10 보다 작을 때 ex) 06:50 로 표현되도록 하는 방법이다.
  // 여기서 ? 는 if 와 같은 뜻이다.
  // return => ex) 06:50
  days.innerText = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }-${day}`;
  // return => ex) 2021-04-16-Fri
}

function init() {
  getNowDate();
  setInterval(getNowDate, 1000);
  // setInterval(Fn, 시간간격)  여기서 시간간격은 millseconds 기준임.
}
init();
