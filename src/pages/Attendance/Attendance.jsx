import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import StudentAttendance from './StudentAttendance'
import AdminAttendance from './AdminAttendance'
import './Attendance.css'

const Attendance = () => {
  const { isStudent, isAdmin } = useAuth()

  return (
    <div className="attendance-container">
      <div className="container">
        <div className="page-header">
          <h1>Attendance Management</h1>
          <p className="page-subtitle">
            {isStudent ? 'Track your class attendance' : 'Manage student attendance records'}
          </p>
        </div>

        {isStudent && <StudentAttendance />}
        {isAdmin && <AdminAttendance />}
      </div>
    </div>
  )
}

export default Attendance
