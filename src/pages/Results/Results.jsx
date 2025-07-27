import React from 'react'
import { useAuth } from '../../context/AuthContext'
import StudentResults from './StudentResults'
import AdminResults from './AdminResults'
import './Results.css'

const Results = () => {
  const { isStudent, isAdmin } = useAuth()

  return (
    <div className="results-container">
      <div className="container">
        <div className="page-header">
          <h1>Results Management</h1>
          <p className="page-subtitle">
            {isStudent ? 'View your exam results and grades' : 'Manage and publish student results'}
          </p>
        </div>

        {isStudent && <StudentResults />}
        {isAdmin && <AdminResults />}
      </div>
    </div>
  )
}

export default Results
