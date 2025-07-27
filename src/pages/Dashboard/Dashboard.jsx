import React from 'react'
import { useAuth } from '../../context/AuthContext'
import StudentDashboard from './StudentDashboard'
import AdminDashboard from './AdminDashboard'
import './Dashboard.css'

const Dashboard = () => {
  const { user, isStudent, isAdmin } = useAuth()

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p className="dashboard-subtitle">
            {isStudent ? 'Track your academic progress' : 'Manage student activities'}
          </p>
        </div>

        {isStudent && <StudentDashboard />}
        {isAdmin && <AdminDashboard />}
      </div>
    </div>
  )
}

export default Dashboard
