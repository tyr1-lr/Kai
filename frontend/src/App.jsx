import { useState } from 'react'
import DashboardLayout from './DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import AIChat from './pages/AIChat';

function App() {
  return (
    <DashboardLayout>
      <AIChat />
    </DashboardLayout>
  );

};

export default App
