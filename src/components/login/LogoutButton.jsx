import React from 'react'
import { Button } from 'reactstrap';

import { useAuthenticationFetcher } from '../../fetchers/AuthenticationFetcher';

const LogoutButton = () => {
  const api = useAuthenticationFetcher()

  return (
    <Button onClick={api.signOut} color="outline-light">Logout</Button>
  )
}

export default LogoutButton
