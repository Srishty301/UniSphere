import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Materials.css'

const Materials = () => {
  const { isStudent, isAdmin } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)

  const materials = [
    {
      id: 1,
      title: 'Data Structures and Algorithms Textbook',
      subject: 'Data Structures',
      category: 'textbook',
      type: 'pdf',
      size: '15.2 MB',
      uploadDate: '2024-01-15',
      downloads: 245,
      description: 'Comprehensive guide covering all fundamental data structures and algorithms'
    },
    {
      id: 2,
      title: 'Database Systems Syllabus - Semester 6',
      subject: 'Database Systems',
      category: 'syllabus',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: '2024-01-10',
      downloads: 189,
      description: 'Complete syllabus for Database Systems course including topics and evaluation criteria'
    },
    {
      id: 3,
      title: 'Algorithms Midsem 2023 Question Paper',
      subject: 'Algorithms',
      category: 'pyq',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-01-08',
      downloads: 156,
      description: 'Previous year question paper for Algorithms midsemester examination'
    },
    {
      id: 4,
      title: 'Computer Networks Lab Manual',
      subject: 'Computer Networks',
      category: 'lab-manual',
      type: 'pdf',
      size: '8.7 MB',
      uploadDate: '2024-01-12',
      downloads: 98,
      description: 'Step-by-step lab exercises for Computer Networks practical sessions'
    },
    {
      id: 5,
      title: 'Operating Systems Reference Notes',
      subject: 'Operating Systems',
      category: 'notes',
      type: 'pdf',
      size: '12.4 MB',
      uploadDate: '2024-01-05',
      downloads: 203,
      description: 'Detailed notes covering all OS concepts with examples and diagrams'
    },
    {
      id: 6,
      title: 'Database Design Assignment Solutions',
      subject: 'Database Systems',
      category: 'solutions',
      type: 'pdf',
      size: '4.3 MB',
      uploadDate: '2024-01-18',
      downloads: 87,
      description: 'Sample solutions for database design assignments and exercises'
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'textbook', label: 'Textbooks' },
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'notes', label: 'Notes' },
    { value: 'pyq', label: 'Previous Year Questions' },
    { value: 'lab-manual', label: 'Lab Manuals' },
    { value: 'solutions', label: 'Solutions' }
  ]

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Data Structures', label: 'Data Structures' },
    { value: 'Algorithms', label: 'Algorithms' },
    { value: 'Database Systems', label: 'Database Systems' },
    { value: 'Computer Networks', label: 'Computer Networks' },
    { value: 'Operating Systems', label: 'Operating Systems' }
  ]

  const getFilteredMaterials = () => {
    return materials.filter(material => {
      const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory
      const subjectMatch = selectedSubject === 'all' || material.subject === selectedSubject
      return categoryMatch && subjectMatch
    })
  }

  const getCategoryIcon = (category) => {
    const icons = {
      textbook: '📚',
      syllabus: '📋',
      notes: '📝',
      pyq: '📄',
      'lab-manual': '🔬',
      solutions: '✅'
    }
    return icons[category] || '📄'
  }

  const getCategoryColor = (category) => {
    const colors = {
      textbook: 'primary',
      syllabus: 'success',
      notes: 'warning',
      pyq: 'danger',
      'lab-manual': 'info',
      solutions: 'secondary'
    }
    return colors[category] || 'primary'
  }

  const handleDownload = (material) => {
    console.log('Downloading:', material.title)
    // Simulate download
  }

  const handlePreview = (material) => {
    setPreviewFile(material)
  }

  const filteredMaterials = getFilteredMaterials()

  return (
    <div className="materials-container">
      <div className="container">
        <div className="page-header">
          <h1>Study Materials</h1>
          <p className="page-subtitle">
            {isStudent ? 'Access textbooks, notes, and previous year questions' : 'Manage and upload study materials'}
          </p>
        </div>

        <div className="materials-controls">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
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
                {subjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn btn-primary"
            >
              Upload Material
            </button>
          )}
        </div>

        <div className="materials-stats">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Total Materials</h3>
              <p className="stat-value">{materials.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📥</div>
            <div className="stat-content">
              <h3>Total Downloads</h3>
              <p className="stat-value">{materials.reduce((sum, m) => sum + m.downloads, 0)}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3>Categories</h3>
              <p className="stat-value">{categories.length - 1}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Subjects</h3>
              <p className="stat-value">{subjects.length - 1}</p>
            </div>
          </div>
        </div>

        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <div className="material-icon">
                  {getCategoryIcon(material.category)}
                </div>
                <div className="material-info">
                  <h3>{material.title}</h3>
                  <div className="material-meta">
                    <span className="subject">{material.subject}</span>
                    <span className={`category-badge ${getCategoryColor(material.category)}`}>
                      {categories.find(c => c.value === material.category)?.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="material-body">
                <p className="material-description">{material.description}</p>
                
                <div className="material-details">
                  <div className="detail-item">
                    <span className="detail-icon">📄</span>
                    <span>{material.type.toUpperCase()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💾</span>
                    <span>{material.size}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📥</span>
                    <span>{material.downloads} downloads</span>
                  </div>
                </div>
              </div>

              <div className="material-actions">
                <button
                  onClick={() => handlePreview(material)}
                  className="btn btn-outline"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(material)}
                  className="btn btn-primary"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Materials Found</h3>
            <p>No materials match your current filters. Try adjusting your search criteria.</p>
          </div>
        )}

        {showUploadModal && isAdmin && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Upload Study Material</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form className="upload-form">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Enter material title" 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <select className="form-select">
                        <option value="">Select Subject</option>
                        {subjects.slice(1).map(subject => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-select">
                        <option value="">Select Category</option>
                        {categories.slice(1).map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-input" 
                      rows="3" 
                      placeholder="Enter material description"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">File</label>
                    <div className="file-upload-area">
                      <div className="upload-icon">📁</div>
                      <p>Drag and drop your file here, or click to browse</p>
                      <input type="file" className="file-input" accept=".pdf,.doc,.docx,.ppt,.pptx" />
                      <button type="button" className="btn btn-outline">Choose File</button>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowUploadModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Upload Material
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {previewFile && (
          <div className="modal-overlay" onClick={() => setPreviewFile(null)}>
            <div className="modal-content preview-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{previewFile.title}</h3>
                <button 
                  onClick={() => setPreviewFile(null)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="preview-container">
                  <div className="preview-placeholder">
                    <div className="preview-icon">📄</div>
                    <h4>PDF Preview</h4>
                    <p>Preview functionality would be implemented here</p>
                    <p className="preview-note">
                      In a real application, this would show the actual PDF content
                    </p>
                  </div>
                </div>
                <div className="preview-actions">
                  <button 
                    onClick={() => handleDownload(previewFile)}
                    className="btn btn-primary"
                  >
                    Download File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Materials
