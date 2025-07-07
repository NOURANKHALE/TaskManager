import { Search as SearchType } from "@/types/SearchPropInterface";
export type Priority = "high" | "medium" | "low";
type TaskStatus = "completed" | "pending" | "";
export interface Search {
  search: string;
  priority: Priority | "";
  category: string;
  status: TaskStatus;
}
export interface TaskSearchProps {
  onSearchChange?: (filters: SearchType) => void;
  hasResults?: boolean;
  isLoading?: boolean;
}
