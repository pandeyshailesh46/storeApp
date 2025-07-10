const API_URL = "http://localhost:3001/users";

export const fetchUser = async () => {
    const response = await fetch(API_URL);
    return response.json()
};

export const createUser  = async(userData)=>{
    const {id, ...newuser} = userData
   const response = await fetch(API_URL,{
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(newuser)
    });
    return response.json()
}

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const updateUser = async(id, formData)=>{
   const response = await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(formData)
    });
    return response.json()
}

