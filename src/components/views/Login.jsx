import React, { useState } from 'react'
import { FormGroup, Form, Input, Button, Container, Row, Col } from 'reactstrap'

import { useAuthenticationFetcher } from '../../fetchers/AuthenticationFetcher';

const Login = () => {

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
      <div className='bg-primary d-flex align-items-center justify-content-center h-100'>
        <div className='d-flex flex-column align-items-center h-75'>
          <h1 className='mb-4 text-light'>Please Login with your eln credentials</h1>
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
              <Button color="white" type="submit" onClick={handleSubmit} className="float-end">Submit</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login
