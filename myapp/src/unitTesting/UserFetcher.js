import React, { useState } from 'react';

export default function UserFetcher() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setUserData(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={fetchUser}>Fetch User</button>

      {loading && <p>Loading...</p>}
      {error && <p data-testid="error">{error}</p>}
      {userData && (
        <div data-testid="user">
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}
