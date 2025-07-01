import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {Trash,Calendar,Flag,Clock,CheckCircle2,} from "lucide-react";
import { EditTask } from "@/components/EditTask";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useState } from "react";
import TaskCardProps from "@/types/TaskCardProps";

const priorityStyles = {
  high: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/30",
  medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30",
  low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
};

const statusStyles = {
  completed:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
  pending: "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20",
};

export function TaskCard({Task,onDelete,onUpdate,onToggleComplete,}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = () => {
    onToggleComplete(Task.id);
  };

  const handleDelete = () => {
    onDelete(Task.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative rounded-lg overflow-hidden w-full
         backdrop-blur-sm
         border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md transition-all duration-300
        hover:border-gray-300 dark:hover:border-gray-600
        ${Task.completed ? "opacity-90 grayscale-[10%]" : ""}
        ${isHovered ? "scale-[1.01]" : ""}
      `}
    >
      <div className="Task_Card flex items-center gap-3 p-3">
        <Checkbox
          checked={Task.completed}
          onCheckedChange={handleCheckboxChange}
          className={`h-5 w-5 rounded-full border-2 shrink-0 mt-0.5
            data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
            data-[state=checked]:text-white dark:data-[state=checked]:text-white
            transition-colors duration-200
          `}
        />

        <div className="flex-1 min-w-0 space-y-1">
          <h3
            className={`text-sm font-medium line-clamp-2 leading-snug
            text-gray-900 dark:text-gray-100
            ${
              Task.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : ""
            }
          `}
          >
            {Task.text}
          </h3>

          {Task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {Task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border
              text-xs font-medium
              ${priorityStyles[Task.priority]}
            `}
            >
              <Flag className="w-3 h-3" />
              <span className="capitalize hidden sm:inline">{Task.priority}</span>
            </div>

            {Task.dueDate && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300 text-xs">
                <Calendar className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {format(new Date(Task.dueDate), "MMM d, yyyy")}
                </span>
              </div>
            )}

            {Task.category && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs">
                <span className="hidden sm:inline">{Task.category}</span>
              </div>
            )}

            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs
              ${Task.completed ? statusStyles.completed : statusStyles.pending}
            `}
            >
              {Task.completed ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">
                {Task.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity
          duration-200 ease-in-out ml-auto shrink-0
        `}
        >
          <EditTask
            task={Task}
            onUpdate={onUpdate}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-900/20"
            aria-label="Delete Task"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Fixed Progress Indicator */}
      <div className="relative w-full h-1 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full w-full transition-all duration-300
          ${
            Task.completed
              ? "bg-emerald-500 dark:bg-emerald-400"
              : "bg-gray-200 dark:bg-gray-700"
          }
        `}
        />
      </div>
    </motion.div>
  );
}
