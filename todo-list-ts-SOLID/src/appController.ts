import { LocalStorageTaskRepository } from "./repository/repository.js";
import { TaskServiceImpl } from "./service/serviceImpl.js";
import { TaskInputView } from "./views/taskInputView.js";
import { TaskListView } from "./views/taskListView.js";

export class AppController {
  private repo = new LocalStorageTaskRepository();
  private serviceImpl = new TaskServiceImpl(this.repo);
  private inputView = new TaskInputView();
  private listView = new TaskListView();
  start() {
    this.inputView.onAdd((title) => {
      try {
        this.serviceImpl.add(title);
        this.inputView.clear();
        this.render();
      } catch (err) {
        alert((err as Error).message);
      }
    });
    this.listView.onItemAction((action, idx, checked) => {
      if (action === "delete") {
        this.serviceImpl.delete(idx);
        this.render();
      } else if (action === "edit") {
        const current = this.serviceImpl.getAll()[idx];
        if (!current) return;
        const newTitle = prompt("Edit task:", current.title);
        if (newTitle !== null) {
          this.serviceImpl.edit(idx, newTitle);
          this.render();
        }
      } else if (action === "toggle") {
        if (typeof checked === "boolean") this.serviceImpl.toggle(idx, checked);
      }
    });
    document.addEventListener("DOMContentLoaded", () => this.render());
  }
  private render() {
    this.listView.render(this.serviceImpl.getAll());
  }
}

export default AppController;
