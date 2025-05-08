export default class AutomationStatusDecorator {
  static nextAutomationStatus = (currentValue) => {
    return ({
      "RUN": "HALT",
      "HALT": "AUTOMATION_RESPONDED",
      "AUTOMATION_RESPONDED": "HALT_RESOLVED_NEEDS_CONFIRMATION",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "HALT_RESOLVED",
      "HALT_RESOLVED": "COMPLETED",
      "COMPLETED": "RUN",
      "STEP_CAN_RUN": "STEP_CAN_RUN",
      "STEP_COMPLETED": "STEP_COMPLETED",
      "STEP_HALT_BY_PRECEDING": "STEP_MANUAL_PROCEED", // for Steps, maybe separate component?
      "STEP_MANUAL_PROCEED": "STEP_HALT_BY_PRECEDING",
    }[currentValue] || "HALT")
  }

  static automationNeedsManualResolve = (status) => {
    return status === "AUTOMATION_RESPONDED" || status === "HALT_RESOLVED_NEEDS_CONFIRMATION"
  }

  static labelForStatus = (currentStatus) => {
    return ({
      "RUN": "Running",
      "HALT": "Halts Automation",
      "AUTOMATION_RESPONDED": "Automation Responded",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "Resolved Needs Confirm",
      "HALT_RESOLVED": "Halt Resolved",
      "COMPLETED": "Completed",
      "STEP_CAN_RUN": "Step Can Run", // for Steps
      "STEP_COMPLETED": "Step Completed", // for Steps
      "STEP_HALT_BY_PRECEDING": "Step halted by Preceding", // for Steps, maybe separate component?
      "STEP_MANUAL_PROCEED": "Manual Proceed" // for Steps, maybe separate component?
    }[currentStatus] || "Unknown status")
  }

  static iconForStatus = (currentStatus) => {
    return ({
      "RUN": "play",
      "HALT": "pause",
      "AUTOMATION_RESPONDED": "share-from-square",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "thumbs-up",
      "HALT_RESOLVED": "share",
      "COMPLETED": "check",
      "STEP_CAN_RUN": "play", // for Steps
      "STEP_COMPLETED": "check", // for Steps
      "STEP_HALT_BY_PRECEDING": "hand", // for Steps
      "STEP_MANUAL_PROCEED": "hand-point-right" // for Steps
    }[currentStatus] || "play")
  }

  static colorForStatus = (currentStatus) => {
    return ({
      "RUN": "info",
      "HALT": "danger",
      "AUTOMATION_RESPONDED": "preparation",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "warning",
      "HALT_RESOLVED": "success",
      "COMPLETED": "success",
      "STEP_CAN_RUN": "info",// for Steps
      "STEP_COMPLETED": "success", // for Steps
      "STEP_HALT_BY_PRECEDING": "warning", // for Steps
      "STEP_MANUAL_PROCEED": "step" // for Steps
    }[currentStatus] || "")
  }
}
