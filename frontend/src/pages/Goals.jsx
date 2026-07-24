import { useEffect, useState } from "react";
import {
  BookOpenText,
  BriefcaseBusiness,
  WalletMinimal,
  Sprout,
  Pencil,
  Trash2,
} from "lucide-react";
import api from "../api";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("ALL");
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

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = () => {
    api
      .get("/api/goals/")
      .then((res) => res.data)
      .then((data) => {
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
    setFormData((prev) => ({
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

  const activeGoals = goals.filter((goal) => goal.progress < 100).length;

  const completedGoals = goals.filter((goal) => goal.progress === 100).length;

  const successRate =
    goals.length === 0 ? 0 : Math.round((completedGoals / goals.length) * 100);

  const upcomingDeadlines = goals.filter((goal) => {
    const today = new Date();

    const next30 = new Date();
    next30.setDate(today.getDate() + 30);

    const deadline = new Date(goal.target_date);

    return deadline >= today && deadline <= next30 && goal.progress < 100;
  }).length;

  return (
    <div>
      <div className="h-20 flex items-center px-4 md:px-8 mt-2">
        <h1 className="font-bold text-white text-2xl md:text-3xl">Goals</h1>

        <button
          onClick={() => openModal(null)}
          className="ml-auto flex h-10 md:h-12 px-4 md:px-5 rounded-md bg-indigo-700 text-white items-center gap-2 hover:bg-[#1f2a3d]"
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

          <span>New Goal</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-4 md:px-8 ">
        <div className="bg-[#1A2233] rounded-xl min-h-[110px] md:min-h-[140px] p-3 md:p-4 flex items-center justify-between">
          <div className="px-4 space-y-2">
            <h1 className="text-blue-300 font-bold text-lg md:text-xl">
              Active Goals
            </h1>

            <span className="text-white text-5xl ">{activeGoals}</span>

            <p className="text-white text-sm">In progress</p>
          </div>

          <div className="text-blue-300 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 md:h-16 md:w-16"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
        </div>

        <div className="bg-[#1D2F29] rounded-xl min-h-[110px] md:min-h-[140px] p-3 md:p-4 flex items-center justify-between">
          <div className="px-4 space-y-2">
            <h1 className="text-green-300 font-bold text-xl">
              Completed Goals
            </h1>

            <span className="text-white text-5xl ">{completedGoals}</span>

            <p className="text-white text-sm">Completed</p>
          </div>

          <div className="text-green-300 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-16 md:w-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
        </div>

        <div className="bg-[#2B2146] rounded-xl min-h-[110px] md:min-h-[140px] p-3 md:p-4 flex items-center justify-between">
          <div className="px-4 space-y-2">
            <h1 className="text-purple-300 font-bold text-xl">Success Rate</h1>

            <span className="text-white text-5xl ">{successRate}%</span>

            <p className="text-white text-sm">This year</p>
          </div>

          <div className="text-purple-300 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-16 md:w-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 16v5" />
              <path d="M16 14.639V21" />
              <path d="M20 10.656V21" />
              <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
              <path d="M4 18.463V21" />
              <path d="M8 14.656V21" />
            </svg>
          </div>
        </div>

        <div className="bg-[#3A2A1E] rounded-xl min-h-[110px] md:min-h-[140px] p-3 md:p-4 flex items-center justify-between">
          <div className="px-2 md:px-4 space-y-1">
            <h1 className="text-orange-300 font-bold text-xl">
              Upcoming Deadlines
            </h1>

            <span className="text-white text-4xl md:text-5xl">
              {upcomingDeadlines}
            </span>

            <p className="text-white text-sm">Next 30 days</p>
          </div>

          <div className="text-orange-300 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-16 md:w-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </div>
        </div>
      </div>

      <div className="h-20 px-4 flex items-center items-start h-full flex-col gap-4">
        <div className="flex flex-wrap gap-6 mt-5 px-4 md:px-8">
          <button
            onClick={() => setFilter("All")}
            className={`text-base md:text-xl cursor-pointer pb-2 ${
              filter === "All"
                ? "text-white border-b-2 border-purple-500"
                : "text-gray-400"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Active")}
            className={`text-base md:text-xl cursor-pointer pb-2 ${
              filter === "Active"
                ? "text-white border-b-2 border-purple-500"
                : "text-gray-400"
            }`}
          >
            Active Goals
          </button>

          <button
            onClick={() => setFilter("Completed")}
            className={`text-base md:text-xl cursor-pointer pb-2 ${
              filter === "Completed"
                ? "text-white border-b-2 border-purple-500"
                : "text-gray-400"
            }`}
          >
            Completed
          </button>
        </div>

        <div className="h-[calc(100vh-340px)] overflow-y-auto px-4 md:px-8">
          <ul className="flex w-full flex-col gap-3 text-white">
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
                const CategoryIcon =
                  categoryConfig[goal.category]?.icon || Sprout;
                const iconColor =
                  categoryConfig[goal.category]?.color ||
                  "bg-gray-700 text-white";

                return (
                  <li
                    key={goal.id}
                    className="w-full rounded-lg bg-[#121726] p-2 sm:p-4 hover:bg-[#1f2a3d]"
                    onClick={() => openModal(goal)}
                  >
                    <div className="w-full flex flex-row items-center gap-3 px-1 sm:px-3 py-2 cursor-pointer">
                      <div
                        className={`${iconColor} flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full shrink-0`}
                      >
                        <CategoryIcon className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>

                      <div className="flex-1 flex flex-col gap-2 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h1 className="truncate text-base sm:text-lg font-semibold">
                              {goal.title}
                            </h1>

                            <p className="mt-1 text-xs sm:text-sm text-gray-400">
                              {goal.description.length > 40
                                ? goal.description.slice(0, 40) + "..."
                                : goal.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="shrink-0 text-red-400 hover:text-red-300"
                            onClick={async (e) => {
                              e.stopPropagation();

                              if (!window.confirm(`Delete "${goal.title}"?`))
                                return;

                              await deleteGoal(goal.id);
                            }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div>
                          <div className="mb-1 flex justify-between text-xs sm:text-sm">
                            <span>{goal.progress}%</span>
                            <span>
                              {
                                goal.milestones.filter((m) => m.is_completed)
                                  .length
                              }
                              /{goal.milestones.length}
                            </span>
                          </div>

                          <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A3145]">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-gray-400">
                            {goal.target_date}
                          </span>

                          <span
                            className={`${priorityColor} rounded-md px-3 py-1 text-xs font-medium`}
                          >
                            {goal.priority === "MEDIUM" ? "MED" : goal.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-[#0D1020] w-full h-full sm:h-[95vh] sm:max-w-5xl rounded-lg p-3 sm:p-5">
            <form
              onSubmit={selectedGoal ? editGoal : createGoal}
              className="w-full h-full sm:h-[90vh] overflow-y-auto bg-[#121726] rounded-lg"
            >
              <div className="flex flex-row items-center justify-center px-2">
                <h1 className="text-white text-lg font-bold px-4 items-center flex mt-4">
                  {selectedGoal ? "Edit Goal" : "Create New Goal"}
                </h1>
                <button
                  type="button"
                  className="ml-auto cursor-pointer text-base flex flex-row items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hover:text-red-600 text-white mr-4 ml-auto lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4">
                <div className=" flex flex-col gap-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 px-4 gap-4">
                    <div>
                      <h2 className="text-white mt-4">Goal Title</h2>
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
                      <h2 className="text-white mt-4">Goal Category</h2>
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

                  <h2 className="text-white text-base px-4 ">Description</h2>
                  <textarea
                    className="w-full h-40 p-3 rounded bg-[#0D1020] border-2 border-[#40424C] text-white resize-none"
                    placeholder="Enter goal description..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 px-4 gap-4">
                    <div>
                      <h2 className="text-white mt-4">Target Date</h2>
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
                      <h2 className="text-white mt-4">Goal Priority</h2>
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
                      <span>{selectedGoal?.progress ?? 0}%</span>
                    </div>

                    <div className="w-full bg-[#40424C] rounded-full h-3">
                      <div
                        className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${selectedGoal?.progress ?? 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col gap-1">
                  <div className="mt-3 px-5 flex flex-row ">
                    <h1 className="text-base text-white">Milestones</h1>

                    <button
                      type="button"
                      onClick={addMilestone}
                      className="text-indigo-600 cursor-pointer hover:text-[#2A3145] flex ml-auto"
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

                      <span>New Milestone</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 p-4 min-h-[180px] max-h-[350px] overflow-y-auto">
                    {formData.milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-2 bg-[#0D1020] border border-[#40424C] rounded p-2"
                      >
                        <input
                          type="checkbox"
                          checked={milestone.is_completed}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              milestones: prev.milestones.map((m) =>
                                m.id === milestone.id
                                  ? { ...m, is_completed: e.target.checked }
                                  : m,
                              ),
                            }));
                          }}
                        />

                        <input
                          value={milestone.title}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              milestones: prev.milestones.map((m) =>
                                m.id === milestone.id
                                  ? { ...m, title: e.target.value }
                                  : m,
                              ),
                            }));
                          }}
                        />

                        <button className="cursor-pointer text-red-400 hover:text-red-300">
                          <Trash2
                            size={18}
                            onClick={async () => {
                              if (!milestone.isNew) {
                                await deleteMilestone(milestone.id);
                              }

                              setFormData((prev) => ({
                                ...prev,
                                milestones: prev.milestones.filter(
                                  (m) => m.id !== milestone.id,
                                ),
                              }));
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 mt-4 border-t border-[#2A3145]">
                <button
                  type="button"
                  className="w-full h-16 text-white border cursor-pointer border-[#40424C] rounded hover:bg-[#1f2a3d] "
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-indigo-700 cursor-pointer text-white rounded hover:bg-indigo-600"
                >
                  {selectedGoal ? "Save Changes" : "Create Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;
