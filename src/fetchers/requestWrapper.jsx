import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../contexts/NotificationContext";

import { apiBasePath, afterSignOutPath } from "../constants";

export { useRequestWrapper };

function useRequestWrapper() {
  const navigate = useNavigate();
  const { addNotification } = useContext(NotificationContext);

  return { request };

  function authorizationHeader() {
    return localStorage.bearer_auth_token
      ? { Authorization: `Bearer ${localStorage.bearer_auth_token}` }
      : {};
  }

  function request(method, path, body) {
    method === "GET" || window.dispatchEvent(new Event("indicateSave"));

    const requestOptions = {
      method,
      headers: authorizationHeader(),
    };
    requestOptions.headers["Accept"] = "application/json";
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.headers["Access-Control-Allow-Origin"] = "*";

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(apiBasePath + path, requestOptions).catch(() => {
      return handleRequestFailure();
    });
  }

  function handleRequestFailure() {
    localStorage.removeItem("username");
    localStorage.removeItem("bearer_auth_token");
    addNotification({
      title: "Network Error",
      message:
        "Network connection to Backend failed. Is the ELN server running and reachable?",
      type: "error",
    });
    navigate(afterSignOutPath);
    return;
  }
}
