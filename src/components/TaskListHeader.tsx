import { Badge } from "./ui/badge";
import Task from "@/types/TaskInterface";

export const TaskListHeader = ({ totalTasks, completedTasks }: Task) => {
  return (
    <div className="Task_Lists_Header p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-200 dark:bg-gray-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">
            Task Timeline
          </h2>
          <Badge
            variant="outline"
            className="bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300"
          >
            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
          >
            {completedTasks} completed
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
          >
            {totalTasks - completedTasks} pending
          </Badge>
        </div>
      </div>
    </div>
  );
};
