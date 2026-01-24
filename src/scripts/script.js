const STORAGE_KEY = "todo-items-v1";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("task-counter");
const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos();
let activeFilter = "all";

function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const todo = {
    id: Date.now().toString(36),
    text: trimmed,
    completed: false
  };

  todos.unshift(todo);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
  renderTodos();
}

function getFilteredTodos() {
  if (activeFilter === "active") {
    return todos.filter(todo => !todo.completed);
  }
  if (activeFilter === "completed") {
    return todos.filter(todo => todo.completed);
  }
  return todos;
}

function updateCounter() {
  const remaining = todos.filter(todo => !todo.completed).length;
  const total = todos.length;
  counter.textContent = `${remaining} of ${total} tasks remaining`;
}

function renderTodos() {
  list.innerHTML = "";
  const visibleTodos = getFilteredTodos();

  if (visibleTodos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "todo-empty";
    empty.textContent = "No tasks yet. Add your first task!";
    list.appendChild(empty);
  } else {
    visibleTodos.forEach(todo => {
      const item = document.createElement("li");
      item.className = "todo-item";
      item.innerHTML = `
        <label class="todo-check">
          <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${todo.id}">
          <span class="custom-check"></span>
        </label>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
        <button class="todo-delete" type="button" data-delete="${todo.id}" aria-label="Delete task">
          ✕
        </button>
      `;
      list.appendChild(item);
    });
  }

  updateCounter();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  addTodo(input.value);
  input.value = "";
  input.focus();
});

list.addEventListener("click", event => {
  const deleteTarget = event.target.closest("[data-delete]");
  if (deleteTarget) {
    deleteTodo(deleteTarget.dataset.delete);
    return;
  }

  const checkbox = event.target.closest("input[type='checkbox'][data-id]");
  if (checkbox) {
    toggleTodo(checkbox.dataset.id);
  }
});

clearCompletedButton.addEventListener("click", clearCompleted);

filterButtons.forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

renderTodos();
