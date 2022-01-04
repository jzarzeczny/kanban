import Task from "./Task.js";
import Container from "./Container.js";
// Elements
const form = document.getElementById("form");
const lists = document.querySelectorAll(".list");
const cardsContainers = document.querySelectorAll(".list__container");
// Variables

// Array where all tasks are stored
const tasksArray = getFromLocalStorage() || [];

// Add pre-created tasks to list - localstorage
tasksArray.forEach((t) => {
  const task = new Task(t.heater, t.content, t.color, t.id, t.position);
  const cardPosition = task.createTaskCard();
  cardsContainers[task.position].appendChild(cardPosition);
});

// Event listers

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const header = e.target[0].value;
  const content = e.target[1].value;
  const color = e.target[2].value;
  const id = Date.now() + Math.random();
  const newTask = new Task(header, content, color, id);
  tasksArray.push(newTask);
  cardsContainers[newTask.position].appendChild(newTask.createTaskCard());
  updateLocalStorage(tasksArray);
  form.reset();
});

// Functions related to drag and drop

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  event.preventDefault();

  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  if (dropzone["classList"].contains("list__container")) {
    dropzone.appendChild(draggableElement);
    const t = getElementFromMainArray(id);
  }
}

// Local storage operation

function updateLocalStorage(tasks) {
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function getFromLocalStorage() {
  const data = localStorage.getItem("taskList");

  return JSON.parse(data);
}

// Array operations

function getElementFromMainArray(id) {
  const taskToEdit = tasksArray.filter((task) => {
    task.id === id;
  });
  console.log(taskToEdit);
  return taskToEdit[0];
}
