import { useState } from 'react'
import DashboardLayout from './DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';

function App() {
  return (
    <DashboardLayout>
      <Notes />
    </DashboardLayout>
  );

};

export default App
