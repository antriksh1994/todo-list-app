import React, { useEffect, useState } from 'react';
import './App.css';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}
function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }
  useEffect(() => {
    getAllTasks();
  }, []);

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), name: taskName, completed: false }]);
    setTaskName('');
    saveTasks([...tasks, { id: Date.now().toString(), name: taskName, completed: false }]);
    console.log('Tasks:', tasks);
  }

  const editTask = (index: number) => {
    const newTaskName = prompt('Edit task:', tasks[index].name);
    if (newTaskName !== null && newTaskName.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = { ...updatedTasks[index], name: newTaskName };
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const taskComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  const getAllTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const saveTasks = (tasksToSave: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }

  return (
    <div className="main-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <div className="create-task">
          <input
            className="task-input"
            type="text"
            placeholder="Add a task"
            onChange={handleInputChange}
            value={taskName}
          />
          <button className="add-task-btn" onClick={handleAddTask}>
            Add
          </button>
        </div>
        <ul className="tasks-container">
          {tasks.map((task, index) => (
            <li key={task.id} className="task-item">
              <input type='checkbox' checked={task.completed} onChange={() => { taskComplete(index) }} />
              <span className={task.completed ? 'completed' : ''}>{task.name}</span>
              <button className="edit-task-btn" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="delete-task-btn" onClick={() => { deleteTask(index) }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
