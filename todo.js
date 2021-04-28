const toDoForm = document.querySelector(".todo_form"),
  toDoInput = toDoForm.querySelector(".todo_write"),
  toDoList = document.querySelector(".todo_list"),
  finishedList = document.querySelector(".finish_list");

const TODOS_LS = "ToDos";
const FINISH_LS = "Finished";

let toDos = [];
let fin = [];
// toDos array 가 deleteToDos FN 에서 cleanTodos 로 새로 저장 되어야 하기 때문에.

let idNumbers = 1;

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = fin.filter(function (Finished) {
    return Finished.id !== parseInt(li.id);
  });
  fin = cleanFinished;
  saveFinished();
}

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
  deleteToDos(event);
  const text = event.target.parentNode.children[0].innerText;
  createFinished(text);
}

function backButton(event) {
  deleteFinished(event);
  const text = event.target.parentNode.children[0].innerText;
  createToDos(text);
}

function saveFinished() {
  localStorage.setItem(FINISH_LS, JSON.stringify(fin));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function createFinished(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const dltBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const newId = idNumbers++;
  span.innerText = text;
  dltBtn.innerText = "❌";
  dltBtn.addEventListener("click", deleteFinished);
  backBtn.innerText = "🔙";
  backBtn.addEventListener("click", backButton);
  li.appendChild(span);
  li.appendChild(dltBtn);
  li.appendChild(backBtn);
  li.id = newId;
  li.style.textDecoration = "line-through";
  li.style.color = "rgba(0,0,0,0.4)";
  li.style.textShadow = "none";
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId,
  };
  fin.push(finishedObj);
  saveFinished();
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

function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  const loadFinished = localStorage.getItem(FINISH_LS);
  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function (ToDos) {
      createToDos(ToDos.text);
    });
  }
  if (loadFinished !== null) {
    const parsedFinished = JSON.parse(loadFinished);
    parsedFinished.forEach(function (Finished) {
      createFinished(Finished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
