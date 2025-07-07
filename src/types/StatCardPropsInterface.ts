import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
export default interface StatCardProps {
    id: string;
    title: string;
    value?: number | string;
    icon?: React.ReactNode;
    gradient?: string;
    borderColor?: string;
    textColor?: string;
    badgeColor: string;
    children?: React.ReactNode;
    onDragStart?: (event: DragStartEvent) => void;
    onDragOver?: (event: DragOverEvent) => void;
    onDragEnd?: (event: DragEndEvent) => void;
}
