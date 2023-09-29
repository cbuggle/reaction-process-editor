import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useRequestWrapper } from './requestWrapper';
import { afterSignInPath, afterSignOutPath, toastAutoCloseOnError } from '../constants';

export { useAuthenticationFetcher };

function useAuthenticationFetcher() {
  const requestWrapper = useRequestWrapper();
  const navigate = useNavigate();

  return {
    signIn,
    signOut
  }

  function signIn(credentials) {

    let body = { user: { login: credentials.username, password: credentials.password } }

    requestWrapper.request('POST', `/sign_in`, body).then((response) => {
      if (response) {
        switch (response.status) {
          case 200:
            let token = response.headers.get('Authorization').split('Bearer ')[1]
            createSession(credentials.username, token)
            return;
          case 401:
            toast.error("Username or Password wrong.", { autoClose: toastAutoCloseOnError })
            destroySession();
            return;
          default:
            toast.error("Unknown Error: " +
              (response && response.status) + " Message: " + (response && response.statusText),
              { autoClose: toastAutoCloseOnError })
            destroySession();
            return;
        }
      }
    })
  }

  function signOut() {
    return requestWrapper.request('DELETE', '/sign_out').then(() => { destroySession(); })
  }

  function createSession(username, token) {
    localStorage.setItem('username', username);
    localStorage.setItem('bearer_auth_token', token);
    navigate(afterSignInPath)
  }

  function destroySession() {
    localStorage.removeItem('username');
    localStorage.removeItem('bearer_auth_token');
    navigate(afterSignOutPath);
  }
}
