import {Button, FormGroup, Label} from "reactstrap";
import React, {useState} from "react";
import FormButtons from "../../utilities/FormButtons";
import FormSection from "../../utilities/FormSection";

const ExtraButton = () => null

const OptionalFormSet = (
  {
    groupLabel,
    valueSummary,
    openSubFormLabel,
    onSave,
    onCancel,
    onToggleSubform,
    children,
    typeColor='condition',
    disableFormButtons
  }) => {
  const childNodes = React.Children.toArray(children);
  const extraButton = childNodes.find(el => el.type === ExtraButton)

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
    <FormSection name={groupLabel} openSubFormLabel={openSubFormLabel} type={typeColor}>
      {!showForm &&
        <div className='d-flex justify-content-between align-self-center'>
          <Label className={'col-form-label' + (valueSummary ? '' : ' label--disabled')}>{labelWithSummary}</Label>
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
            <Label>{groupLabel}</Label>
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
