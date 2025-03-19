export default class AutomationStatusDecorator {

  static nextAutomationStatus = (currentValue) => {
    return ({
      "RUN": "HALT", // For Activities
      "HALT": "AUTOMATION_RESPONDED", // For Activities
      "AUTOMATION_RESPONDED": "HALT_RESOLVED", // For Activities
      "HALT_RESOLVED": "RUN",
      "HALT_BY_PRECEDING": "MANUAL_PROCEED", // for Steps, maybe separate component?
      "MANUAL_PROCEED": "HALT_BY_PRECEDING" // for Steps, maybe separate component?
    }[currentValue] || "HALT")
  }

  static labelForStatus = (currentStatus) => {
    return ({
      "RUN": "Proceeding", // For Activities
      "HALT": "Halts Automation", // For Activities
      "AUTOMATION_RESPONDED": "Automation Responded", // For Activities
      "HALT_RESOLVED": "Halt Resolved", // For Activities
      "HALT_BY_PRECEDING": "Halt by Preceding", // for Steps, maybe separate component?
      "MANUAL_PROCEED": "Manual Proceed" // for Steps, maybe separate component?
    }[currentStatus] || "Proceeding")
  }

  static iconForStatus = (currentStatus) => {
    return ({
      "RUN": "play", // For Activities
      "HALT": "pause", // For Activities
      "AUTOMATION_RESPONDED": "forward-fast", // For Activities maybe separate
      "HALT_RESOLVED": "forward", // For Activities maybe separate
      "HALT_BY_PRECEDING": "pause", // for Steps
      "MANUAL_PROCEED": "share" // for Steps
    }[currentStatus] || "play")
  }

  static colorForStatus = (currentStatus) => {
    return ({
      "RUN": "", // For Activities
      "HALT": "danger", // For Activities
      "AUTOMATION_RESPONDED": "warning", // For Activities maybe separate
      "HALT_RESOLVED": "success", // For Activities maybe separate
      "HALT_BY_PRECEDING": "warning", // for Steps
      "MANUAL_PROCEED": "step" // for Steps
    }[currentStatus] || "")
  }

}
