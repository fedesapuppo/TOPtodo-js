import { Project } from './models/Project';
import { Todo } from './models/Todo';
import { StorageService } from './services/StorageService';
import { UI } from './ui/UI';

export class TodoApp {
  constructor() {
    this.projects = StorageService.loadProjects();
    this.currentProjectId = this.projects[0].id;
    this.ui = new UI();
    this.setupUIEventHandlers();
    this.render();
  }

  setupUIEventHandlers() {
    this.ui.onProjectSelect = (projectId) => {
      this.currentProjectId = projectId;
      this.render();
    };

    this.ui.onTodoToggle = (todoId) => {
      const project = this.getCurrentProject();
      const todoIndex = project.todos.findIndex(t => t.id === todoId);
      if (todoIndex !== -1) {
        // Toggle the completed status directly
        project.todos[todoIndex].completed = !project.todos[todoIndex].completed;
        this.saveAndRender();
      }
    };

    this.ui.onChecklistItemToggle = (todoId, index) => {
      const project = this.getCurrentProject();
      const todo = project.getTodo(todoId);
      if (todo && todo.checklist[index]) {
        todo.checklist[index].completed = !todo.checklist[index].completed;
        this.saveAndRender();
      }
    };

    this.ui.onTodoDelete = (todoId) => {
      const project = this.getCurrentProject();
      project.removeTodo(todoId);
      this.saveAndRender();
    };

    this.ui.onProjectDelete = (projectId) => {
      this.deleteProject(projectId);
    };

    this.ui.onTodoEdit = (updatedTodo) => {
      const project = this.getCurrentProject();
      const todoIndex = project.todos.findIndex(t => t.id === updatedTodo.id);
      if (todoIndex !== -1) {
        // Preserve the checklist from the original todo
        const originalChecklist = project.todos[todoIndex].checklist;
        project.todos[todoIndex] = {
          ...updatedTodo,
          checklist: originalChecklist
        };
        this.saveAndRender();
      }
    };
  }

  getCurrentProject() {
    return this.projects.find(project => project.id === this.currentProjectId);
  }

  addProject(name, description = '') {
    const project = new Project(name, description);
    this.projects.push(project);
    this.currentProjectId = project.id;
    this.saveAndRender();
  }

  deleteProject(projectId) {
    // Don't delete if it's the last project
    if (this.projects.length <= 1) {
      alert('Cannot delete the last project.');
      return;
    }

    // Find the project index
    const projectIndex = this.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;

    // Remove the project
    this.projects.splice(projectIndex, 1);

    // If we deleted the current project, switch to another one
    if (this.currentProjectId === projectId) {
      this.currentProjectId = this.projects[0].id;
    }

    this.saveAndRender();
  }

  addTodo(title, description, dueDate, priority = 'medium', notes = '', checklist = []) {
    const project = this.getCurrentProject();
    if (project) {
      const todo = new Todo(title, description, dueDate, priority, notes, checklist);
      project.addTodo(todo);
      this.saveAndRender();
    }
  }

  saveAndRender() {
    StorageService.saveProjects(this.projects);
    this.render();
  }

  render() {
    this.ui.renderProjects(this.projects, this.currentProjectId);
    const currentProject = this.getCurrentProject();
    if (currentProject) {
      this.ui.renderTodos(currentProject.todos);
    }
  }
}
