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
            time: "9:00 AM",
            title: "Write Notes",
            color: "purple"
        },
        {
            time: "11:00 AM",
            title: "Team Meeting",
            color: "blue"
        },
        {
            time: "2:00 PM",
            title: "Build Backend",
            color: "purple"
        },
        {
            time: "6:00 PM",
            title: "AI Chat Session",
            color: "blue"
        }
    ];

    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const monthName = currentDate.toLocaleString("en-US", { month: "long" });
    const result = `${monthName} ${todayYear}`;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    

    const days = [
        ...Array(firstDayIndex).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ];

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return events.filter(e => e.date === dateStr);
    };

    return (
        <div className="p-4 bg-[#0D1020] min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-4">Calendar</h1>
 
            <div className="flex flex-row h-12 text-lg">
                <div className="w-300 flex flex-row h-12 text-lg items-center justify-center gap-2">
                    <button className="cursor-pointer hover:text-[#2A3145]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <h1>
                        {result}
                    </h1>
                    <button className="cursor-pointer hover:text-[#2A3145] ">    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>

                <div className=" flex flex-row ml-auto">
                    <button 
                    onClick={() => openModal(null)}
                    className="h-12 w-40 mr-10 flex ml-auto items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/>
                            <path d="M12 5v14"/>
                        </svg>

                        <span>New Notes</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-row w-full mt-4 h-full px-4 gap-4">
                <div className="flex flex-col gap-4">
                    <div className="w-250 h-120 border">
                        <div className="grid grid-cols-7 border-t border-white/10">
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
                                        className={`h-20 border border-white/10 p-2 text-sm text-white
                                        ${isToday ? "bg-blue-500/20 border-blue-400" : ""}`}
                                    >
                                        {day && (
                                            <>
                                                <div className="text-gray-400">{day}</div>

                                                <div className="mt-1 space-y-1">
                                                    {getEventsForDay(day).map(event => (
                                                        <div
                                                            key={event.id}
                                                            className="text-[10px] text-blue-300 truncate"
                                                        >
                                                            {event.title}
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

                    <div className="w-250 h-25 border">
                    </div>
                </div>


                <div className="w-100 h-150 border">

                </div>
            </div>

            
        </div>
    );
}


export default Calendar;