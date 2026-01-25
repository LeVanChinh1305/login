import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const {accessToken, user, loading} = useAuthStore();

    if(!accessToken) {
        return(
            <Navigate to="/signin" replace/>
        )
    }
  return (
    <Outlet></Outlet>
    //Outlet = chỗ để render route con.
  )
}

export default ProtectedRoute