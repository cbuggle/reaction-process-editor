import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from 'reactstrap';
import AuthenticationFetcher from '../../fetchers/AuthenticationFetcher';

const LogoutButton = () => {
  const navigate = useNavigate();

  const signOut = () => {
    AuthenticationFetcher.signOut().then(() => {
      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
      navigate('/');
    })
  }

  return (
    <Button onClick={signOut} color="outline-light">Logout</Button>
  )
}

export default LogoutButton
