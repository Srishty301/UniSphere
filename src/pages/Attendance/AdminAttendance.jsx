import React, { useState } from 'react'

const AdminAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const classes = [
    { id: 1, name: 'CS301 - Data Structures', students: 45 },
    { id: 2, name: 'CS302 - Algorithms', students: 42 },
    { id: 3, name: 'CS303 - Database Systems', students: 38 },
    { id: 4, name: 'CS304 - Computer Networks', students: 40 }
  ]

  const mockStudents = [
    { id: 1, rollNumber: 'CS21B001', name: 'John Doe', status: 'present' },
    { id: 2, rollNumber: 'CS21B002', name: 'Jane Smith', status: 'present' },
    { id: 3, rollNumber: 'CS21B003', name: 'Mike Johnson', status: 'absent' },
    { id: 4, rollNumber: 'CS21B004', name: 'Sarah Wilson', status: 'present' },
    { id: 5, rollNumber: 'CS21B005', name: 'David Brown', status: 'present' }
  ]

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value)
    if (e.target.value) {
      setAttendanceData(mockStudents)
    } else {
      setAttendanceData([])
    }
  }

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    )
  }

  const handleSaveAttendance = () => {
    console.log('Saving attendance:', { selectedClass, selectedDate, attendanceData })
    setIsEditing(false)
    // Here you would typically send the data to your backend
  }

  const handleBulkAction = (action) => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, status: action }))
    )
  }

  const getAttendanceStats = () => {
    const present = attendanceData.filter(s => s.status === 'present').length
    const absent = attendanceData.filter(s => s.status === 'absent').length
    const total = attendanceData.length
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0

    return { present, absent, total, percentage }
  }

  const stats = getAttendanceStats()

  return (
    <div className="admin-attendance">
      <div className="attendance-controls">
        <div className="control-group">
          <label htmlFor="class-select">Select Class:</label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={handleClassChange}
            className="form-select"
          >
            <option value="">Choose a class...</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.students} students)
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="date-select">Date:</label>
          <input
            type="date"
            id="date-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-input"
          />
        </div>

        {selectedClass && (
          <div className="control-actions">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Attendance'}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveAttendance}
                className="btn btn-success"
              >
                Save Attendance
              </button>
            )}
          </div>
        )}
      </div>

      {selectedClass && attendanceData.length > 0 && (
        <>
          <div className="attendance-stats-admin">
            <div className="stat-card">
              <h3>Present</h3>
              <span className="stat-number present">{stats.present}</span>
            </div>
            <div className="stat-card">
              <h3>Absent</h3>
              <span className="stat-number absent">{stats.absent}</span>
            </div>
            <div className="stat-card">
              <h3>Total</h3>
              <span className="stat-number total">{stats.total}</span>
            </div>
            <div className="stat-card">
              <h3>Percentage</h3>
              <span className="stat-number percentage">{stats.percentage}%</span>
            </div>
          </div>

          {isEditing && (
            <div className="bulk-actions">
              <h3>Bulk Actions:</h3>
              <div className="bulk-buttons">
                <button
                  onClick={() => handleBulkAction('present')}
                  className="btn btn-success"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => handleBulkAction('absent')}
                  className="btn btn-danger"
                >
                  Mark All Absent
                </button>
              </div>
            </div>
          )}

          <div className="attendance-table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Status</th>
                  {isEditing && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {attendanceData.map(student => (
                  <tr key={student.id}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>
                      <span className={`status-badge ${student.status}`}>
                        {student.status === 'present' ? '✓ Present' : '✗ Absent'}
                      </span>
                    </td>
                    {isEditing && (
                      <td>
                        <div className="status-controls">
                          <button
                            onClick={() => handleStatusChange(student.id, 'present')}
                            className={`status-btn ${student.status === 'present' ? 'active' : ''}`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'absent')}
                            className={`status-btn ${student.status === 'absent' ? 'active' : ''}`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!selectedClass && (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>Select a Class</h3>
          <p>Choose a class and date to view or edit attendance records.</p>
        </div>
      )}
    </div>
  )
}

export default AdminAttendance
