import { useState } from 'react'
import DashboardLayout from './DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );

};

export default App
