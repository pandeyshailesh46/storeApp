import React, { useState } from 'react'
import { useAuth } from './AuthContext'

const Login = () => {
    const {login} = useAuth();
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
        login(email, password)
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit">Login</button>
        </form>
    </>
  )
}

export default Login