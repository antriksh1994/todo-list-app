import type { Task } from "../model/models.js";

export interface ITaskRepository {
  load(): Task[];
  save(tasks: Task[]): void;
}

export class LocalStorageTaskRepository implements ITaskRepository {
  private readonly key = "tasks";
  load(): Task[] {
    const raw = localStorage.getItem(this.key);
    try {
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  }
  save(tasks: Task[]) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }
}
