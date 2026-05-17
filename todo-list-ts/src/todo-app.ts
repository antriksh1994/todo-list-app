interface Task {
  title: string;
  isCompleted: boolean;
}

interface State {
  taskName: string;
  tasks: Task[];
}

const state: State = {
  taskName: "",
  tasks: [],
};

// DOM helpers
const getInput = (): HTMLInputElement =>
  document.querySelector<HTMLInputElement>(".task-input")!;

const getTasksContainer = (): HTMLElement =>
  document.querySelector<HTMLElement>(".tasks-container")!;

const getTask = (): NodeListOf<HTMLElement> =>
  document.querySelectorAll<HTMLElement>(".task");

// Event handlers
function handleInputChange(e: Event): void {
  const target = e.target as HTMLInputElement;
  state.taskName = target.value;
}

function handleAddTask(): void {
  if (!state.taskName.trim()) {
    alert("Task cannot be empty");
    return;
  }
  state.tasks.push({ title: state.taskName.trim(), isCompleted: false });
  renderTasks();
  getInput().value = "";
  saveTasksToLocalStorage();
}

function renderTasks(): void {
  const tasksContainer = getTasksContainer();
  tasksContainer.innerHTML = "";

  state.tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.className = "task";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${index}`;
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () => toggleCompletion(index));

    // Task text
    const taskText = document.createElement("p");
    taskText.className = `task-text ${task.isCompleted ? "completed" : ""}`;
    taskText.textContent = task.title;

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-task-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(index));

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-task-btn";
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    const deleteContainer = document.createElement("span");
    deleteContainer.className = "delete-btn-container";
    deleteContainer.appendChild(deleteBtn);

    // Append everything
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(editBtn);
    taskElement.appendChild(deleteContainer);

    tasksContainer.appendChild(taskElement);
  });
}

function saveTasksToLocalStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function loadTasksFromLocalStorage(): void {
  const tasksFromStorage = localStorage.getItem("tasks");
  if (tasksFromStorage) {
    state.tasks = JSON.parse(tasksFromStorage) as Task[];
    renderTasks();
  }
}

function deleteTask(index: number): void {
  state.tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

function editTask(index: number): void {
  const task = state.tasks[index];
  if (!task) return;

  const newTitle = prompt("Edit task:", task.title);
  if (newTitle !== null && newTitle.trim()) {
    task.title = newTitle.trim();
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function toggleCompletion(index: number): void {
  const checkbox = document.getElementById(
    `checkbox-${index}`
  ) as HTMLInputElement | null;
  if (!checkbox) return;
  const isChecked = checkbox.checked;

  const taskElement = getTask().item(index);
  if (taskElement) {
    taskElement.classList.toggle("completed", isChecked);
  }

  const task = state.tasks[index];
  if (task) {
    task.isCompleted = isChecked;
    saveTasksToLocalStorage();
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();

  // Attach event listeners
  getInput().addEventListener("input", handleInputChange);
  document
    .querySelector<HTMLButtonElement>(".add-task-btn")!
    .addEventListener("click", handleAddTask);
});
