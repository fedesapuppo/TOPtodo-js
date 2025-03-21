import { Project } from "../models/Project";

export class StorageService {
  static STORAGE_KEY = "todo-app-data";

  static saveProjects(projects) {
    try {
      const data = projects.map((project) => project.toJSON());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  }

  static loadProjects() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        // Create default project if no data exists
        const defaultProject = new Project("My Tasks");
        this.saveProjects([defaultProject]);
        return [defaultProject];
      }
      return JSON.parse(data).map((projectJson) =>
        Project.fromJSON(projectJson),
      );
    } catch (error) {
      console.error("Error loading projects:", error);
      // Return default project if there's an error
      const defaultProject = new Project("My Tasks");
      this.saveProjects([defaultProject]);
      return [defaultProject];
    }
  }

  static clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
