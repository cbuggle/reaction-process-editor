import React from "react";
import { Label } from "reactstrap";

import AutomationStatusButton from "../../../utilities/AutomationStatusButton";
import AutomationDecorator from "../../../../decorators/AutomationDecorator";
import FormSection from "../../../utilities/FormSection";

const AutomationStatusFormGroup = ({ activity, onChange, status }) => {

  return (
    <FormSection>

      <div className="d-flex justify-content-between align-self-center">
        <Label className={"col-form-label label--disabled"}>
          {"Automation Status"}
        </Label>
        <Label className={"col-form-label"}>
          {AutomationDecorator.labelForStatus(status)}
        </Label>
        <AutomationStatusButton
          onChange={onChange}
          status={status}
        />
      </div >
    </  FormSection >
  )
};

export default AutomationStatusFormGroup;
