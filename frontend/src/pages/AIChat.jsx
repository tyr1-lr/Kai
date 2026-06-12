import { useState } from "react";
import logo from "../assets/logo.png";

function AIChat(){
    const [chats, setChats] = useState([
        {
            id: 1,
            title: "React State Management",
            updatedAt: "Today",
            messages: [
                {
                    id: 1,
                    sender: "user",
                    content: "What is useState?"
                },
                {
                    id: 2,
                    sender: "ai",
                    content: "useState is a React Hook used to manage state in functional components."
                }
            ]
        },
        {
            id: 2,
            title: "Tailwind CSS Help",
            updatedAt: "Yesterday",
            messages: [
                {
                    id: 1,
                    sender: "user",
                    content: "Why isn't my button centered?"
                },
                {
                    id: 2,
                    sender: "ai",
                    content: "Check if the parent has display:flex and sufficient height."
                }
            ]
        },
        {
            id: 3,
            title: "Django Authentication",
            updatedAt: "Jun 5",
            messages: [
                {
                    id: 1,
                    sender: "user",
                    content: "How does JWT authentication work?"
                },
                {
                    id: 2,
                    sender: "ai",
                    content: "JWT uses signed tokens to verify a user's identity without storing sessions on the server."
                }
            ]
        },
        {
            id: 4,
            title: "Resume Review",
            updatedAt: "Jun 2",
            messages: [
                {
                    id: 1,
                    sender: "user",
                    content: "Can you review my resume?"
                },
                {
                    id: 2,
                    sender: "ai",
                    content: "Your resume is clear, but you could add more measurable achievements."
                }
            ]
        },
        {
            id: 5,
            title: "Checking Syntax",
            updatedAt: "Jun 6",
            messages: []
        },
        {
            id: 6,
            title: "JavaScript Array Methods",
            updatedAt: "Jun 8",
            messages: [
                {
                    id: 1,
                    sender: "user",
                    content: "What's the difference between map and filter?"
                },
                {
                    id: 2,
                    sender: "ai",
                    content: "map transforms every element and returns a new array, while filter returns only elements that match a condition."
                }
            ]
        },
        {
            id: 7,
            title: "Portfolio Project Ideas",
            updatedAt: "Jun 7",
            messages: [
                {
                    id: 1,
                    sender: "user",
                    content: "What projects should I build for my portfolio?"
                },
                {
                    id: 2,
                    sender: "ai",
                    content: "A task manager, finance tracker, and AI-powered study assistant are great portfolio projects that showcase full-stack skills."
                }
            ]
        }
    ]);


    const [activeChatId, setActiveChatId] = useState(null);
    const [input, setInput] = useState("");
    const activeChat = chats.find(chat => chat.id === activeChatId);
    const messages = activeChat?.messages || [];
    

    const sendMessage = () => {
        if (!input.trim()) return;

        setChats(prev =>
                prev.map(chat =>
                chat.id === activeChatId
                    ? {
                        ...chat,
                        messages: [
                        ...chat.messages,
                        { content: input, sender: "user" }
                        ]
                    }
                    : chat
                )
            );

            setInput("");
    };
    
    return(
        <div className="h-screen flex flex-col w-[1311px]">
            <div className="px-4 text-white border-[#2A3145] border-b h-20 w-full">
                <h1 className="pt-2 text-2xl">
                    AI Chat
                </h1>
                <p>
                    Chat with Kai AI Assistant
                </p>
            </div>
            <div className="flex flex-row flex-1 min-h-0">
                <div className="border border-[#2A3145] w-130 px-4 flex flex-col min-h-0">
                    <div className="h-14 w-full mt-2 flex flex-col justify-center items-center">
                        <button 
                        onClick={() => setActiveChatId(null)}
                        className="h-12 w-80 flex flex-row justify-center items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                            </svg>

                            <span>New Chat</span>
                        </button>
                    </div>

                    <h2 className="text-white mt-4 text-lg">
                        Recent Conversation
                    </h2>

                    <div className="flex-1 min-h-0 overflow-y-auto p-6 border-t border-[#2A3145]">
                        <ul className="gap-2 overflow-y-auto">
                            {chats.map((chat) => (
                                <li key={chat.id} className="w-full mt-2 h-22 flex flex-row px-5 items-center bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer" onClick={() => setActiveChatId(chat.id)}>
                                    <button 
                                        className="flex felx-col w-full rounded-xl text-left hover:bg-[#1f2a3d]"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-700 lucide lucide-message-circle-more-icon lucide-message-circle-more"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                                        <div className="flex flex-col px-4 text-white w-full">
                                            <h3 className="text-base">
                                                {chat.title}
                                            </h3>
                                            <div className="flex flex-row">
                                                <p className="text-xs">
                                                    {chat.messages?.length
                                                        ? chat.messages[chat.messages.length - 1].content.slice(0, 30) + "..."
                                                        : "No messages yet"}
                                                </p>

                                                <span className="text-xs ml-auto">
                                                    {chat.updatedAt}
                                                </span>
                                            </div>

                                        </div>

                                    </button>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                    
                </div>
                <div className="border border-[#2A3145] w-full flex flex-col min-h-0">
                    <div className="min-h-[80px] w-full flex px-4">
                        <img src={logo} alt="Logo" className="h-20 w-20"/>
                        <div className="mt-4">
                            <h1 className="text-white text-xl flex flex-row gap-4">
                                Kai AI
                                <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full w-fit">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span className="text-sm">Online</span>
                                </div>
                            </h1>
                            <p className="text-white flex flex-row text-xs mt-2 gap-2">
                                Powered by Gemini 2.5 Flash 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>
                            </p>
                        </div>

                    </div>
                    <div className="w-full px-4 py-2 grid grid-cols-4 gap-2">
                        <div className="bg-[#121726] rounded-md h-23 flex flex-row items-center">
                            <div className="flex flex-row bg-[#1A1F36] rounded h-13 w-15 text-indigo-700 items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml-icon lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                            </div>
                            <div className="text-white ml-2">
                                <h1 className="text-base">
                                    Explain Code
                                </h1>
                                <p className="text-xs"> 
                                    Get help understanding code in any language
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#121726] rounded-md h-23 flex flex-row items-center">
                            <div className="flex flex-row bg-[#1A1F36] rounded h-13 w-15 text-indigo-700 items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll-text-icon lucide-scroll-text"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
                            </div>
                            <div className="text-white ml-2">
                                <h1 className="text-base">
                                    Summarize
                                </h1>
                                <p className="text-xs"> 
                                    Summarize notes, articles or long texts
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#121726] rounded-md h-23 flex flex-row items-center">
                            <div className="flex flex-row bg-[#1A1F36] rounded h-13 w-15 text-indigo-700 items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                            </div>
                            <div className="text-white ml-2">
                                <h1 className="text-base">
                                    Generate Notes
                                </h1>
                                <p className="text-xs"> 
                                    Create notes on any topic instantly
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#121726] rounded-md h-23 flex flex-row items-center">
                            <div className="flex flex-row bg-[#1A1F36] rounded h-13 w-15 text-indigo-700 items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap-icon lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                            </div>
                            <div className="text-white ml-2">
                                <h1 className="text-base">
                                    Study Assistant
                                </h1>
                                <p className="text-xs"> 
                                    Get help with concepts, explanation & more
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[340px] border overflow-y-auto border-t px-4 pt-2 border-[#2A3145]">
                        {!activeChat ? (
                            
                            <div className="h-full flex flex-col items-center justify-center text-center text-white">

                                <div className="text-5xl flex flex-row px-2 items-center">
                                    <img src={logo} alt="Logo" className="h-24 w-24"/>
                                    <h1>
                                        Kai
                                    </h1>
                                </div>

                                <p className="text-sm text-gray-400 flex flex-row items-center justify-center">
                                    Select a chat or start a new conversation.
                                </p>

                                <div className="mt-6 flex flex-col gap-2 text-sm text-gray-400">
                                    <p>Try asking something like:</p>

                                    <div className="grid grid-cols-3 gap-4 w-[750px] mt-2">
                                        <button
                                            onClick={() => setInput("Explain React useState")}
                                            className="hover:text-white transition bg-[#1A1F36] h-20 cursor-pointer rounded-md flex flex-row justify-center items-center gap-2"
                                        >
                                            <div className="text-yellow-400 bg-[#44381F] rounded-md h-10 w-10 flex flex-row items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                                            </div>
                                            <p className="text-white text-base">
                                                Give me 5 app ideas
                                            </p>
                                            
                                        </button>
                                        <button
                                            onClick={() => setInput("Explain React state")}
                                            className="hover:text-white transition bg-[#1A1F36] cursor-pointer h-20 rounded-md flex flex-row justify-center items-center gap-2"
                                        >
                                            <div className="text-green-400 bg-[#1F3A24] rounded-md h-10 w-10 flex flex-row items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-xml-icon lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                                            </div>
                                            <p className="text-white text-base">
                                                Explain React state
                                            </p>
                                            
                                        </button>
                                        <button
                                            onClick={() => setInput("Help debug my code")}
                                            className="hover:text-white transition bg-[#1A1F36] cursor-pointer h-20 rounded-md flex flex-row justify-center items-center gap-2"
                                        >
                                            <div className="text-red-400 bg-[#3A1B1B] rounded-md h-10 w-10 flex flex-row items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2"/><path d="M21 21a4 4 0 0 0-3.81-4"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-4"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/></svg>
                                            </div>
                                            <p className="text-white text-base">
                                                Help debug my code
                                            </p>
                                            
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ) : activeChat.messages.length === 0 ? (

                            <div className="h-full flex flex-col items-center justify-center text-center text-white">

                                <div className="text-5xl mb-3 flex flex-row items-center">
                                    <img src={logo} alt="Logo" className="h-25 w-25"/>
                                    <h1>
                                        Kai
                                    </h1>
                                </div>

                                <h1 className="text-xl font-semibold">
                                    Start chatting
                                </h1>

                                <p className="text-sm text-gray-400 mt-2">
                                    This conversation is empty. Send your first message.
                                </p>

                            </div>
                        ) : (

                            activeChat.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex mb-4 ${
                                    msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    {msg.sender !== "user" && (
                                    <img
                                        src={logo}
                                        alt="AI"
                                        className="w-12 h-12 mt-1 rounded-full mr-2 border border-[#2A3145]"
                                    />
                                    )}

                                    <div
                                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                                        msg.sender === "user"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-[#151A2D] text-white"
                                    }`}
                                    >
                                    {msg.content}
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                    <div className="flex flex-col">
                        <div className="p-3 border-t border-gray-700 flex-row items-center flex gap-2">
                            <button className="text-white cursor-pointer hover:text-[#2A3145]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" lucide lucide-paperclip-icon lucide-paperclip"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/></svg> 
                            </button>
                            
                            <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 rounded bg-[#151A2D] text-white"
                            placeholder="Message Kai..."
                            />

                            <button onClick={sendMessage} className="text-white h-8 px-4 bg-blue-700 rounded cursor-pointer hover:bg-[#1f2a3d]">
                                Send
                            </button>
                        </div>
                        <div className="text-white text-xs flex flex-row items-center justify-center">
                            <p>
                                Kai can make mistakes. Consider checking important information
                            </p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );

};

export default AIChat;