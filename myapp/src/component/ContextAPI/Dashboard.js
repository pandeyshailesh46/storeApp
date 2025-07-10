import React, { useContext } from 'react'
import {UserContext}from './UserProvider'
const Dashboard = () => {
    const {theme, toggleTheme} = useContext(UserContext);
    const style = {
        background: theme === 'light' ? '#eee' : '#222',
        color: theme === 'light' ? '#222' : '#eee',
        minHeight: '100vh',
        padding: '40px',
        transition: 'all 0.3s ease'
    }
  return (
    <div style={style}>
        <h1>Current Theme, {theme} 👋</h1>
        <button onClick={toggleTheme}>
             Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
    </div>
  )
}

export default Dashboard