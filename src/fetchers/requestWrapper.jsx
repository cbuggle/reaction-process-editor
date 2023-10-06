import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import { apiBasePath, afterSignOutPath } from "../constants";

export { useRequestWrapper };

function useRequestWrapper() {
  const navigate = useNavigate()

  return { request }

  function authorizationHeader() {
    return localStorage.bearer_auth_token ? { 'Authorization': `Bearer ${localStorage.bearer_auth_token}` } : {}
  }

  function request(method, path, body) {
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
    return fetch(apiBasePath + path, requestOptions).catch(() => { return handleRequestFailure() })
  }

  function handleRequestFailure() {
    localStorage.removeItem('username');
    localStorage.removeItem('bearer_auth_token');
    toast.error("Network connection to Backend failed. Is the ELN server running and reachable?")
    navigate(afterSignOutPath)
    return ;
  }
}
