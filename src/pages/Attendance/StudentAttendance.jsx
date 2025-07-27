import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const StudentAttendance = () => {
  const { user } = useAuth()
  const [selectedSubject, setSelectedSubject] = useState('all')

  const attendanceData = [
    {
      id: 1,
      subject: 'Data Structures',
      code: 'CS301',
      attended: 28,
      total: 32,
      percentage: 87.5,
      requiredPercentage: 75,
      canSkip: 3,
      details: [
        { date: '2024-01-15', status: 'present' },
        { date: '2024-01-12', status: 'present' },
        { date: '2024-01-10', status: 'absent' },
        { date: '2024-01-08', status: 'present' },
        { date: '2024-01-05', status: 'present' }
      ]
    },
    {
      id: 2,
      subject: 'Algorithms',
      code: 'CS302',
      attended: 25,
      total: 30,
      percentage: 83.3,
      requiredPercentage: 75,
      canSkip: 2,
      details: [
        { date: '2024-01-14', status: 'present' },
        { date: '2024-01-11', status: 'absent' },
        { date: '2024-01-09', status: 'present' },
        { date: '2024-01-07', status: 'present' },
        { date: '2024-01-04', status: 'present' }
      ]
    },
    {
      id: 3,
      subject: 'Database Systems',
      code: 'CS303',
      attended: 22,
      total: 28,
      percentage: 78.6,
      requiredPercentage: 75,
      canSkip: 1,
      details: [
        { date: '2024-01-13', status: 'present' },
        { date: '2024-01-11', status: 'present' },
        { date: '2024-01-09', status: 'absent' },
        { date: '2024-01-06', status: 'present' },
        { date: '2024-01-04', status: 'absent' }
      ]
    },
    {
      id: 4,
      subject: 'Computer Networks',
      code: 'CS304',
      attended: 30,
      total: 32,
      percentage: 93.8,
      requiredPercentage: 75,
      canSkip: 6,
      details: [
        { date: '2024-01-15', status: 'present' },
        { date: '2024-01-13', status: 'present' },
        { date: '2024-01-11', status: 'present' },
        { date: '2024-01-08', status: 'present' },
        { date: '2024-01-06', status: 'absent' }
      ]
    }
  ]

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return 'excellent'
    if (percentage >= 75) return 'good'
    if (percentage >= 65) return 'warning'
    return 'danger'
  }

  const calculateCanSkip = (attended, total, required) => {
    const requiredClasses = Math.ceil((total * required) / 100)
    return Math.max(0, attended - requiredClasses)
  }

  const filteredData = selectedSubject === 'all' 
    ? attendanceData 
    : attendanceData.filter(item => item.id === parseInt(selectedSubject))

  return (
    <div className="student-attendance">
      <div className="attendance-summary">
        <div className="summary-card">
          <h3>Overall Attendance</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-value">85.8%</span>
              <span className="stat-label">Average</span>
            </div>
            <div className="stat">
              <span className="stat-value">105/122</span>
              <span className="stat-label">Classes Attended</span>
            </div>
            <div className="stat">
              <span className="stat-value">17</span>
              <span className="stat-label">Classes Missed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="attendance-filters">
        <div className="filter-group">
          <label htmlFor="subject-filter">Filter by Subject:</label>
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="form-select"
          >
            <option value="all">All Subjects</option>
            {attendanceData.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.subject} ({subject.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="attendance-grid">
        {filteredData.map(subject => (
          <div key={subject.id} className="attendance-card">
            <div className="card-header">
              <div className="subject-info">
                <h3>{subject.subject}</h3>
                <span className="subject-code">{subject.code}</span>
              </div>
              <div className={`attendance-badge ${getAttendanceStatus(subject.percentage)}`}>
                {subject.percentage}%
              </div>
            </div>

            <div className="card-body">
              <div className="attendance-stats">
                <div className="stat-row">
                  <span>Classes Attended:</span>
                  <span className="stat-value">{subject.attended}/{subject.total}</span>
                </div>
                <div className="stat-row">
                  <span>Required Percentage:</span>
                  <span className="stat-value">{subject.requiredPercentage}%</span>
                </div>
                <div className="stat-row">
                  <span>Classes You Can Skip:</span>
                  <span className={`stat-value ${subject.canSkip > 0 ? 'positive' : 'negative'}`}>
                    {subject.canSkip}
                  </span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getAttendanceStatus(subject.percentage)}`}
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>0%</span>
                  <span className="required-mark" style={{ left: `${subject.requiredPercentage}%` }}>
                    {subject.requiredPercentage}%
                  </span>
                  <span>100%</span>
                </div>
              </div>

              <div className="recent-attendance">
                <h4>Recent Classes</h4>
                <div className="attendance-history">
                  {subject.details.slice(0, 5).map((record, index) => (
                    <div key={index} className="attendance-record">
                      <span className="record-date">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                      <span className={`record-status ${record.status}`}>
                        {record.status === 'present' ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {subject.percentage < subject.requiredPercentage && (
                <div className="warning-message">
                  <span className="warning-icon">⚠️</span>
                  <p>Your attendance is below the required {subject.requiredPercentage}%. 
                     You need to attend the next {Math.ceil((subject.requiredPercentage * (subject.total + 5) / 100) - subject.attended)} classes to meet the requirement.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentAttendance
