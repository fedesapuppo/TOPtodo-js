export class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority = "medium",
    notes = "",
    checklist = [],
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // 'low', 'medium', 'high'
    this.notes = notes;
    this.checklist = checklist;
    this.completed = false;
    this.createdAt = new Date();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updatePriority(newPriority) {
    if (["low", "medium", "high"].includes(newPriority)) {
      this.priority = newPriority;
    }
  }

  addChecklistItem(item) {
    this.checklist.push({ text: item, completed: false });
  }

  toggleChecklistItem(index) {
    if (this.checklist[index]) {
      this.checklist[index].completed = !this.checklist[index].completed;
    }
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
      checklist: this.checklist,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }

  static fromJSON(json) {
    const todo = new Todo(
      json.title,
      json.description,
      new Date(json.dueDate),
      json.priority,
      json.notes,
      json.checklist,
    );
    todo.id = json.id;
    todo.completed = json.completed;
    todo.createdAt = new Date(json.createdAt);
    return todo;
  }
}
