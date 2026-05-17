import type { Task } from "../model/models.js";
import type { ITaskRepository } from "../repository/repository.js";
import type { ITaskService } from "./service.js";

export class TaskServiceImpl implements ITaskService {
  private tasks: Task[];
  constructor(private repo: ITaskRepository) {
    this.tasks = repo.load();
  }
  getAll(): Task[] {
    return this.tasks.slice();
  }
  add(title: string) {
    const trimmed = title.trim();
    if (!trimmed) throw new Error("Task cannot be empty");
    this.tasks.push({ title: trimmed, isCompleted: false });
    this.repo.save(this.tasks);
  }
  delete(index: number) {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks.splice(index, 1);
    this.repo.save(this.tasks);
  }
  edit(index: number, newTitle: string) {
    const t = this.tasks[index];
    if (!t) return;
    t.title = newTitle;
    this.repo.save(this.tasks);
  }
  toggle(index: number, checked: boolean) {
    const t = this.tasks[index];
    if (!t) return;
    t.isCompleted = checked;
    this.repo.save(this.tasks);
  }
}
