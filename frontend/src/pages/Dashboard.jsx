import profile from "../assets/profile.png";


function Dashboard(){
    const hour = new Date().getHours();
    const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    });

    let greeting;

    const name = "User";
    
    const tasks = [
        {
            id: 1,
            title: "Study Django Models",
            priority: "High",
            done: false,
        },
        {
            id: 2,
            title: "Build Kai Backend",
            priority: "Medium",
            done: false,
        },
        {
            id: 3,
            title: "Learn React Basics",
            priority: "Low",
            done: true,
        },
    ];
    const total_tasks = tasks.length;

    const notes = [
        {
            id: 1,
            title: "Django Models Overview",
            created_at: "2026-06-03",
            color: "text-purple-600"
        },
        {
            id: 2,
            title: "API Design Plan",
            created_at: "2026-06-02",
            color: "text-blue-600"
        },
        {
            id: 3,
            title: "React Components",
            created_at: "2026-06-01",
            color: "text-green-600"
        }
    ];
    const total_notes = notes.length;

    const chats = [
        {
            id: 1,
            title: "Django Authentication",
            created_at: "2026-06-05",
            messages: 12
        },
        {
            id: 2,
            title: "React State Management",
            created_at: "2026-06-05",
            messages: 8
        },
        {
            id: 3,
            title: "Kai Feature Ideas",
            created_at: "2026-06-04",
            messages: 21
        },
        {
            id: 4,
            title: "REST API Design",
            created_at: "2026-06-04",
            messages: 15
        },
        {
            id: 5,
            title: "Tailwind Layout Help",
            created_at: "2026-06-03",
            messages: 10
        },
        {
            id: 6,
            title: "Database Schema Planning",
            created_at: "2026-06-02",
            messages: 18
        },
        {
            id: 7,
            title: "Learning Flask",
            created_at: "2026-06-01",
            messages: 7
        },
        {
            id: 8,
            title: "Project Deployment",
            created_at: "2026-05-31",
            messages: 11
        }
    ];
    const total_chats = chats.length;

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18){
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return(
        <div className="h-screen flex flex-col">
            <nav className="w-full flex flex-row h-16 justify-end text-white items-center p-10">
                <button className="pr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </button>

                <img src={profile} alt="" className="w-14 h-13 pr-2" />
                <span className="pr-8 font-bold">
                    {name}
                </span>
            </nav>

            <div className="w-full h-26 text-white px-8 flex-col">
                <h1 className="font-bold text-2xl px-4">
                    {greeting}, {name}! 👋
                </h1>
                <div className="flex flex-row ">
                    <p className="px-4 mt-3">
                        Here's what's happening today. 
                    </p>
                    <p className="ml-auto px-4 mt-3 ">
                        Today is {today}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 px-16">
                <div className="bg-[#1A2233] rounded-xl p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-blue-300 font-bold text-2xl">
                            Tasks
                        </h1>

                        <span className="text-white text-5xl ">
                            {total_tasks}
                        </span>
                            
                        <p className="text-white text-sm">
                            Total tasks
                        </p>
                    </div>

                    <div className="text-blue-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                    </div>
                </div>

                <div className="bg-[#1D2F29] rounded-xl p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-green-300 font-bold text-2xl">
                            Notes
                        </h1>

                        <span className="text-white text-5xl ">
                            {total_notes}
                        </span>
                            
                        <p className="text-white text-sm">
                            Total notes
                        </p>
                    </div>

                    <div className="text-green-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>
                    </div>
                </div>

                <div className="bg-[#2B2146] rounded-xl p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-purple-300 font-bold text-2xl">
                            AI Chat
                        </h1>

                        <span className="text-white text-5xl ">
                            {total_chats}
                        </span>
                            
                        <p className="text-white text-sm">
                            Total chats
                        </p>
                    </div>

                    <div className="text-purple-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    </div>
                </div>

                <div className="bg-[#3A2A1E] rounded-xl p-4 flex items-center justify-between">
                    <div className="px-4 space-y-2">
                        <h1 className="text-orange-300 font-bold text-2xl">
                            Goals
                        </h1>

                        <span className="text-white text-5xl ">
                            {total_tasks}
                        </span>
                            
                        <p className="text-white text-sm">
                            Active goals
                        </p>
                    </div>

                    <div className="text-orange-300 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/></svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 px-16 mt-6">
                    <div className="bg-[#131A29] rounded-xl flex flex-col">
                        <div className="flex flex-grow p-4 border-b border-[#263248]">
                            <h1 className=" mt-1 text-lg text-white">
                                Recent Tasks
                            </h1>

                            <a className="ml-auto mt-1 text-lg text-indigo-500" href="#">View all</a>
                        </div>

                        <ul>
                            {tasks.map((task) => {
                                let priorityColor;

                                if (task.priority === "High") {
                                    priorityColor = "bg-red-500/20 text-red-700";
                                } else if (task.priority === "Medium") {
                                    priorityColor = "bg-orange-500/20 text-orange-700";
                                } else {
                                    priorityColor = "bg-green-500/20 text-green-700";
                                }

                                return (
                                    <li
                                        key={task.id}
                                        onClick={() => console.log("open task")}
                                        className="flex h-16 border-b border-[#263248] w-full px-2 items-center cursor-pointer hover:bg-[#1f2a3d]"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 ml-6 accent-red-500 cursor-pointer"
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                        <span className="ml-3 text-white">
                                            {task.title}
                                        </span>

                                        <span
                                            className={`${priorityColor} px-2 py-1 rounded ml-auto text-xs font-bold`}
                                        >
                                            {task.priority}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <a href="#" className="flex h-16 items-center text-indigo-500 gap-2 w-full cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                            </svg>

                            <span>New Task</span>
                        </a>
                    
                    </div>

                    <div className="bg-[#131A29] rounded-xl flex flex-col">
                        <div className="flex flex-grow p-4 border-b border-[#263248]">
                            <h1 className=" mt-1 text-lg text-white">
                                Recent Notes
                            </h1>

                            <a className="ml-auto mt-1 text-lg text-indigo-500" href="#">View all</a>
                        </div>

                        <ul>
                            {notes.map((note) => (
                                <li
                                onClick={() => console.log("open task")}
                                className="flex h-16 border-b border-[#263248] w-full px-2 items-center cursor-pointer hover:bg-[#1f2a3d]">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${note.color} ml-6`}><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>

                                <span className="ml-3 text-white">
                                    {note.title}
                                </span>

                                <span className="px-2 py-1 ml-auto text-xs text-white">
                                    {note.created_at}
                                </span>
                                </li>
                            ))}
                        </ul>

                        <a href="#" className="flex h-16 items-center text-indigo-500 gap-2 w-full cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                            </svg>

                            <span>New Notes</span>
                        </a>
                    
                    </div>

                    
            </div>

            


        </div>
    );
};

export default Dashboard;