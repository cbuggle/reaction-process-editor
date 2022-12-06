import { elnBaseURL } from '../Constants'
import 'react-toastify/dist/ReactToastify.css';
export default class AuthenticationFetcher {

  static signInResponse = (credentials) => {
    const promise = fetch(`${elnBaseURL}/api/v1/sign_in`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: { login: credentials.username, password: credentials.password } })
    })
    return promise;
  }

  static signOutResponse = () => {
    const promise = fetch(`${elnBaseURL}/api/v1/sign_out`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.jwt
      }})
    return promise;
  }
}
