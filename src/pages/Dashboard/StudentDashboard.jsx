import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const StudentDashboard = () => {
  const { user } = useAuth()

  const attendanceData = [
    { subject: 'Data Structures', attended: 28, total: 32, percentage: 87.5 },
    { subject: 'Algorithms', attended: 25, total: 30, percentage: 83.3 },
    { subject: 'Database Systems', attended: 22, total: 28, percentage: 78.6 },
    { subject: 'Computer Networks', attended: 30, total: 32, percentage: 93.8 }
  ]

  const recentResults = [
    { exam: 'Data Structures - Quiz 2', score: 85, maxScore: 100, date: '2024-01-15' },
    { exam: 'Algorithms - Midsem', score: 78, maxScore: 100, date: '2024-01-10' },
    { exam: 'Database - Assignment 3', score: 92, maxScore: 100, date: '2024-01-08' }
  ]

  const upcomingEvents = [
    { title: 'Database Systems - Endsem', date: '2024-02-15', type: 'exam' },
    { title: 'Tech Fest Registration', date: '2024-02-10', type: 'event' },
    { title: 'Algorithms - Assignment Due', date: '2024-02-05', type: 'assignment' }
  ]

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return 'excellent'
    if (percentage >= 75) return 'good'
    if (percentage >= 65) return 'warning'
    return 'danger'
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Overall Attendance</h3>
            <p className="stat-value">85.8%</p>
            <span className="stat-label">This Semester</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Average Score</h3>
            <p className="stat-value">85.0</p>
            <span className="stat-label">All Subjects</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Semester</h3>
            <p className="stat-value">{user?.semester}</p>
            <span className="stat-label">{user?.department}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Subjects</h3>
            <p className="stat-value">6</p>
            <span className="stat-label">This Semester</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Attendance Overview</h2>
            <Link to="/attendance" className="btn btn-outline">View All</Link>
          </div>
          <div className="attendance-list">
            {attendanceData.map((subject, index) => (
              <div key={index} className="attendance-item">
                <div className="attendance-info">
                  <h4>{subject.subject}</h4>
                  <p>{subject.attended}/{subject.total} classes</p>
                </div>
                <div className="attendance-progress">
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getAttendanceStatus(subject.percentage)}`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  <span className={`attendance-percentage ${getAttendanceStatus(subject.percentage)}`}>
                    {subject.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Results</h2>
            <Link to="/results" className="btn btn-outline">View All</Link>
          </div>
          <div className="results-list">
            {recentResults.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-info">
                  <h4>{result.exam}</h4>
                  <p className="result-date">{new Date(result.date).toLocaleDateString()}</p>
                </div>
                <div className="result-score">
                  <span className="score">{result.score}/{result.maxScore}</span>
                  <span className={`percentage ${result.score >= 80 ? 'good' : result.score >= 60 ? 'average' : 'poor'}`}>
                    {Math.round((result.score / result.maxScore) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <Link to="/calendar" className="btn btn-outline">View Calendar</Link>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div className={`event-type ${event.type}`}></div>
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
