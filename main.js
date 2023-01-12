/*let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");


form.addEventListener("submit", (x) => {
    x.preventDefault();
    formValidity();
  });

let formValidity = function formValid() {
    if (textInput === "") {
      error = alert("no input")
      console.log(error)
    }
    else {
        console.log("success")
    }
  }*/

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidity();
});

let formValidity = function valid() {
  if (textInput.value === "") {
    alert("error")
  } else {
    acceptData();
    add.click();

  }
};

let data = {};

let acceptData = () => {
  data.push({
    text: textInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span>${x.text}</span>
          <p>${x.description}</p>

          <span class="options">
          <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
        </span>
        </div>
    `);
  });
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[1].innerHTML;

  deleteTask(e);
};


(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();

