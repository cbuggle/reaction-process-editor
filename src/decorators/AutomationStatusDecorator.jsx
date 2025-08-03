export default class AutomationStatusDecorator {
  static nextAutomationStatus = (currentValue) => {
    return ({
      "RUN": "HALT",
      "HALT": "AUTOMATION_RESPONDED",
      "AUTOMATION_RESPONDED": "HALT_RESOLVED_NEEDS_CONFIRMATION",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "HALT_RESOLVED",
      "HALT_RESOLVED": "COMPLETED",
      "COMPLETED": "RUN",
    }[currentValue] || "HALT")
  }

  static automationNeedsManualResolve = (status) => {
    return status === "AUTOMATION_RESPONDED" || status === "HALT_RESOLVED_NEEDS_CONFIRMATION"
  }

  static labelForStatus = (currentStatus) => {
    return ({
      "RUN": "Can Run",
      "HALT": "Halts Automation",
      "AUTOMATION_RESPONDED": "Automation Responded",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "Resolved Needs Confirm",
      "HALT_RESOLVED": "Halt Resolved",
      "COMPLETED": "Completed",
    }[currentStatus] || "can run")
  }

  static iconForStatus = (currentStatus) => {
    return ({
      "RUN": "circle-play",
      "HALT": "pause",
      "AUTOMATION_RESPONDED": "share-from-square",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "thumbs-up",
      "HALT_RESOLVED": "share",
      "COMPLETED": "check",
    }[currentStatus] || "circle-play")
  }

  static colorForStatus = (currentStatus) => {
    return ({
      "RUN": "info",
      "HALT": "danger",
      "AUTOMATION_RESPONDED": "preparation",
      "HALT_RESOLVED_NEEDS_CONFIRMATION": "warning",
      "HALT_RESOLVED": "success",
      "COMPLETED": "success",
    }[currentStatus] || "")
  }
}
