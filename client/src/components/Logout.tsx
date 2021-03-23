import React from 'react';
import { useAuth } from '../context/authContext'
import Button from 'react-bootstrap/Button'

export const Logout = () => {
  const { setUser } = useAuth()

  const handleLogout = () => {
    localStorage.clear()
    setUser({
      info: {
        user_id: null,
        email: null,
        username: null
      },
      token: null
    })
  }
  return (
    <Button variant="primary" onClick={handleLogout}>Logout</Button>
  )
}