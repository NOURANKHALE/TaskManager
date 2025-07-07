

# 📝 Task Manager

A modern, feature-rich task management (To-Do List) web application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. This app helps you organize, prioritize, and track your tasks with a beautiful, interactive UI and advanced features like drag-and-drop, statistics, and deadline tracking.

---

## ✨ Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| ➕ Add/Edit/Delete     | Quickly create, update, or remove tasks                                      |
| ⚡ Prioritization      | Assign High, Medium, Low priorities and visualize distribution                |
| ⏰ Due Dates           | Set due dates and view upcoming deadlines                                    |
| ✅ Completion         | Mark tasks as complete/incomplete with a click                               |
| 🔍 Search & Filter    | Instantly search and filter by text, priority, category, or status            |
| 🗓️ Timeline           | View tasks grouped by due date in a collapsible timeline                     |
| 📊 Statistics         | Visualize progress with charts and summary cards                              |
| 🖱️ Drag-and-Drop      | Reorder statistics cards (powered by dnd-kit)                                |
| 🌗 Dark/Light Mode    | Toggle between dark and light themes                                         |
| 💾 Persistent Storage | Tasks saved in your browser's localStorage                                    |
| 📱 Responsive         | Fully responsive and accessible UI                                           |

---



## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd taskmanager
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## 🛠️ Tech Stack

| Category     | Tech/Library         |
|--------------|---------------------|
| Framework    | [Next.js](https://nextjs.org/) |
| Language     | [TypeScript](https://www.typescriptlang.org/) |
| UI           | [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
| State/Anim.  | [framer-motion](https://www.framer.com/motion/), [dnd-kit](https://dndkit.com/) |
| Charts       | [Recharts](https://recharts.org/) |
| Icons        | [Lucide](https://lucide.dev/) |
| Theme        | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## 📦 Project Structure

- `src/app/` — Next.js app entry, layout, and global styles
- `src/components/` — UI components (Task cards, lists, stats, dialogs, etc.)
- `src/Hooks/` — Custom React hooks for task logic
- `src/types/` — TypeScript interfaces and types
- `src/utils/` — Utility functions

---

## 📊 Screens & Components

- **Home Page**: Overview of all tasks, add new task, statistics, and timeline
- **Add/Edit Task**: Dialogs for creating and updating tasks (with validation)
- **Task List & Timeline**: Grouped by due date, expandable sections
- **Task Card**: Shows task details, priority, due date, completion, edit/delete actions
- **Statistics Cards**: Task distribution, upcoming deadlines, priority breakdown
- **Search Bar**: Filter tasks instantly
- **Theme Toggle**: Switch between dark and light mode

---

## 📝 Customization
- **Styling**: Easily customize via Tailwind CSS and the config files
- **Persistence**: Uses localStorage by default; can be extended for backend integration




