import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import NewDashborad from './NewDashborad';
import Login from './Login';

const AuthConsumer = () => {
  const { user } = useAuth();

  return user ? <NewDashborad /> : <Login />;
};

const MainAuth = () => {
  return (
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>
  );
};

export default MainAuth;
