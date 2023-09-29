import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { useRequestWrapper } from "./requestWrapper";
import { unauthorizedRedirectPath, generalErrorRedirectPath, toastAutoCloseOnError } from "../constants";

export { useElnApi };

function useElnApi() {
  const navigate = useNavigate();
  const requestWrapper = useRequestWrapper();

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
  };

  function signoutAndRedirect() {
    localStorage.removeItem('username');
    localStorage.removeItem('bearer_auth_token');
    navigate(unauthorizedRedirectPath)
  }

  function redirectOnGeneralError() {
    navigate(generalErrorRedirectPath)
  }

  function request(method) {
    return (path, body) => {
      method === 'GET' || window.dispatchEvent(new Event("indicateSave"))
      return requestWrapper.request(method, path, body).then(handleResponse(method)).catch()
    }
  }

  function handleResponse(method) {
    return function (response) {
      if (response) {
        return response.text().then(text => {
          let data = text && JSON.parse(text);

          if (response.ok) {
            method === 'GET' || window.dispatchEvent(new Event("requireReload"))
            return data;
          } else {
            let errorMessage = (data && data.message) || response.statusText;
            // settingt toastId prevents duplicates.
            toast.error(errorMessage, { toastId: 1, autoClose: toastAutoCloseOnError });

            ([401, 403].includes(response.status)) ? signoutAndRedirect() : redirectOnGeneralError();
            return {};
          }
        })
      } else {
        return {};
      }
    }
  }

}

