import React, { useEffect, useState } from "react";
import "../TodowithApi/user.css";
import UserList from "./UserList";
import { fetchUser, createUser, deleteUser, updateUser } from "./api/userApi";

const UserForm = () => {
  const initialState = {
    fname: "",
    designation: "",
    salary: "",
    gender: "",
    hobbies: [],
    country: "",
  };
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editID, setEditID]  = useState(null)
  const [toggleVal, setToggle] = useState(false)

const handleChange = (e)=>{
     const{type,name,value,checked} = e.target;
     if(type === 'checkbox' && name==='hobbies'){
        setFormData((prev)=>{
            const updatedHobbies = checked ?
            [...prev.hobbies, value] :
            prev.hobbies.filter(item=> item !== value);
            return {...prev, hobbies : updatedHobbies}
        })
     }else {
        setFormData({
            ...formData, [name]: value
        })
     }
     
}

const loaduser = async()=>{
    const data = await fetchUser();
    setUserData(data);
}

  useEffect(() => {
    loaduser();
  }, []);

const handleDelete = async(id)=>{
   await deleteUser(id);
   loaduser(); 
}

const handleSubmit = async(e) => {
  e.preventDefault();
  console.log("📦 Submitted:", formData);

  if (editID === null) {
    await createUser(formData);
  } else {
    await updateUser(editID, formData);
    setEditID(null);
  }
  setFormData(initialState);
  loaduser()
  setToggle(false)
};
const handleEdit = (user)=>{
    setFormData(user);
    setEditID(user.id);
    setToggle(true)
}

const handleToggle = ()=>{
    setToggle((prev)=> !prev)
}

  return (
    <>
     {
        toggleVal ? (
            <>
                <div className="todos-block">
        <h2>Todo List with Crud Operation 
            <button
        onClick={handleToggle}
         style={{float:"right", maxWidth: '150px'}}>User List</button>
        </h2>
        <div className="empform">
          <input
            type="text"
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
          <input
            type="text"
            name="salary"
            placeholder="Enter salary..."
            value={formData.salary}
            onChange={handleChange}
          />

          {/* ✅ Gender Radio Buttons */}
          <div className="gender">
            <h4>Gender</h4>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
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
                checked={formData.gender === "Female"}
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
                checked={formData.gender === "Other"}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          {/* Country */}
          <div className="country">
            <label className="form-label">Country</label>
            <select
              className="form-select"
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
            {["reading", "traveling", "singing", "cricket"].map(
              (item, index) => (
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
              )
            )}
          </div>
        </div>
       
        <button onClick={handleSubmit}>
         {editID === null ? "AddTodo" : "Update"}
        </button>
      </div>
            </>
        ) : (
            <div className="todos-list">
        <UserList 
        userData={userData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        toggle={handleToggle}
         />
      </div>
        )
     }
      
      
    </>
  );
};

export default UserForm;
