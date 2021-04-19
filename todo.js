const toDoForm = document.querySelector(".todo_form"),
  toDoInput = toDoForm.querySelector(".todo_write"),
  toDoList = document.querySelector(".todo_list");

const TODOS_LS = "ToDos";

let toDos = [];

let idNumbers = 1;

function deleteTodos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanTods = toDos.filter(function (ToDos) {
    return ToDos.id !== parseInt(li.id);
  });
  toDos = cleanTods;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function createTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const dltBtn = document.createElement("button");
  const newId = idNumbers++;
  span.innerText = text;
  dltBtn.innerText = "❌";
  dltBtn.addEventListener("click", deleteTodos);
  li.appendChild(span);
  li.appendChild(dltBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDosObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDosObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currnetValue = toDoInput.value;
  createTodo(currnetValue);
  toDoInput.value = "";
}

function loadTodos() {
  const loadTodos = localStorage.getItem(TODOS_LS);
  if (loadTodos !== null) {
    const parseTodos = JSON.parse(loadTodos);
    parseTodos.forEach(function (ToDos) {
      createTodo(ToDos.text);
    });
  }
}

function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
