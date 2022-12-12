import React from 'react'
import { Button } from 'reactstrap';

import { useAuthenticationFetcher } from '../../fetchers/AuthenticationFetcher';

const LogoutButton = () => {
  const api = useAuthenticationFetcher()

  return (
    <Button onClick={api.signOut} color="outline-light" size="sm">Logout</Button>
  )
}

export default LogoutButton
