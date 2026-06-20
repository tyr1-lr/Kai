import { useState, useEffect } from "react";
import { useAsyncError, useLocation } from "react-router-dom";
import api from "../api";

function Tasks(){
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const [filter, setFilter] = useState("all");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect (() => {
        getTasks();
    }, []);

    const getTasks = () => {
        api.get("/api/tasks/").then((res) => res.data).then((data) => {
            setTasks(data);
            console.log(data);
        })
        .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api.delete(`/api/tasks/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Task deleted!");
            else alert("Failed to delete task.");
            getTasks();
        })
        .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();
        api.post("/api/tasks/", {
            title, 
            description, 
            priority, 
            due_date: dueDate, 
            is_completed: isCompleted,
        }).then((res) => {
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

    if (task){
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
        if (filter === "all"){
            return true
        } else if (filter === "pending"){
            return !task.is_completed;
        } else if (filter === "completed"){
            return task.is_completed;
        }
    });
    const location = useLocation();

    useEffect(() => {
            if (location.state?.openNewTaskModal && !isOpen) {
                openModal(null);
            }
        }, [location.state]);
   
    return(   
        <div>
            <div className="h-22 relative flex items-center px-4 mt-4">
                <h1 className="font-bold text-white text-3xl px-6">
                    Tasks
                </h1>

                <button 
                onClick={() => openModal(null)}
                className="h-12 w-36 mr-20 flex ml-auto items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="M12 5v14"/>
                    </svg>

                    <span>New Task</span>
                </button>
            </div>

            <div className="h-20 px-4 flex items-center gap-18">
                <button
                    onClick={() => setFilter("all")}
                    className={`text-xl cursor-pointer ml-25 pb-2 ${
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
                <ul className="flex px-6 w-full ml-4 max-w-7xl h-[490px] overflow-y-auto flex-col text-white gap-2 rounded-md">   
                {filteredTasks.map((task) => {

                    let priorityColor;

                    if (task.priority === "HIGH") {
                        priorityColor = "bg-red-500/20 text-red-700";
                    } else if (task.priority === "MEDIUM") {
                        priorityColor = "bg-orange-500/20 text-orange-700";
                    } else {
                        priorityColor = "bg-green-500/20 text-green-700";
                    }


                    return(
                        <li
                        key={task.id}
                        className="w-full min-h-[100px] flex-shrink-0 flex flex-row px-5 items-center bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer"
                        onClick={() => openModal(task)}
                        >
                            <div className="flex w-full justify-between items-center px-4 min-w-0 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 ml-6 mr-4 accent-red-500 cursor-pointer px-4"
                                    type="checkbox"
                                    checked={task.is_completed}
                                    onChange={() => toggleTask(task)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            
                                <div className="flex w-full justify-between items-center px-4">
                                    <div className="flex flex-col items-start min-w-0">
                                        <h1 className="text-2xl truncate max-w-[300px]">
                                        {task.title}
                                    </h1>
                                    

                                    <p className="text-1xl truncate max-w-[300px]">
                                        {task.description}
                                    </p>
                                    <span className="text-1xl">
                                        Due: {task.due_date}
                                    </span>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-full ml-auto gap-4">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTask(task.id);
                                            }}
                                            
                                            className="cursor-pointer p-1 rounded-md hover:bg-red-500/10 active:scale-95 transition"
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                                <path d="M3 6h18"/>
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                            </svg>
                                        </button>

                                        <span className={`${priorityColor} h-8 w-16 flex items-center justify-center rounded-md`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

            {isOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    
                    <div className="bg-[#0D1020] px-6 pt-6 rounded-md w-full h-full flex items-center justify-center">
                        <form onSubmit={selectedTask ? editTask : createTask} className="h-160 w-200 border border-[#40424C] bg-[#121726] rounded-lg px-6 flex-col flex pt-10">
                            <div className="flex flex-row ">
                                <h1 className="text-white text-2xl font-bold  px-4 items-center flex">
                                {selectedTask ? "Edit Task" : "Create New Task"}
                                </h1>
                                <button className="ml-auto cursor-pointer"
                                onClick={() => setIsOpen(false)}
                                type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-red-600 text-white mr-4 ml-auto lucide lucide-x-icon lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                </button>
                                
                            </div>
                            
                            <div className="mt-2 flex flex-col gap-1">
                                <h2 className="text-white text-xl mt-4">
                                    Title
                                </h2>
                                <input
                                    className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                    value={title}
                                    placeholder="Enter task title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <h2 className="text-white text-xl mt-4">
                                    Description
                                </h2>
                                <textarea
                                    className="w-full h-32 mb-3 p-2 rounded border-2 border-[#40424C] text-white"
                                    placeholder="Enter task description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-25">
                                        <h1 className="text-white text-xl">
                                            Priority
                                        </h1>
                                        <select 
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        name="priority" className="px-4 mt-4 w-full h-10 bg-[#0D1020] text-white rounded border-2 border-[#40424C]" id="">
                                            <option value="HIGH">High</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="LOW">Low</option>
                                        </select>

                                    </div>
                                    <div className="h-25">
                                        <h1 className="text-white text-xl">
                                            Due Date
                                        </h1>
                                        <input 
                                        type="date" 
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="mt-4 w-full h-10 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-4"/>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-2 text-white text-center">
                                    <input
                                        type="checkbox"
                                        checked={isCompleted}
                                        onChange={(e) => setIsCompleted(e.target.checked)}
                                        className="h-5 w-5 ml-6 mr-4 accent-red-500 cursor-pointer px-4"
                                    />
                                    <h1>Mark as completed</h1>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="w-full h-16 text-white border cursor-pointer border-[#40424C] rounded hover:bg-[#1f2a3d] "
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button type="submit" value="Submit" className="w-full bg-indigo-700 cursor-pointer text-white rounded hover:bg-indigo-600">
                                        {selectedTask ? "Save Changes" : "Create Task"}
                                    </button>
                                </div>
                                
                            </div>
                            
                        </form>
                    </div>
                </div>
            )}
        </div>
        
        
    )
};

export default Tasks;