import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Calendar.css'

const Calendar = () => {
  const { isStudent, isAdmin } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const events = [
    {
      id: 1,
      title: 'Data Structures - Endsem Exam',
      date: '2024-02-15',
      type: 'exam',
      time: '09:00 AM',
      duration: '3 hours',
      location: 'Hall A',
      description: 'Final examination for Data Structures course'
    },
    {
      id: 2,
      title: 'Tech Fest 2024',
      date: '2024-02-10',
      type: 'event',
      time: '10:00 AM',
      duration: '2 days',
      location: 'Main Campus',
      description: 'Annual technical festival with competitions and workshops'
    },
    {
      id: 3,
      title: 'Algorithms Assignment Due',
      date: '2024-02-05',
      type: 'assignment',
      time: '11:59 PM',
      duration: null,
      location: 'Online Submission',
      description: 'Submit Algorithm Analysis Assignment #3'
    },
    {
      id: 4,
      title: 'Database Systems Lab',
      date: '2024-02-08',
      type: 'class',
      time: '02:00 PM',
      duration: '2 hours',
      location: 'Lab 201',
      description: 'Practical session on SQL queries and database design'
    },
    {
      id: 5,
      title: 'Career Fair',
      date: '2024-02-20',
      type: 'event',
      time: '09:00 AM',
      duration: '1 day',
      location: 'Auditorium',
      description: 'Meet with top companies for internship and job opportunities'
    }
  ]

  const eventTypes = [
    { value: 'all', label: 'All Events', color: '#64748b' },
    { value: 'exam', label: 'Exams', color: '#ef4444' },
    { value: 'assignment', label: 'Assignments', color: '#f59e0b' },
    { value: 'class', label: 'Classes', color: '#2563eb' },
    { value: 'event', label: 'Events', color: '#10b981' }
  ]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const getFilteredEvents = () => {
    if (filterType === 'all') return events
    return events.filter(event => event.type === filterType)
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
          {dayEvents.length > 0 && (
            <div className="event-indicators">
              {dayEvents.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className={`event-dot ${event.type}`}
                  title={event.title}
                ></div>
              ))}
              {dayEvents.length > 3 && (
                <span className="more-events">+{dayEvents.length - 3}</span>
              )}
            </div>
          )}
        </div>
      )
    }

    return days
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="calendar-container">
      <div className="container">
        <div className="page-header">
          <h1>Academic Calendar</h1>
          <p className="page-subtitle">
            {isStudent ? 'View upcoming exams, assignments, and events' : 'Manage academic calendar and events'}
          </p>
        </div>

        <div className="calendar-controls">
          <div className="calendar-navigation">
            <button onClick={() => navigateMonth(-1)} className="nav-btn">
              ←
            </button>
            <h2 className="current-month">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => navigateMonth(1)} className="nav-btn">
              →
            </button>
          </div>

          <div className="calendar-filters">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-select"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                Add Event
              </button>
            )}
          </div>
        </div>

        <div className="calendar-layout">
          <div className="calendar-grid-container">
            <div className="calendar-header">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-header-day">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-grid">
              {renderCalendarDays()}
            </div>
          </div>

          <div className="events-sidebar">
            <div className="events-section">
              <h3>
                {selectedDate 
                  ? `Events on ${selectedDate.toLocaleDateString()}`
                  : 'Upcoming Events'
                }
              </h3>
              
              <div className="events-list">
                {(selectedDate ? selectedDateEvents : getFilteredEvents().slice(0, 10)).map(event => (
                  <div key={event.id} className={`event-card ${event.type}`}>
                    <div className="event-header">
                      <h4>{event.title}</h4>
                      <span className={`event-type-badge ${event.type}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="event-details">
                      <div className="event-detail">
                        <span className="detail-icon">📅</span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="event-detail">
                        <span className="detail-icon">🕒</span>
                        <span>{event.time}</span>
                      </div>
                      {event.duration && (
                        <div className="event-detail">
                          <span className="detail-icon">⏱️</span>
                          <span>{event.duration}</span>
                        </div>
                      )}
                      <div className="event-detail">
                        <span className="detail-icon">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    {event.description && (
                      <p className="event-description">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {selectedDate && selectedDateEvents.length === 0 && (
                <div className="no-events">
                  <p>No events scheduled for this date.</p>
                </div>
              )}
            </div>

            <div className="legend">
              <h4>Event Types</h4>
              <div className="legend-items">
                {eventTypes.slice(1).map(type => (
                  <div key={type.value} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span>{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showAddModal && isAdmin && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Event</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form className="event-form">
                  <div className="form-group">
                    <label className="form-label">Event Title</label>
                    <input type="text" className="form-input" placeholder="Enter event title" />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input type="date" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time</label>
                      <input type="time" className="form-input" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Type</label>
                      <select className="form-select">
                        <option value="exam">Exam</option>
                        <option value="assignment">Assignment</option>
                        <option value="class">Class</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <input type="text" className="form-input" placeholder="e.g., 2 hours" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-input" placeholder="Enter location" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-input" 
                      rows="3" 
                      placeholder="Enter event description"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar
