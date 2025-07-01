import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import StatCardProps from "@/types/StatCardProps";

export const StatCard = ({id,title,value,gradient,borderColor,textColor,badgeColor,children,}: StatCardProps) => {
  const {attributes,listeners,setNodeRef,transform,transition,isDragging,} = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.7 : 1,
    scale: isDragging ? 0.98 : 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="Stat_Card"
    >
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "group",
          gradient,
          "rounded-2xl p-6 shadow-md w-full h-[280px] transition-all duration-300",
          borderColor,
          "cursor-grab active:cursor-grabbing select-none",
          isDragging && "ring-2 ring-accent ring-offset-2"
        )}
        tabIndex={0} // Accessibility: focusable
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={cn(
              "text-lg font-semibold",
              textColor
            )}
          >
            {title}
          </h3>
          <Badge
            variant="secondary"
            className={cn("text-sm font-medium", textColor, badgeColor)}
          >
            {value}
          </Badge>
        </div>

        <div className="overflow-hidden text-sm  text-muted-foreground">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
