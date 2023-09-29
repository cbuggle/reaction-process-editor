import { toast } from 'react-toastify';

import { toastAutoCloseOnWarning } from '../constants';

export default class ActionValidator {

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

  static validateRemove = (action) => {
    let errors = []
    // currently no mandatory fields; sample_id is optional! cbuggle, 07.11.2021.
    return errors
  }

  static validateExtraEquipment = (action) => {
    if (action.workup['apply_extra_equipment'] && !action.workup['equipment']) {
      return ["Please choose the extra Equipment to apply."]
    } else {
      return []
    }
  }

  static displayNotifications = (errors) => {
    errors.forEach(error => toast.warning(error, { autoClose: toastAutoCloseOnWarning }))
  }

  static validate = (action) => {
    let errors = []

    switch (action.action_name) {
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

    errors = errors.concat(this.validateExtraEquipment(action))
    this.displayNotifications(errors)

    return errors.length === 0
  }
}
