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
let textarea = document.getElementById("textArea");
let tasks = document.getElementById("tasks");
let alphanumeric = /^[a-zA-Z0-9_ ]$/
let button = document.getElementById("ks")



form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidity();
});

let formValidity = function valid() {
  if (textInput.value === "" || textarea.value === "") {
    alert("error...Please input values")
  } else if (textInput.value.length > 5 || textarea.value.length > 50) {
    alert("error...adhere to character limit")
  } else if (textInput.value.match(alphanumeric)) {
    alert("Character not allowed")
  } else {
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
 }


let data = [];

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
  tasks.innerHTML = "";
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
  restart()
};


button.onclick = function deleteAll() {
  document.getElementById("tasks").innerHTML = "";
  localStorage.removeItem("data", JSON.stringify(data));
}

let deleteAll = function reset(data) {
  localStorage.remove("data")
}

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[1].innerHTML;

  deleteTask(e);
};

let restart = function re() {
  textInput.value = "";
  textarea.value = "";
}

let refresh = function ne() {
  data = JSON.parse(localStorage.getItem("data")) || []
  createTasks();
};

refresh();
