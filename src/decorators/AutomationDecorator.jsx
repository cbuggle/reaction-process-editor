export default class AutomationDecorator {

  static nextAutomationStatus = (currentValue) => {
    return ({
      "RUN": "HALT", // For Activities
      "HALT": "RUN", // For Activities
      "HALT_RESOLVED": "HALT_RESOLVED", // For Activities
      "HALT_BY_PRECEDING": "MANUAL_PROCEED", // for Steps, maybe separate component?
      "MANUAL_PROCEED": "HALT_BY_PRECEDING" // for Steps, maybe separate component?
    }[currentValue] || "HALT")
  }

  static labelForStatus = (currentStatus) => {
    return ({
      "RUN": "Proceeding", // For Activities
      "HALT": "Halts Automation", // For Activities
      "HALT_RESOLVED": "Halt Resolved", // For Activities
      "HALT_BY_PRECEDING": "Halt by Preceding", // for Steps, maybe separate component?
      "MANUAL_PROCEED": "Manual Proceed" // for Steps, maybe separate component?
    }[currentStatus] || "Proceeding")
  }

  static iconForStatus = (currentStatus) => {
    return ({
      "RUN": "play", // For Activities
      "HALT": "pause", // For Activities
      "HALT_RESOLVED": "forward-fast", // For Activities maybe separate
      "HALT_BY_PRECEDING": "pause", // for Steps
      "MANUAL_PROCEED": "forward-step" // for Steps
    }[currentStatus] || "play")
  }

  static colorForStatus = (currentStatus) => {
    return ({
      "RUN": "", // For Activities
      "HALT": "danger", // For Activities
      "HALT_RESOLVED": "primary", // For Activities maybe separate
      "HALT_BY_PRECEDING": "warning", // for Steps
      "MANUAL_PROCEED": "primary" // for Steps
    }[currentStatus] || "")
  }

}
