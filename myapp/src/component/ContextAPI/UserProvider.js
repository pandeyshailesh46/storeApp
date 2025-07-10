import React, { createContext, useState } from 'react'
import Dashboard from './Dashboard';

export const UserContext  = createContext();
const UserProvider = ({children }) => {
    const[theme, setTheme] = useState('light');

    const toggleTheme = ()=>{
        setTheme((prev)=> prev === 'light' ? 'dark': 'light')
    }

  return (
    <>
        <UserContext.Provider value={{theme, toggleTheme}}>
            < Dashboard/>
        </UserContext.Provider>
    </>
  )
}

export default UserProvider