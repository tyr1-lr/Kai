import { useEffect, useState } from "react";
import { BookOpenText, BriefcaseBusiness, WalletMinimal, Sprout, Pencil, Trash2 } from "lucide-react";
import api from "../api";

function Goals(){
    const [goals, setGoals] = useState([]);
    const [filter, setFilter] = useState("ALL")
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
            title: "",
            description: "",
            category: "LEARNING",
            priority: "MEDIUM",
            target_date: "",   
            milestones: [],
        });

        const openModal = (goal = null) => {
        setSelectedGoal(goal);

        if (goal) {
            setFormData({
                title: goal.title,
                description: goal.description,
                category: goal.category,
                priority: goal.priority,
                target_date: goal.target_date,
                milestones: goal.milestones,
            });
        } else {
            setFormData({
                title: "",
                description: "",
                category: "LEARNING",
                priority: "MEDIUM",
                target_date: "",
                milestones: [],
            });
        }

        setIsOpen(true);
    };

    useEffect (() => {
        getGoals();
    }, []);

    const getGoals = () => {
        api.get("/api/goals/").then((res) => res.data).then((data) => {
            setGoals(data);
            console.log(data);
        })
        .catch((err) => alert(err));
    };

    const deleteGoal = async (id) => {
        try {
            const res = await api.delete(`/api/goals/delete/${id}/`);

            if (res.status === 204) {
                alert("Goal deleted!");
                getGoals();
            } else {
                alert("Failed to delete goal.");
            }
        } catch (err) {
            console.log(err.response?.data);
            alert("Failed to delete goal.");
        }
    };

    const createGoal = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/goals/", {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                priority: formData.priority,
                target_date: formData.target_date,
            });

            const goal = res.data;

            for (const milestone of formData.milestones) {
                await createMilestone(goal.id, milestone);
            }

            alert("Goal created!");

            setIsOpen(false);
            getGoals();

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    const editGoal = async (e) => {
        e.preventDefault();

        try {
            await api.patch(`/api/goals/${selectedGoal.id}/`, {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                priority: formData.priority,
                target_date: formData.target_date,
            });

            for (const milestone of formData.milestones) {

                if (milestone.isNew) {
                    await createMilestone(selectedGoal.id, milestone);
                } else {
                    await editMilestone(milestone.id, milestone);
                }
            }

            alert("Goal updated!");
            setIsOpen(false);
            getGoals();

        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);
            alert(JSON.stringify(err.response?.data));
        }
    };

    const addMilestone = () => {
        setFormData(prev => ({
            ...prev,
            milestones: [
                ...prev.milestones,
                {
                    id: Date.now(),
                    title: "",
                    is_completed: false,
                    isNew: true,
                },
            ],
        }));
    };

    const createMilestone = async (goalId, milestone) => {
        await api.post(`/api/goals/${goalId}/milestones/`, {
            title: milestone.title,
            is_completed: milestone.is_completed,
        });
    };

    const editMilestone = async (id, milestone) => {
        await api.patch(`/api/milestones/${id}/`, {
            title: milestone.title,
            is_completed: milestone.is_completed,
        });
    };

    const deleteMilestone = async (id) => {
        await api.delete(`/api/milestones/delete/${id}/`);
    };

    const activeGoals = goals.filter(goal => goal.progress < 100).length;

    const completedGoals = goals.filter(goal => goal.progress === 100).length;

    const successRate =
        goals.length === 0
            ? 0
            : Math.round((completedGoals / goals.length) * 100);

    const upcomingDeadlines = goals.filter(goal => {
        const today = new Date();

        const next30 = new Date();
        next30.setDate(today.getDate() + 30);

        const deadline = new Date(goal.target_date);

        return (
            deadline >= today &&
            deadline <= next30 &&
            goal.progress < 100
        );
    }).length;
  

    return(
            <div>
                <div className="h-22 relative flex items-center px-4 mt-2">
                    <h1 className="font-bold text-white text-3xl ml-20">
                            Goals
                    </h1>

                    <button 
                        onClick={() => openModal(null)}
                        className="h-12 w-36 mr-20 flex ml-auto items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                            </svg>

                            <span>New Goal</span>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 px-16">
                <div className="bg-[#1A2233] rounded-xl h-35 p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-blue-300 font-bold text-xl">
                            Active Goals
                        </h1>

                        <span className="text-white text-5xl ">
                            {activeGoals}
                        </span>
                            
                        <p className="text-white text-sm">
                            In progress
                        </p>
                    </div>

                    <div className="text-blue-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    </div>
                </div>

                <div className="bg-[#1D2F29] rounded-xl h-35 p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-green-300 font-bold text-xl">
                            Completed Goals
                        </h1>

                        <span className="text-white text-5xl ">
                            {completedGoals}
                        </span>
                            
                        <p className="text-white text-sm">
                            Completed
                        </p>
                    </div>

                    <div className="text-green-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
                    </div>
                </div>

                <div className="bg-[#2B2146] rounded-xl h-35 p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-purple-300 font-bold text-xl">
                            Success Rate
                        </h1>

                        <span className="text-white text-5xl ">
                            {successRate}%
                        </span>
                            
                        <p className="text-white text-sm">
                            This year
                        </p>
                    </div>

                    <div className="text-purple-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16v5"/><path d="M16 14.639V21"/><path d="M20 10.656V21"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18.463V21"/><path d="M8 14.656V21"/></svg>
                    </div>
                </div>

                <div className="bg-[#3A2A1E] rounded-xl h-35 p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-orange-300 font-bold text-xl">
                            Upcoming Deadlines
                        </h1>

                        <span className="text-white text-5xl ">
                            {upcomingDeadlines}
                        </span>
                            
                        <p className="text-white text-sm">
                            Next 30 days
                        </p>
                    </div>

                    <div className="text-orange-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    </div>
                </div>
            </div>

            <div className="h-20 px-4 flex items-center items-start h-full flex-col gap-4">
                <div className="flex flex-row items-left h-8 gap-6 mt-5">
                    <button
                        onClick={() => setFilter("All")}
                        className={`text-xl cursor-pointer ml-25 pb-2 ${
                            filter === "All"
                                ? "text-white border-b-2 border-purple-500"
                                : "text-gray-400"
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("Active")}
                        className={`text-xl cursor-pointer pb-2 ${
                            filter === "Active"
                                ? "text-white border-b-2 border-purple-500"
                                : "text-gray-400"
                        }`}
                    >
                        Active Goals
                    </button>

                    <button
                        onClick={() => setFilter("Completed")}
                        className={`text-xl cursor-pointer pb-2 ${
                            filter === "Completed"
                                ? "text-white border-b-2 border-purple-500"
                                : "text-gray-400"
                        }`}
                    >
                        Completed
                    </button>
                </div>
                
                <div className=" h-[370px] overflow-y-auto">
                    <ul className="flex ml-10 w-[1190px] flex-col text-white gap-2 rounded-md">
                        {goals
                            .filter((goal) => {
                                if (filter === "Active") {
                                    return goal.progress < 100;
                                }

                                if (filter === "Completed") {
                                    return goal.progress === 100;
                                }

                                return true;
                            })
                            .map((goal) => {
                                const priorityColors = {
                                    HIGH: "bg-red-500/20 text-red-400",
                                    MEDIUM: "bg-orange-500/20 text-orange-400",
                                    LOW: "bg-green-500/20 text-green-400",
                                };

                                const categoryConfig = {
                                    LEARNING: {
                                        icon: BookOpenText,
                                        color: "bg-purple-700 text-white",
                                    },
                                    CAREER: {
                                        icon: BriefcaseBusiness,
                                        color: "bg-blue-700 text-white",
                                    },
                                    FINANCE: {
                                        icon: WalletMinimal,
                                        color: "bg-green-700 text-white",
                                    },
                                    PERSONAL_GROWTH: {
                                        icon: Sprout,
                                        color: "bg-orange-700 text-white",
                                    },
                                };

                                const priorityColor = priorityColors[goal.priority];
                                const CategoryIcon = categoryConfig[goal.category]?.icon || Sprout;
                                const iconColor = categoryConfig[goal.category]?.color || "bg-gray-700 text-white";


                            return(
                                <li key={goal.id} className="w-full h-30 flex flex-row px-5 items-center bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer" onClick={() => openModal(goal)}>
                                    <div className="w-full h-30 flex flex-row px-3 items-center cursor-pointer ">
                                        <div className={`${iconColor} h-[60px] w-[60px] rounded-full flex items-center justify-center`}>
                                            <CategoryIcon className="h-8 w-8"/>
                                        </div>

                                        <div className="flex w-full justify-between items-center px-4">
                                            <div className="flex flex-col items-start w-[300px]">
                                                <h1 className="text-lg">
                                                    {goal.title}
                                                </h1>
                                            
                                                <p className="text-sm">
                                                    {goal.description.length > 40
                                                        ? goal.description.slice(0, 40) + "..."
                                                        : goal.description}
                                                </p>
                                            </div>
                                            
                                            <div className="w-120">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>{goal.progress}%</span>
                                                    <span>
                                                        {
                                                        goal.milestones.filter(m => m.is_completed).length
                                                        }
                                                        /
                                                        {goal.milestones.length}
                                                    </span>
                                                </div>

                                                <div className="w-full h-2 bg-[#2A3145] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-purple-500 transition-all duration-300"
                                                        style={{
                                                            width: `${goal.progress}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className="flex items-center text-red-400 hover:text-red-300 cursor-pointer ml-6"
                                                onClick={async (e) => {
                                                    e.stopPropagation();

                                                    if (!window.confirm(`Delete "${goal.title}"?`)) return;

                                                    await deleteGoal(goal.id);
                                                }}
                                            >
                                                <Trash2 size={22} />
                                            </button>

                                            <div className="flex flex-col items-end justify-between h-full ml-auto gap-4">
                                                <span>
                                                    {goal.target_date}
                                                </span>

                                                <span className={`${priorityColor} h-8 w-16 flex items-center justify-center rounded-md`}>
                                                    {goal.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            {isOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0D1020] px-6 pt-6 rounded-md w-full h-full flex items-center justify-center">
                        <form onSubmit={selectedGoal ? editGoal : createGoal} className="h-160 w-400 border border-[#40424C] bg-[#121726] rounded-lg px-2 flex-col flex pt-4">
                            <div className="flex flex-row items-center justify-center px-2">
                                <h1 className="text-white text-lg font-bold px-4 items-center flex">
                                {selectedGoal ? "Edit Goal" : "Create New Goal"}
                                </h1>
                                <button 
                                type="button"
                                className="ml-auto cursor-pointer text-base flex flex-row items-center justify-center"
                                onClick={() => setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-red-600 text-white mr-4 ml-auto lucide lucide-x-icon lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                </button>    
                            </div>

                            <div className="grid grid-cols-2 gap-2 h-125">
                                <div className=" flex flex-col gap-1">
                                    <div className="grid grid-cols-2 px-4 text-base gap-6">
                                        <div>
                                            <h2 className="text-white mt-4">
                                                Goal Title
                                            </h2>
                                            <input
                                                className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                                placeholder="Enter Goal title"
                                                value={formData.title}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-white mt-4">
                                                Goal Category
                                            </h2>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        category: e.target.value,
                                                    })
                                                }
                                                className="w-full h-11 bg-[#0D1020] text-white rounded border-2 border-[#40424C]"
                                            >
                                                <option value="LEARNING">Learning</option>
                                                <option value="CAREER">Career</option>
                                                <option value="FINANCE">Finance</option>
                                                <option value="PERSONAL_GROWTH">Personal Growth</option>
                                            </select>
                                        </div>
                                    </div>

                                    <h2 className="text-white text-base px-4 ">
                                        Description
                                    </h2>
                                    <textarea
                                        className="flex flex-row justify-center ml-5 px-2 pt-2 items-center bg-[#0D1020] w-[585px] h-40 rounded border-2 border-[#40424C] text-white"
                                        placeholder="Enter goal description..."
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                    />

                                    <div className="grid grid-cols-2 px-4 text-base gap-6">
                                        <div>
                                            <h2 className="text-white mt-4">
                                                Target Date
                                            </h2>
                                            <input
                                                type="date"
                                                value={formData.target_date}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        target_date: e.target.value,
                                                    })
                                                }
                                                className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                            />
                                            
                                        </div>
                                        <div>
                                            <h2 className="text-white mt-4">
                                                Goal Priority
                                            </h2>
                                            <select
                                                name="goal_priority"
                                                value={formData.priority}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        priority: e.target.value,
                                                    })
                                                }
                                                className="w-full h-11 bg-[#0D1020] text-white rounded border-2 border-[#40424C]"
                                            >
                                                <option value="HIGH">High</option>
                                                <option value="MEDIUM">Medium</option>
                                                <option value="LOW">Low</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="px-4 mt-4">
                                        <div className="flex justify-between text-white mb-2">
                                            <span>Progress</span>
                                            <span>
                                                {selectedGoal?.progress ?? 0}%
                                            </span>
                                        </div>

                                        <div className="w-full bg-[#40424C] rounded-full h-3">
                                            <div
                                                className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${selectedGoal?.progress ?? 0}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className=" flex flex-col gap-1">
                                    <div className="mt-3 px-5 flex flex-row ">
                                        <h1 className="text-base text-white">
                                            Milestones 
                                        </h1>

                                        <button
                                            type="button"
                                            onClick={addMilestone}
                                            className="text-indigo-600 cursor-pointer hover:text-[#2A3145] flex ml-auto"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"/>
                                                <path d="M12 5v14"/>
                                            </svg>

                                            <span>New Milestone</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2 p-4 h-[450px] overflow-y-auto">
                                        {formData.milestones.map((milestone, index) => (
                                            <div
                                                key={milestone.id}
                                                className="flex items-center gap-2 bg-[#0D1020] border border-[#40424C] rounded p-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={milestone.is_completed}
                                                    onChange={(e)=>{
                                                        setFormData(prev=>({
                                                            ...prev,
                                                            milestones: prev.milestones.map(m =>
                                                                m.id===milestone.id
                                                                    ? {...m,is_completed:e.target.checked}
                                                                    : m
                                                            )
                                                        }));
                                                    }}
                                                />

                                                <input
                                                    value={milestone.title}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            milestones: prev.milestones.map(m =>
                                                                m.id === milestone.id
                                                                    ? { ...m, title: e.target.value }
                                                                    : m
                                                            ),
                                                        }));
                                                    }}
                                                />

                                                <button className="cursor-pointer text-red-400 hover:text-red-300">
                                                    <Trash2 size={18} 
                                                    onClick={async () => {
                                                        if (!milestone.isNew) {
                                                            await deleteMilestone(milestone.id);
                                                        }

                                                        setFormData(prev => ({
                                                            ...prev,
                                                            milestones: prev.milestones.filter(
                                                                m => m.id !== milestone.id
                                                            ),
                                                        }));

                                                    }}/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 px-4">
                                <button
                                type="button"
                                className="w-full h-16 text-white border cursor-pointer border-[#40424C] rounded hover:bg-[#1f2a3d] "
                                onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>

                                <button 
                                type="submit"
                                className="w-full bg-indigo-700 cursor-pointer text-white rounded hover:bg-indigo-600">
                                    {selectedGoal ? "Save Changes" : "Create Goal"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>

        
    );


};

export default Goals;