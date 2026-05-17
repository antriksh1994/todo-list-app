export class TaskInputView {
  constructor(private inputSelector = ".task-input", private addBtnSelector = ".add-task-btn") {}
  private getInput(): HTMLInputElement | null {
    return document.querySelector<HTMLInputElement>(this.inputSelector);
  }
  onAdd(handler: (title: string) => void) {
    document.addEventListener("DOMContentLoaded", () => {
      const input = this.getInput();
      if (!input) return;
      input.addEventListener("keypress", (e) => {
        if ((e as KeyboardEvent).key === "Enter") handler(input.value);
      });
      const btn = document.querySelector<HTMLElement>(this.addBtnSelector);
      btn?.addEventListener("click", () => handler(input.value));
    });
  }
  clear() {
    const input = this.getInput();
    if (input) input.value = "";
  }
}
