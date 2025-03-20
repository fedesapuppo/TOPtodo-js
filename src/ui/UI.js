export class UI {
  constructor() {
    this.projectsContainer = document.getElementById('projects-container');
    this.todosContainer = document.getElementById('todos-container');
    this.todoDetailsContainer = document.getElementById('todo-details');
    this.setupEventListeners();
    this.setupClickOutsideListener();
  }

  setupEventListeners() {
    // Add event listeners for project creation
    const newProjectBtn = document.getElementById('new-project-btn');
    if (newProjectBtn) {
      newProjectBtn.addEventListener('click', () => this.showNewProjectForm());
    }
  }

  setupClickOutsideListener() {
    document.addEventListener('click', (e) => {
      if (this.todoDetailsContainer.classList.contains('active')) {
        const detailsContent = this.todoDetailsContainer.querySelector('.todo-details-content');
        // Don't close if clicking inside the details content, on a todo item, or on any button
        if (!detailsContent.contains(e.target) &&
                    !e.target.closest('.todo-item') &&
                    !e.target.closest('button')) {
          this.closeTodoDetails();
        }
      }
    });
  }

  closeTodoDetails() {
    this.todoDetailsContainer.classList.remove('active');
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
                <div class="todo-details-header">
                    <h2>${todo.title}</h2>
                    <button class="close-btn" title="Close">×</button>
                </div>
                <div class="todo-meta">
                    <span class="priority priority-${todo.priority}">Priority: ${todo.priority}</span>
                    <span class="due-date">Due: ${formattedDate}</span>
                </div>
                <div class="description">${todo.description}</div>
                ${todo.notes ? `<div class="notes"><h3>Notes</h3><p>${todo.notes}</p></div>` : ''}
                <div class="checklist">
                    <h3>Checklist</h3>
                    ${checklistHtml}
                </div>
                <div class="actions">
                    <button class="edit-btn" title="Edit todo">Edit</button>
                    <button class="delete-btn" title="Delete todo">Delete</button>
                </div>
            </div>
        `;

    this.todoDetailsContainer.classList.add('active');

    // Add close button event listener
    const closeBtn = this.todoDetailsContainer.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => this.closeTodoDetails());

    // Add event listeners for checklist items
    this.todoDetailsContainer.querySelectorAll('.checklist-item input').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.onChecklistItemToggle(todo.id, parseInt(checkbox.dataset.index));
      });
    });

    // Add event listeners for action buttons
    const editBtn = this.todoDetailsContainer.querySelector('.edit-btn');
    const deleteBtn = this.todoDetailsContainer.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      this.showEditTodoForm(todo);
    });

    deleteBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this todo?')) {
        this.onTodoDelete(todo.id);
        this.closeTodoDetails();
      }
    });
  }

  showNewProjectForm() {
    // Implementation for new project form
  }

  showEditTodoForm(todo) {
    const formattedDate = new Date(todo.dueDate).toISOString().split('T')[0];

    this.todoDetailsContainer.innerHTML = `
            <div class="todo-details-content">
                <div class="todo-details-header">
                    <h2>Edit Todo</h2>
                    <button class="close-btn" title="Close">×</button>
                </div>
                <form id="edit-todo-form">
                    <div class="form-group">
                        <label for="edit-todo-title">Title</label>
                        <input type="text" id="edit-todo-title" value="${todo.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-todo-description">Description</label>
                        <textarea id="edit-todo-description" required>${todo.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="edit-todo-due-date">Due Date</label>
                        <input type="date" id="edit-todo-due-date" value="${formattedDate}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-todo-priority">Priority</label>
                        <select id="edit-todo-priority">
                            <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit-todo-notes">Notes</label>
                        <textarea id="edit-todo-notes">${todo.notes}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn secondary" id="cancel-edit">Cancel</button>
                        <button type="submit" class="btn primary">Save Changes</button>
                    </div>
                </form>
            </div>
        `;

    const editForm = this.todoDetailsContainer.querySelector('#edit-todo-form');
    const cancelBtn = this.todoDetailsContainer.querySelector('#cancel-edit');
    const closeBtn = this.todoDetailsContainer.querySelector('.close-btn');

    // Prevent form submission from triggering click-outside
    editForm.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.showTodoDetails(todo);
    });

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.showTodoDetails(todo);
    });

    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const updatedTodo = {
        ...todo,
        title: document.getElementById('edit-todo-title').value,
        description: document.getElementById('edit-todo-description').value,
        dueDate: document.getElementById('edit-todo-due-date').value,
        priority: document.getElementById('edit-todo-priority').value,
        notes: document.getElementById('edit-todo-notes').value
      };

      this.onTodoEdit(updatedTodo);
      this.showTodoDetails(updatedTodo);
    });
  }

  // Event handlers that will be overridden by the main app
  onProjectSelect(projectId) {}
  onTodoToggle(todoId) {}
  onChecklistItemToggle(todoId, index) {}
  onTodoDelete(todoId) {}
  onProjectDelete(projectId) {}
  onTodoEdit(updatedTodo) {}
}
