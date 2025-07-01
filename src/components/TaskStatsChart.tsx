'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import Task from '@/types/Task';

const TaskStatsChart = ({ completedTasks, pendingTasks }: Task) => {
  const data = [
    { 
      name: 'Completed', 
      value: completedTasks, 
      icon: <CheckCircle2 className="w-5 h-5 text-[hsl(var(--task-completed))]" />,
      color: 'hsl(var(--task-completed))'
    },
    { 
      name: 'Pending', 
      value: pendingTasks, 
      icon: <Clock className="w-5 h-5 text-[hsl(var(--task-pending))]" />,
      color: 'hsl(var(--task-pending))'
    },
  ];

  const totalTasks = completedTasks + pendingTasks;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full select-none"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="Pie_Chart h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} />
              ))}
            </Pie>
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              dominantBaseline="middle"
              className="text-lg font-semibold fill-foreground"
            >
              {totalTasks} Tasks
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TaskStatsChart;
