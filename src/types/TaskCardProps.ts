import Task from '@/types/TaskInterface';
export default interface TaskCardProps {
  Task: Task;
  Tasks?: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onToggleComplete: (id: string) => void;
}
