export interface Task {
  title: string;
  isCompleted: boolean;
}

export interface State {
  taskName: string;
  tasks: Task[];
}
