// to-do-list

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTask");
const clearTasksBtn = document.getElementById("clearTasks");

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach(function (task) {
  addTaskToUI(task);
});

addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  if (task === "") {
    return;
  }

  addTaskToUI(task);
  saveTask(task);
  taskInput.value = "";
});

clearTasksBtn.addEventListener("click", function (e) {
  e.preventDefault();
  taskList.textContent = "";
  localStorage.removeItem("tasks");
});

function addTaskToUI(task) {
  const li = document.createElement("li");
  const removeBtn = document.createElement("button");

  li.textContent = task + " ";
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", function () {
    li.remove();
    removeTaskFromStorage(task);
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//timer

document.addEventListener("DOMContentLoaded", function () {

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    return h + ":" + m + ":" + s;
  }

  /* -------- TIMER 1 -------- */

  let timer1Seconds = 0;
  let timer1Running = true;

  const timer1Display = document.getElementById("timer1");
  const pauseTimer1Btn = document.getElementById("pauseTimer");
  const resetTimer1Btn = document.getElementById("resetTimer");

  timer1Display.textContent = "00:00:00";

  setInterval(function () {
    if (!timer1Running) {
      return;
    }

    timer1Seconds++;
    timer1Display.textContent = formatTime(timer1Seconds);
  }, 1000);

  pauseTimer1Btn.addEventListener("click", function () {
    timer1Running = !timer1Running;
  });

  resetTimer1Btn.addEventListener("click", function () {
    timer1Seconds = 0;
    timer1Running = true;
    timer1Display.textContent = "00:00:00";
  });

  /* -------- TIMER 2 -------- */

  let timer2Seconds = 0;
  let timer2Running = true;

  const timer2Display = document.getElementById("timer2");
  const pauseTimer2Btn = document.getElementById("pauseTimer2");
  const resetTimer2Btn = document.getElementById("resetTimer2");

  timer2Display.textContent = "00:00:00";

  setInterval(function () {
    if (!timer2Running) {
      return;
    }

    timer2Seconds++;
    timer2Display.textContent = formatTime(timer2Seconds);
  }, 1000);

  pauseTimer2Btn.addEventListener("click", function () {
    timer2Running = !timer2Running;
  });

  resetTimer2Btn.addEventListener("click", function () {
    timer2Seconds = 0;
    timer2Running = true;
    timer2Display.textContent = "00:00:00";
  });

});


//map-1

document.getElementById("toggleMap1").addEventListener("click", function () {
  toggleMap("map");
});

//map-2

// let googleMap;

// function initMap() {
//   const mapContainer = document.getElementById("map2");

//   if (!mapContainer) {
//     return;
//   }

//   const bagaBeachLocation = {
//     lat: 15.5553,
//     lng: 73.7517
//   };

//   googleMap = new google.maps.Map(mapContainer, {
//     center: bagaBeachLocation,
//     zoom: 14
//   });

//   new google.maps.Marker({
//     position: bagaBeachLocation,
//     map: googleMap,
//     title: "Baga Beach, Goa"
//   });

//   googleMap.addListener("click", function () {
//     goToMap();
//   });
// }

// function goToMap() {
//   var address = "Baga Beach Goa India";
//   var mapUrl =
//     "https://www.google.com/maps/search/?api=1&query=" +
//     encodeURIComponent(address);

//   window.open(mapUrl, "_blank");
// }


//contact-form

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const clearFormBtn = document.getElementById("clearForm");
const formSuccess = document.getElementById("formSuccess");

clearFormBtn.addEventListener("click", function (e) {
  e.preventDefault();

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  messageInput.value = "";

  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  formSuccess.style.display = "none";
});

passwordInput.addEventListener("blur", function () {
  let valid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (passwordInput.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  if (valid) {
    localStorage.setItem("formSaved", "true");
    formSuccess.style.display = "block";
  }
});
