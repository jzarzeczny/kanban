// Elements
const addButton = document.querySelector(".button");
const form = document.getElementById("form");
const lists = document.querySelectorAll(".list");
const cardsContainers = document.querySelectorAll(".list__container");
const allCards = document.querySelectorAll(".list__card");
// Variables

// Array where all tasks are stored
const tasksArray = getFromLocalStorage() || [];

// Add pre-created tasks to list - localstorage
tasksArray.forEach((d) => {
  addItemToTODO(d);
});

// All tasks that were already created get draggable power
allCards.forEach((card) => {
  card.setAttribute("draggable", "true");
  card.setAttribute("ondragstart", "onDragStart(event)");
});

// Each container can handle drop
lists.forEach((container) => {
  container.setAttribute("ondragover", "onDragOver(event)");
  container.setAttribute("ondrop", "onDrop(event)");
});

// Event listers

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const header = e.target[0].value;
  const content = e.target[1].value;
  const color = e.target[2].value;
  const id = Date.now() + Math.random();
  const task = {
    header: header,
    content: content,
    color: color,
    position: 0,
    id: id,
  };
  tasksArray.push(task);
  addItemToTODO(task);
  updateLocalStorage(tasksArray);
  form.reset();
});

// Function that adds the card with data to first ganban place
function addItemToTODO(task) {
  // Create HTML elements
  const card = document.createElement("div");
  const cardHeader = document.createElement("h2");
  const cardPara = document.createElement("p");

  // Add the classes and content

  // Styling
  card.classList.add("list__card");
  cardHeader.classList.add("card__header");
  cardPara.classList.add("card__para");
  card.style.backgroundColor = task.color;
  // Attributes and content
  card.setAttribute("id", task.id);
  card.setAttribute("draggable", "true");
  card.setAttribute("ondragstart", "onDragStart(event)");
  cardHeader.innerHTML = task.header;
  cardPara.innerHTML = task.content;

  // Add the elements to card parent
  card.appendChild(cardHeader);
  card.appendChild(cardPara);

  // Add the card to TODO section
  cardsContainers[task.position].appendChild(card);
}

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
