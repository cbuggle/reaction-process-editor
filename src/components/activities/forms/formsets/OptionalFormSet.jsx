import React, { useContext, useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";

import FormButtons from "../../../utilities/FormButtons";
import FormSection from "../../../utilities/FormSection";

import { SubFormController } from "../../../../contexts/SubFormController";

const ExtraButton = () => null

const OptionalFormSet = (
  {
    subFormLabel,
    valueSummary,
    onSave,
    onCancel,
    children,
    isEqualToPredefinedValue = false,
    typeColor = 'condition',
    disableFormButtons
  }) => {

  const subFormController = useContext(SubFormController)

  const childNodes = React.Children.toArray(children);
  const extraButton = childNodes.find(el => el.type === ExtraButton)

  const [showForm, setShowForm] = useState(false)

  const toggleShowForm = () => {
    subFormController.toggleSubForm(subFormLabel)
    setShowForm(!showForm)
  }

  const hasLocalValue = !!valueSummary && !isEqualToPredefinedValue
  const toggleFormButtonLabel = hasLocalValue ? 'Change' : 'Set'

  const labelWithSummary = subFormLabel + ': ' + (valueSummary || '-')

  const handleSave = (data) => {
    onSave(data)
    toggleShowForm()
  }

  const handleCancel = () => {
    onCancel()
    toggleShowForm()
  }

  return (
    <FormSection name={subFormLabel} type={typeColor}>
      {!showForm &&
        <div className='d-flex justify-content-between align-self-center'>
          <Label className={'col-form-label' + (hasLocalValue ? '' : ' label--disabled')}>{labelWithSummary}</Label>
          <div className='optional-form-group__open-controls'>
            <div className="d-grid gap-2">
              <Button color={typeColor} onClick={toggleShowForm} outline>{toggleFormButtonLabel}</Button>
            </div>
          </div>
        </div>
      }
      {showForm &&
        <>
          <FormGroup>
            <Label>{subFormLabel}</Label>
            {children}
          </FormGroup>
          <FormButtons
            type={typeColor}
            onSave={handleSave}
            onCancel={handleCancel}
            saveLabel='Set'
            disabled={disableFormButtons}
          >
            {extraButton && extraButton.props.children}
          </FormButtons>
        </>
      }
    </FormSection>
  );
};

OptionalFormSet.ExtraButton = ExtraButton

export default OptionalFormSet;
