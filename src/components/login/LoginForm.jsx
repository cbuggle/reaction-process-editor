import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormGroup, Form, Input, Button } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';

import AuthenticationFetcher from '../../fetchers/AuthenticationFetcher'
import { afterSignInPath } from '../../Constants';

const LoginForm = () => {

  const navigate = useNavigate();

  const [credentials, updateCredentials] = useState({ username: "", password: "" })

  const onInputChange = (field) => {
    const { name, value } = field;
    updateCredentials(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthenticationFetcher.signInResponse(credentials).then((response) => {
      switch (response.status) {
        case 200:
          const jwt = response.headers.get('Authorization').split('Bearer ')[1];
          localStorage.setItem('username', credentials.username);
          localStorage.setItem('jwt', jwt);

          navigate(afterSignInPath)
          return;
        case 401:
          toast.error("Username or Password wrong.")
          localStorage.removeItem('username');
          localStorage.removeItem('jwt');
          return;
        default:
          toast.error("Unknown Error: " + response.status)
          localStorage.removeItem('username');
          localStorage.removeItem('jwt');
          return;
      }
    })
  }

  return (
    <>
      <ToastContainer enableMultiContainer={true} />
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
