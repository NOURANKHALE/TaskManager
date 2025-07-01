import { motion } from "framer-motion";
import { format } from "date-fns";
import { ChevronDown, ClipboardList } from "lucide-react";
import { TaskCard } from "./TaskCard";
import Task from "@/types/Task";

interface TaskTimelineProps {
  groupedTasks: { [key: string]: Task[] };
  expandedSections: { [key: string]: boolean };
  onToggleSection: (date: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskTimeline = ({groupedTasks,expandedSections,onToggleSection,onDelete,onUpdate,onToggleComplete,}: TaskTimelineProps) => {
  return (
    <div className="Task_Timeline divide-y divide-gray-100 dark:divide-gray-800">
      {Object.entries(groupedTasks).map(([date, Tasks]) => {
        // Validate date string
        const parsedDate = new Date(date);
        const isValidDate = !isNaN(parsedDate.getTime());
        const completedCount = Tasks.filter((Task) => Task.completed).length;
        const completionPercentage =
          Tasks.length > 0
            ? Math.round((completedCount / Tasks.length) * 100)
            : 0;

        return (
          <div key={date} className="group">
            <button
              onClick={() => onToggleSection(date)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {isValidDate ? format(parsedDate, "d") : "?"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {isValidDate ? format(parsedDate, "MMM") : "Invalid"}
                  </span>
                </div>
                <div>
                  <h3 className="text-left font-medium text-gray-900 dark:text-white">
                    {isValidDate ? format(parsedDate, "EEEE, MMMM d") : date}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${completionPercentage}%`,
                          background:
                            completionPercentage === 100
                              ? "linear-gradient(to right, #10B981, #34D399)"
                              : "linear-gradient(to right, #8B5CF6, #A78BFA)",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Tasks.length} {Tasks.length === 1 ? "task" : "tasks"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedSections[date] ? "rotate-180 text-violet-500" : ""
                  }`}
                />
              </div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedSections[date] ? "auto" : 0,
                opacity: expandedSections[date] ? 1 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pl-20 pr-4 pb-4 space-y-3">
                {Tasks.length > 0 ? (
                  Tasks.map((Task) => (
                    <motion.div
                      key={Task.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <TaskCard
                        Task={Task}
                        Tasks={Tasks}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onToggleComplete={onToggleComplete}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-700"
                  >
                    <ClipboardList className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm">No tasks for this day</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
