import { useFetchWrapper } from './fetch-wrapper';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { apiBasePath, afterSignInPath, afterSignOutPath } from '../Constants';

export { useAuthenticationFetcher };

function useAuthenticationFetcher() {

  const api = useFetchWrapper();
  const navigate = useNavigate();

  return {
    signIn,
    signOut
  }

  function signIn(credentials) {
    const promise = fetch(`${apiBasePath}/sign_in`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        user: { login: credentials.username, password: credentials.password }
      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          const bearer_auth_token = response.headers.get('Authorization').split('Bearer ')[1];
          localStorage.setItem('username', credentials.username);
          localStorage.setItem('bearer_auth_token', bearer_auth_token);

          navigate(afterSignInPath)
          return;
        case 401:
          resetSession();
          toast.error("Username or Password wrong.")
          return;
        default:
          resetSession();
          toast.error("Unknown Error: " + response.status)
          return;
      }
    })
  }

  function signOut() {
    return api.delete('/sign_out').then(() => {
      resetSession();
      navigate(afterSignOutPath)
      return;
    })
  }

  function resetSession() {
    localStorage.removeItem('username');
    localStorage.removeItem('bearer_auth_token');
  }
}


