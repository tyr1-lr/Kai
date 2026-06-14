import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import AIChat from './pages/AIChat';
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import LandingLayout from "./layouts/LandingLayout";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingLayout>
                            <Landing />
                        </LandingLayout>
                    }
                />

                <Route
                    path="/features"
                    element={
                        <LandingLayout>
                            <Features />
                        </LandingLayout>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <LandingLayout>
                            <About />
                        </LandingLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <LandingLayout>
                            <Login />
                        </LandingLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <LandingLayout>
                            <Register />
                        </LandingLayout>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <LandingLayout>
                            <ForgetPassword />
                        </LandingLayout>
                    }
                />
                

                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/tasks"
                    element={
                        <DashboardLayout>
                            <Tasks />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/notes"
                    element={
                        <DashboardLayout>
                            <Notes />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/ai-chat"
                    element={
                        <DashboardLayout>
                            <AIChat />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/goals"
                    element={
                        <DashboardLayout>
                            <Goals />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/calendar"
                    element={
                        <DashboardLayout>
                            <Calendar />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/profile"
                    element={
                        <DashboardLayout>
                            <Profile />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/settings"
                    element={
                        <DashboardLayout>
                            <Settings />
                        </DashboardLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;