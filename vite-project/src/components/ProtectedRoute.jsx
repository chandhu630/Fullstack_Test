import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ type }) => {
  const { user } = useAuth();
  console.log(user);
  if(!user)
  {

   return <Navigate to='/login' />
  }

  if(user.role == type)
  {
    return <Outlet />;
  }
  
  return <Navigate to='/' />
};

export default ProtectedRoute;
