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
            const todo = project.getTodo(todoId);
            if (todo) {
                todo.toggleComplete();
                this.saveAndRender();
            }
        };

        this.ui.onChecklistItemToggle = (todoId, index) => {
            const project = this.getCurrentProject();
            const todo = project.getTodo(todoId);
            if (todo) {
                todo.toggleChecklistItem(index);
                this.saveAndRender();
            }
        };

        this.ui.onTodoDelete = (todoId) => {
            const project = this.getCurrentProject();
            project.removeTodo(todoId);
            this.saveAndRender();
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