import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({isWalletConnected}) => {
  return isWalletConnected ? <Outlet/> : <Navigate to='/connect'/>
}

export default PrivateRoute