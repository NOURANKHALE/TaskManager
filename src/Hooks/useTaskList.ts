import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { useTaskSearchs } from "./useTaskSearch";
import Task from "@/types/Task";

export const useTaskList = (tasks: Task[]) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [statCardOrder, setStatCardOrder] = useState<string[]>([
    "Task Distribution",
    "Upcoming Deadlines",
    "Priority",
  ]);

  const {setFilters,filteredTasks,completedCount,priorityCounts,groupedTasks,} = useTaskSearchs(tasks);

  const toggleSection = (date: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setStatCardOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    const savedOrder = localStorage.getItem("statCardOrder");
    if (savedOrder) {
      setStatCardOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("statCardOrder", JSON.stringify(statCardOrder));
  }, [statCardOrder]);

  return {
    expandedSections,
    statCardOrder,
    toggleSection,
    handleDragEnd,
    setFilters,
    filteredTasks,
    completedCount,
    priorityCounts,
    groupedTasks,
  };
};
