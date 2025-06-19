"use client";
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Icon from "../components/Icon";
import EditModal from "../components/EditModal";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isEditing, setIsEditing] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const initialTasks: Task[] = [
        { id: 1, text: "Build a cool Todo App", completed: true },
        { id: 2, text: "Learn Next.js features", completed: false },
        { id: 3, text: "Style it with Tailwind CSS", completed: true },
      ];
      setTasks(initialTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskObject: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([newTaskObject, ...tasks]);
    setNewTask("");
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    setIsEditing(null);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  return (
    <div className="max-w-xl md:max-w-2xl mx-10 md:mx-auto mt-20 ">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl  font-extrabold tracking-tight text-gray-900 dark:text-white">
          Todo App
        </h1>
      </header>

      <form onSubmit={handleAddTask} className="mb-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full pl-4 pr-12 py-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <button
            type="submit"
            aria-label="Add new task"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
            disabled={!newTask.trim()}
          >
            <Icon path="M12 4.5v15m7.5-7.5h-15" className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {tasksLeft} {tasksLeft === 1 ? "task" : "tasks"} left
          </span>
          <div className="flex space-x-2">
            {["all", "active", "completed"].map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f as "all" | "active" | "completed")}
                className={`${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                } text-sm`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading tasks...</div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="p-4 flex items-center justify-between group transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div
                    className="flex items-center flex-grow cursor-pointer"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                        task.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400 dark:border-gray-500"
                      }`}
                    >
                      {task.completed && (
                        <Icon
                          path="M4.5 12.75l6 6 9-13.5"
                          className="w-4 h-4 text-white"
                        />
                      )}
                    </div>
                    <span
                      className={`flex-grow text-gray-700 dark:text-gray-300 ${
                        task.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(task);
                      }}
                      aria-label="Edit task"
                      className="text-blue-500 hover:text-blue-700 p-2"
                    >
                      <Icon
                        path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        className="w-5 h-5"
                      />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                      aria-label="Delete task"
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Icon
                        path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        className="w-5 h-5"
                      />
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-8 text-center text-gray-500">
                No tasks here.{" "}
                {filter === "completed"
                  ? "Time to complete some!"
                  : "Add one above!"}
              </li>
            )}
          </ul>
        )}
      </div>

      {isEditing && (
        <EditModal
          task={isEditing}
          onSave={handleEditTask}
          onCancel={() => setIsEditing(null)}
        />
      )}
    </div>
  );
};

export default TodoApp;
