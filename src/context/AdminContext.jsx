import React, { createContext, useState } from 'react'

export const AdminDataContext = createContext();

const AdminContext = ({children}) => {
  const [admin, setAdmin] = useState(null);

  const value = {
    admin,
    setAdmin,
  }

  return (
    <div>
      <AdminDataContext.Provider value={value}>
        {children}
      </AdminDataContext.Provider>
    </div>
  )
}

export default AdminContext