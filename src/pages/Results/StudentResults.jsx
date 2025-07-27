import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const StudentResults = () => {
  const { user } = useAuth()
  const [selectedSemester, setSelectedSemester] = useState('current')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const resultsData = {
    current: [
      {
        id: 1,
        subject: 'Data Structures',
        code: 'CS301',
        results: [
          { type: 'Quiz 1', score: 18, maxScore: 20, date: '2024-01-05', weightage: 10 },
          { type: 'Quiz 2', score: 17, maxScore: 20, date: '2024-01-15', weightage: 10 },
          { type: 'Midsem', score: 42, maxScore: 50, date: '2024-01-25', weightage: 30 },
          { type: 'Assignment 1', score: 28, maxScore: 30, date: '2024-01-12', weightage: 15 },
          { type: 'Assignment 2', score: 25, maxScore: 30, date: '2024-01-20', weightage: 15 }
        ]
      },
      {
        id: 2,
        subject: 'Algorithms',
        code: 'CS302',
        results: [
          { type: 'Quiz 1', score: 16, maxScore: 20, date: '2024-01-06', weightage: 10 },
          { type: 'Quiz 2', score: 19, maxScore: 20, date: '2024-01-16', weightage: 10 },
          { type: 'Midsem', score: 38, maxScore: 50, date: '2024-01-26', weightage: 30 },
          { type: 'Assignment 1', score: 26, maxScore: 30, date: '2024-01-13', weightage: 15 }
        ]
      },
      {
        id: 3,
        subject: 'Database Systems',
        code: 'CS303',
        results: [
          { type: 'Quiz 1', score: 17, maxScore: 20, date: '2024-01-07', weightage: 10 },
          { type: 'Midsem', score: 45, maxScore: 50, date: '2024-01-27', weightage: 30 },
          { type: 'Assignment 1', score: 29, maxScore: 30, date: '2024-01-14', weightage: 15 }
        ]
      }
    ],
    previous: [
      {
        id: 4,
        subject: 'Operating Systems',
        code: 'CS201',
        finalGrade: 'A',
        gpa: 9.2,
        results: [
          { type: 'Quiz 1', score: 19, maxScore: 20, date: '2023-08-05', weightage: 10 },
          { type: 'Quiz 2', score: 18, maxScore: 20, date: '2023-08-15', weightage: 10 },
          { type: 'Midsem', score: 46, maxScore: 50, date: '2023-09-25', weightage: 30 },
          { type: 'Endsem', score: 88, maxScore: 100, date: '2023-11-20', weightage: 40 }
        ]
      }
    ]
  }

  const calculateSubjectScore = (results) => {
    const totalWeightedScore = results.reduce((sum, result) => {
      const percentage = (result.score / result.maxScore) * 100
      return sum + (percentage * result.weightage / 100)
    }, 0)
    return Math.round(totalWeightedScore * 100) / 100
  }

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'excellent'
    if (percentage >= 80) return 'good'
    if (percentage >= 70) return 'average'
    if (percentage >= 60) return 'below-average'
    return 'poor'
  }

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 85) return 'A'
    if (percentage >= 80) return 'B+'
    if (percentage >= 75) return 'B'
    if (percentage >= 70) return 'C+'
    if (percentage >= 65) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  }

  const currentData = resultsData[selectedSemester] || []
  const filteredData = selectedSubject === 'all' 
    ? currentData 
    : currentData.filter(item => item.id === parseInt(selectedSubject))

  return (
    <div className="student-results">
      <div className="results-summary">
        <div className="summary-card">
          <h3>Academic Performance</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-value">8.7</span>
              <span className="stat-label">Current CGPA</span>
            </div>
            <div className="stat">
              <span className="stat-value">85.2%</span>
              <span className="stat-label">Average Score</span>
            </div>
            <div className="stat">
              <span className="stat-value">A</span>
              <span className="stat-label">Average Grade</span>
            </div>
            <div className="stat">
              <span className="stat-value">6</span>
              <span className="stat-label">Subjects</span>
            </div>
          </div>
        </div>
      </div>

      <div className="results-filters">
        <div className="filter-group">
          <label htmlFor="semester-filter">Semester:</label>
          <select
            id="semester-filter"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="form-select"
          >
            <option value="current">Current Semester</option>
            <option value="previous">Previous Semesters</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="subject-filter">Subject:</label>
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="form-select"
          >
            <option value="all">All Subjects</option>
            {currentData.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.subject} ({subject.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-grid">
        {filteredData.map(subject => {
          const subjectScore = subject.finalGrade ? 
            subject.gpa * 10 : 
            calculateSubjectScore(subject.results)
          
          return (
            <div key={subject.id} className="results-card">
              <div className="card-header">
                <div className="subject-info">
                  <h3>{subject.subject}</h3>
                  <span className="subject-code">{subject.code}</span>
                </div>
                <div className={`grade-badge ${getGradeColor(subjectScore)}`}>
                  {subject.finalGrade || getGrade(subjectScore)}
                </div>
              </div>

              <div className="card-body">
                <div className="subject-score">
                  <h4>Overall Score: {subjectScore}%</h4>
                  {subject.gpa && <p>GPA: {subject.gpa}</p>}
                </div>

                <div className="results-list">
                  {subject.results.map((result, index) => (
                    <div key={index} className="result-item">
                      <div className="result-info">
                        <h5>{result.type}</h5>
                        <span className="result-date">
                          {new Date(result.date).toLocaleDateString()}
                        </span>
                        <span className="result-weightage">
                          Weightage: {result.weightage}%
                        </span>
                      </div>
                      <div className="result-score">
                        <span className="score">
                          {result.score}/{result.maxScore}
                        </span>
                        <span className={`percentage ${getGradeColor((result.score / result.maxScore) * 100)}`}>
                          {Math.round((result.score / result.maxScore) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSemester === 'current' && (
                  <div className="progress-info">
                    <h5>Semester Progress</h5>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(subject.results.reduce((sum, r) => sum + r.weightage, 0))}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      {subject.results.reduce((sum, r) => sum + r.weightage, 0)}% completed
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StudentResults
