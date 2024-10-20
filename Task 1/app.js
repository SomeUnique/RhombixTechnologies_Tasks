document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

// Load tasks from local storage on page load
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    renderTask(task);
  });
}

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = { id: Date.now(), text: taskText };
  renderTask(task);

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = '';
}

// Render task on the UI
function renderTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </div>
  `;
  li.setAttribute('data-id', task.id);
  taskList.appendChild(li);
}

// Edit task
function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskToEdit = tasks.find(task => task.id === id);

  const newTaskText = prompt('Edit task:', taskToEdit.text);
  if (newTaskText === null || newTaskText.trim() === '') return;

  taskToEdit.text = newTaskText;

  localStorage.setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
}

// Delete task
function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id !== id);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
}

// Refresh task list display
function refreshTasks() {
  taskList.innerHTML = '';
  loadTasks();
}
