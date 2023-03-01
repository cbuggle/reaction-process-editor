import React, {useState} from 'react';
import {Button, FormGroup, Label} from "reactstrap";
import MotionForm from "./MotionForm";
import GenericConditionSubForm from "./GenericConditionSubForm";

const ConditionTypeFormGroup = ({type, previousCondition, workup, onSave}) => {
  const typeName = type.action.workup.condition_type
  const hasPreviousCondition = !!previousCondition.value
  const hasActivityCondition = workup.condition_type === typeName
  const conditionSummary = () => {
    if(hasActivityCondition) {
      return workup.condition_value + ' ' + workup.condition_unit
    } else {
      return hasPreviousCondition ? previousCondition : '-'
    }
  }
  const toggleFormButtonLabel = hasActivityCondition ? 'Change' : 'Set'
  const [showForm, setShowForm] = useState(false)

  const findInitialValue = (key, fallBack) => {
    if(workup[typeName] && workup[typeName][key]) {
      return workup[typeName][key]
    } else if (previousCondition[key]) {
      return previousCondition[key]
    } else {
      return fallBack
    }
  }

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleSave = (condition) => {
    console.log('handleSave : ' + JSON.stringify(condition))
    onSave(typeName, condition)
    toggleShowForm()
  }

  return (
    <FormGroup className={'condition-type-form-group mb-2 pt-2 condition-type-form-group--' + type.id}>
      {!showForm &&
        <div className='d-flex justify-content-between align-self-center'>
          <Label className={'col-form-label' + (hasActivityCondition ? '' : ' label--disabled')}>{type.createLabel + ': ' + conditionSummary()}</Label>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button color='condition' onClick={toggleShowForm} outline>{toggleFormButtonLabel}</Button>
          </div>
        </div>
      }
      {showForm &&
        <div className="condition-sub-form">
          {typeName === 'MOTION' ?
            <MotionForm
              label={type.createLabel}
              findInitialValue={findInitialValue}
              onSave={handleSave}
              onCancel={toggleShowForm}
            />:
            <GenericConditionSubForm
              label={type.createLabel}
              typeName={typeName}
              findInitialValue={findInitialValue}
              onSave={handleSave}
              onCancel={toggleShowForm}
            />
          }
        </div>
      }
    </FormGroup>
  );
};

export default ConditionTypeFormGroup;
