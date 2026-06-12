import { useState } from "react";

function Settings(){

    const settingsData = {
    aiSettings: {
        provider: "Google Gemini",
        model: "Gemini 1.5 Pro",
        temperature: 0.7,
    },

    notifications: {
        taskReminders: true,
        goalDeadlines: true,
        dailySummary: true,
        emailNotifications: false,
        weeklyReport: true,
    },

    languageRegion: {
        language: "English",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12 Hour",
        timezone: "(UTC+08:00) Asia/Manila",
    },

    dataStorage: {
        usedStorage: 2.4,
        totalStorage: 10,
        exportAvailable: true,
    },

    account: {
        memberSince: "June 1, 2026",
        lastLogin: "June 24, 2026 8:45 PM",
        email: "tyrone@email.com",
        username: "tyrone",
    },
    };

    const aiProviders = [
    "Google Gemini",
    "OpenAI",
    "Anthropic Claude",
    "Mistral AI",
    ];

    const aiModels = {
        "Google Gemini": [
            "Gemini 1.5 Pro",
            "Gemini 1.5 Flash",
            "Gemini 2.0 Flash",
        ],
        OpenAI: [
            "GPT-5",
            "GPT-5 Mini",
            "GPT-4o",
        ],
        "Anthropic Claude": [
            "Claude Sonnet",
            "Claude Opus",
        ],
        "Mistral AI": [
            "Mistral Large",
            "Mistral Small",
        ],
    };

    const languages = [
    "English",
    "Filipino",
    "Spanish",
    "Japanese",
    "Korean",
    "Chinese",
    ];

    const dateFormats = [
    "MM/DD/YYYY",
    "DD/MM/YYYY",
    "YYYY-MM-DD",
    "MMM DD, YYYY",
    ];

    const timeFormats = [
    "12 Hour",
    "24 Hour",
    ];

    const [settings, setSettings] = useState(settingsData);

    const storagePercent =
    (settings.dataStorage.usedStorage /
        settings.dataStorage.totalStorage) *
    100;

    return(
        <div >
            <div className="h-[60px] relative flex items-center px-4 mt-2">
                <h1 className="font-bold text-white text-3xl ml-10">
                    Settings
                </h1>
            </div>

            <div className="grid grid-rows-2 gap-4 h-[600px] text-white px-10 mt-2">
                <div className="w-full h-full">
                    <div className="grid grid-cols-3 h-full gap-4 w-full">

                        <div className="border rounded-lg bg-[#121726] border-white/10 px-4">
                            <h1 className="text-xl mt-3">
                                AI Settings
                            </h1>
                            <div>
                                <h2 className="text-white/70 text-base mt-1">
                                    AI Provider
                                </h2>
                                <select
                                    value={settings.aiSettings.provider}
                                    onChange={(e) =>
                                        setSettings({
                                        ...settings,
                                        aiSettings: {
                                            ...settings.aiSettings,
                                            provider: e.target.value,
                                        },
                                        })
                                    }
                                    className="w-full h-8 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-3 outline-none"
                                    >
                                    {aiProviders.map((provider) => (
                                        <option key={provider} value={provider}>
                                        {provider}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h2 className="text-white/70 text-base mt-1">
                                    Model
                                </h2>
                                <select
                                    value={settings.aiSettings.model}
                                    onChange={(e) =>
                                        setSettings({
                                        ...settings,
                                        aiSettings: {
                                            ...settings.aiSettings,
                                            model: e.target.value,
                                        },
                                        })
                                    }
                                    className="w-full h-8 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-3 outline-none"
                                    >
                                    {aiModels[settings.aiSettings.provider].map((model) => (
                                        <option key={model} value={model}>
                                        {model}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-white/70 text-base">
                                        Temperature
                                    </h2>
                                    <span className="text-sm text-white font-bold">
                                        {settings.aiSettings.temperature}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={settings.aiSettings.temperature}
                                    
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            aiSettings: {
                                                ...settings.aiSettings,
                                                temperature: Number(e.target.value),
                                            },
                                        })
                                    }
                                    className="w-full cursor-pointer temperature-slider"
                                />
                            </div>

                            <div className="flex flex-row mt-1">
                                <span className="text-sm text-white/60">
                                    More creative
                                </span>
                                <span className="ml-auto text-sm text-white/60">
                                    More precise
                                </span>
                            </div>
                        </div>

                        <div className="border rounded-lg bg-[#121726] border-white/10 px-4">
                            <h1 className="text-xl mt-3">
                                Notifications
                            </h1>
                            
                            <div className="grid grid-rows-5 h-[230px] w-full mt-1 gap-2">
                                <div className="flex flex-row items-center px-2">
                                    <input
                                    type="checkbox"
                                    checked={settings.notifications.taskReminders}
                                    className="h-4 w-4"
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            notifications: {
                                                ...settings.notifications,
                                                taskReminders: e.target.checked,
                                            },
                                        })
                                    }
                                    />
                                    <span className="ml-2">
                                        Task Reminders
                                    </span>
                                </div>

                                <div className="flex flex-row items-center px-2">
                                    <input
                                    type="checkbox"
                                    checked={settings.notifications.goalDeadlines}
                                    className="h-4 w-4"
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            notifications: {
                                                ...settings.notifications,
                                                goalDeadlines: e.target.checked,
                                            },
                                        })
                                    }
                                    />
                                    <span className="ml-2">
                                        Goal Deadlines
                                    </span>
                                </div>

                                <div className="flex flex-row items-center px-2">
                                    <input
                                    type="checkbox"
                                    checked={settings.notifications.dailySummary}
                                    className="h-4 w-4"
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            notifications: {
                                                ...settings.notifications,
                                                dailySummary: e.target.checked,
                                            },
                                        })
                                    }
                                    />
                                    <span className="ml-2">
                                        Daily Summary
                                    </span>
                                </div>

                                <div className="flex flex-row items-center px-2">
                                    <input
                                    type="checkbox"
                                    checked={settings.notifications.emailNotifications}
                                    className="h-4 w-4"
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            notifications: {
                                                ...settings.notifications,
                                                emailNotifications: e.target.checked,
                                            },
                                        })
                                    }
                                    />
                                    <span className="ml-2">
                                        Email Notifications
                                    </span>
                                </div>
                                
                                <div className="flex flex-row items-center px-2">
                                    <input
                                    type="checkbox"
                                    checked={settings.notifications.weeklyReport}
                                    className="h-4 w-4"
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            notifications: {
                                                ...settings.notifications,
                                                weeklyReport: e.target.checked,
                                            },
                                        })
                                    }
                                    />
                                    <span className="ml-2">
                                        Weekly Repost
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg bg-[#121726] border-white/10 px-4">
                            <h1 className="text-xl mt-3">
                                Language & Region
                            </h1>

                            <div>
                                <h2 className="text-white/70 text-base mt-1">
                                    Language
                                </h2>
                                <select
                                    value={settings.languageRegion.language}
                                    onChange={(e) =>
                                        setSettings({
                                        ...settings,
                                        languageRegion: {
                                            ...settings.languageRegion,
                                            language: e.target.value,
                                        },
                                        })
                                    }
                                    className="w-full h-8 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-3 outline-none"
                                    >
                                    {languages.map((lan) => (
                                        <option key={lan} value={lan}>
                                        {lan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <h2 className="text-white/70 text-base mt-1">
                                    Date Format
                                </h2>
                                <select
                                    value={settings.languageRegion.dateFormat}
                                    onChange={(e) =>
                                        setSettings({
                                        ...settings,
                                        languageRegion: {
                                            ...settings.languageRegion,
                                            dateFormat: e.target.value,
                                        },
                                        })
                                    }
                                    className="w-full h-8 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-3 outline-none"
                                    >
                                    {dateFormats.map((dformat) => (
                                        <option key={dformat} value={dformat}>
                                            {dformat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <h2 className="text-white/70 text-base mt-1">
                                    Time Format
                                </h2>
                                <select
                                    value={settings.languageRegion.timeFormat}
                                    onChange={(e) =>
                                        setSettings({
                                        ...settings,
                                        languageRegion: {
                                            ...settings.languageRegion,
                                            timeFormat: e.target.value,
                                        },
                                        })
                                    }
                                    className="w-full h-8 bg-[#0D1020] text-white rounded border-2 border-[#40424C] px-3 outline-none"
                                    >
                                    {timeFormats.map((tformat) => (
                                        <option key={tformat} value={tformat}>
                                            {tformat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[815px] h-full">
                    <div className="grid grid-cols-2 h-full gap-4">
                        <div className="border rounded-lg bg-[#121726] border-white/10 px-4">
                            <h1 className="text-xl mt-3">
                                Data & Storage
                            </h1>

                            <div className="flex flex-col">
                                <h2 className="text-white/70 text-base mt-3">
                                    Notes Storage
                                </h2>
                                <span className="text-white/70 text-base">
                                    {settingsData.dataStorage.usedStorage} GB used of {settingsData.dataStorage.totalStorage} GB
                                </span>
                            </div>

                            <div className="w-full h-3 bg-[#0D1020] rounded-full overflow-hidden mt-2">
                                <div
                                    className="h-full bg-violet-500"
                                    style={{ width: `${storagePercent}%` }}
                                />
                            </div>

                            <div className="h-24 border-t border-white/10 w-full mt-6 pt-4">
                                <h1 className="text-white text-lg">
                                    Export Data
                                </h1>

                                <div className="flex flex-row items-center">
                                    <span className="text-white/60">
                                        Download all your data
                                    </span>
                                    <button className="ml-auto border border-white/30 px-4 h-8 w-28 rounded-lg text-sm bg-white/10 cursor-pointer hover:bg-white/30">
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg bg-[#26161A] border-white/10 px-4">
                            <h1 className="text-xl mt-3 text-red-500 ">
                                Danger Zone
                            </h1>

                            <div className="grid grid-rows-2 h-[230px] gap-2 mt-1">
                                <div className="bg-[#3A2328] rounded-md px-4 flex flex-row items-center">
                                    <div className="w-[220px]">
                                        <h3 className="text-base text-white ">
                                            Delete Account 
                                        </h3>
                                        <p className="text-sm text-white/60">
                                            Permanently delete your account and all the data.
                                        </p>
                                    </div>
                                    <div className=" flex flex-row items-center">
                                        <button 
                                        onClick={() => openModal(null)}
                                        className="h-12 w-28 flex flex-row items-center justify-center rounded-md text-white bg-red-700 cursor-pointer hover:bg-red-900">
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-[#3A2328] rounded-md px-4 flex flex-row items-center">
                                    <div className="w-[220px]">
                                        <h3 className="text-base text-white ">
                                            Log Out All Devices
                                        </h3>
                                        <p className="text-sm text-white/60">
                                            Sign out from all devices except this one.
                                        </p>
                                    </div>
                                    <div className=" flex flex-row items-center">
                                        <button 
                                        onClick={() => openModal(null)}
                                        className="h-12 w-28 flex flex-row items-center justify-center rounded-md text-white bg-red-700 cursor-pointer hover:bg-red-900">
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Settings;