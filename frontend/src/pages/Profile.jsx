import { Target, NotebookPen, CheckSquare, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import api from "../api";
import profilePic from "../assets/profile.png";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [goals, setGoals] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  const loadProfile = async () => {
    try {
      const [userRes, taskRes, noteRes, goalRes] = await Promise.all([
        api.get("/api/me/"),
        api.get("/api/tasks/"),
        api.get("/api/notes/"),
        api.get("/api/goals/"),
      ]);

      setProfile(userRes.data);
      setFormData(userRes.data);

      setTasks(taskRes.data);
      setNotes(noteRes.data);
      setGoals(goalRes.data);
    } catch {}
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const res = await api.put("/api/profile/update/", {
        username: formData.username,
        bio: formData.bio,
        occupation: formData.occupation,
        timezone: formData.timezone,
      });

      setProfile((prev) => ({
        ...prev,
        ...res.data,
      }));

      setFormData((prev) => ({
        ...prev,
        ...res.data,
      }));

      setIsEditing(false);
    } catch {}
  };

  const updateAvatar = async (file) => {
    try {
      const data = new FormData();

      data.append("avatar", file);

      const res = await api.patch("/api/profile/update/", data);

      setProfile((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
    } catch {}
  };

  const completedTasks = tasks.filter((task) => task.is_completed).length;

  const notesCreated = notes.length;

  const achievedGoals = goals.filter((goal) => goal.progress === 100).length;

  const recentActivity = [
    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      title: task.is_completed
        ? `Completed task "${task.title}"`
        : `Created task "${task.title}"`,
      type: "task",
      date: task.updated_at,
    })),

    ...notes.map((note) => ({
      id: `note-${note.id}`,
      title: `Created note "${note.title}"`,
      type: "note",
      date: note.created_at,
    })),

    ...goals.map((goal) => ({
      id: `goal-${goal.id}`,
      title:
        goal.progress === 100
          ? `Completed goal "${goal.title}"`
          : `Created goal "${goal.title}"`,
      type: "goal",
      date: goal.updated_at,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto pb-6">
      <div className="h-[60px] relative flex items-center px-4 mt-2">
        <h1 className="font-bold text-white text-3xl ml-10">Profile</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-4 px-4 md:px-8 mt-3 xl:items-start">
        <div className="flex flex-col ">
          <div className="border text-white min-h-[240px] px-4 w-full xl:max-w-[420px] rounded-lg bg-[#121726] border-white/10">
            <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={profile.avatar ? profile.avatar : profilePic}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />

              <div className="flex flex-col text-center sm:text-left">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <span className="text-sm text-white/60">{profile.email}</span>
                <span className="text-sm text-white/60 mt-1">
                  Member since
                  {new Date(profile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-3 h-28 rounded-xl overflow-hidden border border-white/10 mb-4">
              <div className="flex flex-col items-center justify-center bg-[#221A44] px-1">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#A855F7]">
                  {completedTasks}
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-center leading-tight text-white/80">
                  Tasks Completed
                </p>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#122B22] px-1">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#4ADE80]">
                  {notesCreated}
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-center leading-tight text-white/80">
                  Notes Created
                </p>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#2B2218] px-1">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#FBBF24]">
                  {achievedGoals}
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-center leading-tight text-white/80">
                  Goals Achieved
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex-1 min-h-[320px] border rounded-lg bg-[#121726] border-white/10 px-4">
            <h1 className="text-white mt-2 text-lg">Recent Activity</h1>
            <div>
              <ul className="h-[260px] md:h-[300px] overflow-y-auto flex flex-col gap-2 text-white">
                {recentActivity.length === 0 ? (
                  <h1 className="text-white/60 text-center mt-4">
                    No recent activity.
                  </h1>
                ) : (
                  recentActivity.map((recent) => {
                    let TypeIcon;
                    let iconColor;

                    if (recent.type === "goal") {
                      TypeIcon = Target;
                      iconColor = "text-green-400";
                    } else if (recent.type === "note") {
                      TypeIcon = NotebookPen;
                      iconColor = "text-violet-400";
                    } else {
                      TypeIcon = CheckSquare;
                      iconColor = "text-orange-400";
                    }

                    return (
                      <li
                        key={recent.id}
                        className="w-full min-h-[70px] gap-2 flex-shrink-0 flex items-center px-5 rounded-md bg-[#121726] hover:bg-[#1f2a3d]"
                      >
                        <TypeIcon className={`w-6 h-6 ${iconColor}`} />

                        <div className="ml-4 flex flex-col">
                          <h1>{recent.title}</h1>

                          <span className="text-sm text-white/60">
                            {new Date(recent.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-fit self-start border rounded-lg bg-[#121726] border-white/10 px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 px-4 py-4 text-white">
            <h1 className="text-xl">Personal Information</h1>
            <button
              onClick={() => {
                if (isEditing) {
                  updateProfile();
                } else {
                  setFormData(profile);
                  setIsEditing(true);
                }
              }}
              className="sm:ml-auto w-32 border border-white/30 px-4 h-8 rounded-lg text-sm bg-white/10 cursor-pointer hover:bg-white/30"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          <div className="flex flex-col gap-2 px-4 mt-3">
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-full">
              <label className="text-xs text-white/60">Username</label>
              {isEditing ? (
                <input
                  className="bg-[#0D1020] text-white outline-none rounded"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              ) : (
                formData.username
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-full">
              <label className="text-xs text-white/60">Email</label>
              {profile.email}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-full">
              <label className="text-xs text-white/60">Occupation</label>
              {isEditing ? (
                <select
                  className="w-full bg-[#0D1020] text-white rounded outline-none appearance-none"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      occupation: e.target.value,
                    })
                  }
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="ENGINEER">Engineer</option>
                  <option value="SOFTWARE_DEVELOPER">Software Developer</option>
                  <option value="DESIGNER">Designer</option>
                  <option value="BUSINESS_OWNER">Business Owner</option>
                  <option value="OTHER">Other</option>
                </select>
              ) : (
                formData.occupation.replaceAll("_", " ")
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-full">
              <label className="text-xs text-white/60">Timezone</label>
              {isEditing ? (
                <select
                  className="w-full bg-[#0D1020] text-white rounded outline-none appearance-none"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timezone: e.target.value,
                    })
                  }
                >
                  <option value="Asia/Manila">Asia/Manila</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Asia/Seoul">Asia/Seoul</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                  <option value="Asia/Singapore">Asia/Singapore</option>
                </select>
              ) : (
                formData.timezone
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-28 flex flex-col w-full">
              <label className="text-xs text-white/60">Bio</label>
              {isEditing ? (
                <textarea
                  className="bg-transparent outline-none text-white"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              ) : (
                formData.bio
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  updateAvatar(e.target.files[0]);
                }
              }}
            />

            <div className=" mt-4 flex flex-row items-center justify-center">
              <button
                onClick={() => fileInputRef.current.click()}
                className="mb-4 flex flex-row text-white h-12 w-full sm:w-48 items-center justify-center rounded-md bg-indigo-700 cursor-pointer hover:bg-[#1f2a3d]"
              >
                <Camera />
                <span className="ml-2">Change Avatar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
