import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Timetable.css'

const Timetable = () => {
  const { user, isStudent, isAdmin } = useAuth()
  const [selectedDepartment, setSelectedDepartment] = useState(isStudent ? user?.department : 'Computer Science')
  const [selectedSemester, setSelectedSemester] = useState(isStudent ? user?.semester : 6)
  const [viewMode, setViewMode] = useState('week')
  const [selectedDay, setSelectedDay] = useState('Monday')

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil'
  ]

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ]

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const timetableData = {
    'Computer Science': {
      6: {
        'Monday': [
          { subject: 'Data Structures', code: 'CS301', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
          { subject: 'Algorithms', code: 'CS302', teacher: 'Prof. Johnson', room: 'Room 102', type: 'lecture' },
          { subject: 'Database Systems', code: 'CS303', teacher: 'Dr. Brown', room: 'Room 103', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Computer Networks', code: 'CS304', teacher: 'Prof. Davis', room: 'Room 104', type: 'lecture' },
          { subject: 'Software Engineering', code: 'CS305', teacher: 'Dr. Wilson', room: 'Room 105', type: 'lecture' },
          { subject: 'Data Structures Lab', code: 'CS301L', teacher: 'Dr. Smith', room: 'Lab 201', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Tuesday': [
          { subject: 'Algorithms', code: 'CS302', teacher: 'Prof. Johnson', room: 'Room 102', type: 'lecture' },
          { subject: 'Database Systems', code: 'CS303', teacher: 'Dr. Brown', room: 'Room 103', type: 'lecture' },
          { subject: 'Computer Networks', code: 'CS304', teacher: 'Prof. Davis', room: 'Room 104', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Software Engineering', code: 'CS305', teacher: 'Dr. Wilson', room: 'Room 105', type: 'lecture' },
          { subject: 'Data Structures', code: 'CS301', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
          { subject: 'Algorithms Lab', code: 'CS302L', teacher: 'Prof. Johnson', room: 'Lab 202', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Wednesday': [
          { subject: 'Database Systems', code: 'CS303', teacher: 'Dr. Brown', room: 'Room 103', type: 'lecture' },
          { subject: 'Computer Networks', code: 'CS304', teacher: 'Prof. Davis', room: 'Room 104', type: 'lecture' },
          { subject: 'Software Engineering', code: 'CS305', teacher: 'Dr. Wilson', room: 'Room 105', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Data Structures', code: 'CS301', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
          { subject: 'Algorithms', code: 'CS302', teacher: 'Prof. Johnson', room: 'Room 102', type: 'lecture' },
          { subject: 'Database Lab', code: 'CS303L', teacher: 'Dr. Brown', room: 'Lab 203', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Thursday': [
          { subject: 'Software Engineering', code: 'CS305', teacher: 'Dr. Wilson', room: 'Room 105', type: 'lecture' },
          { subject: 'Data Structures', code: 'CS301', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
          { subject: 'Algorithms', code: 'CS302', teacher: 'Prof. Johnson', room: 'Room 102', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Database Systems', code: 'CS303', teacher: 'Dr. Brown', room: 'Room 103', type: 'lecture' },
          { subject: 'Computer Networks', code: 'CS304', teacher: 'Prof. Davis', room: 'Room 104', type: 'lecture' },
          { subject: 'Networks Lab', code: 'CS304L', teacher: 'Prof. Davis', room: 'Lab 204', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Friday': [
          { subject: 'Computer Networks', code: 'CS304', teacher: 'Prof. Davis', room: 'Room 104', type: 'lecture' },
          { subject: 'Software Engineering', code: 'CS305', teacher: 'Dr. Wilson', room: 'Room 105', type: 'lecture' },
          { subject: 'Data Structures', code: 'CS301', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Algorithms', code: 'CS302', teacher: 'Prof. Johnson', room: 'Room 102', type: 'lecture' },
          { subject: 'Database Systems', code: 'CS303', teacher: 'Dr. Brown', room: 'Room 103', type: 'lecture' },
          { subject: 'Software Engineering Lab', code: 'CS305L', teacher: 'Dr. Wilson', room: 'Lab 205', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Saturday': [
          { subject: 'Tutorial - Data Structures', code: 'CS301T', teacher: 'Dr. Smith', room: 'Room 101', type: 'tutorial' },
          { subject: 'Tutorial - Algorithms', code: 'CS302T', teacher: 'Prof. Johnson', room: 'Room 102', type: 'tutorial' },
          { subject: 'Tutorial - Database Systems', code: 'CS303T', teacher: 'Dr. Brown', room: 'Room 103', type: 'tutorial' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ]
      },
      5: {
        'Monday': [
          { subject: 'Operating Systems', code: 'CS201', teacher: 'Dr. Anderson', room: 'Room 201', type: 'lecture' },
          { subject: 'Computer Architecture', code: 'CS202', teacher: 'Prof. Miller', room: 'Room 202', type: 'lecture' },
          { subject: 'Theory of Computation', code: 'CS203', teacher: 'Dr. Taylor', room: 'Room 203', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Compiler Design', code: 'CS204', teacher: 'Prof. White', room: 'Room 204', type: 'lecture' },
          { subject: 'Machine Learning', code: 'CS205', teacher: 'Dr. Green', room: 'Room 205', type: 'lecture' },
          { subject: 'OS Lab', code: 'CS201L', teacher: 'Dr. Anderson', room: 'Lab 301', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Tuesday': [
          { subject: 'Computer Architecture', code: 'CS202', teacher: 'Prof. Miller', room: 'Room 202', type: 'lecture' },
          { subject: 'Theory of Computation', code: 'CS203', teacher: 'Dr. Taylor', room: 'Room 203', type: 'lecture' },
          { subject: 'Compiler Design', code: 'CS204', teacher: 'Prof. White', room: 'Room 204', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Machine Learning', code: 'CS205', teacher: 'Dr. Green', room: 'Room 205', type: 'lecture' },
          { subject: 'Operating Systems', code: 'CS201', teacher: 'Dr. Anderson', room: 'Room 201', type: 'lecture' },
          { subject: 'Architecture Lab', code: 'CS202L', teacher: 'Prof. Miller', room: 'Lab 302', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Wednesday': [
          { subject: 'Theory of Computation', code: 'CS203', teacher: 'Dr. Taylor', room: 'Room 203', type: 'lecture' },
          { subject: 'Compiler Design', code: 'CS204', teacher: 'Prof. White', room: 'Room 204', type: 'lecture' },
          { subject: 'Machine Learning', code: 'CS205', teacher: 'Dr. Green', room: 'Room 205', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Operating Systems', code: 'CS201', teacher: 'Dr. Anderson', room: 'Room 201', type: 'lecture' },
          { subject: 'Computer Architecture', code: 'CS202', teacher: 'Prof. Miller', room: 'Room 202', type: 'lecture' },
          { subject: 'Compiler Lab', code: 'CS204L', teacher: 'Prof. White', room: 'Lab 303', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Thursday': [
          { subject: 'Machine Learning', code: 'CS205', teacher: 'Dr. Green', room: 'Room 205', type: 'lecture' },
          { subject: 'Operating Systems', code: 'CS201', teacher: 'Dr. Anderson', room: 'Room 201', type: 'lecture' },
          { subject: 'Computer Architecture', code: 'CS202', teacher: 'Prof. Miller', room: 'Room 202', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Theory of Computation', code: 'CS203', teacher: 'Dr. Taylor', room: 'Room 203', type: 'lecture' },
          { subject: 'Compiler Design', code: 'CS204', teacher: 'Prof. White', room: 'Room 204', type: 'lecture' },
          { subject: 'ML Lab', code: 'CS205L', teacher: 'Dr. Green', room: 'Lab 304', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Friday': [
          { subject: 'Compiler Design', code: 'CS204', teacher: 'Prof. White', room: 'Room 204', type: 'lecture' },
          { subject: 'Machine Learning', code: 'CS205', teacher: 'Dr. Green', room: 'Room 205', type: 'lecture' },
          { subject: 'Operating Systems', code: 'CS201', teacher: 'Dr. Anderson', room: 'Room 201', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Computer Architecture', code: 'CS202', teacher: 'Prof. Miller', room: 'Room 202', type: 'lecture' },
          { subject: 'Theory of Computation', code: 'CS203', teacher: 'Dr. Taylor', room: 'Room 203', type: 'lecture' },
          { subject: 'Project Work', code: 'CS299', teacher: 'Various', room: 'Lab 305', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Saturday': [
          { subject: 'Tutorial - OS', code: 'CS201T', teacher: 'Dr. Anderson', room: 'Room 201', type: 'tutorial' },
          { subject: 'Tutorial - Architecture', code: 'CS202T', teacher: 'Prof. Miller', room: 'Room 202', type: 'tutorial' },
          { subject: 'Tutorial - TOC', code: 'CS203T', teacher: 'Dr. Taylor', room: 'Room 203', type: 'tutorial' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ]
      }
    },
    'Information Technology': {
      6: {
        'Monday': [
          { subject: 'Web Technologies', code: 'IT301', teacher: 'Dr. Kumar', room: 'Room 301', type: 'lecture' },
          { subject: 'Mobile Computing', code: 'IT302', teacher: 'Prof. Sharma', room: 'Room 302', type: 'lecture' },
          { subject: 'Cloud Computing', code: 'IT303', teacher: 'Dr. Patel', room: 'Room 303', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Cyber Security', code: 'IT304', teacher: 'Prof. Singh', room: 'Room 304', type: 'lecture' },
          { subject: 'Data Analytics', code: 'IT305', teacher: 'Dr. Gupta', room: 'Room 305', type: 'lecture' },
          { subject: 'Web Tech Lab', code: 'IT301L', teacher: 'Dr. Kumar', room: 'Lab 401', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Tuesday': [
          { subject: 'Mobile Computing', code: 'IT302', teacher: 'Prof. Sharma', room: 'Room 302', type: 'lecture' },
          { subject: 'Cloud Computing', code: 'IT303', teacher: 'Dr. Patel', room: 'Room 303', type: 'lecture' },
          { subject: 'Cyber Security', code: 'IT304', teacher: 'Prof. Singh', room: 'Room 304', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Data Analytics', code: 'IT305', teacher: 'Dr. Gupta', room: 'Room 305', type: 'lecture' },
          { subject: 'Web Technologies', code: 'IT301', teacher: 'Dr. Kumar', room: 'Room 301', type: 'lecture' },
          { subject: 'Mobile Lab', code: 'IT302L', teacher: 'Prof. Sharma', room: 'Lab 402', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Wednesday': [
          { subject: 'Cloud Computing', code: 'IT303', teacher: 'Dr. Patel', room: 'Room 303', type: 'lecture' },
          { subject: 'Cyber Security', code: 'IT304', teacher: 'Prof. Singh', room: 'Room 304', type: 'lecture' },
          { subject: 'Data Analytics', code: 'IT305', teacher: 'Dr. Gupta', room: 'Room 305', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Web Technologies', code: 'IT301', teacher: 'Dr. Kumar', room: 'Room 301', type: 'lecture' },
          { subject: 'Mobile Computing', code: 'IT302', teacher: 'Prof. Sharma', room: 'Room 302', type: 'lecture' },
          { subject: 'Cloud Lab', code: 'IT303L', teacher: 'Dr. Patel', room: 'Lab 403', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Thursday': [
          { subject: 'Data Analytics', code: 'IT305', teacher: 'Dr. Gupta', room: 'Room 305', type: 'lecture' },
          { subject: 'Web Technologies', code: 'IT301', teacher: 'Dr. Kumar', room: 'Room 301', type: 'lecture' },
          { subject: 'Mobile Computing', code: 'IT302', teacher: 'Prof. Sharma', room: 'Room 302', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Cloud Computing', code: 'IT303', teacher: 'Dr. Patel', room: 'Room 303', type: 'lecture' },
          { subject: 'Cyber Security', code: 'IT304', teacher: 'Prof. Singh', room: 'Room 304', type: 'lecture' },
          { subject: 'Security Lab', code: 'IT304L', teacher: 'Prof. Singh', room: 'Lab 404', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Friday': [
          { subject: 'Cyber Security', code: 'IT304', teacher: 'Prof. Singh', room: 'Room 304', type: 'lecture' },
          { subject: 'Data Analytics', code: 'IT305', teacher: 'Dr. Gupta', room: 'Room 305', type: 'lecture' },
          { subject: 'Web Technologies', code: 'IT301', teacher: 'Dr. Kumar', room: 'Room 301', type: 'lecture' },
          { subject: 'Lunch Break', code: '', teacher: '', room: '', type: 'break' },
          { subject: 'Mobile Computing', code: 'IT302', teacher: 'Prof. Sharma', room: 'Room 302', type: 'lecture' },
          { subject: 'Cloud Computing', code: 'IT303', teacher: 'Dr. Patel', room: 'Room 303', type: 'lecture' },
          { subject: 'Analytics Lab', code: 'IT305L', teacher: 'Dr. Gupta', room: 'Lab 405', type: 'lab' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ],
        'Saturday': [
          { subject: 'Tutorial - Web Tech', code: 'IT301T', teacher: 'Dr. Kumar', room: 'Room 301', type: 'tutorial' },
          { subject: 'Tutorial - Mobile', code: 'IT302T', teacher: 'Prof. Sharma', room: 'Room 302', type: 'tutorial' },
          { subject: 'Tutorial - Cloud', code: 'IT303T', teacher: 'Dr. Patel', room: 'Room 303', type: 'tutorial' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' },
          { subject: 'Free Period', code: '', teacher: '', room: '', type: 'free' }
        ]
      }
    }
  }

  const getCurrentTimetable = () => {
    return timetableData[selectedDepartment]?.[selectedSemester] || {}
  }

  const getClassTypeColor = (type) => {
    const colors = {
      lecture: 'lecture',
      lab: 'lab',
      tutorial: 'tutorial',
      break: 'break',
      free: 'free'
    }
    return colors[type] || 'lecture'
  }

  const handleDaySelection = (day) => {
    setSelectedDay(day)
  }

  const currentTimetable = getCurrentTimetable()

  return (
    <div className="timetable-container">
      <div className="container">
        <div className="page-header">
          <h1>Class Timetable</h1>
          <p className="page-subtitle">
            {isStudent ? 'View your weekly class schedule' : 'Manage department timetables'}
          </p>
        </div>

        <div className="timetable-controls">
          <div className="control-group">
            <label htmlFor="department-select">Department:</label>
            <select
              id="department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-select"
              disabled={isStudent}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="semester-select">Semester:</label>
            <select
              id="semester-select"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
              className="form-select"
              disabled={isStudent}
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="view-mode">View:</label>
            <select
              id="view-mode"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="form-select"
            >
              <option value="week">Weekly View</option>
              <option value="day">Daily View</option>
            </select>
          </div>
        </div>

        {viewMode === 'week' ? (
          <div className="timetable-grid">
            <div className="timetable-header">
              <div className="time-column-header">Time</div>
              {weekDays.map(day => (
                <div key={day} className="day-header">
                  {day}
                </div>
              ))}
            </div>

            <div className="timetable-body">
              {timeSlots.map((timeSlot, timeIndex) => (
                <div key={timeSlot} className="timetable-row">
                  <div className="time-slot">
                    {timeSlot}
                  </div>
                  {weekDays.map(day => {
                    const classInfo = currentTimetable[day]?.[timeIndex]
                    return (
                      <div key={`${day}-${timeIndex}`} className="timetable-cell">
                        {classInfo && (
                          <div className={`class-card ${getClassTypeColor(classInfo.type)}`}>
                            <div className="class-subject">
                              {classInfo.subject}
                            </div>
                            {classInfo.code && (
                              <div className="class-code">
                                {classInfo.code}
                              </div>
                            )}
                            {classInfo.teacher && (
                              <div className="class-teacher">
                                {classInfo.teacher}
                              </div>
                            )}
                            {classInfo.room && (
                              <div className="class-room">
                                📍 {classInfo.room}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="daily-view">
            <div className="day-selector">
              {weekDays.map(day => (
                <button
                  key={day}
                  className={`day-btn ${day === selectedDay ? 'active' : ''}`}
                  onClick={() => handleDaySelection(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="daily-schedule">
              <h3>{selectedDay} Schedule</h3>
              <div className="daily-classes">
                {currentTimetable[selectedDay]?.map((classInfo, index) => (
                  <div key={index} className={`daily-class-card ${getClassTypeColor(classInfo.type)}`}>
                    <div className="daily-time">
                      {timeSlots[index]}
                    </div>
                    <div className="daily-class-info">
                      <h4>{classInfo.subject}</h4>
                      {classInfo.code && <p className="daily-code">{classInfo.code}</p>}
                      {classInfo.teacher && <p className="daily-teacher">👨‍🏫 {classInfo.teacher}</p>}
                      {classInfo.room && <p className="daily-room">📍 {classInfo.room}</p>}
                    </div>
                  </div>
                )) || (
                  <div className="no-classes">
                    <p>No classes scheduled for {selectedDay}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="timetable-legend">
          <h4>Class Types</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color lecture"></div>
              <span>Lecture</span>
            </div>
            <div className="legend-item">
              <div className="legend-color lab"></div>
              <span>Laboratory</span>
            </div>
            <div className="legend-item">
              <div className="legend-color tutorial"></div>
              <span>Tutorial</span>
            </div>
            <div className="legend-item">
              <div className="legend-color break"></div>
              <span>Break</span>
            </div>
            <div className="legend-item">
              <div className="legend-color free"></div>
              <span>Free Period</span>
            </div>
          </div>
        </div>

        {Object.keys(currentTimetable).length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No Timetable Available</h3>
            <p>Timetable for {selectedDepartment} - Semester {selectedSemester} is not available.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Timetable
