import { useState } from "react";


function Notes(){
    const notes = [
        {
            id: 1,
            title: "Django Models Overview",
            content:
                "Django models define the structure of database tables. Each model is a Python class that inherits from models.Model and maps to a database table.",
            created_at: "2026-06-03",
            color: "text-purple-600"
        },
        {
            id: 2,
            title: "API Design Plan",
            content:
                "Create RESTful endpoints for authentication, tasks, notes, and goals. Use JWT for security and implement pagination for large datasets.",
            created_at: "2026-06-02",
            color: "text-blue-600"
        },
        {
            id: 3,
            title: "React Components",
            content:
                "Components should be reusable and maintain a single responsibility. Use props for data passing and hooks for state management.",
            created_at: "2026-06-01",
            color: "text-green-600"
        }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const openModal = (note = null) => {
    setSelectedNote(note);
    setIsOpen(true);
    };


    return(
        <div>
            <div className="h-22 relative flex items-center px-4 mt-4">
                <h1 className="font-bold text-white text-3xl ml-30">
                    Notes
                </h1>

            </div>
            <div className="w-[1100px] mx-auto gap-5 text-white mb-6 flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full h-10 border px-4 rounded border-[#40424C]"
                />

                <button 
                onClick={() => openModal(null)}
                className="h-12 w-50 mr-30 flex ml-auto items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="M12 5v14"/>
                    </svg>

                    <span>New Notes</span>
                </button>
            </div>

            <ul className="flex ml-20 w-320 flex-col text-white gap-2 rounded-md">
                {notes.map((note) => {
                        const colors = [
                            "text-red-500",
                            "text-blue-500",
                            "text-green-500",
                            "text-yellow-500",
                            "text-purple-500",
                            "text-pink-500",
                        ];

                        const randomColor = colors[Math.floor(Math.random() * colors.length)];

                    return(
                        <li key={note.id} className="w-full h-35 flex flex-row px-5 items-center bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer" onClick={() => openModal(note)}>
                            <div className="w-full h-30 flex flex-row px-5 items-center cursor-pointer ">
                            
                                <div className="flex w-full justify-between gap-4 items-center px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${randomColor} ml-2`}><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>

                                    <div className="flex flex-col items-start">
                                        <h1 className="text-2xl  font-bold">
                                            {note.title}
                                        </h1>
                                    

                                        <p className="text-1xl">
                                            {note.content}
                                        </p>

                                        <p className="text-sm mt-6">
                                            {note.created_at}
                                        </p>
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

                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            
            {isOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    
                    <div className="bg-[#0D1020] rounded-md w-full h-full flex items-center justify-center">
                        <div className="px-6 h-180 w-300 bg-[#121726] rounded-lg px-6 flex-col flex ">
                            <div className="h-16 flex flex-row mt-4 justify-center items-center">
                                <button 
                                onClick={() => setIsOpen(false)}
                                className="flex ml-10 flex row gap-2 text-xl text-white cursor-pointer hover:text-[#1f2a3d]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                                    Back
                                </button>

                                <button 
                                onClick={() => setIsOpen(false)}
                                className="h-10 w-19 mr-10 flex ml-auto items-center rounded-md text-xl text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                                    <span>Save</span>
                                </button>
                            </div>

                            <div className="h-20 flex flex-col items-start mt-4 px-4 mr-10 ml-10 items-center">
                                <h2 className="text-xl text-white ">
                                    Title
                                </h2>
                                <input type="text" className="h-10 w-full rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                defaultValue={selectedNote?.title || ""}/>
                            </div>

                            <div className="ml-10 flex flex-col gap-4 h-130 rounded w-[1060px] border border-[#333A52]">
                                <div className="text-white mt-3 flex flex-row gap-6 px-4 h-10 items-center">
                                    <button className="cursor-pointer hover:text-[#1f2a3d] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bold-icon lucide-bold block leading-none"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
                                    </button>
                                    <button className="cursor-pointer hover:text-[#1f2a3d] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-italic-icon lucide-italic block leading-none"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
                                    </button>
                                    <button className="cursor-pointer hover:text-[#1f2a3d] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list block leading-none"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>
                                    </button>
                                    <button className="cursor-pointer hover:text-[#1f2a3d] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered block leading-none"><path d="M11 5h10"/><path d="M11 12h10"/><path d="M11 19h10"/><path d="M4 4h1v5"/><path d="M4 9h2"/><path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"/></svg>
                                    </button>
                                </div>
                                <textarea
                                    className="w-full h-150 rounded border border-[#333A52] text-white"
                                    placeholder="Enter notes..."
                                    defaultValue={selectedNote?.content || ""}
                                />
                                
                            </div>
                        </div>


                    </div>
                </div>
            )}

            
        </div>
    );

};

export default Notes;