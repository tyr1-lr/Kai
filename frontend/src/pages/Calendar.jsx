import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


function Calendar() {

    const events = [
        {
            id: 1,
            title: "Study Django",
            date: "2026-06-01",
            time: "10:00 AM",
            category: "Learning",
            color: "purple"
        },
        {
            id: 2,
            title: "Goal Deadline",
            date: "2026-06-02",
            time: "11:59 PM",
            category: "Goal",
            color: "green"
        },
        {
            id: 3,
            title: "Team Meeting",
            date: "2026-06-04",
            time: "11:00 AM",
            category: "Career",
            color: "blue"
        },
        {
            id: 4,
            title: "Read Book",
            date: "2026-06-06",
            time: "2:00 PM",
            category: "Personal Growth",
            color: "orange"
        },
        {
            id: 5,
            title: "Build Backend",
            date: "2026-06-09",
            time: "2:00 PM",
            category: "Learning",
            color: "purple"
        },
        {
            id: 6,
            title: "AI Chat Session",
            date: "2026-06-17",
            time: "6:00 PM",
            category: "Career",
            color: "blue"
        },
        {
            id: 7,
            title: "Portfolio Review",
            date: "2026-06-20",
            time: "10:00 AM",
            category: "Career",
            color: "green"
        },
        {
            id: 8,
            title: "Write Notes",
            date: "2026-06-24",
            time: "9:00 AM",
            category: "Learning",
            color: "purple"
        },
        {
            id: 9,
            title: "Goal Deadline",
            date: "2026-06-30",
            time: "11:59 PM",
            category: "Goal",
            color: "orange"
        }
    ];

    const eventColors = {
        purple: "bg-purple-500/20 text-purple-300",
        blue: "bg-blue-500/20 text-blue-300",
        green: "bg-green-500/20 text-green-300",
        orange: "bg-orange-500/20 text-orange-300",
    };

    const todaysEvents = [
        {
            id: 1,
            time: "9:00 AM",
            title: "Write Notes",
            color: "bg-purple-300",
            bg: "bg-purple-500/20"
        },
        {
            id: 2,
            time: "11:00 AM",
            title: "Team Meeting",
            color: "bg-blue-300",
            bg: "bg-blue-500/20"
        },
        {
            id: 3,
            time: "2:00 PM",
            title: "Build Backend",
            color: "bg-purple-300",
            bg: "bg-purple-500/20"
        },
        {
            id: 4,
            time: "6:00 PM",
            title: "AI Chat Session",
            color: "bg-blue-300",
            bg: "bg-blue-500/20"
        },
        {
            id: 5,
            time: "6:00 PM",
            title: "AI Chat Session",
            color: "bg-blue-300",
            bg: "bg-blue-500/20"
        },
        {
            id: 6,
            time: "6:00 PM",
            title: "AI Chat Session",
            color: "bg-blue-300",
            bg: "bg-blue-500/20"
        },
        {
            id: 7,
            time: "6:00 PM",
            title: "AI Chat Session",
            color: "bg-blue-300",
            bg: "bg-blue-500/20"
        }
    ];

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
        reminderTime: "",
        repeat: "",
    });

    const today = new Date();
    const dayOfMonth = today.getDate();
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

    const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const result = `${monthName} ${year}`;

    const miniMonthName = miniDate.toLocaleString("en-US", {
        month: "long",
    });

    const todayDayName = today.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const todayMonthName = today.toLocaleString("en-US", {
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
        const dateStr =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        return events.filter(event => event.date === dateStr);
    };

    const prevMonth = () => {
        setCurrentDate(
            new Date(year, month - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(year, month + 1, 1)
        );
    };

    const prevMiniMonth = () => {
        setMiniDate(
            new Date(
                miniDate.getFullYear(),
                miniDate.getMonth() - 1,
                1
            )
        );
    };

    const nextMiniMonth = () => {
        setMiniDate(
            new Date(
                miniDate.getFullYear(),
                miniDate.getMonth() + 1,
                1
            )
        );
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

    return (
        <div className="p-4 bg-[#0D1020] min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-4">Calendar</h1>
 
            <div className="flex flex-row h-12 text-lg">
                <div className="w-300 flex flex-row h-12 text-lg items-center justify-center gap-2">
                    <button
                    onClick={prevMonth}
                    className="cursor-pointer hover:text-[#2A3145]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <h1>
                        {result}
                    </h1>
                    <button
                    onClick={nextMonth}
                    className="cursor-pointer hover:text-[#2A3145] ">    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>

                <div className=" flex flex-row ml-auto">
                    <button 
                     onClick={() => setIsEventModalOpen(true)}
                    className="h-12 w-40 mr-10 flex ml-auto items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/>
                            <path d="M12 5v14"/>
                        </svg>

                        <span>Add Event</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-row w-full mt-4 h-full px-4 gap-4">
                <div className="flex flex-col gap-4">
                    <div className="w-250 border border-white/10 rounded-md">
                        <div className="grid grid-cols-7 border-t bg-[#121726] border-white/10">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                <div key={day} className="p-3 text-center text-gray-400 border-b border-white/10">
                                    {day}
                                </div>
                            ))}

                            {days.map((day, idx) => {
                                const isToday =
                                    day &&
                                    year === todayYear &&
                                    month === todayMonth &&
                                    day === todayDate;

                                return(
                                    <div
                                        key={idx}
                                        className={`h-19 border border-white/10 p-2 text-base font-bold text-white
                                        ${isToday ? "bg-blue-500/20 border-blue-400" : ""}`}
                                    >
                                        {day && (
                                            <>
                                                <div className="text-gray-400">{day}</div>

                                                <div className="mt-1 space-y-1">
                                                    {getEventsForDay(day).map(event => (
                                                        <div
                                                            key={event.id}
                                                            className={`flex flex-col px-4 rounded-md text-xs text-blue-300 truncate ${eventColors[event.color]}`}
                                                        >
                                                            {event.title}
                                                            <span>
                                                                {event.time}
                                                            </span>                       
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )
                                })}
                        </div>
                    </div>

                    <div className="w-250 h-22 border bg-[#121726] border-white/10 rounded-md">
                        <h1 className="mt-3 px-2">
                            Quick Actions
                        </h1>
                        <div className="grid grid-cols-2 h-8 gap-4 px-4 mt-2">
                            <button 
                            onClick={() => setIsEventModalOpen(true)}
                            className="h-8 justify-center w-full flex items-center rounded-md text-white bg-[#121726] gap-2 cursor-pointer hover:bg-[#1f2a3d] border border-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>

                                <span>Add Event</span>
                            </button>
                            <button 
                            onClick={() => setIsReminderModalOpen(true)}
                            className="h-8 justify-center w-full flex items-center rounded-md text-white bg-[#121726] gap-2 cursor-pointer hover:bg-[#1f2a3d] border border-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>

                                <span>Add Reminder</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="w-100 h-150 border flex flex-col items-center bg-[#121726] rounded-md border-white/10 ">
                    <div className="flex flex-row text-xs items-center mt-3 justify-center gap-2">
                        <button
                        onClick={prevMiniMonth}
                        className="cursor-pointer hover:text-[#2A3145]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <h1 className="text-base">
                            {miniResult}
                        </h1>
                        <button
                        onClick={nextMiniMonth}
                        className="cursor-pointer hover:text-[#2A3145] ">    
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-3 h-60 px-4 w-90 border-b border-white/10">
                            {["S", "M", "T", "W", "T", "F", "S"].map(miniDay => (
                                <div key={miniDay} className="mt-4 text-xs text-center text-white">
                                    {miniDay}
                                </div>
                            ))}

                            {miniDays.map((miniDay, idx) => {
                                const isToday =
                                    miniDay &&
                                    miniYear === todayYear &&
                                    miniMonth === todayMonth &&
                                    miniDay === todayDate;

                                return(
                                    <div
                                        key={idx}
                                        className={`h-5 p-2 text-xs flex flex-row justify-center items-center font-bold text-white
                                        ${isToday ? "bg-blue-500 rounded-lg border-blue-400" : ""}`}
                                    >
                                        {miniDay && (
                                            <>
                                                <div className="text-white">{miniDay}</div>
                                            </>
                                        )}
                                    </div>
                            )
                        })}
                    </div>

                    <div className="mb-4 px-2 mt-2 w-[355px] ">
                        <div className="flex flex-col mb-1">
                            <h1 className="text-base font-bold">Today's Events</h1>
                            <span className="text-sm">
                             {todayDayName}, {todayMonthName} {dayOfMonth}
                            </span>
                        </div>

                        <div className="h-[260px] overflow-y-auto">
                            <ul className="flex flex-col gap-2">
                            {todaysEvents.map((todayseventt) => (
                                <li key={todayseventt.id}>
                                <div
                                    className={`cursor-pointer rounded-md flex items-center px-4 gap-2 h-16 ${todayseventt.bg} hover:bg-[#1f2a3d]`}
                                    onClick={() => openModal(todayseventt)}
                                >
                                    <span className={`inline-block w-3 h-3 ${todayseventt.color} rounded-full`} />
                                    
                                    <div className="flex flex-col">
                                    <span className="text-sm">{todayseventt.time}</span>
                                    <span className="text-xs">{todayseventt.title}</span>
                                    </div>
                                </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                        
                </div>


            </div>

            {isEventModalOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0D1020] px-6 pt-6 rounded-md w-full h-full flex items-center justify-center">
                        <div className="h-160 w-200 border border-[#40424C] bg-[#121726] rounded-lg px-6 flex-col flex pt-3">

                            <div className="flex flex-row items-center px-2 w-full h-15 gap-4">
                                <div className="bg-[#2B2146] text-purple-300 rounded-md ml-2 w-10 h-10 items-center justify-center flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar1-icon lucide-calendar-1"><path d="M11 14h1v4" /><path d="M16 2v4" /><path d="M3 10h18" /><path d="M8 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /></svg>
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className="font-bold">
                                        Add Event
                                    </h1>
                                    <p className="text-sm">
                                        Create a new event on your calendar.
                                    </p>
                                </div>   

                                <button
                                onClick={() => setIsEventModalOpen(false)}
                                className="ml-auto cursor-pointer hover:text-[#1f2a3d]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>                             
                            </div>

                            <div className=" flex flex-col mt-2 px-4 h-full mb-4">

                                <div>
                                    <h2 className="text-white mt-2">
                                        Title
                                    </h2>
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
                                    <h2 className="text-white">
                                        Date
                                    </h2>
                                    <input
                                        type="date"
                                        value={eventData.date}
                                        onChange={(e) =>
                                            setEventData({
                                                ...formData,
                                                Date: e.target.value,
                                            })
                                        }
                                        className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 ">
                                    <div className="">
                                        <h2 className="text-white ">
                                            Start Time
                                        </h2>
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
                                        <h2 className="text-white">
                                            End Time
                                        </h2>
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
                                        <h2 className="text-white text-base ">
                                            Description
                                        </h2>
                                        <span className="text-xs text-white/40 mt-1">
                                            (optional)
                                        </span>
                                    </div>
                                    
                                    <textarea
                                        className="flex flex-row justify-center pt-2 items-center bg-[#0D1020] w-180 h-25 px-2 rounded border-2 border-[#40424C] text-white"
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                                        <h1 className="ml-2 text-sm">
                                            Set Reminder
                                        </h1>

                                        <label className="relative inline-block w-12 h-7 cursor-pointer ml-auto">
                                            <input type="checkbox" className="peer sr-only" />

                                            <div className="w-full h-full rounded-full bg-gray-600 transition peer-checked:bg-purple-600" />

                                            <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                                        </label>
                                    </div>
                                    
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

                                    <div className="h-13 flex flex-row items-center px-4 mt-4 gap-4 justify-end">
                                        <button
                                        className="mt-1 h-10 w-20 border bg-[#0D1020] cursor-pointer hover:text-[#2A3145] text-white rounded border-2 border-[#40424C]"
                                        onClick={() => setIsEventModalOpen(false)}>
                                            Cancel
                                        </button>

                                        <button
                                        className="mt-1 h-10 w-25 rounded-md text-whit bg-indigo-700 cursor-pointer hover:bg-[#1f2a3d]"
                                        onClick={() => setIsEventModalOpen(false)}>
                                            Add Event
                                        </button>
                                    </div>
                                </div>

                            </div>
   
                        </div>

                    </div>
                </div>
            )}

            {isReminderModalOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0D1020] px-6 pt-6 rounded-md w-full h-full flex items-center justify-center">
                        <div className="h-160 w-200 border border-[#40424C] bg-[#121726] rounded-lg px-6 flex-col flex pt-3">

                            <div className="flex flex-row items-center px-2 w-full h-15 gap-4">
                                <div className="bg-[#1F2B46] text-blue-300 rounded-md ml-2 w-10 h-10 items-center justify-center flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className="font-bold">
                                        Add Reminder
                                    </h1>
                                    <p className="text-sm">
                                        Create a reminder to stay on track.
                                    </p>
                                </div>   

                                <button
                                onClick={() => setIsReminderModalOpen(false)}
                                className="ml-auto cursor-pointer hover:text-[#1f2a3d]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>                             
                            </div>

                            <div className=" flex flex-col mt-2 px-4 h-full mb-4">

                                <div>
                                    <h2 className="text-white mt-2">
                                        Title
                                    </h2>
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
                                        <h2 className="text-white text-base ">
                                            Notes
                                        </h2>
                                        <span className="text-xs text-white/40 mt-1">
                                            (optional)
                                        </span>
                                    </div>
                                    
                                    <textarea
                                        className="flex flex-row justify-center pt-2 items-center bg-[#0D1020] w-180 h-25 px-2 rounded border-2 border-[#40424C] text-white"
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

                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <h2 className="text-white">
                                            Date
                                        </h2>
                                        <input
                                            type="date"
                                            value={reminderData.date}
                                            onChange={(e) =>
                                                setReminderData({
                                                    ...reminderData,
                                                    Date: e.target.value,
                                                })
                                            }
                                            className="w-full mb-3 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                                        />
                                    </div>

                                    <div className="">
                                        <h2 className="text-white">
                                            Time
                                        </h2>
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
                                    <h2 className="text-white">
                                        Repeat
                                    </h2>
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
                                        <option value="Never">Never</option>
                                        <option value="EveryDay">Every Day</option>
                                        <option value="EveryWeek">Every Week</option>
                                        <option value="EveryMonth">Every Month</option>
                                    </select>
                                </div>


                                <div className="h-25 mt-5 mb-4 border-t border-white/20">
                                    <div className=" h-10 mt-2 flex flex-row items-center px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                                        <h1 className="ml-2 text-sm">
                                            Set Reminder
                                        </h1>

                                        <label className="relative inline-block w-12 h-7 cursor-pointer ml-auto">
                                            <input type="checkbox" className="peer sr-only" />

                                            <div className="w-full h-full rounded-full bg-gray-600 transition peer-checked:bg-purple-600" />

                                            <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                                        </label>
                                    </div>
                                    
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

                                    <div className="h-13 flex flex-row items-center px-4 mt-4 gap-4 justify-end">
                                        <button
                                        className="mt-1 h-10 w-20 border bg-[#0D1020] cursor-pointer hover:text-[#2A3145] text-white rounded border-2 border-[#40424C]"
                                        onClick={() => setIsReminderModalOpen(false)}>
                                            Cancel
                                        </button>

                                        <button
                                        className="mt-1 h-10 w-30 rounded-md text-whit bg-blue-700 cursor-pointer hover:bg-[#1f2a3d]"
                                        onClick={() => setIsReminderModalOpen(false)}>
                                            Add Reminder
                                        </button>
                                    </div>
                                </div>

                            </div>
   
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}


export default Calendar;