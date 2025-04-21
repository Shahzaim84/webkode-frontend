import React, { createContext, useState } from 'react'

export const DeveloperDataContext = createContext();

const DeveloperContext = ({children}) => {
  const [developer, setDeveloper] = useState(null);

  const value = {
    developer,
    setDeveloper,
  }

  return (
    <div>
      <DeveloperDataContext.Provider value={value}>
        {children}
      </DeveloperDataContext.Provider>
    </div>
  )
}

export default DeveloperContext