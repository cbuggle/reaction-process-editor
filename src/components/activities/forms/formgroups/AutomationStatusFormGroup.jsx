import React from "react";
import { Label } from "reactstrap";

import AutomationStatusButton from "../../../utilities/AutomationStatusButton";
import AutomationStatusDecorator from "../../../../decorators/AutomationStatusDecorator";
import FormSection from "../../../utilities/FormSection";

const AutomationStatusFormGroup = ({ onChange, status, activityId }) => {
  return (
    <FormSection>

      <div className="d-flex justify-content-between align-self-center">
        <Label className={"col-form-label label--disabled"}>
          {"Automation Status"}
        </Label>
        <Label className={"col-form-label"}>
          {AutomationStatusDecorator.labelForStatus(status)}
        </Label>
        <AutomationStatusButton
          modelId={activityId}
          onChange={onChange}
          status={status}
        />
      </div >
    </  FormSection >
  )
};

export default AutomationStatusFormGroup;
