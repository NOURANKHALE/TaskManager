import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import Task from "@/types/Task";
import { Search } from "@/types/SearchProp";

const INITIAL_SEARCH: Search = {
  search: "",
  priority: "",
  category: "",
  status: "",
} as const;

type Priority = "high" | "medium" | "low";

interface PriorityCounts {
  high: number;
  medium: number;
  low: number;
}

interface GroupedTasks {
  [key: string]: Task[];
}

function useDebounce<T>(callback: (value: T) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );
}

export function useTaskSearch(
  onSearchChange: (filters: Search) => void = () => {}
) {
  const [filters, setFilters] = useState<Search>(INITIAL_SEARCH);
  const [searchInput, setSearchInput] = useState("");

  const handleFilterChange = useCallback(
    (key: keyof Search, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onSearchChange(newFilters);
    },
    [onSearchChange, filters]
  );

  const debouncedSearch = useDebounce((value: string) => {
    handleFilterChange("search", value);
  }, 300);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setSearchInput(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchInput("");
    setFilters(INITIAL_SEARCH);
    onSearchChange(INITIAL_SEARCH);
  }, [onSearchChange]);

  const hasSearch = useMemo(() => Boolean(searchInput), [searchInput]);

  return {
    searchInput,
    handleInputChange,
    clearSearch,
    hasSearch,
  };
}

export function useTaskSearchs(tasks: Task[]) {
  const [filters, setFilters] = useState<Search>(INITIAL_SEARCH);

  const filteredTasks = useMemo(() => {
    if (!tasks?.length) return [];

    return tasks.filter((task) => {
      if (!task) return false;

      const searchText = filters.search.toLowerCase();
      const taskText = (task.text || "").toLowerCase();
      const matchesSearch = !searchText || taskText.includes(searchText);

      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesCategory = !filters.category || task.category === filters.category;
      const matchesStatus = !filters.status || 
        (filters.status === "completed" && task.completed) ||
        (filters.status === "pending" && !task.completed);

      return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
    });
  }, [tasks, filters]);

  const completedCount = useMemo(
    () => filteredTasks.filter((task) => task?.completed).length,
    [filteredTasks]
  );

  const progress = useMemo(
    () => (filteredTasks.length ? Math.round((completedCount / filteredTasks.length) * 100) : 0),
    [filteredTasks, completedCount]
  );

  const priorityCounts = useMemo<PriorityCounts>(() => {
    return filteredTasks.reduce<PriorityCounts>(
      (counts, task) => {
        if (task?.priority && task.priority in counts) {
          counts[task.priority as Priority]++;
        }
        return counts;
      },
      { high: 0, medium: 0, low: 0 }
    );
  }, [filteredTasks]);

  const groupedTasks = useMemo<GroupedTasks>(() => {
    const groups = filteredTasks.reduce<GroupedTasks>((acc, task) => {
      if (!task) return acc;

      const date = task.dueDate instanceof Date
        ? task.dueDate.toLocaleDateString()
        : typeof task.dueDate === "string"
        ? new Date(task.dueDate).toLocaleDateString()
        : "No Due Date";

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(groups).sort(([dateA], [dateB]) => {
        if (dateA === "No Due Date") return 1;
        if (dateB === "No Due Date") return -1;
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      })
    );
  }, [filteredTasks]);

  return {
    filters,
    setFilters,
    filteredTasks,
    completedCount,
    progress,
    priorityCounts,
    groupedTasks,
  };
}
