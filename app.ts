export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string, status: TaskStatus = "todo"): Task[] {
  const newTask: Task = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title,
    status,
  };
  return [...tasks, newTask];
}

export function completeTask(tasks: Task[], id: string): Task[] {
  return tasks.map(task => {
    if (task.id === id) {
      let nextStatus: TaskStatus = task.status;
      if (task.status === "todo") nextStatus = "in-progress";
      else if (task.status === "in-progress") nextStatus = "done";
      return { ...task, status: nextStatus };
    }
    return task;
  });
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter(task => task.id !== id);
}

export function filterByStatus(tasks: Task[], filter: "all" | TaskStatus): Task[] {
  if (filter === "all") return tasks;
  return tasks.filter(task => task.status === filter);
}