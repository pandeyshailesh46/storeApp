import React from 'react';

const TodoList = ({ data, handleDelete, handleEdit }) => {
  return (
    <>
      <h2>Todo List</h2>

      {data.length > 0 ? (
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.fname}</td>
                <td>{item.designation}</td>
                <td>{item.salary}</td>
                <td>{item.gender}</td>
                <td>{item.country}</td>
                <td>{item.hobbies.join(', ')}</td>
                <td>
                    <button onClick={()=>handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default TodoList;
