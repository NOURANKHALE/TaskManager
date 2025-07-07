import { Calendar } from "lucide-react";
import Task from "@/types/TaskInterface";

interface UpcomingDeadlinesCardProps {
  Tasks: Task[];
}

export const UpcomingDeadlinesCard = ({
  Tasks,
}: UpcomingDeadlinesCardProps) => {
  // Get current date
  const now = new Date();
  // Filter tasks with due dates in the future
  const upcomingDeadlines = Tasks.filter((Task) => Task.dueDate)
    .map((Task) => ({
      ...Task,
      dueDate: new Date(Task.dueDate!),
    }))
    .filter((Task) => Task.dueDate >= now)
    // Sort by nearest deadline first
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    // Take only the 4 nearest deadlines
    .slice(0, 4);

  if (upcomingDeadlines.length === 0) {
    return (
      <div className="Upcoming_Deadline flex flex-col items-center justify-center h-full p-4">
        <Calendar className="w-12 h-12 text-pink-400 mb-4" />
        <div className="text-center text-pink-700 dark:text-pink-400">
          No upcoming deadlines
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
          Add due dates to your tasks to see them here
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex flex-col items-center mb-4">
        <div className="text-5xl font-bold text-green-700 dark:text-green-300 mb-2">
          {upcomingDeadlines.length}
        </div>
        <div className="text-center text-green-800 dark:text-green-300 font-medium">
          Nearest Deadlines
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
          {upcomingDeadlines.map((Task) => (
            <div
              key={Task.id}
              className="bg-green-200 dark:bg-green-900/60 rounded-lg p-2 flex flex-col items-center"
            >
              <Calendar className="w-4 h-4 text-green-800 dark:text-green-300 mb-1" />
              <div className="text-xs text-green-800 dark:text-green-300">
                {Task.dueDate.getDate()}
              </div>
              <div className="text-[10px] text-green-600 dark:text-green-400">
                {Task.dueDate.toLocaleString("default", { month: "short" })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
