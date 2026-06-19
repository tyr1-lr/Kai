import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function Logout() {
    localStorage.clear()
    return <Navigate to="/login"/>
}

function RegisterAndLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    return (
        <LandingLayout>
            <Register route="/api/register/"/>
        </LandingLayout>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={
                        <NotFound />
                    }
                />

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
                            <Login route="/api/token/" />
                        </LandingLayout>
                    }
                />

                <Route
                    path="/logout"
                    element={<Logout />}
                />

                <Route
                    path="/register"
                    element={<RegisterAndLogout />}
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
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/tasks"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Tasks />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/notes"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Notes />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/ai-chat"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <AIChat />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/goals"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Goals />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/calendar"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Calendar />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/profile"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Profile />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/settings"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Settings />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;