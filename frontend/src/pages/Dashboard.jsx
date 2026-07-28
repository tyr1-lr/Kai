import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProfile from "../assets/profile.png";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [goals, setGoals] = useState([]);
  const [chats, setChats] = useState([]);

  const loadDashboard = async () => {
    try {
      const [userRes, taskRes, noteRes, goalRes, chatRes] = await Promise.all([
        api.get("api/me/"),
        api.get("api/tasks/"),
        api.get("api/notes/"),
        api.get("api/goals/"),
        api.get("api/chats/"),
      ]);

      setProfile(userRes.data);

      setTasks(taskRes.data);
      setNotes(noteRes.data);
      setGoals(goalRes.data);
      setChats(chatRes.data);
    } catch {}
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const hour = new Date().getHours();
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const loadNotifications = async () => {
    try {
      const response = await api.get("api/notifications/");

      setNotifications(response.data);

      setUnreadCount(response.data.filter((n) => !n.is_read).length);
    } catch {}
  };

  const checkNotificationsNow = async () => {
    try {
      await api.get("api/notifications/check/");

      await loadNotifications();
    } catch {}
  };

  useEffect(() => {
    loadNotifications();

    checkNotificationsNow();

    const interval = setInterval(() => {
      checkNotificationsNow();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRead = async (id) => {
    try {
      await api.patch(`api/notifications/read/${id}/`);

      await loadNotifications();
    } catch {}
  };

  const handleReadAll = async () => {
    try {
      await api.patch("api/notifications/read-all/");

      await loadNotifications();
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/notifications/delete/${id}/`);

      await loadNotifications();
    } catch {}
  };

  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-end px-4 md:px-8 py-4 gap-3 text-white">
        <div className="relative pr-8">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-3 mt-3 w-[90vw] max-w-sm md:w-96 bg-[#131A29] rounded-xl shadow-2xl border border-[#263248] z-50">
              <div className="flex items-center justify-between p-4 border-b border-[#263248]">
                <h2 className="text-white font-semibold text-lg">
                  Notifications
                </h2>

                <button
                  onClick={handleReadAll}
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleRead(notification.id)}
                      className={`p-4 border-b border-[#263248] cursor-pointer hover:bg-[#1f2a3d]
                                            ${!notification.is_read ? "bg-[#1A2233]" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold">
                            {notification.title}
                          </h3>

                          <p className="text-gray-300 text-sm mt-1">
                            {notification.message}
                          </p>

                          <span className="text-xs text-gray-500 mt-2 block">
                            Just now
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notification.id);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <img
          src={profile?.avatar || defaultProfile}
          alt="Profile"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        <span className="hidden sm:block font-bold">{profile?.username}</span>
      </nav>

      <div className="text-white px-4 md:px-8 py-5 md:py-6">
        <h1 className="text-2xl md:text-4xl font-bold">
          {greeting}, {profile?.username}! 👋
        </h1>
        <div className="mt-2 flex flex-col gap-1 lg:flex-row lg:justify-between">
          <p className="text-gray-300">Here's what's happening today.</p>

          <p className="text-gray-400">Today is {today}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-4 md:px-8 lg:px-16">
        <div className="bg-[#1A2233] rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-blue-300 text-xl font-bold">Tasks</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-9 h-9 text-blue-300"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          </div>

          <div className="mt-8">
            <h1 className="text-5xl font-bold text-white">{tasks.length}</h1>

            <p className="text-gray-400 mt-2">Total Tasks</p>
          </div>
        </div>

        <div className="bg-[#1D2F29] rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-green-300 text-xl font-bold">Notes</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-9 h-9 text-green-300"
            >
              <path d="M8 2v4" />
              <path d="M12 2v4" />
              <path d="M16 2v4" />
              <rect width="16" height="18" x="4" y="4" rx="2" />
              <path d="M8 10h6" />
              <path d="M8 14h8" />
              <path d="M8 18h5" />
            </svg>
          </div>

          <div className="mt-8">
            <h1 className="text-5xl font-bold text-white">{notes.length}</h1>

            <p className="text-gray-400 mt-2">Total Notes</p>
          </div>
        </div>

        <div className="bg-[#2B2146] rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-purple-300 text-xl font-bold">AI Chat</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-9 h-9 text-purple-300"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              <path d="M8 9h8" />
              <path d="M8 13h5" />
            </svg>
          </div>

          <div className="mt-8">
            <h1 className="text-5xl font-bold text-white">{chats.length}</h1>

            <p className="text-gray-400 mt-2">Total chats</p>
          </div>
        </div>

        <div className="bg-[#3A2A1E] rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-orange-300 text-xl font-bold">Goals</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-9 h-9 text-orange-300"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="12"
                cy="12"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </div>

          <div className="mt-8">
            <h1 className="text-5xl font-bold text-white">{goals.length}</h1>

            <p className="text-gray-400 mt-2">Active goals</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-4 md:px-8 lg:px-16 mt-6 mb-6">
        <div className="bg-[#131A29] rounded-xl flex flex-col">
          <div className="flex flex-grow p-4 border-b border-[#263248]">
            <h1 className=" mt-1 text-lg text-white">Recent Tasks</h1>

            <NavLink
              to="/dashboard/tasks"
              className="ml-auto text-lg text-indigo-500 hover:text-indigo-300 hover:translate-x-1 transition-all"
            >
              View all
            </NavLink>
          </div>

          <ul>
            {tasks
              .filter((task) => !task.is_completed)
              .slice(0, 3)
              .map((task) => {
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
                    onClick={() =>
                      navigate("/dashboard/tasks", {
                        state: {
                          openTaskId: task.id,
                        },
                      })
                    }
                    className="flex items-center h-16 px-5 border-b border-[#263248] hover:bg-[#1f2a3d] hover:px-7 transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5 text-indigo-400"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>

                    <span className="ml-3 text-white font-medium truncate">
                      {task.title}
                    </span>

                    <span
                      className={`${priorityColor} ml-auto rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide`}
                    >
                      {task.priority}
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-gray-500 ml-3"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </li>
                );
              })}
          </ul>

          <NavLink
            to="/dashboard/tasks"
            state={{ openNewTaskModal: true }}
            className="flex h-16 items-center text-indigo-500 gap-2 w-full cursor-pointer p-4 hover:bg-[#1f2a3d]"
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
          </NavLink>
        </div>
        <div className="bg-[#131A29] rounded-xl flex flex-col">
          <div className="flex flex-grow p-4 border-b border-[#263248]">
            <h1 className=" mt-1 text-lg text-white">Recent Notes</h1>

            <NavLink
              to="/dashboard/notes"
              className="ml-auto text-lg text-indigo-500 hover:text-indigo-300 hover:translate-x-1 transition-all"
            >
              View all
            </NavLink>
          </div>

          <ul>
            {notes.slice(0, 3).map((note) => (
              <li
                key={note.id}
                onClick={() =>
                  navigate("/dashboard/notes", {
                    state: {
                      openNoteId: note.id,
                    },
                  })
                }
                className="flex items-center h-16 px-5 border-b border-[#263248] hover:bg-[#1f2a3d] hover:px-7 transition-all duration-200 cursor-pointer"
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
                  className={`${note.color} w-5 h-5`}
                >
                  <path d="M8 2v4" />
                  <path d="M12 2v4" />
                  <path d="M16 2v4" />
                  <rect width="16" height="18" x="4" y="4" rx="2" />
                  <path d="M8 10h6" />
                  <path d="M8 14h8" />
                  <path d="M8 18h5" />
                </svg>

                <span className="ml-3 text-white font-medium truncate">
                  {note.title}
                </span>

                <span className="hidden md:block text-xs text-white ml-auto">
                  {new Date(note.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-500 ml-3"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </li>
            ))}
          </ul>

          <NavLink
            to="/dashboard/notes"
            state={{ openNewNoteModal: true }}
            className="flex h-16 items-center text-indigo-500 gap-2 w-full cursor-pointer p-4 hover:bg-[#1f2a3d]"
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

            <span>New Notes</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
