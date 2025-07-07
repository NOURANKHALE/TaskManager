/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TaskSearch } from "./TaskSearch";
import { Badge } from "./ui/badge";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import TaskStatsChart from "./TaskStatsChart";
import { UpcomingDeadlinesCard } from "@/components/UpcomingDeadline";
import { StatCard } from "./StatCard";
import { TaskTimeline } from "./TaskTimeline";
import { TaskListHeader } from "./TaskListHeader";
import {DndContext,KeyboardSensor,PointerSensor,useSensor,useSensors,closestCenter,} from "@dnd-kit/core";
import {SortableContext,rectSortingStrategy,sortableKeyboardCoordinates,} from "@dnd-kit/sortable";
import TaskListProps  from "@/types/TaskListPropInterface";
import { useTaskList } from "@/Hooks/useTaskList";
import dynamic from 'next/dynamic';

// Create a client-side only component for the DnD context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DndWrapper = dynamic(() => Promise.resolve(({ sensors, handleDragEnd, statCardOrder, statCards }: any) => (
  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext items={statCardOrder} strategy={rectSortingStrategy}>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {statCardOrder.map((title: string) => {
          const card = statCards.find((card: any) => card.title === title);
          return card ? <StatCard key={card.id} {...card} /> : null;
        })}
      </div>
    </SortableContext>
  </DndContext>
)), { ssr: false });

export function TaskLists({ Tasks = [], onDelete, onUpdate, onToggleComplete }: TaskListProps) {
  const {statCardOrder,expandedSections,handleDragEnd,toggleSection,setFilters,filteredTasks,completedCount,priorityCounts,groupedTasks,} = useTaskList(Tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const statCards = [
    {
      id: "Task Distribution",
      title: "Task Distribution",
      gradient: "bg-gradient-to-br from-gray-400/90 to-gray-400/30 dark:from-violet-900/20 dark:to-purple-900/20",
      borderColor: "border  dark:border-violet-800",
      badgeColor: "bg-violet-100 dark:bg-violet-900/30",
      children: (
        <TaskStatsChart
          id=""
          text=""
          completed={false}
          priority="medium"
          totalTasks={filteredTasks.length}
          completedTasks={completedCount}
          pendingTasks={filteredTasks.length - completedCount}
        />
      ),
    },
    {
      id: "Upcoming Deadlines",
      title: "Upcoming Deadlines",
      gradient: "bg-gradient-to-br from-gray-400/90 to-gray-400/30 dark:from-violet-900/20 dark:to-purple-900/20",
      borderColor: "border  dark:border-violet-800",
      badgeColor: "bg-violet-100 dark:bg-violet-900/30",
      children: <UpcomingDeadlinesCard Tasks={Tasks} />,
    },
    {
      id: "Priority",
      title: "Priority",
      gradient: "bg-gradient-to-br from-gray-400/90 to-gray-400/30 dark:from-violet-900/20 dark:to-purple-900/20",
      borderColor: "border  dark:border-violet-800",
      badgeColor: "bg-violet-100 dark:bg-violet-900/30",
      children: (
        <div className="space-y-3">
          {["high", "medium", "low"].map((level) => {
            const colors = {
              high: ["bg-rose-500/50", "text-rose-900", "dark:bg-rose-900/20", "dark:text-rose-300"],
              medium: ["bg-amber-400/90", "text-amber-700", "dark:bg-amber-900/20", "dark:text-amber-300"],
              low: ["bg-emerald-300", "text-emerald-700", "dark:bg-emerald-900/20", "dark:text-emerald-300"],
            };

            const [bg, text, darkBg, darkText] = colors[level as 'high' | 'medium' | 'low'];

            return (
              <div key={level} className={`flex justify-between p-3 rounded-lg ${bg} ${darkBg}`}>
                <span className={`text-sm font-medium ${text} ${darkText}`}>
                  {level[0].toUpperCase() + level.slice(1)}
                </span>
                <Badge variant="secondary" className={`${text} ${darkText} bg-opacity-20`}>
                  {priorityCounts[level as keyof typeof priorityCounts]}
                </Badge>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="Task_List flex justify-center p-4">
        <div className="w-1/2">
          <TaskSearch onSearchChange={setFilters} hasResults={filteredTasks.length > 0} isLoading={false} />
        </div>
      </div>

      <div className="space-y-6">
        <DndWrapper 
          sensors={sensors}
          handleDragEnd={handleDragEnd}
          statCardOrder={statCardOrder}
          statCards={statCards}
        />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center p-6">Your tasks</h1>

        <TaskListHeader
          totalTasks={filteredTasks.length}
          completedTasks={completedCount}
          completed={false}
          pendingTasks={0}
          id=""
          text=""
          priority="high"
        />

        <TaskTimeline
          groupedTasks={groupedTasks}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onToggleComplete={onToggleComplete}
        />

        {Object.keys(groupedTasks).length === 0 && (
          <div className="p-8 text-center">
            <ClipboardList className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">No tasks found</h3>
            <p className="text-gray-400 dark:text-gray-500 mt-1">Try adjusting your filters or create new tasks</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
