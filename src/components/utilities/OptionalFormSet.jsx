import React, { useContext, useEffect, useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";

import FormButtons from "./FormButtons";
import FormSection from "./FormSection";

import { SubFormController } from "../../contexts/SubFormController";

const ExtraButton = () => null;

const OptionalFormSet = ({
  subFormLabel,
  valueSummary,
  onSave,
  onCancel,
  children,
  isEqualToPredefinedValue = false,
  typeColor = "condition",
  disableFormButtons,
  initialShowForm = false,
}) => {
  const subFormController = useContext(SubFormController);
  const [showForm, setShowForm] = useState();

  useEffect(() => {
    setShowForm(subFormController.isCurrentOpen(subFormLabel));
  }, [subFormController, subFormLabel]);

  const childNodes = React.Children.toArray(children);
  const extraButton = childNodes.find((el) => el.type === ExtraButton);

  useEffect(() => {
    if (initialShowForm) {
      toggleShowForm();
    }
  }, []);

  const toggleShowForm = () => {
    subFormController.toggleSubForm(subFormLabel);
    setShowForm(!showForm);
  };

  const hasLocalValue = !!valueSummary && !isEqualToPredefinedValue;
  const toggleFormButtonLabel = hasLocalValue ? "Change" : "Set";

  const labelWithSummary = subFormLabel + ": " + (valueSummary || "-");

  const handleSave = (data) => {
    toggleShowForm();
    onSave(data);
  };

  const handleCancel = () => {
    toggleShowForm();
    onCancel();
  };

  return (
    <FormSection name={subFormLabel} type={typeColor}>
      {!showForm && (
        <div className="d-flex justify-content-between align-self-center">
          <Label
            className={
              "col-form-label" + (hasLocalValue ? "" : " label--disabled")
            }
          >
            {labelWithSummary}
          </Label>
          <div className="optional-form-group__open-controls">
            <div className="d-grid gap-2">
              <Button color={typeColor} onClick={toggleShowForm} outline>
                {toggleFormButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <>
          <FormGroup>
            <Label>{subFormLabel}</Label>
            {children}
          </FormGroup>
          <FormButtons
            type={typeColor}
            onSave={handleSave}
            onCancel={handleCancel}
            saveLabel="Set"
            disabled={disableFormButtons}
          >
            {extraButton && extraButton.props.children}
          </FormButtons>
        </>
      )}
    </FormSection>
  );
};

OptionalFormSet.ExtraButton = ExtraButton;

export default OptionalFormSet;
