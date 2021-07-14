//getting dom elements
var task_list = document.querySelector(".task_list");
var task_container = document.querySelector(".task_container");
var input = document.querySelector("input");
var add_btn = document.querySelector(".add_btn");
var del_btn = document.querySelector(".del_btn");

//function to check the task is a unique task
function Isvalid(val) {
  if (localStorage.length == 0) {
    return true;
  } else {
    var result;
    for (var j = 0; j <= task_storage.length - 1; j++) {
      if (val == task_storage[j]) {
        return false;
      } else if (val != task_storage[j]) {
        result = true;
      }
    }
    return result;
  }
}

//function to create a dom element and insert data into local storage
function create_task_input() {
  if (input.value != "") {
    if (Isvalid(input.value) === true) {
      var p = document.createElement("p");
      var date = document.createElement("p");
      var a = document.createElement("a");
      var div = document.createElement("div");
      var i = document.createElement("i");
      var today = new Date();
      date.innerHTML =
        today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

      div.classList.add("task");
      i.classList.add("far");
      i.classList.add("fa-trash-alt");
      date.classList.add("date");

      p.innerHTML = input.value;
      localStorage.setItem(`${input.value}`, `${date.innerHTML}`);
      task_storage.push(`${input.value}`);
      console.log(task_storage);

      a.appendChild(i);
      div.appendChild(p);
      div.appendChild(date);
      div.appendChild(a);
      task_list.appendChild(div);
      input.value = "";

      var buttons = document.querySelectorAll("a");
      buttons.forEach(function (button) {
        button.addEventListener("click", delete_task);
      });
    } else {
      alert(`You already have a task called ${input.value}`);
    }
  } else {
    alert("Tasks cannot be empty");
  }
  if (localStorage.length < 1) {
    task_container.classList.add("display_none");
  } else {
    task_container.classList.remove("display_none");
  }
}

//i cannot find a remove function like in python so i made one
//function to remove a value from a array by only taking value as its parameter
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

//function to delete a dom and remove data from local storage
function delete_task(e) {
  task_list.removeChild(e.path[2]);
  task_storage = arrayRemove(
    task_storage,
    `${e.path[2].children[0].innerHTML}`
  );
  console.log(task_storage);
  localStorage.removeItem(`${e.path[2].children[0].innerHTML}`);
  if (localStorage.length < 1) {
    task_container.classList.add("display_none");
  } else {
    task_container.classList.remove("display_none");
  }
}

//function for loading data from local storage
function load_task() {
  var task = [];
  for (let index = 0; index < localStorage.length; index++) {
    var key = localStorage.key(index);
    var value = localStorage.getItem(key);
    var p = document.createElement("p");
    var date = document.createElement("p");
    var a = document.createElement("a");
    var div = document.createElement("div");
    var i = document.createElement("i");

    //to find duplicate tasks
    task.push(key);

    div.classList.add("task");
    i.classList.add("far");
    i.classList.add("fa-trash-alt");
    date.classList.add("date");

    date.innerHTML = value;
    p.innerHTML = key;
    //process of creating the task div
    //i know a easier way but i did this
    a.appendChild(i);
    div.appendChild(p);
    div.appendChild(date);
    div.appendChild(a);
    task_list.appendChild(div);

    var buttons = document.querySelectorAll("a");
    buttons.forEach(function (button) {
      button.addEventListener("click", delete_task);
    });
  }
  if (localStorage.length < 1) {
    task_container.classList.add("display_none");
  } else {
    task_container.classList.remove("display_none");
  }
  return task;
}

//function for adding key shortcuts
function key_shortcut(e) {
  if (e.keyCode == 13) {
    create_task_input();
  }
}

//function to clear all data from storage
function delete_all() {
  localStorage.clear();
  location.reload();
}

add_btn.addEventListener("click", create_task_input);
del_btn.addEventListener("click", delete_all);
window.addEventListener("keydown", key_shortcut);
var task_storage = load_task();
console.log(task_storage);
