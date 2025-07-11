import React from "react";
import { FormGroup, Label } from "reactstrap";

import AutomationStatusButton from "../../../utilities/AutomationStatusButton";
import StepAutomationStatusDecorator from "../../../../decorators/StepAutomationStatusDecorator";

const StepAutomationStatusFormGroup = ({ onChange, status, modelId }) => {

  return (
    <FormGroup className={"form-section"}>
      <div className="d-flex justify-content-between align-self-center">
        <Label className={"col-form-label"}>
          {"Automation"}
        </Label>
        <Label className={"col-form-label"}>
          {StepAutomationStatusDecorator.labelForStatus(status)}
        </Label>
        <AutomationStatusButton
          modelId={modelId}
          onChange={onChange}
          status={status}
        />
      </div >
    </FormGroup>
  )
};

export default StepAutomationStatusFormGroup;
