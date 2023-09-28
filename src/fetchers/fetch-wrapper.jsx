import { apiBasePath } from "../constants";

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

export { useFetchWrapper };

const authorizationHeader = () => {
  return localStorage.bearer_auth_token ? { 'Authorization': `Bearer ${localStorage.bearer_auth_token}` } : {}
}

function useFetchWrapper() {
  const navigate = useNavigate()

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
  };

  function request(method) {
    return (path, body) => {
      method === 'GET' || window.dispatchEvent(new Event("indicateSave"))

      const requestOptions = {
        method,
        headers: authorizationHeader()
      };
      requestOptions.headers['Accept'] = 'application/json';
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.headers['Access-Control-Allow-Origin'] = '*';

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      return fetch(apiBasePath + path, requestOptions).then(handleResponse(method));
    }
  }

  function handleResponse(method) {
    return function (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
          if ([401, 403].includes(response.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            localStorage.removeItem('username');
            localStorage.removeItem('bearer_auth_token');
            navigate("/")
          }

          const error = (data && data.message) || response.statusText;
          toast.error(error, { toastId: 1 }) // settingt toastId prevents duplicates.
          return Promise.reject(error);
        }

        method === 'GET' || window.dispatchEvent(new Event("requireReload"))
        return data;
      });
    }
  }
}
