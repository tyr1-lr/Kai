import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Tasks(){
    const [filter, setFilter] = useState("all")
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openModal = (task = null) => {
    setSelectedTask(task);
    setIsOpen(true);
    };
    const tasks = [
        {
            id: 1,
            title: "Study Django Models",
            description: "Learn about Django models, fields, and relationship.",
            priority: "High",
            done: false,
            dueDate: "2026-06-10",
        },
        {
            id: 2,
            title: "Build Kai Backend",
            description: "Setup Django project and create API endpoints.",
            priority: "Medium",
            done: false,
            dueDate: "2026-06-15",
        },
        {
            id: 3,
            title: "Learn React Basics",
            description: "Learn components, props, and states.",
            priority: "Low",
            done: true,
            dueDate: "2026-06-05",
        },
        {
            id: 4,
            title: "Learn React Basics",
            description: "Learn components, props, and states.",
            priority: "Low",
            done: true,
            dueDate: "2026-06-05",
        },
        {
            id: 5,
            title: "Learn React Basics",
            description: "Learn components, props, and states.",
            priority: "Low",
            done: true,
            dueDate: "2026-06-05",
        },
        {
            id: 6,
            title: "Learn React Basics",
            description: "Learn components, props, and states.",
            priority: "Low",
            done: true,
            dueDate: "2026-06-05",
        },
    ];

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all"){
            return true
        } else if (filter === "pending"){
            return !task.done;
        } else if (filter === "completed"){
            return task.done;
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

                    if (task.priority === "High") {
                        priorityColor = "bg-red-500/20 text-red-700";
                    } else if (task.priority === "Medium") {
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
                                        Due: {task.dueDate}
                                    </span>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-full ml-auto gap-4">
                                        <button 
                                            onClick={(e) => e.stopPropagation()} 
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
                        <div className="h-160 w-200 border border-[#40424C] bg-[#121726] rounded-lg px-6 flex-col flex pt-10">
                            <div className="flex flex-row ">
                                <h1 className="text-white text-2xl font-bold mb-4 px-4 items-center flex">
                                {selectedTask ? "Edit Task" : "Create New Task"}
                                </h1>
                                <button className="ml-auto cursor-pointer"
                                onClick={() => setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-red-600 text-white mr-4 ml-auto lucide lucide-x-icon lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                </button>
                                
                            </div>
                            
                            <div className="mt-6 flex flex-col gap-1">
                                <h2 className="text-white text-xl mt-4">
                                    Title
                                </h2>
                                <input
                                    className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                    placeholder="Enter task title"
                                    defaultValue={selectedTask?.title || ""}
                                />

                                <h2 className="text-white text-xl mt-4">
                                    Description
                                </h2>
                                <textarea
                                    className="w-full h-32 mb-3 p-2 rounded border-2 border-[#40424C] text-white"
                                    placeholder="Enter task description..."
                                    defaultValue={selectedTask?.description || ""}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-25">
                                        <h1 className="text-white text-xl">
                                            Priority
                                        </h1>
                                        <select name="priority" className="px-4 mt-4 w-full h-10 bg-[#0D1020] text-white rounded border-2 border-[#40424C]" id="">
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>

                                    </div>
                                    <div className="h-25">
                                        <h1 className="text-white text-xl">
                                            Due Date
                                        </h1>
                                        <input type="date" className="mt-4 w-full h-10 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-4"/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        className="w-full h-16 text-white border cursor-pointer border-[#40424C] rounded hover:bg-[#1f2a3d] "
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button className="w-full bg-indigo-700 cursor-pointer text-white rounded hover:bg-indigo-600">
                                        {selectedTask ? "Save Changes" : "Create Task"}
                                    </button>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
        
        
    )
};

export default Tasks;