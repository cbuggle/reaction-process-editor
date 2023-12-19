import { toast } from 'react-toastify';

import { toastAutoCloseOnWarning } from '../constants';

export default class ActivityValidator {

  static validateAdd = (action) => {
    let errors = []
    action.workup['sample_id'] || errors.push("Please select a Sample.")
    return errors
  }

  static validateTransfer = (action) => {
    let errors = []
    action.workup['sample_id'] || errors.push("Please select Sample.")
    action.workup['transfer_target_step_id'] || errors.push("Please select Target.")
    return errors
  }

  static validateRemove = () => {
    let errors = []
    // currently no mandatory fields; sample_id is optional! cbuggle, 07.11.2021.
    return errors
  }

  static displayNotifications = (errors) => {
    errors.forEach(error => toast.warning(error, { theme: 'dark', toastId: 2, autoClose: 20000 }))
  }

  static validate = (action) => {
    let errors = []

    switch (action.activity_name) {
      case "ADD":
        errors = this.validateAdd(action)
        break;
      case "TRANSFER":
        errors = this.validateTransfer(action)
        break;
      case "REMOVE":
        errors = this.validateRemove(action)
        break;
      default:
        break;
    }

    this.displayNotifications(errors)

    return errors.length === 0
  }
}
