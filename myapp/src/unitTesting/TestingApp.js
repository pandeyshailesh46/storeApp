import React, { useState } from 'react'

const TestingApp = () => {
    const[inputText, setInputText] = useState('')
    const[buttonText, setButtonText] = useState('')
    const handleButton = ()=>{
        setButtonText('Update Text')
    }
  return (
    <>
        <h1>TestingApp</h1>
        <input 
        type='text'
        placeholder='Enter user name...'
        name='username'
        id='name'
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
        />
        <h2>{buttonText}</h2>
        <button onClick={handleButton}>UpdateText</button>
    </>
  )
}

export default TestingApp