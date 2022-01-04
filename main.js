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
  const id = (tasksArray.length + 1) * Math.floor(Math.random() * 5 + 17);
  const task = {
    header: header,
    content: content,
    color: color,
    id: id,
  };
  console.log(task);
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
  card.classList.add("list__card");
  card.style.backgroundColor = task.color;
  card.setAttribute("id", task.id);
  cardHeader.classList.add("card__header");
  cardHeader.innerHTML = task.header;
  cardPara.innerHTML = task.content;

  // Add the elements to card parent
  card.appendChild(cardHeader);
  card.appendChild(cardPara);

  card.setAttribute("draggable", "true");
  card.setAttribute("ondragstart", "onDragStart(event)");

  // Add the card to TODO section
  cardsContainers[0].appendChild(card);
}

// TODO refactor
function createCard(task) {
  const card = document.createElement("div");
  const cardHeader = document.createElement("h2");
  const cardPara = document.createElement("p");
  console.log("im creating the card");
  // Add the classes and content
  // card.classList.add("list__card");
  card.setAttribute("id", task.id);
  console.log(card);
  cardHeader.classList.add("card__header");
  cardHeader.innerHTML = task.header;
  cardPara.innerHTML = task.content;
  cardPara.classList.add("card__para");

  // Add the elements to card parent
  card.appendChild(cardHeader);
  card.appendChild(cardPara);

  // Change the color of the card based on the input
  card.setAttribute("draggable", "true");
  card.setAttribute("ondragstart", "onDragStart(event)");
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
