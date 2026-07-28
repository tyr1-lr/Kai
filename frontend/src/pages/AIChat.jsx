import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import api from "../api";

function AIChat() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const getChats = async () => {
    try {
      const response = await api.get("api/chats/");

      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const loadChats = async () => {
      const chats = await getChats();

      setChats(chats);
    };

    loadChats();
  }, []);

  const getMessages = async (chatId) => {
    try {
      const response = await api.get(`api/chats/${chatId}/messages/`);

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

    setShowHistory(false);
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
    if (!input.trim()) return;

    let chatId = activeChatId;

    if (!chatId) {
      const newChat = await createChat();

      chatId = newChat.id;

      setActiveChatId(chatId);

      const updatedChats = await getChats();
      setChats(updatedChats);
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const text = input;
    setInput("");

    setLoading(true);

    await api.post(`api/chats/${chatId}/send/`, {
      message: text,
    });

    const updatedMessages = await getMessages(chatId);

    setMessages(updatedMessages);

    setLoading(false);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="h-16 sm:h-20 flex items-center px-3 sm:px-6">
        <img src={logo} alt="Logo" className="h-10 w-10 sm:h-16 sm:w-16" />
        <div>
          <h1 className="text-white text-base sm:text-xl flex items-center gap-2">
            Kai AI
          </h1>
          <p className="text-white flex items-center text-[10px] sm:text-xs gap-1 mt-1">
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

        <button
          onClick={() => setShowHistory(true)}
          className="ml-auto flex items-center gap-2 text-white hover:text-indigo-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>{" "}
        </button>
      </div>
      <div className="flex flex-1 min-h-0 relative">
        <div className="border border-[#2A3145] w-full flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto border-t border-[#2A3145] px-4 pt-4">
            {!activeChatId ? (
              <div className="min-h-full flex flex-col items-center justify-center text-center text-white px-4 py-6">
                <div className="flex items-center gap-2 text-2xl sm:text-4xl">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-12 sm:h-20 sm:w-20"
                  />
                  <h1>Kai</h1>
                </div>

                <p className="text-sm sm:text-base text-gray-400 max-w-md px-4 leading-8">
                  Kai can help you stay organized by creating tasks, notes,
                  goals, reminders, and calendar events—all through natural
                  language.
                </p>

                <div className="mt-6 flex flex-col gap-2 text-sm text-gray-400">
                  <p>Try asking Kai to help with your workspace:</p>

                  <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-3 gap-3 mt-4 px-2">
                    <button
                      onClick={() =>
                        setInput(
                          "Create a high priority task to finish my Django project by Friday.",
                        )
                      }
                      className="hover:text-white transition bg-[#1A1F36] min-h-[90px] p-4 rounded-lg flex items-center gap-3 text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#44381F] text-yellow-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 11l3 3L22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                      </div>

                      <p className="text-white text-sm sm:text-base leading-tight">
                        Create a Task
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setInput(
                          "Create a note titled 'React Hooks' and summarize useState and useEffect.",
                        )
                      }
                      className="hover:text-white transition bg-[#1A1F36] rounded-xl flex items-center gap-4 p-5 text-left"
                    >
                      <div className="text-green-400 bg-[#1F3A24] rounded-md h-10 w-10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </div>

                      <p className="text-white text-base">Take a Note</p>
                    </button>

                    <button
                      onClick={() =>
                        setInput(
                          "Help me create a goal to become a Django backend developer.",
                        )
                      }
                      className="hover:text-white transition bg-[#1A1F36] rounded-xl flex items-center gap-4 p-5 text-left"
                    >
                      <div className="text-red-400 bg-[#3A1B1B] rounded-md h-10 w-10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>

                      <p className="text-white text-sm sm:text-base text-white">
                        Plan a Goal
                      </p>
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
                    className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
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

                <div className="animate-pulse text-white">
                  Kai is thinking...
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-t border-gray-700 px-3 py-2">
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
                className="flex-1 rounded-lg bg-[#151A2D] px-3 py-2 text-sm text-white placeholder:text-gray-500"
                placeholder="Message Kai..."
              />

              <button
                onClick={handleSendMessage}
                className="h-10 px-4 rounded-lg bg-indigo-700 text-white hover:bg-indigo-600 shrink-0"
              >
                Send
              </button>
            </div>
            <div className="px-4 py-2 text-center text-[11px] sm:text-xs text-gray-400">
              <p>
                Kai can make mistakes. Consider checking important information
              </p>
            </div>
          </div>
        </div>
      </div>
      {showHistory && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowHistory(false)}
          />

          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-[#121726] border-l border-[#2A3145] z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#2A3145]">
              <h2 className="text-xl font-semibold text-white">Chats</h2>

              <button
                onClick={() => setShowHistory(false)}
                className="text-white hover:text-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <button
                onClick={handleCreateChat}
                className="w-full h-12 rounded-md bg-indigo-700 hover:bg-indigo-600 text-white flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
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
                New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Recent Conversations
              </h3>

              <div className="space-y-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full text-left p-4 rounded-lg transition ${
                      activeChatId === chat.id
                        ? "bg-indigo-700"
                        : "bg-[#1A1F36] hover:bg-[#232A45]"
                    }`}
                  >
                    <h4 className="text-white truncate">{chat.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Chat ID: {chat.id}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AIChat;
