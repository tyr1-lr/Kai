import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import DashboardLayout from './DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import AIChat from './pages/AIChat';
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <DashboardLayout>
                            <Tasks />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/notes"
                    element={
                        <DashboardLayout>
                            <Notes />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/ai-chat"
                    element={
                        <DashboardLayout>
                            <AIChat />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/goals"
                    element={
                        <DashboardLayout>
                            <Goals />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <DashboardLayout>
                            <Calendar />
                        </DashboardLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App
