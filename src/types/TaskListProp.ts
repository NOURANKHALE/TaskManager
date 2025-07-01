import Task from '@/types/Task';
export default interface TaskListProps {
  Tasks?: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onToggleComplete: (id: string) => void;
}
