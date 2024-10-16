import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types';

const ProtectedRoutes = ({isAuth}) => {
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoutes

ProtectedRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};