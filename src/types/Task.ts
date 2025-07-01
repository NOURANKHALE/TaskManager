export default interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: Date | string;
  category?: string;
  description?: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}
 

