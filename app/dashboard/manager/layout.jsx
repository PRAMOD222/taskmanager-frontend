import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

const layout = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={['manager', 'admin']}>
      <div>
        {children}
      </div>
    </ProtectedRoute>
  )
}

export default layout