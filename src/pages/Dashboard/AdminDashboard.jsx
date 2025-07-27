import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Students', value: '1,247', icon: '👥', change: '+12' },
    { title: 'Active Courses', value: '24', icon: '📚', change: '+2' },
    { title: 'Avg Attendance', value: '87.3%', icon: '📊', change: '+2.1%' },
    { title: 'Pending Tasks', value: '8', icon: '⏰', change: '-3' }
  ]

  const recentActivities = [
    { action: 'Uploaded attendance for CS301', time: '2 hours ago', type: 'attendance' },
    { action: 'Published results for Midsem Exam', time: '4 hours ago', type: 'results' },
    { action: 'Added new event to calendar', time: '1 day ago', type: 'event' },
    { action: 'Updated course materials', time: '2 days ago', type: 'materials' }
  ]

  const quickActions = [
    { title: 'Upload Attendance', icon: '📅', link: '/attendance', color: 'primary' },
    { title: 'Publish Results', icon: '📋', link: '/results', color: 'success' },
    { title: 'Add Event', icon: '🗓️', link: '/calendar', color: 'warning' },
    { title: 'Upload Materials', icon: '📚', link: '/materials', color: 'info' }
  ]

  return (
    <div className="admin-dashboard">
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className={`quick-action-card ${action.color}`}>
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activities</h2>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-type ${activity.type}`}></div>
                <div className="activity-info">
                  <p className="activity-action">{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>System Overview</h2>
          </div>
          <div className="system-overview">
            <div className="overview-item">
              <h4>Database Status</h4>
              <div className="status-indicator online">Online</div>
            </div>
            <div className="overview-item">
              <h4>Last Backup</h4>
              <span className="backup-time">2 hours ago</span>
            </div>
            <div className="overview-item">
              <h4>Storage Used</h4>
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: '68%' }}></div>
              </div>
              <span className="storage-text">68% of 100GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
