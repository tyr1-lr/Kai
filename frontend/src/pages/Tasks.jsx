import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    api
      .get("/api/tasks/")
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => alert(err));
  };

  const deleteTask = (id) => {
    api
      .delete(`/api/tasks/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Task deleted!");
        else alert("Failed to delete task.");
        getTasks();
      })
      .catch((error) => alert(error));
  };

  const createTask = (e) => {
    e.preventDefault();
    api
      .post("/api/tasks/", {
        title,
        description,
        priority,
        due_date: dueDate,
        is_completed: isCompleted,
      })
      .then((res) => {
        if (res.status === 201) alert("Task is created!");
        else alert("Failed to create task.");
        setIsOpen(false);
        getTasks();
      })
      .catch((err) => alert(err));
  };

  const editTask = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/tasks/${selectedTask.id}/`, {
        title,
        description,
        priority,
        due_date: dueDate,
        is_completed: isCompleted,
      });

      alert("Task updated!");
      setIsOpen(false);
      getTasks();
    } catch (err) {
      alert(err);
    }
  };

  const openModal = (task = null) => {
    setSelectedTask(task);

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.due_date || "");
      setIsCompleted(task.is_completed);
    } else {
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setIsCompleted(false);
    }

    setIsOpen(true);
  };

  const toggleTask = async (task) => {
    await api.patch(`/api/tasks/${task.id}/`, {
      is_completed: !task.is_completed,
    });

    getTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "pending") {
      return !task.is_completed;
    } else if (filter === "completed") {
      return task.is_completed;
    }
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openNewTaskModal && !isOpen) {
      openModal(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (!location.state?.openTaskId || tasks.length === 0) return;

    const task = tasks.find((t) => t.id === location.state.openTaskId);

    if (task) {
      openModal(task);
    }
  }, [tasks, location.state]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-22 flex items-center px-4 md:px-8 mt-4">
        <h1 className="font-bold text-white text-2xl md:text-3xl">Tasks</h1>

        <button
          onClick={() => openModal(null)}
          className="h-12 w-36 ml-auto flex items-center justify-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer hover:bg-[#1f2a3d]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>

          <span>New Task</span>
        </button>
      </div>

      <div className="h-20 px-4 md:px-8 flex items-center gap-6 md:gap-18">
        <button
          onClick={() => setFilter("all")}
          className={`text-lg md:text-xl cursor-pointer pb-2 ${
            filter === "all"
              ? "text-white border-b-2 border-purple-500"
              : "text-gray-400"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`text-xl cursor-pointer pb-2 ${
            filter === "pending"
              ? "text-white border-b-2 border-purple-500"
              : "text-gray-400"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`text-xl cursor-pointer pb-2 ${
            filter === "completed"
              ? "text-white border-b-2 border-purple-500"
              : "text-gray-400"
          }`}
        >
          Completed
        </button>
      </div>
      <ul className="flex px-4 md:px-8 w-full h-[calc(100vh-230px)] overflow-y-auto overflow-x-hidden flex-col text-white gap-2 rounded-md">
        {filteredTasks.map((task) => {
          let priorityColor;

          if (task.priority === "HIGH") {
            priorityColor = "bg-red-500/20 text-red-700";
          } else if (task.priority === "MEDIUM") {
            priorityColor = "bg-orange-500/20 text-orange-700";
          } else {
            priorityColor = "bg-green-500/20 text-green-700";
          }

          return (
            <li
              key={task.id}
              className="w-full min-h-[100px] flex-shrink-0 flex items-center px-3 md:px-5 bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer"
              onClick={() => openModal(task)}
            >
              <div className="flex w-full justify-between items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  className="h-5 w-5 shrink-0 accent-red-500 cursor-pointer"
                  checked={task.is_completed}
                  onChange={() => toggleTask(task)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex flex-1 justify-between items-center gap-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-lg md:text-2xl truncate">
                      {task.title}
                    </h1>

                    <p className="text-sm md:text-base truncate">
                      {task.description}
                    </p>
                    <span className="text-1xl">Due: {task.due_date}</span>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="cursor-pointer p-1 rounded-md hover:bg-red-500/10 active:scale-95 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                    <span
                      className={`${priorityColor} h-8 w-16 flex items-center justify-center rounded-md`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={selectedTask ? editTask : createTask}
            className="w-[95%] sm:w-[500px] lg:w-[800px] max-h-[90vh] overflow-y-auto border border-[#40424C] bg-[#121726] rounded-lg px-3 sm:px-4 md:px-6 flex flex-col pt-4 sm:pt-6"
          >
            <div className="flex flex-row ">
              <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-bold px-4 items-center flex">
                {selectedTask ? "Edit Task" : "Create New Task"}
              </h1>
              <button
                className="ml-auto cursor-pointer"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hover:text-red-600 text-white mr-4 ml-auto lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <h2 className="text-white text-base sm:text-lg lg:text-xl mt-1">
                Title
              </h2>
              <input
                className="w-full mb-1 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                value={title}
                placeholder="Enter task title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <h2 className="text-white text-base sm:text-lg lg:text-xl mt-2">
                Description
              </h2>
              <textarea
                className="w-full h-24 sm:h-28 mb-2 p-2 rounded border-2 border-[#40424C] text-white"
                placeholder="Enter task description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h1 className="text-white text-base sm:text-lg lg:text-xl">
                    Priority
                  </h1>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    name="priority"
                    className="px-4 mt-2 w-full h-10 bg-[#0D1020] text-white rounded border-2 border-[#40424C]"
                    id=""
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                <div>
                  <h1 className="text-white text-base sm:text-lg lg:text-xl">
                    Due Date
                  </h1>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-2 w-full h-10 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-4"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-2 mt-2 text-white text-center">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                  className="h-5 w-5 ml-6 mr-4 accent-red-500 cursor-pointer px-4"
                />
                <h1 className="text-sm sm:text-base">Mark as completed</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 mb-4">
                <button
                  type="button"
                  className="w-full h-10 sm:h-12 text-white border cursor-pointer border-[#40424C] rounded hover:bg-[#1f2a3d]"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  value="Submit"
                  className="w-full h-10 sm:h-12 bg-indigo-700 cursor-pointer text-white rounded hover:bg-indigo-600"
                >
                  {selectedTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tasks;
