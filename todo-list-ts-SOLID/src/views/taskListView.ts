import type { Task } from "../model/models.js";

export class TaskListView {
  constructor(private containerSelector = ".tasks-container") {}
  private getContainer(): HTMLElement | null {
    return document.querySelector<HTMLElement>(this.containerSelector);
  }
  onItemAction(handler: (action: "delete" | "edit" | "toggle", index: number, checked?: boolean) => void) {
    document.addEventListener("DOMContentLoaded", () => {
      const container = this.getContainer();
      if (!container) return;
      container.addEventListener("click", (e) => {
        const btn = (e.target as HTMLElement).closest("button");
        if (!btn) return;
        const idx = Number(btn.getAttribute("data-index"));
        if (btn.classList.contains("delete-task-btn")) handler("delete", idx);
        else if (btn.classList.contains("edit-task-btn")) handler("edit", idx);
      });
      container.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement | null;
        if (target?.classList.contains("task-checkbox")) {
          const idx = Number(target.getAttribute("data-index"));
          handler("toggle", idx, target.checked);
          const li = target.closest(".task");
          const text = li?.querySelector<HTMLElement>(".task-text");
          if (text) text.classList.toggle("completed", target.checked);
        }
      });
    });
  }
  render(tasks: Task[]) {
    const container = this.getContainer();
    if (!container) return;
    container.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task";
      li.innerHTML = `
        <input class="task-checkbox" type="checkbox" id="checkbox-${index}" data-index="${index}" ${task.isCompleted ? "checked" : ""}>
        <p class="task-text ${task.isCompleted ? "completed" : ""}">${escapeHtml(task.title)}</p>
      `;
      const editWrap = document.createElement("span");
      editWrap.className = "edit-btn";
      editWrap.innerHTML = `<button class="edit-task-btn" data-index="${index}">Edit</button>`;
      const delWrap = document.createElement("span");
      delWrap.className = "delete-btn-container";
      delWrap.innerHTML = `<button class="delete-task-btn" data-index="${index}">X</button>`;
      li.appendChild(editWrap);
      li.appendChild(delWrap);
      container.appendChild(li);
    });
  }
}

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));
}
