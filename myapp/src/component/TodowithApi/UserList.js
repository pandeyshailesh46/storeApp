import React from 'react'
const UserList = ({userData, onEdit, onDelete, toggle}) => {
  return (
    <>
        <h2>UserList  <button
        onClick={toggle}
         style={{float:"right", maxWidth: '150px'}}>Add User</button></h2>
       
         <table border="1" cellPadding="8" cellSpacing="0">
             <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Gender</th>
                    <th>Country</th>
                    <th>Hobbies</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                  {
              userData.length === 0 ? (
                 <tr>
                    <td colSpan="4">No users found.</td>
                </tr>
              ):(
                userData.map((user, idx)=>(
                    <tr key={user.id}>
                        <td>{idx + 1}</td>
                        <td>{user.fname} </td>
                        <td>{user.designation}</td>
                        <td>{user.salary}</td>
                        <td>{user.gender}</td>
                        <td>{user.country}</td>
                        <td>{user.hobbies.join(', ')}</td>
                        <td>
                            <button onClick={()=>onEdit(user)}>Edit</button>
                            <button onClick={()=>onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))
              )  
            }
            </tbody>
          
         </table>
    </>
  )
}

export default UserList