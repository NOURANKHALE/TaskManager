"use client";
import { useState, useEffect } from "react";
import Task from "@/types/TaskInterface";
import { useTaskSearchs } from "./useTaskSearch";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const {setFilters,filteredTasks,completedCount,progress,priorityCounts,groupedTasks,} = useTaskSearchs(tasks);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem("tasks");
        if (!storedTasks) {
          setTasks([]);
          return;
        }

        const parsedTasks = JSON.parse(storedTasks);
        if (!Array.isArray(parsedTasks)) {
          console.error("Stored tasks is not an array");
          setTasks([]);
          return;
        }

        // Ensure dates are properly parsed and IDs are strings
        const tasksWithDates = parsedTasks.map((task: Partial<Task>) => ({
          ...task,
          id: String(task.id), // Ensure ID is a string
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          completed: Boolean(task.completed),
          text: String(task.text || ""),
          description: task.description ? String(task.description) : undefined,
          priority: task.priority || "medium", // Default to medium if not specified
          category: task.category || undefined,
          totalTasks: task.totalTasks || 0,
          completedTasks: task.completedTasks || 0,
          pendingTasks: task.pendingTasks || 0,
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: String(Date.now()),
      completed: false,
      priority: task.priority || "medium", // Default to medium if not specified
      totalTasks: task.totalTasks || 0,
      completedTasks: task.completedTasks || 0,
      pendingTasks: task.pendingTasks || 0,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (taskToDelete: Task) => {
    const newTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const toggleComplete = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return {
    tasks,
    filteredTasks,
    completedCount,
    progress,
    priorityCounts,
    groupedTasks,
    addTask,
    deleteTask,
    updateTask,
    toggleComplete,
    setFilters,
    setTasks,
  };
}
