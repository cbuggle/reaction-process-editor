export default class AutomationStatusDecorator {
  static nextAutomationStatus = (currentValue) => {
    return ({
      "STEP_CAN_RUN": "STEP_CAN_RUN",
      "STEP_COMPLETED": "STEP_COMPLETED",
      "STEP_HALT_BY_PRECEDING": "STEP_MANUAL_PROCEED",
      "STEP_MANUAL_PROCEED": "STEP_HALT_BY_PRECEDING",
    }[currentValue] || "STEP_CAN_RUN")
  }

  static labelForStatus = (currentStatus) => {
    return ({
      "STEP_CAN_RUN": "Step Can Run",
      "STEP_COMPLETED": "Step Completed",
      "STEP_HALT_BY_PRECEDING": "Step halted by Preceding",
      "STEP_MANUAL_PROCEED": "Manual Proceed"
    }[currentStatus] || "can run")
  }

  static iconForStatus = (currentStatus) => {
    return ({
      "STEP_CAN_RUN": "circle-play",
      "STEP_COMPLETED": "check",
      "STEP_HALT_BY_PRECEDING": "hand",
      "STEP_MANUAL_PROCEED": "hand-point-right"
    }[currentStatus] || "circle-play")
  }

  static colorForStatus = (currentStatus) => {
    return ({
      "STEP_CAN_RUN": "info",
      "STEP_COMPLETED": "success",
      "STEP_HALT_BY_PRECEDING": "warning",
      "STEP_MANUAL_PROCEED": "step"
    }[currentStatus] || "")
  }
}
