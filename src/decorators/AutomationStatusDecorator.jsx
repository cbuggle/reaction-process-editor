export default class AutomationStatusDecorator {

  static nextAutomationStatus = (currentValue) => {
    // production version where
    return ({
      "": "RUN",
      "RUN": "HALT", // For Activities
      "HALT": "RUN", // For Activities
      "AUTOMATION_RESPONDED": "HALT_RESOLVED", // For Activities
      "HALT_RESOLVED": "HALT_RESOLVED",
      "HALT_BY_PRECEDING": "MANUAL_PROCEED", // for Steps, maybe separate component?
      "MANUAL_PROCEED": "HALT_BY_PRECEDING",  // for Steps, maybe separate component?
    }[currentValue] || "RUN")
  }

  // static nextAutomationStatus = (currentValue) => {
  //   // development helper, delete_me
  //   return ({
  //     "RUN": "HALT", // For Activities
  //     "HALT": "AUTOMATION_RESPONDED", // For Activities
  //     "AUTOMATION_RESPONDED": "HALT_RESOLVED", // For Activities
  //     "HALT_RESOLVED": "RUN",
  //     "HALT_BY_PRECEDING": "MANUAL_PROCEED", // for Steps, maybe separate component?
  //     "MANUAL_PROCEED": "HALT_BY_PRECEDING",
  //     // "CONTINUE_AFTER_HALT": "CONTINUE_AFTER_HALT" // for Steps, maybe separate component?
  //   }[currentValue] || "RUN")
  // }

  static labelForStatus = (currentStatus) => {
    return ({
      "RUN": "Run", // For Activities
      "HALT": "Halt Automation", // For Activities
      "AUTOMATION_RESPONDED": "Automation Responded", // For Activities
      "HALT_RESOLVED": "Halt Resolved", // For Activities
      "HALT_BY_PRECEDING": "Halt by Preceding", // for Steps, maybe separate component?
      "MANUAL_PROCEED": "Manual Proceed" // for Steps, maybe separate component?
    }[currentStatus] || "Running")
  }

  static iconForStatus = (currentStatus) => {
    return ({
      "RUN": "play", // For Activities
      "HALT": "pause", // For Activities
      "AUTOMATION_RESPONDED": "share-from-square", // For Activities maybe separate
      "HALT_RESOLVED": "share", // For Activities maybe separate
      "HALT_BY_PRECEDING": "hand", // for Steps
      "MANUAL_PROCEED": "hand-point-right" // for Steps
    }[currentStatus] || "play")
  }

  static colorForStatus = (currentStatus) => {
    return ({
      "RUN": "info", // For Activities
      "HALT": "danger", // For Activities
      "AUTOMATION_RESPONDED": "preparation", // For Activities maybe separate
      "HALT_RESOLVED": "success", // For Activities maybe separate
      "HALT_BY_PRECEDING": "warning", // for Steps
      "MANUAL_PROCEED": "step" // for Steps
    }[currentStatus] || "")
  }
}

// faHandPointRight
