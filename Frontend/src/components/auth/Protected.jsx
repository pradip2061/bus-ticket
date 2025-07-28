// src/routes/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
  const { role } = useSelector((state) => state.login);

  if (role !== 'operator') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
