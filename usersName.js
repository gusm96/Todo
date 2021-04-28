// Users Name Form
const nameForm = document.querySelector(".name_form"),
  nameInput = nameForm.querySelector(".name_write");
const usersName = document.querySelector(".users_name");
const SHOWING_CN = "showing";
const USERS_LS = "Current-Users";

// Saving Users name function

function saveUsersName(text) {
  localStorage.setItem(USERS_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currnetValue = nameInput.value;
  greeting(currnetValue);
  saveUsersName(currnetValue);
}

function askForName() {
  nameForm.classList.add(SHOWING_CN);
  nameForm.addEventListener("submit", handleSubmit);
}

function greeting(text) {
  nameForm.classList.remove(SHOWING_CN);
  usersName.classList.add(SHOWING_CN);
  usersName.innerText = `🖐Hello, ${text}`;
}
function loadUsersName() {
  const cuurentUser = localStorage.getItem(USERS_LS);
  if (cuurentUser === null) {
    askForName();
  } else {
    greeting(cuurentUser);
  }
}

function init() {
  loadUsersName();
}
init();
