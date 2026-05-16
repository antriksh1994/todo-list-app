const state = {
  taskName: "",
  tasks: [],
};

const getInput = () => document.querySelector(".task-input");
const getTasksContainer = () => document.querySelector(".tasks-container");
const getTask = () => document.querySelectorAll(".task");
loadTasksFromLocalStorage();

function handleInputChange(e) {
  state.taskName = e.target.value;
}

function handleAddTask() {
  if (!state.taskName.trim()) {
    alert("Task cannot be empty");
    return;
  }
  state.tasks.push({ title: state.taskName.trim(), isCompleted: false });
  renderTasks();
  getInput().value = "";
  saveTasksToLocalStorage();
  console.log("Tasks:", state.tasks);
}

function renderTasks() {
  const tasksContainer = getTasksContainer();
  tasksContainer.innerHTML = "";
  state.tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    const taskDeleteBtnContainer = document.createElement("span");
    taskElement.className = "task";
    taskDeleteBtnContainer.className = "delete-btn-container";
    taskElement.innerHTML = `
            <input type="checkbox" id="checkbox-${index}" onclick="toggleCompletion(${index})" ${task.isCompleted ? "checked" : ""}>
            <p class="task-text ${task.isCompleted ? "completed" : ""}">${task.title}</p>
        `;
    taskDeleteBtnContainer.innerHTML = `<button class="delete-task-btn" onclick="deleteTask(${index}, '${task.title}')">X</button>`;
    taskElement.appendChild(taskDeleteBtnContainer);
    tasksContainer?.appendChild(taskElement);
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function loadTasksFromLocalStorage() {
  const tasksFromStorage = localStorage.getItem("tasks");
  if (tasksFromStorage) {
    state.tasks = JSON.parse(tasksFromStorage);
    renderTasks();
  }
}

function deleteTask(index, task) {
  console.log("index to delete", index);
  console.log("task to delete", task);
  state.tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleCompletion(index) {
  console.log("getTask()", getTask());
  const checkboxChecked = document.getElementById(`checkbox-${index}`).checked;
  console.log("checkbox with index", checkboxChecked);
  getTask()[index].classList.toggle("completed", Boolean(checkboxChecked));
  state.tasks[index].isCompleted = checkboxChecked;
  saveTasksToLocalStorage();
}
