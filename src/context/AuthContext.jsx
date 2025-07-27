import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('unisphere_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication logic
      const mockUsers = {
        'student@unisphere.edu': {
          id: '1',
          email: 'student@unisphere.edu',
          name: 'John Doe',
          role: 'student',
          rollNumber: 'CS21B001',
          department: 'Computer Science',
          semester: 6,
          avatar: null
        },
        'admin@unisphere.edu': {
          id: '2',
          email: 'admin@unisphere.edu',
          name: 'Dr. Jane Smith',
          role: 'admin',
          department: 'Computer Science',
          avatar: null
        }
      }

      const user = mockUsers[credentials.email]
      if (user && credentials.password === 'password123') {
        setUser(user)
        localStorage.setItem('unisphere_user', JSON.stringify(user))
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('unisphere_user')
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
