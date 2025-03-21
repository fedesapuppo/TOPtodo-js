import { Todo } from "./Todo";

export class Project {
  constructor(name, description = "") {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.todos = [];
    this.createdAt = new Date();
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      todos: this.todos.map((todo) => todo.toJSON()),
      createdAt: this.createdAt,
    };
  }

  static fromJSON(json) {
    const project = new Project(json.name, json.description);
    project.id = json.id;
    project.createdAt = new Date(json.createdAt);
    project.todos = json.todos.map((todoJson) => Todo.fromJSON(todoJson));
    return project;
  }
}
