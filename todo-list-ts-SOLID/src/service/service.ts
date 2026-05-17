import type { Task } from "../model/models";

export interface ITaskService {
  getAll(): Task[];
  add(title: string): void;
  delete(index: number): void;
  edit(index: number, newTitle: string): void;
  toggle(index: number, checked: boolean): void;
}