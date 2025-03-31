import React from "react";
import { FormGroup, Label } from "reactstrap";

import AutomationStatusButton from "../../../utilities/AutomationStatusButton";
import AutomationStatusDecorator from "../../../../decorators/AutomationStatusDecorator";
import ChromatographyPoolingFormModal from "../../../utilities/ChromatographyPoolingFormModal";

const AutomationStatusFormGroup = ({ onChange, onResolvePooling, status, modelId, activity }) => {

  return (
    <FormGroup className={"form-section"}>
      <div className="d-flex justify-content-between align-self-center">
        <Label className={"col-form-label"}>
          {"Automation Status"}
        </Label>
        <Label className={"col-form-label"}>
          {AutomationStatusDecorator.labelForStatus(status)}
        </Label>
        <AutomationStatusButton
          modelId={modelId}
          onChange={onChange}
          status={status}
        />
      </div >
      {activity && AutomationStatusDecorator.automationNeedsResolve(status) &&
        <ChromatographyPoolingFormModal
          activity={activity}
          onResolvePooling={onResolvePooling}
        />
      }
    </FormGroup>
  )
};

export default AutomationStatusFormGroup;
