"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Task from "@/types/Task";

export function useEditTask(task: Task, onUpdate: (id: string, updatedTask: Partial<Task>) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(task.text);
  const [date, setDate] = useState<Date | undefined>(task.dueDate ? new Date(task.dueDate) : undefined);
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task.priority);
  const [showNameError, setShowNameError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setText(task.text);
      setDate(task.dueDate ? new Date(task.dueDate) : undefined);
      setPriority(task.priority);
    }
  }, [isOpen, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setShowNameError(true);
      return;
    }

    const formattedDate = date ? format(date, "yyyy-MM-dd") : undefined;
    onUpdate(task.id, {
      text: text.trim(),
      dueDate: formattedDate,
      priority,
    });
    setShowNameError(false);
    setIsOpen(false);
  };

  const getPriorityColor = (value: string) => {
    switch (value) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return {isOpen,setIsOpen,text,setText,date,setDate,priority,setPriority,showNameError,setShowNameError,handleSubmit,getPriorityColor,};
}
