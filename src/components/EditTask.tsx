"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,} from "@/components/ui/dropdown-menu";
import { CalendarIcon, Flag, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import Task from "@/types/TaskInterface";
import { useEditTask } from "@/Hooks/useEditTask";
import { format } from "date-fns";

export interface EditTaskProps {
  task: Task;
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
}

export function EditTask({ task, onUpdate }: EditTaskProps) {
  const {isOpen,setIsOpen,text,setText,date,setDate,priority,setPriority,showNameError,handleSubmit,getPriorityColor,} = useEditTask(task, onUpdate);

  return (
    <div className="Edit_Task">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-muted">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[90vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">
                Edit Your Task
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div>
                <Input
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Task name"
                  className={cn(
                    "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white w-full",
                    showNameError && "border-red-500"
                  )}
                />
                {showNameError && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    Task name is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    Due Date
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 w-auto">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Flag className={cn("h-4 w-4", getPriorityColor(priority))} />
                    Priority
                  </label>
                  <Select
                    value={priority}
                    onValueChange={(val) => setPriority(val as "low" | "medium" | "high")}
                  >
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/70 text-white">
                  Save
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
