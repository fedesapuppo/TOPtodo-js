import "./styles.css";
import { TodoApp } from "./app";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  const app = new TodoApp();

  // Handle new project form submission
  const newProjectForm = document.getElementById("new-project-form");
  const newProjectModal = document.getElementById("new-project-modal");
  const newProjectBtn = document.getElementById("new-project-btn");
  const cancelProjectBtn = document.getElementById("cancel-project");

  newProjectBtn.addEventListener("click", () => {
    newProjectModal.classList.add("active");
  });

  cancelProjectBtn.addEventListener("click", () => {
    newProjectModal.classList.remove("active");
  });

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("project-name").value;
    const description = document.getElementById("project-description").value;

    app.addProject(name, description);
    newProjectModal.classList.remove("active");
    newProjectForm.reset();
  });

  // Handle new todo form submission
  const newTodoForm = document.getElementById("new-todo-form");
  const newTodoModal = document.getElementById("new-todo-modal");
  const newTodoBtn = document.getElementById("new-todo-btn");
  const cancelTodoBtn = document.getElementById("cancel-todo");

  newTodoBtn.addEventListener("click", () => {
    newTodoModal.classList.add("active");
  });

  cancelTodoBtn.addEventListener("click", () => {
    newTodoModal.classList.remove("active");
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-due-date").value;
    const priority = document.getElementById("todo-priority").value;
    const notes = document.getElementById("todo-notes").value;

    app.addTodo(title, description, dueDate, priority, notes);
    newTodoModal.classList.remove("active");
    newTodoForm.reset();
  });
});
