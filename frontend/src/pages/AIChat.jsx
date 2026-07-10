import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import api from "../api";

function AIChat() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getChats = async () => {
    try {
      const response = await api.get("api/chats/");

      console.log(Array.isArray(response.data));
      console.log(response.data);

      return response.data; // <-- this is the fix
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const loadChats = async () => {
      const chats = await getChats();

      console.log("Loaded chats:", chats);
      setChats(chats);
    };

    loadChats();
  }, []);

  const sendMessage = async (message) => {
    try {
      const response = await api.post(`api/chats/${activeChatId}/send/`, {
        message,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (chatId) => {
    try {
      const response = await api.get(`api/chats/${chatId}/messages/`);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const createChat = async () => {
    try {
      const response = await api.post("api/chats/");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await api.delete(`api/chats/${chatId}/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChat = async (chatId) => {
    setActiveChatId(chatId);

    const messages = await getMessages(chatId);

    setMessages(messages);
  };

  const handleCreateChat = async () => {
    await createChat();

    const chats = await getChats();

    setChats(chats);
  };

  const handleDeleteChat = async (chatId) => {
    await deleteChat(chatId);

    const chats = await getChats();

    setChats(chats);

    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !activeChatId) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const text = input;
    setInput("");

    setLoading(true);

    await sendMessage(text);

    const updatedMessages = await getMessages(activeChatId);

    setMessages(updatedMessages);

    setLoading(false);
  };

  console.log("Chats:", chats);
  console.log("Messages:", messages);

  return (
    <div className="h-screen flex flex-col w-[1311px]">
      <div className="min-h-[80px] w-full flex px-4">
        <img src={logo} alt="Logo" className="h-20 w-20" />
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
              className="h-4 w-4 lucide lucide-sparkles-icon lucide-sparkles"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594z" />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-1 min-h-0">
        <div className="border border-[#2A3145] w-130 px-4 flex flex-col min-h-0">
          <div className="h-14 w-full mt-2 flex flex-col justify-center items-center">
            <button
              onClick={handleCreateChat}
              className="h-12 w-80 flex flex-row justify-center items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]"
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

              <span>New Chat</span>
            </button>
          </div>

          <h2 className="text-white mt-4 text-lg">Recent Conversation</h2>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 border-t border-[#2A3145]">
            <ul className="gap-2 overflow-y-auto">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className="w-full mt-2 h-22 flex flex-row px-5 items-center bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer"
                >
                  <button className="flex flex-col w-full text-left">
                    <h3 className="text-white">{chat.title}</h3>
                    <p className="text-xs text-gray-400">Chat ID: {chat.id}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border border-[#2A3145] w-full flex flex-col min-h-0">
          <div className="h-[520px] border overflow-y-auto border-t px-4 pt-4 border-[#2A3145]">
            {!activeChatId ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-white">
                <div className="text-5xl flex flex-row px-2 items-center">
                  <img src={logo} alt="Logo" className="h-24 w-24" />
                  <h1>Kai</h1>
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
                          className=""
                        >
                          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                          <path d="M9 18h6" />
                          <path d="M10 22h4" />
                        </svg>
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
                          className="lucide lucide-code-xml-icon lucide-code-xml"
                        >
                          <path d="m18 16 4-4-4-4" />
                          <path d="m6 8-4 4 4 4" />
                          <path d="m14.5 4-5 16" />
                        </svg>
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
                          <path d="M12 20v-9" />
                          <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
                          <path d="M14.12 3.88 16 2" />
                          <path d="M21 21a4 4 0 0 0-3.81-4" />
                          <path d="M21 5a4 4 0 0 1-3.55 3.97" />
                          <path d="M22 13h-4" />
                          <path d="M3 21a4 4 0 0 1 3.81-4" />
                          <path d="M3 5a4 4 0 0 0 3.55 3.97" />
                          <path d="M6 13H2" />
                          <path d="m8 2 1.88 1.88" />
                          <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
                        </svg>
                      </div>
                      <p className="text-white text-base">Help debug my code</p>
                    </button>
                  </div>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-white">
                <div className="text-5xl mb-3 flex flex-row items-center">
                  <img src={logo} alt="Logo" className="h-25 w-25" />
                  <h1>Kai</h1>
                </div>

                <h1 className="text-xl font-semibold">Start chatting</h1>

                <p className="text-sm text-gray-400 mt-2">
                  This conversation is empty. Send your first message.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role !== "user" && (
                    <img
                      src={logo}
                      alt="AI"
                      className="w-12 h-12 mt-1 rounded-full mr-2 border border-[#2A3145]"
                    />
                  )}

                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-[#151A2D] text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start mb-4">
                <img src={logo} className="w-12 h-12 mt-1 rounded-full mr-2" />

                <div className="animate-pulse">Kai is thinking...</div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="p-3 border-t border-gray-700 flex-row items-center flex gap-2">
              <button className="text-white cursor-pointer hover:text-[#2A3145]">
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
                  className=" lucide lucide-paperclip-icon lucide-paperclip"
                >
                  <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                </svg>
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 rounded bg-[#151A2D] text-white"
                placeholder="Message Kai..."
              />

              <button
                onClick={handleSendMessage}
                className="text-white h-8 px-4 bg-blue-700 rounded cursor-pointer hover:bg-[#1f2a3d]"
              >
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
}

export default AIChat;
