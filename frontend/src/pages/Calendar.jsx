import { useState, useEffect } from "react";
import api from "../api";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    reminderTime: "",
  });

  const [reminderData, setReminderData] = useState({
    title: "",
    notes: "",
    date: "",
    time: "",
    repeat: "NEVER",
  });
  const [enableReminder, setEnableReminder] = useState(false);

  const getCalendar = async () => {
    try {
      const response = await api.get("api/calendar/");

      setEvents(response.data.events);
      setReminders(response.data.reminders);
    } catch (error) {
      console.error(err);
    }
  };

  const createEvent = async () => {
    if (enableReminder && !eventData.reminderTime) {
      alert("Please choose a reminder time.");
      return;
    }
    try {
      await api.post("api/events/", {
        title: eventData.title,
        date: eventData.date,
        start_time: eventData.startTime,
        end_time: eventData.endTime,
        description: eventData.description,
        is_reminder: enableReminder,
        reminder_time: enableReminder ? eventData.reminderTime : null,
      });

      getCalendar();

      setIsEventModalOpen(false);

      setEventData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        reminderTime: "",
      });
      setEnableReminder(false);
    } catch (err) {
      console.error(err);
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);

    setEventData({
      title: event.title,
      date: event.date,
      startTime: event.start_time,
      endTime: event.end_time,
      description: event.description,
      reminderTime: event.reminder_time || "",
    });

    setEnableReminder(event.is_reminder);

    setIsEventDetailsOpen(false);
    setIsEventModalOpen(true);
  };

  const updateEvent = async () => {
    try {
      await api.put(`api/events/${editingEvent.id}/`, {
        title: eventData.title,
        date: eventData.date,
        start_time: eventData.startTime,
        end_time: eventData.endTime,
        description: eventData.description,
        is_reminder: enableReminder,
        reminder_time: enableReminder ? eventData.reminderTime : null,
      });

      await getCalendar();

      setEditingEvent(null);

      setEventData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        reminderTime: "",
      });

      setEnableReminder(false);

      setIsEventModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`api/events/delete/${id}/`);

      await getCalendar();

      setIsEventDetailsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const createReminder = async () => {
    if (!reminderData.title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!reminderData.date) {
      alert("Please select a date.");
      return;
    }

    if (!reminderData.time) {
      alert("Please select a time.");
      return;
    }

    try {
      await api.post("api/reminders/", {
        title: reminderData.title,
        description: reminderData.notes,
        date: reminderData.date,
        time: reminderData.time,
        repeat: reminderData.repeat || "NEVER",
      });

      await getCalendar();

      setReminderData({
        title: "",
        notes: "",
        date: "",
        time: "",
        repeat: "NEVER",
      });

      setIsReminderModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const editReminder = (reminder) => {
    setEditingReminder(reminder);

    setReminderData({
      title: reminder.title,
      notes: reminder.description,
      date: reminder.date,
      time: reminder.time,
      repeat: reminder.repeat,
    });

    setIsReminderDetailsOpen(false);
    setIsReminderModalOpen(true);
  };

  const updateReminder = async () => {
    try {
      await api.put(`api/reminders/${editingReminder.id}/`, {
        title: reminderData.title,
        description: reminderData.notes,
        date: reminderData.date,
        time: reminderData.time,
        repeat: reminderData.repeat,
      });

      await getCalendar();

      setEditingReminder(null);

      setReminderData({
        title: "",
        notes: "",
        date: "",
        time: "",
        repeat: "NEVER",
      });

      setIsReminderModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReminder = async (id) => {
    try {
      await api.delete(`api/reminders/delete/${id}/`);

      getCalendar();

      setIsReminderDetailsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCalendar();
  }, []);

  const eventColors = {
    purple: "bg-purple-500/20 text-purple-300",
    blue: "bg-blue-500/20 text-blue-300",
    green: "bg-green-500/20 text-green-300",
    orange: "bg-orange-500/20 text-orange-300",
  };

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const miniDays = [];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [miniDate, setMiniDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const result = `${monthName} ${year}`;

  const miniMonthName = miniDate.toLocaleString("en-US", {
    month: "long",
  });

  const miniResult = `${miniMonthName} ${miniDate.getFullYear()}`;

  const miniYear = miniDate.getFullYear();
  const miniMonth = miniDate.getMonth();

  const miniFirstDay = new Date(miniYear, miniMonth, 1);
  const miniStartingDay = miniFirstDay.getDay();
  const miniDaysInMonth = new Date(miniYear, miniMonth + 1, 0).getDate();

  for (let i = 0; i < miniStartingDay; i++) {
    miniDays.push(null);
  }

  for (let day = 1; day <= miniDaysInMonth; day++) {
    miniDays.push(day);
  }

  while (miniDays.length < 42) {
    miniDays.push(null);
  }

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return events.filter((event) => event.date === dateStr);
  };

  const getRemindersForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return reminders.filter((reminder) => reminder.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMiniMonth = () => {
    setMiniDate(new Date(miniDate.getFullYear(), miniDate.getMonth() - 1, 1));
  };

  const nextMiniMonth = () => {
    setMiniDate(new Date(miniDate.getFullYear(), miniDate.getMonth() + 1, 1));
  };

  const days = [];

  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  while (days.length < 42) {
    days.push(null);
  }

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isReminderDetailsOpen, setIsReminderDetailsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    `${todayYear}-${String(todayMonth + 1).padStart(2, "0")}-${String(todayDate).padStart(2, "0")}`,
  );
  const selectDay = (day) => {
    const clickedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    setSelectedDate(clickedDate);
  };

  const selectedDayEvents = events.filter(
    (event) => event.date === selectedDate,
  );
  const selectedDayReminders = reminders.filter(
    (reminder) => reminder.date === selectedDate,
  );

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  const openReminderModal = (reminder) => {
    setSelectedReminder(reminder);
    setIsReminderDetailsOpen(true);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#0D1020] text-white p-3 md:p-4 lg:p-6 overflow-auto">
      <div className="text-3xl font-bold mb-2">
        <h1 className="">Calendar</h1>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center justify-center gap-2 lg:flex-1 text-sm md:text-base">
          <button
            onClick={prevMonth}
            className="cursor-pointer hover:text-[#2A3145]"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1>{result}</h1>
          <button
            onClick={nextMonth}
            className="cursor-pointer hover:text-[#2A3145] "
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className=" flex flex-row ml-auto">
          <button
            onClick={() => setIsEventModalOpen(true)}
            className="ml-auto flex h-10 md:h-11 items-center gap-2 rounded-md bg-indigo-700 px-3 md:px-5 text-xs sm:text-sm text-white cursor-pointer hover:bg-[#1f2a3d]"
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

            <span>Add Event</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row mt-4 gap-4 w-full">
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="w-full min-h-[600px] border border-white/10 rounded-md overflow-x-auto">
            <div className="grid grid-cols-7 border-t bg-[#121726] border-white/10">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-gray-400 border-b border-white/10"
                >
                  {day}
                </div>
              ))}

              {days.map((day, idx) => {
                const isToday =
                  day &&
                  year === todayYear &&
                  month === todayMonth &&
                  day === todayDate;

                const dateStr =
                  day &&
                  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                const isSelected = dateStr === selectedDate;

                return (
                  <div
                    key={idx}
                    onClick={() => day && selectDay(day)}
                    className={`h-[70px] md:h-[90px] xl:h-[100px] border p-2 text-sm font-bold text-white cursor-pointer transition
                                        ${
                                          isSelected
                                            ? "bg-blue-500/30 border-blue-400"
                                            : "border-white/10 hover:bg-white/5"
                                        }
                                        `}
                  >
                    {day && (
                      <>
                        <div className="text-gray-400">{day}</div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {getEventsForDay(day)
                            .slice(0, 4)
                            .map((event) => (
                              <div
                                key={`event-${event.id}`}
                                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
                                  event.color === "purple"
                                    ? "bg-purple-400"
                                    : event.color === "blue"
                                      ? "bg-blue-400"
                                      : event.color === "green"
                                        ? "bg-green-400"
                                        : "bg-orange-400"
                                }`}
                              />
                            ))}

                          {getRemindersForDay(day)
                            .slice(0, 4)
                            .map((reminder) => (
                              <div
                                key={`reminder-${reminder.id}`}
                                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400"
                              />
                            ))}

                          {getEventsForDay(day).length +
                            getRemindersForDay(day).length >
                            4 && (
                            <span className="text-[9px] md:text-[10px] text-gray-400">
                              +
                              {getEventsForDay(day).length +
                                getRemindersForDay(day).length -
                                4}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full border bg-[#121726] border-white/10 rounded-md p-4">
            <h1 className="mt-1 px-2">Quick Actions</h1>
            <div className="grid grid-cols-2 h-8 gap-4 px-4 mt-2">
              <button
                onClick={() => setIsEventModalOpen(true)}
                className="flex h-9 w-full items-center justify-center gap-1 rounded-md border border-white/10 bg-[#121726] text-xs sm:text-sm text-white cursor-pointer hover:bg-[#1f2a3d]"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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

                <span className="text-xs sm:text-sm">Event</span>
              </button>
              <button
                onClick={() => setIsReminderModalOpen(true)}
                className="flex h-9 w-full items-center justify-center gap-1 rounded-md border border-white/10 bg-[#121726] text-xs sm:text-sm text-white cursor-pointer hover:bg-[#1f2a3d]"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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

                <span className="text-xs sm:text-sm">Reminder</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[360px] xl:min-w-[360px] h-auto xl:h-[570px] flex flex-col items-center bg-[#121726] rounded-md border border-white/10">
          <div className="flex flex-row text-xs items-center mt-3 justify-center gap-2">
            <button
              onClick={prevMiniMonth}
              className="cursor-pointer hover:text-[#2A3145]"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-base">{miniResult}</h1>
            <button
              onClick={nextMiniMonth}
              className="cursor-pointer hover:text-[#2A3145] "
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 mt-3 h-60 px-4 w-full border-b border-white/10">
            {["S", "M", "T", "W", "T", "F", "S"].map((miniDay) => (
              <div
                key={miniDay}
                className="mt-4 text-xs text-center text-white"
              >
                {miniDay}
              </div>
            ))}

            {miniDays.map((miniDay, idx) => {
              const currentMiniDate = miniDay
                ? `${miniYear}-${String(miniMonth + 1).padStart(2, "0")}-${String(miniDay).padStart(2, "0")}`
                : null;

              const isSelected = currentMiniDate === selectedDate;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (!miniDay) return;

                    setSelectedDate(currentMiniDate);
                  }}
                  className={`h-5 p-2 text-xs flex justify-center items-center font-bold text-white cursor-pointer
                                        ${
                                          isSelected
                                            ? "bg-blue-500 rounded-lg border-blue-400"
                                            : "hover:bg-white/10 rounded-lg"
                                        }`}
                >
                  {miniDay && (
                    <>
                      <div className="text-white">{miniDay}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mb-4 px-4 mt-2 w-full">
            <div className="flex flex-col mb-1">
              <h1 className="text-base font-bold">Events</h1>
              <span className="text-sm">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="h-[260px] overflow-y-auto">
              {selectedDayEvents.length === 0 &&
              selectedDayReminders.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                  No events or reminders for this day.
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {selectedDayEvents.map((event) => (
                    <li key={`event-${event.id}`}>
                      <div
                        className={`cursor-pointer rounded-md flex items-center px-4 gap-2 h-16 ${eventColors[event.color]} hover:bg-[#1f2a3d]`}
                        onClick={() => openEventModal(event)}
                      >
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            event.color === "purple"
                              ? "bg-purple-400"
                              : event.color === "blue"
                                ? "bg-blue-400"
                                : event.color === "green"
                                  ? "bg-green-400"
                                  : "bg-orange-400"
                          }`}
                        />

                        <div className="flex flex-col">
                          <span className="text-sm">
                            {event.start_time} - {event.end_time}
                          </span>

                          <span className="text-xs">{event.title}</span>
                        </div>
                      </div>
                    </li>
                  ))}

                  {selectedDayReminders.map((reminder) => (
                    <li key={`reminder-${reminder.id}`}>
                      <div
                        onClick={() => openReminderModal(reminder)}
                        className="cursor-pointer rounded-md flex items-center px-4 gap-3 h-14 bg-blue-500/20 border border-blue-500/30 hover:bg-[#1f2a3d]"
                      >
                        <span className="text-blue-300 text-lg">🔔</span>

                        <div className="flex flex-col">
                          <span className="text-sm">{reminder.time}</span>

                          <span className="text-xs">{reminder.title}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEventDetailsOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121726] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-lg sm:text-xl font-bold">Event Details</h1>

              <button
                onClick={() => setIsEventDetailsOpen(false)}
                className="text-xl hover:text-gray-400"
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
                  className="lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-3 sm:space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Title</p>
                <p>{selectedEvent.title}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p>{selectedEvent.date}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p>{selectedEvent.time}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p>
                  <p className="break-words whitespace-pre-wrap">
                    {selectedEvent.description || "No description."}
                  </p>
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => editEvent(selectedEvent)}
                className="w-full sm:w-auto px-4 py-2 rounded border border-white/10"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                className="w-full sm:w-auto px-4 py-2 rounded bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEventModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0D1020] px-4 md:px-6 py-4 w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-[#40424C] bg-[#121726] rounded-lg px-4 md:px-6 pt-3 flex flex-col">
              <div className="flex items-center w-full gap-3 px-2 py-2">
                <div className="bg-[#2B2146] text-purple-300 rounded-md ml-2 w-10 h-10 items-center justify-center flex">
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
                    className="lucide lucide-calendar1-icon lucide-calendar-1"
                  >
                    <path d="M11 14h1v4" />
                    <path d="M16 2v4" />
                    <path d="M3 10h18" />
                    <path d="M8 2v4" />
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                  </svg>
                </div>
                <div className="flex flex-col ">
                  <h1 className="font-bold">Add Event</h1>
                  <p className="text-sm">
                    Create a new event on your calendar.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingEvent(null);

                    setEventData({
                      title: "",
                      date: "",
                      startTime: "",
                      endTime: "",
                      description: "",
                      reminderTime: "",
                    });

                    setEnableReminder(false);

                    setIsEventModalOpen(false);
                  }}
                  className="ml-auto cursor-pointer hover:text-[#1f2a3d]"
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
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col mt-2 px-2 md:px-4 flex-1 pb-4">
                <div>
                  <h2 className="text-white mt-2">Title</h2>
                  <input
                    className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                    placeholder="e.g. Team Meeting"
                    value={eventData.title}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <h2 className="text-white">Date</h2>
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        date: e.target.value,
                      })
                    }
                    className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="">
                    <h2 className="text-white ">Start Time</h2>
                    <input
                      type="time"
                      className="w-full bg-[#0D1020] h-10 rounded border-2 border-[#40424C] px-2"
                      value={eventData.startTime}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="">
                    <h2 className="text-white">End Time</h2>
                    <input
                      type="time"
                      className="w-full bg-[#0D1020] h-10 rounded border-2 border-[#40424C] px-2"
                      value={eventData.endTime}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-row gap-2">
                    <h2 className="text-white text-base ">Description</h2>
                    <span className="text-xs text-white/40 mt-1">
                      (optional)
                    </span>
                  </div>

                  <textarea
                    className="w-full h-28 md:h-32 pt-2 px-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white resize-none"
                    placeholder="Add more details..."
                    value={eventData.description}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="h-25 mt-5 mb-4 border-t border-white/20">
                  <div className=" h-10 mt-2 flex flex-row items-center px-2">
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
                      className="text-purple-400 lucide lucide-bell-icon lucide-bell"
                    >
                      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                    </svg>
                    <h1 className="ml-2 text-sm">Set Reminder</h1>

                    <label className="relative inline-block w-12 h-7 cursor-pointer ml-auto">
                      <input
                        type="checkbox"
                        checked={enableReminder}
                        onChange={(e) => setEnableReminder(e.target.checked)}
                        className="peer sr-only"
                      />

                      <div className="w-full h-full rounded-full bg-gray-600 transition peer-checked:bg-purple-600" />

                      <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                    </label>
                  </div>

                  {enableReminder && (
                    <div className="mt-2">
                      <input
                        type="time"
                        value={eventData.reminderTime}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            reminderTime: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3 bg-[#0D1020] text-white rounded border-2 border-[#40424C]"
                      />
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-4 mt-4">
                    <button
                      className="h-10 w-full sm:w-20 border bg-[#0D1020] mb-4 cursor-pointer hover:text-[#2A3145] text-white rounded border-2 border-[#40424C]"
                      onClick={() => {
                        setEditingEvent(null);

                        setEventData({
                          title: "",
                          date: "",
                          startTime: "",
                          endTime: "",
                          description: "",
                          reminderTime: "",
                        });

                        setEnableReminder(false);

                        setIsEventModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="h-10 w-full sm:w-28 rounded-md text-whit bg-indigo-700 cursor-pointer hover:bg-[#1f2a3d]"
                      onClick={() => {
                        if (editingEvent) {
                          updateEvent();
                        } else {
                          createEvent();
                        }
                      }}
                    >
                      {editingEvent ? "Save Changes" : "Add Event"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReminderModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0D1020] px-4 md:px-6 py-4 w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-[#40424C] bg-[#121726] rounded-lg px-4 md:px-6 pt-3 flex flex-col">
              <div className="flex flex-row items-center px-2 w-full h-15 gap-4 pt-8">
                <div className="bg-[#1F2B46] text-blue-300 rounded-md ml-2 w-10 h-10 items-center justify-center flex">
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
                    className="lucide lucide-bell-icon lucide-bell"
                  >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                  </svg>
                </div>
                <div className="flex flex-col ">
                  <h1 className="font-bold">Add Reminder</h1>
                  <p className="text-sm">Create a reminder to stay on track.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingReminder(null);

                    setReminderData({
                      title: "",
                      notes: "",
                      date: "",
                      time: "",
                      repeat: "NEVER",
                    });

                    setIsReminderModalOpen(false);
                  }}
                  className="ml-auto cursor-pointer hover:text-[#1f2a3d]"
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
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className=" flex flex-col mt-2 px-4 h-full mb-4">
                <div>
                  <h2 className="text-white mt-2">Title</h2>
                  <input
                    className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                    placeholder="e.g. Drink Water"
                    value={reminderData.title}
                    onChange={(e) =>
                      setReminderData({
                        ...reminderData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="">
                  <div className="flex flex-row gap-2">
                    <h2 className="text-white text-base ">Notes</h2>
                    <span className="text-xs text-white/40 mt-1">
                      (optional)
                    </span>
                  </div>

                  <textarea
                    className="w-full h-28 md:h-32 pt-2 px-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white resize-none"
                    placeholder="Add more details..."
                    value={reminderData.notes}
                    onChange={(e) =>
                      setReminderData({
                        ...reminderData,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <h2 className="text-white">Date</h2>
                    <input
                      type="date"
                      value={reminderData.date}
                      onChange={(e) =>
                        setReminderData({
                          ...reminderData,
                          date: e.target.value,
                        })
                      }
                      className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                    />
                  </div>

                  <div className="">
                    <h2 className="text-white">Time</h2>
                    <input
                      type="time"
                      className="w-full bg-[#0D1020] h-10 rounded border-2 border-[#40424C] px-2"
                      value={reminderData.time}
                      onChange={(e) =>
                        setReminderData({
                          ...reminderData,
                          time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-white">Repeat</h2>
                  <select
                    name="repeat"
                    value={reminderData.repeat}
                    onChange={(e) =>
                      setReminderData({
                        ...reminderData,
                        repeat: e.target.value,
                      })
                    }
                    className="w-full h-11 bg-[#0D1020] text-white rounded border-2 border-[#40424C]"
                  >
                    <option value="NEVER">Never</option>
                    <option value="EVERY_DAY">Every Day</option>
                    <option value="EVERY_WEEK">Every Week</option>
                    <option value="EVERY_MONTH">Every Month</option>
                  </select>
                </div>

                <div className="h-25 mt-5 mb-4 border-t border-white/20">
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-4 mt-4">
                    <button
                      className="h-10 w-full sm:w-20 border bg-[#0D1020] cursor-pointer hover:text-[#2A3145] text-white rounded border-2 border-[#40424C]"
                      onClick={() => {
                        setEditingReminder(null);

                        setReminderData({
                          title: "",
                          notes: "",
                          date: "",
                          time: "",
                          repeat: "NEVER",
                        });

                        setIsReminderModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="h-10 w-full sm:w-32 rounded-md bg-blue-700 cursor-pointer hover:bg-[#1f2a3d]"
                      onClick={() => {
                        if (editingReminder) {
                          updateReminder();
                        } else {
                          createReminder();
                        }
                      }}
                    >
                      {editingReminder ? "Save Changes" : "Add Reminder"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReminderDetailsOpen && selectedReminder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121726] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-lg sm:text-xl font-bold">Reminder Details</h1>

              <button onClick={() => setIsReminderDetailsOpen(false)}>✕</button>
            </div>

            <div className="mt-5 space-y-3 sm:space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Title</p>
                <p>{selectedReminder.title}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Notes</p>
                <p>{selectedReminder.description || "No notes."}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p>{selectedReminder.date}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p>{selectedReminder.time}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Repeat</p>
                <p>{selectedReminder.repeat}</p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => editReminder(selectedReminder)}
                className="w-full sm:w-auto px-4 py-2 rounded border border-white/10"
              >
                Edit
              </button>

              <button
                onClick={() => deleteReminder(selectedReminder.id)}
                className="w-full sm:w-auto px-4 py-2 rounded bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
