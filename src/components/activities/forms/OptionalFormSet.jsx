import {Button, FormGroup, Label} from "reactstrap";
import React, {useState} from "react";
import FormButtons from "../../utilities/FormButtons";
import FormSection from "../../utilities/FormSection";

const OptionalFormSet = (
  {
    groupLabel,
    valueSummary,
    openSubFormLabel,
    onSave,
    onCancel,
    onToggleSubform,
    children,
    type='condition'
  }) => {
  const [showForm, setShowForm] = useState(false)
  const toggleShowForm = () => {
    onToggleSubform(showForm ? undefined : groupLabel)
    setShowForm(!showForm)
  }

  const toggleFormButtonLabel = valueSummary ? 'Change' : 'Set'

  const labelWithSummary = groupLabel + ': ' + (valueSummary ? valueSummary : '-')

  const handleSave = (data) => {
    onSave(data)
    toggleShowForm()
  }

  const handleCancel = () => {
    onCancel()
    toggleShowForm()
  }

  return (
    <FormSection name={groupLabel} openSubFormLabel={openSubFormLabel} type={type}>
      {!showForm &&
        <div className='d-flex justify-content-between align-self-center'>
          <Label className={'col-form-label' + (valueSummary ? '' : ' label--disabled')}>{labelWithSummary}</Label>
          <div className='optional-form-group__open-controls'>
            <div className="d-grid gap-2">
              <Button color={type} onClick={toggleShowForm} outline>{toggleFormButtonLabel}</Button>
            </div>
          </div>
        </div>
      }
      {showForm &&
        <>
          <FormGroup>
            <Label>{groupLabel}</Label>
            {children}
          </FormGroup>
          <FormButtons
            type={type}
            onSave={handleSave}
            onCancel={handleCancel}
            saveLabel='Set'
          />
        </>
      }
    </FormSection>
  );
};

export default OptionalFormSet;
