const toDoForm = document.querySelector(".todo_form"),
  toDoInput = toDoForm.querySelector(".todo_write"),
  toDoList = document.querySelector(".todo_list");

const TODOS_LS = "ToDos";
const FINISH_LS = "Finished";

let toDos = [];
// toDos array 가 deleteToDos FN 에서 cleanTodos 로 새로 저장 되어야 하기 때문에.

let idNumbers = 1;

function deleteToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (ToDos) {
    return ToDos.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function finishedToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  li.style.textDecoration = "line-through";
  li.style.color = "gray";
  saveToDos();
}

/*function saveFinishedToDoos() {
  localStorage.setItem(FINISH_LS, JSON.stringify(toDos))
}*/
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function createToDos(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const dltBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const newId = idNumbers++;
  span.innerText = text;
  dltBtn.innerText = "❌";
  dltBtn.addEventListener("click", deleteToDos);
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", finishedToDos);
  li.appendChild(span);
  li.appendChild(dltBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDosObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDosObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  createToDos(currentValue);
  toDoInput.value = "";
}

/*function handleFinish(event) {
  event.preventDefault();
  const finishedValue = event.target

function loadFinishedToDos() {
  const loadFinishedToDos = localStorage.getItem(FINISH_LS);
}*/
function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function (ToDos) {
      createToDos(ToDos.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
