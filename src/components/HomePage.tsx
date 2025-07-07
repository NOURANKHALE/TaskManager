"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { AddTask } from "@/components/AddTask";
import { useTasks } from "@/Hooks/useTasks";
import { TaskLists } from "@/components/TaskLists";
import  Task  from "@/types/TaskInterface";
import { motion } from "framer-motion";

export default function HomePage() {
  const {  filteredTasks, addTask, deleteTask, updateTask, toggleComplete } = useTasks();

  const handleUpdate = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
  };

  return (
    <div className="Home_Page min-h-screen bg-background transition-colors">
      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-lg border border-white/30 dark:border-white/10"
        >
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-md">
             Task Manager
            </h1>
            <div className="h-8 w-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {filteredTasks.length} tasks
            </span>
          </div>
          <ModeToggle />
        </motion.div>

        {/* Add Task */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-700 p-8 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl z-0" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white tracking-wide">
                Add New Task
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <AddTask onAdd={addTask} />
            </div>
          </div>
        </motion.div>
        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-6 bg-white dark:bg-background rounded-2xl shadow-xl  transition-all"
        >
          
          <TaskLists
            Tasks={filteredTasks}
            onDelete={(id) => {
              const taskToDelete = filteredTasks.find(task => task.id === id);
              if (taskToDelete) deleteTask(taskToDelete);
            } }
            onUpdate={handleUpdate}
            onToggleComplete={toggleComplete}          />
        </motion.div>
      </div>
    </div>
  );
}
