import { useState } from "react";
import { format } from "date-fns";
import Task from "@/types/TaskInterface";

export function useAddTask(onAdd: (Task: Omit<Task, "id" | "completed">) => void) {
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date>();
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setShowNameError(true);
      return;
    }

    setShowNameError(false);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    onAdd({
      text: text.trim(),
      dueDate: formattedDate,
      priority: priority,
      completedTasks: 0,
      pendingTasks: 0,
      totalTasks: 0,
      category: "",
    });

    // Reset state
    setText("");
    setDate(undefined);
    setPriority("medium");
    setIsExpanded(false);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (!text.trim()) setShowNameError(true);
  };

  const handlePriorityChange = (value: "low" | "medium" | "high") => {
    setPriority(value);
    if (!text.trim()) setShowNameError(true);
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

  return {
    text,
    setText,
    date,
    priority,
    isExpanded,
    setIsExpanded,
    showNameError,
    setShowNameError,
    handleSubmit,
    handleDateSelect,
    handlePriorityChange,
    getPriorityColor,
  };
}
