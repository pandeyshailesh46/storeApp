import React, { useEffect, useState } from "react";
import "../Todos/todo.css";
import TodoList from "./TodoList";
const Todo = () => {
    const initialState = {
        fname:'',
        designation:'',
        salary:'',
        gender:'',
        hobbies:[],
        country:''
    }
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState(()=>{
    const getData = localStorage.getItem('emplist');
    return getData ? JSON.parse(getData) : []
  })
  const[editID, setEditID] = useState(null);



  const handleChange = (e) => {
    const{name,type,checked,value} = e.target;
    if(type === 'checkbox' && name === 'hobbies'){
        setFormData((prev)=>{
            const updatedHobbies = checked 
            ? [...prev.hobbies, value]
            : prev.hobbies.filter(hobby => hobby !==value);
            return {...prev, hobbies: updatedHobbies}
        });
    }else{
        setFormData({...formData, [name]: value})
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 Submitted:", formData);
    setData((prev)=>[...prev, formData])
    setFormData(initialState)
  };

  useEffect(()=>{
        localStorage.setItem('emplist', JSON.stringify(data))
  },[data])

  const handleDelete = (idx)=>{
    const filtered = data.filter((_, id) => id !== idx);
    setData(filtered);
  }
  const handleEdit = (idx)=>{
    setFormData(data[idx])
    setEditID(idx)
  }
  const handleUpdate = ()=>{
    const updated = [...data];
    updated[editID] = formData;
    setData(updated);
    setEditID(null)
    setFormData(initialState)
  }

  return (
    <>
      <div className="todos-block">
        <h2>Todo List with Crud Operation</h2>

        <div className="empform">
          <input type="text"
           name="fname"
            placeholder="Enter Name..."
            value={formData.fname}
            onChange={handleChange}
             />
          <input
            type="text"
            name="designation"
            placeholder="Enter Designation..."
            value={formData.designation}
            onChange={handleChange}
          />
          <input type="text" 
          name="salary" 
          placeholder="Enter salary..."
          value={formData.salary}
          onChange={handleChange}
           />

          {/* ✅ Gender Radio Buttons */}
          <div className="gender">
            <h4>Gender</h4>
            <div>
              <input type="radio"
               id="male" 
               name="gender" 
               value="Male"
               checked={formData.gender === 'Male'}
               onChange={handleChange}
                />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input 
              type="radio"
               id="female"
                name="gender"
                 value="Female"
                 checked={formData.gender === 'Female'} 
                 onChange={handleChange}
                 />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input 
              type="radio" 
              id="other"
               name="gender"
               value="Other"
               onChange={handleChange}
               checked={formData.gender === 'Other'} 
                 />
              <label htmlFor="other">Other</label>
            </div>
          </div>

             {/* Country */}
                <div className="country">
                    <label className="form-label">Country</label>
                    <select className="form-select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="">Select your country</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                    </select>
                    
                </div>

          {/* ✅ Hobbies Section */}
          <div className="hobbies">
            <h4>Hobbies</h4>
            {
                ["reading", "traveling", "singing", "cricket"].map((item,index)=>(
                <>
                    <div className="hobbies-list" key={index}>
                        <input
                            id={`hobbies-${index}`}
                            type="checkbox"
                            name="hobbies"
                            value={item}
                            onChange={handleChange}
                            checked={formData.hobbies.includes(item)}
                        />
                        <label htmlFor={`hobbies-${index}`}>{item}</label>
                    </div>
                </>
                ))
            }
          </div>
        </div>
        {
            editID === null ? (
                <button onClick={handleSubmit}>AddTodo</button>
            ): (
                <button  onClick={handleUpdate}>Update</button>
            )
        } 
      </div>
      <div className="todos-list">
        <TodoList 
        data={data} 
        handleDelete={handleDelete}
        handleEdit={handleEdit}/>
      </div>
    </>
  );
};

export default Todo;
