//getting dom elements
var task_list = document.querySelector(".task_list");
var task_container = document.querySelector(".task_container");
var input = document.querySelector("input");
var add_btn = document.querySelector(".add_btn");
var del_btn = document.querySelector(".del_btn");
var completed_list = document.querySelector(".completed");
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
      var div = document.createElement("div");
      var del_btn = document.createElement("a");
      var complted_btn = document.createElement("a");
      var obj = {};

      var today = new Date();
      var date =
        today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

      obj.date = date;
      obj.status = "incomplete";
      div.classList.add("task");

      localStorage.setItem(`${input.value}`, `${JSON.stringify(obj)}`);
      task_storage.push(`${input.value}`);

      div.innerHTML = `
      <p>${input.value}</p>
      <p class="date">${obj.date}</p>
      <a ><i class="fas fa-check-square"></i></a>
      <a><i class="fas fa-trash"></i></a>`;
      task_list.appendChild(div);
      input.value = "";

      var del_buttons = document.querySelectorAll(".fa-trash");
      del_buttons.forEach(function (button) {
        button.addEventListener("click", remove_task_incomplete);
      });
      var completed_buttons = document.querySelectorAll(".fa-check-square");
      completed_buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.path[2].classList.add("complete");
          e.path[1].classList.add("display_none");
          console.log(e);
        });
      });
    } else {
      alert(`You already have a task called "${input.value}"`);
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
function remove_task_incomplete(e) {
  console.log(e.path);
  e.path[1].removeEventListener("click", remove_task_incomplete);

  task_storage = arrayRemove(
    task_storage,
    `${e.path[2].children[0].innerHTML}`
  );
  task_list.removeChild(e.path[2]);
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
    var value_str = localStorage.getItem(key);
    var obj = JSON.parse(value_str);
    var div = document.createElement("div");

    //to find duplicate tasks
    task.push(key);

    div.classList.add("task");

    //process of creating the task div
    var disp = "";
    if (obj.status == "completed") {
      div.classList.add("complete");
      disp = "display_none";
    }

    div.innerHTML = `
      <p>${key}</p>
      <p class="date">${obj.date}</p>
      <a class="${disp}" ><i class="fas fa-check-square "></i></a>
      <a><i class="fas fa-trash"></i></a>`;
    task_list.appendChild(div);

    var del_buttons = document.querySelectorAll(".fa-trash");
    del_buttons.forEach(function (button) {
      button.addEventListener("click", remove_task_incomplete);
    });
    var completed_buttons = document.querySelectorAll(".fa-check-square");
    completed_buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.path[2].classList.add("complete");
        e.path[1].classList.add("display_none");
        var item = localStorage.getItem(
          `${e.path[2].firstElementChild.innerHTML}`
        );
        var obj = JSON.parse(item);
        obj.status = "completed";
        var obj_str = JSON.stringify(obj);
        localStorage.setItem(
          `${e.path[2].firstElementChild.innerHTML}`,
          obj_str
        );
      });
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
