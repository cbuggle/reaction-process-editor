import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

export { useActivityValidator };

function useActivityValidator() {
  const { addNotification } = useContext(NotificationContext);

  return {
    validate,
  };

  function validateAdd(action) {
    let errors = [];
    action.workup["sample_id"] || errors.push("Sample");
    return errors;
  }

  function validateTransfer(action) {
    let errors = [];
    action.workup["sample_id"] || errors.push("Sample");
    action.workup["transfer_target_step_id"] || errors.push("Transfer Target");
    return errors;
  }

  function validateRemove() {
    let errors = [];
    // currently no mandatory fields; sample_id is optional! cbuggle, 07.11.2021.
    return errors;
  }

  function displayNotifications(errors) {
    addNotification({
      title: "Cannot save Activity",
      message: "Missing input:",
      details: errors,
      type: "warning",
    });
  }

  function validate(action) {
    let errors = [];

    switch (action.activity_name) {
      case "ADD":
        errors = validateAdd(action);
        break;
      case "TRANSFER":
        errors = validateTransfer(action);
        break;
      case "REMOVE":
        errors = validateRemove(action);
        break;
      default:
        break;
    }

    if (errors.length > 0) { displayNotifications(errors); }

    return errors.length === 0;
  }
}
