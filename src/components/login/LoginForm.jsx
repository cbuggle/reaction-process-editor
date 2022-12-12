import React, { useState } from 'react'
import { FormGroup, Form, Input, Button } from 'reactstrap'

import { useAuthenticationFetcher } from '../../fetchers/AuthenticationFetcher';

const LoginForm = () => {

  const authenticationFetcher = useAuthenticationFetcher();

  const [credentials, updateCredentials] = useState({ username: "", password: "" })

  const onInputChange = (field) => {
    const { name, value } = field;
    updateCredentials(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    authenticationFetcher.signIn(credentials)
  }

  return (
    <>
      <Form>
        <FormGroup>
          <Input
            type="textfield"
            value={credentials.username}
            placeholder="Username"
            onChange={event => onInputChange({ name: 'username', value: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            value={credentials.password}
            placeholder="Password"
            onChange={event => onInputChange({ name: 'password', value: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</Button>
        </FormGroup>
      </Form>
    </>
  )
}

export default LoginForm
