import React from 'react'
import { useAuth } from './AuthContext'

const NewDashborad = () => {
    const {user, logOut} = useAuth()
  return (
    <div>
      <h1>Welcome!</h1>
      <p>UserName: {user.name}...</p>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default NewDashborad