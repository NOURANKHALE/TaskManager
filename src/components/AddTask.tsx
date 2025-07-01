"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { CalendarIcon, Plus, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useAddTask } from "@/Hooks/useAddTask"; 
import Task from "@/types/Task";

export interface AddTaskProps {
  onAdd: (Task: Omit<Task, "id" | "completed">) => void;
}

export function AddTask({ onAdd }: AddTaskProps) {
  const {text,setText,date,priority,isExpanded,setIsExpanded,showNameError,setShowNameError,handleSubmit,handleDateSelect,handlePriorityChange,getPriorityColor,} = useAddTask(onAdd);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
      initial={false}
      animate={{ height: isExpanded ? "auto" : "auto" }}
    >
      <div className="Add_Task flex flex-col sm:flex-row gap-2 w-full">
        <div className="relative w-full flex flex-col">
          <Input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) setShowNameError(false);
            }}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
            className={cn(
              "w-full h-12 bg-white/90 dark:bg-gray-800/90 border-white/20 dark:border-gray-700/50 focus:border-white dark:focus:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500",
              showNameError && "border-red-500 focus:border-red-500"
            )}
          />
          {showNameError && (
            <p className="text-xs text-red-700 mt-1 dark:text-red-900">
              Task name is required
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full sm:w-auto bg-white/90 dark:bg-gray-800/90 border-white/20 dark:border-gray-700/50",
                  "hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white",
                  !date && "text-green-600 dark:text-green-500",
                  date && "border-white dark:border-gray-600"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date) : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={priority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="h-12 w-full sm:w-[160px] bg-white/90 dark:bg-gray-800/90 border-white/20 dark:border-gray-700/50 text-gray-900 dark:text-white">
              <div className="flex items-center">
                <Flag
                  className={cn("mr-2 h-4 w-4", getPriorityColor(priority))}
                />
                <SelectValue placeholder="Priority" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="h-12 w-full sm:w-auto px-6 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} className="mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
