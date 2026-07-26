import { useState } from "react";
import profilePic from "../assets/profile.png";
import {
  Target,
  NotebookPen,
  BotMessageSquare,
  CheckSquare,
  Camera,
} from "lucide-react";

function Profile() {
  const profileData = {
    id: 1,
    fullName: "Sample Data",
    email: "sample@email.com",
    occupation: "Computer Science Student",
    timezone: "Asia/Manila",
    joinDate: "June 1, 2026",

    bio: "Passionate about learning, building projects, and becoming my best self. Currently focused on web development, productivity, and personal growth.",

    avatar: profilePic,

    stats: {
      tasksCompleted: 34,
      notesCreated: 58,
      goalsAchieved: 12,
    },

    recentActivity: [
      {
        id: 1,
        title: 'Completed goal "Build Portfolio Website"',
        date: "June 20, 2026",
        type: "goal",
      },
      {
        id: 2,
        title: 'Added new note "Django Models Overview"',
        date: "June 19, 2026",
        type: "note",
      },
      {
        id: 3,
        title: "Finished AI Chat session",
        date: "June 18, 2026",
        type: "chat",
      },
      {
        id: 4,
        title: 'Created new goal "Learn Next.js"',
        date: "June 17, 2026",
        type: "goal",
      },
      {
        id: 5,
        title: 'Completed task "Update Resume"',
        date: "June 16, 2026",
        type: "task",
      },
    ],

    achievements: [
      "Completed 30+ Tasks",
      "Created 50+ Notes",
      "Finished Portfolio Website",
      "Reached 12 Goals",
    ],
  };

  const [profile, setProfile] = useState(profileData);
  const [formData, setFormData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="h-[60px] relative flex items-center px-4 mt-2">
        <h1 className="font-bold text-white text-3xl ml-10">Profile</h1>
      </div>
      <div className="flex flex-row px-8 gap-4 h-[580px] mt-5">
        <div className="flex flex-col ">
          <div className="border text-white h-[240px] px-4 w-[500px] rounded-lg bg-[#121726] border-white/10">
            <div className="mt-2 flex flex-row">
              <img src={profile.avatar} alt="" className="w-24 h-24 pr-2" />

              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                <span className="text-sm text-white/60">{profile.email}</span>
                <span className="text-sm text-white/60 mt-1">
                  Member since {profile.joinDate}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-3 h-28 rounded-xl overflow-hidden border border-white/10">
              <div className="flex flex-col items-center justify-center bg-[#221A44]">
                <h2 className="text-4xl font-bold text-[#A855F7]">
                  {profile.stats.tasksCompleted}
                </h2>
                <p className="text-sm text-white/80">Tasks Completed</p>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#122B22]">
                <h2 className="text-4xl font-bold text-[#4ADE80]">
                  {profile.stats.notesCreated}
                </h2>
                <p className="text-sm text-white/80">Notes Created</p>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#2B2218]">
                <h2 className="text-4xl font-bold text-[#FBBF24]">
                  {profile.stats.goalsAchieved}
                </h2>
                <p className="text-sm text-white/80">Goals Achieved</p>
              </div>
            </div>
          </div>

          <div className="mt-3 h-[327px] px-4 border rounded-lg bg-[#121726] border-white/10">
            <h1 className="text-white mt-2 text-lg">Recent Activity</h1>
            <div>
              <ul className="h-[270px] text-white w-full mt-2 gap-2 overflow-y-auto flex flex-col">
                {profile.recentActivity.map((recent) => {
                  let TypeIcon;
                  let iconColor;

                  if (recent.type === "goal") {
                    TypeIcon = Target;
                    iconColor = "text-green-400";
                  } else if (recent.type === "note") {
                    TypeIcon = NotebookPen;
                    iconColor = "text-violet-400";
                  } else if (recent.type === "chat") {
                    TypeIcon = BotMessageSquare;
                    iconColor = "text-blue-400";
                  } else {
                    TypeIcon = CheckSquare;
                    iconColor = "text-orange-400";
                  }

                  return (
                    <li
                      key={recent.id}
                      className="w-full min-h-[70px] gap-2 flex-shrink-0 flex flex-row px-5 items-center bg-[#121726] hover:bg-[#1f2a3d] rounded-md cursor-pointer"
                    >
                      <div className="flex flex-row gap-4 items-center">
                        <TypeIcon className={`w-6 h-6 ${iconColor}`} />

                        <div className="flex flex-col">
                          <h1>{recent.title}</h1>
                          <span className="text-sm text-white/60">
                            {recent.date}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="border w-[730px] border rounded-lg bg-[#121726] border-white/10 px-4">
          <div className="flex flex-row px-4 mt-1 text-white h-12 items-center ">
            <h1 className="text-xl">Personal Information</h1>
            <button
              onClick={() => {
                if (isEditing) {
                  setProfile(formData);
                }
                setIsEditing(!isEditing);
              }}
              className="ml-auto border border-white/30 px-4 h-8 w-32 rounded-lg text-sm bg-white/10 cursor-pointer hover:bg-white/30"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          <div className="flex flex-col gap-1 px-4 mt-3 gap-2">
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-[660px]">
              <label className="text-xs text-white/60">Username</label>
              {isEditing ? (
                <input
                  className="bg-transparent outline-none text-white"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              ) : (
                formData.fullName
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-[660px]">
              <label className="text-xs text-white/60">Email</label>
              {isEditing ? (
                <input
                  className="bg-transparent outline-none text-white"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                formData.email
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-[660px]">
              <label className="text-xs text-white/60">Occupation</label>
              {isEditing ? (
                <input
                  className="bg-transparent outline-none text-white"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                />
              ) : (
                formData.occupation
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-16 flex flex-col w-[660px]">
              <label className="text-xs text-white/60">Timezone</label>
              {isEditing ? (
                <input
                  className="bg-transparent outline-none text-white"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                />
              ) : (
                formData.timezone
              )}
            </div>
            <div className="p-2 rounded bg-[#0D1020] border border-[#40424C] text-white h-28 flex flex-col w-[660px]">
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

            <div className="mt-4 flex flex-row items-center justify-center">
              <button className="flex flex-row text-white h-12 w-40 items-center justify-center rounded-md bg-indigo-700 cursor-pointer hover:bg-[#1f2a3d]">
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
