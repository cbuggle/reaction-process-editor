import React, { useContext, useState, useEffect } from "react";
import {
  Offcanvas,
  OffcanvasBody,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import NotificationContext from "../../contexts/NotificationContext";

const GlobalNotification = () => {
  const { notifications } = useContext(NotificationContext);
  const [latestNotification, setLatestNotification] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  const colorTypes = {
    info: "action",
    warning: "warning",
    error: "danger",
    success: "success",
  };

  const changeShowNotification = (show) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
      setNotificationTimeout(null);
    }
    setShowNotification(show);
  };

  const toastClass = (notificationType) => {
    return (
      "toast--" + (notificationType ? colorTypes[notificationType] : "action")
    );
  };

  useEffect(() => {
    const notification = notifications[notifications.length - 1];
    if (notification) {
      setLatestNotification(notification);
      changeShowNotification(true);
      setNotificationTimeout(
        setTimeout(
          () => {
            changeShowNotification(false);
          },
          notification.type === "error" ? 5000 : 3000
        )
      );
    }
    // eslint-disable-next-line
  }, [notifications]);

  return (
    <Offcanvas
      isOpen={showNotification}
      direction="end"
      className="global-notification"
      autoFocus={false}
      backdrop={false}
    >
      <OffcanvasBody className="d-flex flex-row-reverse align-items-start">
        {latestNotification && (
          <Toast className={toastClass(latestNotification.type)}>
            {latestNotification.title && (
              <ToastHeader
                toggle={() => changeShowNotification(false)}
                tag="h5"
              >
                {latestNotification.title}
              </ToastHeader>
            )}
            {latestNotification.message && (
              <ToastBody>{latestNotification.message}</ToastBody>
            )}
          </Toast>
        )}
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default GlobalNotification;
