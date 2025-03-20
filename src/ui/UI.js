export class UI {
    constructor() {
        this.projectsContainer = document.getElementById('projects-container');
        this.todosContainer = document.getElementById('todos-container');
        this.todoDetailsContainer = document.getElementById('todo-details');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add event listeners for project creation
        const newProjectBtn = document.getElementById('new-project-btn');
        if (newProjectBtn) {
            newProjectBtn.addEventListener('click', () => this.showNewProjectForm());
        }
    }

    renderProjects(projects, currentProjectId) {
        this.projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectElement = this.createProjectElement(project, currentProjectId);
            this.projectsContainer.appendChild(projectElement);
        });
    }

    createProjectElement(project, currentProjectId) {
        const div = document.createElement('div');
        div.className = `project-item ${project.id === currentProjectId ? 'active' : ''}`;
        div.dataset.projectId = project.id;

        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        projectInfo.innerHTML = `
            <h3>${project.name}</h3>
            <span class="todo-count">${project.todos.length}</span>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-project-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete Project';

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent project selection when clicking delete
            if (confirm('Are you sure you want to delete this project and all its todos?')) {
                this.onProjectDelete(project.id);
            }
        });

        div.appendChild(projectInfo);
        // Don't add delete button to the default project
        if (project.name !== 'My Tasks') {
            div.appendChild(deleteBtn);
        }

        projectInfo.addEventListener('click', () => {
            this.onProjectSelect(project.id);
        });

        return div;
    }

    renderTodos(todos) {
        this.todosContainer.innerHTML = '';
        todos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            this.todosContainer.appendChild(todoElement);
        });
    }

    createTodoElement(todo) {
        const div = document.createElement('div');
        div.className = `todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
        div.dataset.todoId = todo.id;

        const formattedDate = new Date(todo.dueDate).toLocaleDateString();

        div.innerHTML = `
            <div class="todo-header">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <h4>${todo.title}</h4>
                <span class="due-date">${formattedDate}</span>
            </div>
            <div class="todo-preview">${todo.description.substring(0, 100)}${todo.description.length > 100 ? '...' : ''}</div>
        `;

        div.addEventListener('click', (e) => {
            if (!e.target.matches('input[type="checkbox"]')) {
                this.showTodoDetails(todo);
            }
        });

        const checkbox = div.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            this.onTodoToggle(todo.id);
        });

        return div;
    }

    showTodoDetails(todo) {
        const formattedDate = new Date(todo.dueDate).toLocaleDateString();
        const checklistHtml = todo.checklist.map((item, index) => `
            <div class="checklist-item">
                <input type="checkbox" ${item.completed ? 'checked' : ''} data-index="${index}">
                <span>${item.text}</span>
            </div>
        `).join('');

        this.todoDetailsContainer.innerHTML = `
            <div class="todo-details-content">
                <h2>${todo.title}</h2>
                <div class="todo-meta">
                    <span class="priority">Priority: ${todo.priority}</span>
                    <span class="due-date">Due: ${formattedDate}</span>
                </div>
                <div class="description">${todo.description}</div>
                <div class="notes">${todo.notes}</div>
                <div class="checklist">
                    <h3>Checklist</h3>
                    ${checklistHtml}
                </div>
                <div class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

        this.todoDetailsContainer.classList.add('active');

        // Add event listeners for checklist items
        this.todoDetailsContainer.querySelectorAll('.checklist-item input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.onChecklistItemToggle(todo.id, parseInt(checkbox.dataset.index));
            });
        });

        // Add event listeners for action buttons
        this.todoDetailsContainer.querySelector('.edit-btn').addEventListener('click', () => {
            this.showEditTodoForm(todo);
        });

        this.todoDetailsContainer.querySelector('.delete-btn').addEventListener('click', () => {
            this.onTodoDelete(todo.id);
        });
    }

    showNewProjectForm() {
        // Implementation for new project form
    }

    showEditTodoForm(todo) {
        // Implementation for edit todo form
    }

    // Event handlers that will be overridden by the main app
    onProjectSelect(projectId) {}
    onTodoToggle(todoId) {}
    onChecklistItemToggle(todoId, index) {}
    onTodoDelete(todoId) {}
    onProjectDelete(projectId) {}
}