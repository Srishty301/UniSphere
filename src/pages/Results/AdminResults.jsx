import React, { useState } from 'react'

const AdminResults = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [resultsData, setResultsData] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const classes = [
    { id: 1, name: 'CS301 - Data Structures', students: 45 },
    { id: 2, name: 'CS302 - Algorithms', students: 42 },
    { id: 3, name: 'CS303 - Database Systems', students: 38 },
    { id: 4, name: 'CS304 - Computer Networks', students: 40 }
  ]

  const examTypes = [
    { id: 1, name: 'Quiz 1', maxScore: 20, weightage: 10 },
    { id: 2, name: 'Quiz 2', maxScore: 20, weightage: 10 },
    { id: 3, name: 'Midsem Exam', maxScore: 50, weightage: 30 },
    { id: 4, name: 'Assignment 1', maxScore: 30, weightage: 15 },
    { id: 5, name: 'Endsem Exam', maxScore: 100, weightage: 35 }
  ]

  const mockResults = [
    { id: 1, rollNumber: 'CS21B001', name: 'John Doe', score: 18, status: 'published' },
    { id: 2, rollNumber: 'CS21B002', name: 'Jane Smith', score: 17, status: 'published' },
    { id: 3, rollNumber: 'CS21B003', name: 'Mike Johnson', score: 15, status: 'draft' },
    { id: 4, rollNumber: 'CS21B004', name: 'Sarah Wilson', score: 19, status: 'published' },
    { id: 5, rollNumber: 'CS21B005', name: 'David Brown', score: 16, status: 'published' }
  ]

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value)
    setSelectedExam('')
    setResultsData([])
  }

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value)
    if (e.target.value) {
      setResultsData(mockResults)
    } else {
      setResultsData([])
    }
  }

  const handleScoreChange = (studentId, score) => {
    setResultsData(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, score: parseInt(score) || 0 } : student
      )
    )
  }

  const handleStatusChange = (studentId, status) => {
    setResultsData(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    )
  }

  const handleSaveResults = () => {
    console.log('Saving results:', { selectedClass, selectedExam, resultsData })
    setIsEditing(false)
  }

  const handlePublishAll = () => {
    setResultsData(prev => 
      prev.map(student => ({ ...student, status: 'published' }))
    )
  }

  const getResultsStats = () => {
    if (!resultsData.length) return { average: 0, highest: 0, lowest: 0, published: 0 }
    
    const scores = resultsData.map(s => s.score)
    const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    const highest = Math.max(...scores)
    const lowest = Math.min(...scores)
    const published = resultsData.filter(s => s.status === 'published').length

    return { average, highest, lowest, published }
  }

  const selectedExamDetails = examTypes.find(exam => exam.id === parseInt(selectedExam))
  const stats = getResultsStats()

  return (
    <div className="admin-results">
      <div className="results-controls">
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
          <label htmlFor="exam-select">Select Exam:</label>
          <select
            id="exam-select"
            value={selectedExam}
            onChange={handleExamChange}
            className="form-select"
            disabled={!selectedClass}
          >
            <option value="">Choose an exam...</option>
            {examTypes.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.name} (Max: {exam.maxScore}, Weight: {exam.weightage}%)
              </option>
            ))}
          </select>
        </div>

        {selectedClass && selectedExam && (
          <div className="control-actions">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Results'}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveResults}
                className="btn btn-success"
              >
                Save Results
              </button>
            )}
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn btn-secondary"
            >
              Upload CSV
            </button>
          </div>
        )}
      </div>

      {selectedClass && selectedExam && resultsData.length > 0 && (
        <>
          <div className="results-stats-admin">
            <div className="stat-card">
              <h3>Average Score</h3>
              <span className="stat-number average">{stats.average}</span>
              <span className="stat-max">/ {selectedExamDetails?.maxScore}</span>
            </div>
            <div className="stat-card">
              <h3>Highest Score</h3>
              <span className="stat-number highest">{stats.highest}</span>
              <span className="stat-max">/ {selectedExamDetails?.maxScore}</span>
            </div>
            <div className="stat-card">
              <h3>Lowest Score</h3>
              <span className="stat-number lowest">{stats.lowest}</span>
              <span className="stat-max">/ {selectedExamDetails?.maxScore}</span>
            </div>
            <div className="stat-card">
              <h3>Published</h3>
              <span className="stat-number published">{stats.published}</span>
              <span className="stat-max">/ {resultsData.length}</span>
            </div>
          </div>

          {isEditing && (
            <div className="bulk-actions">
              <h3>Bulk Actions:</h3>
              <div className="bulk-buttons">
                <button
                  onClick={handlePublishAll}
                  className="btn btn-success"
                >
                  Publish All Results
                </button>
                <button
                  onClick={() => setResultsData(prev => prev.map(s => ({ ...s, status: 'draft' })))}
                  className="btn btn-warning"
                >
                  Mark All as Draft
                </button>
              </div>
            </div>
          )}

          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  {isEditing && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {resultsData.map(student => {
                  const percentage = Math.round((student.score / selectedExamDetails?.maxScore) * 100)
                  return (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            value={student.score}
                            onChange={(e) => handleScoreChange(student.id, e.target.value)}
                            className="score-input"
                            min="0"
                            max={selectedExamDetails?.maxScore}
                          />
                        ) : (
                          `${student.score}/${selectedExamDetails?.maxScore}`
                        )}
                      </td>
                      <td>
                        <span className={`percentage-badge ${percentage >= 80 ? 'good' : percentage >= 60 ? 'average' : 'poor'}`}>
                          {percentage}%
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${student.status}`}>
                          {student.status === 'published' ? '✓ Published' : '📝 Draft'}
                        </span>
                      </td>
                      {isEditing && (
                        <td>
                          <div className="status-controls">
                            <button
                              onClick={() => handleStatusChange(student.id, 'published')}
                              className={`status-btn ${student.status === 'published' ? 'active' : ''}`}
                            >
                              Publish
                            </button>
                            <button
                              onClick={() => handleStatusChange(student.id, 'draft')}
                              className={`status-btn ${student.status === 'draft' ? 'active' : ''}`}
                            >
                              Draft
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!selectedClass && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Select Class and Exam</h3>
          <p>Choose a class and exam type to view or edit results.</p>
        </div>
      )}

      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Results CSV</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-area">
                <div className="upload-icon">📁</div>
                <p>Drag and drop your CSV file here, or click to browse</p>
                <input type="file" accept=".csv" className="file-input" />
                <button className="btn btn-primary">Choose File</button>
              </div>
              <div className="csv-format">
                <h4>Expected CSV Format:</h4>
                <code>
                  roll_number,student_name,score<br/>
                  CS21B001,John Doe,18<br/>
                  CS21B002,Jane Smith,17
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminResults
