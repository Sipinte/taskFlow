import { useState, useEffect } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

import type {
  ITask,
  Priority,
  FilterStatus,
} from "./types/task";

function App() {
  const [tasks, setTasks] =
    useState<ITask[]>(() => {
      // Ambil data tasks dari localStorage saat pertama kali render
      const storedTasks =
        localStorage.getItem("tasks");
      return storedTasks
        ? JSON.parse(storedTasks)
        : [];
    });

  const [filter, setFilter] =
    useState<FilterStatus>("Semua");


  // SAVE TASKS TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);
  
  // ADD TASK
  const handleAddTask = (
    title: string,
    priority: Priority
  ) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      title,
      priority,
      done: false,
      createdAt: Date.now(),
    };

    setTasks(((prev) => [
      ...prev,
      newTask,
    ]));
  };

  // TOGGLE TASK
  const handleToggleTask = (
    id: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              id: task.id,
              title : task.title,
              priority: task.priority,
              createdAt: task.createdAt,
              done: task.done === true ? false : true,
            }
          : task 
      )
    );
  };

  // DELETE TASK
  const handleDeleteTask = (
    id: string
  ) => {
    setTasks((prev) =>
      prev.filter(
        (task) => task.id !== id
      )
    );
  };

  // FILTER TASKS
  const filteredTasks =
    tasks.filter((task) => {
      if (filter === "Aktif") {
        return !task.done;
      }

      if (filter === "Selesai") {
        return task.done;
      }

      return true;
    });

  // COUNTERS
  const total = tasks.length;

  const active = tasks.filter(
    (task) => !task.done
  ).length;

  const done = tasks.filter(
    (task) => task.done
  ).length;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <TaskForm
        onAddTask={handleAddTask}
      />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        filter={filter}
        total={total}
        active={active}
        done={done}
        onToggleTask={
          handleToggleTask
        }
        onDeleteTask={
          handleDeleteTask
        }
      />
    </div>
  );
}

export default App;