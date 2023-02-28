import React, {useState} from 'react';
import {Button, FormGroup, Label} from "reactstrap";
import MotionForm from "./MotionForm";
import GenericConditionSubForm from "./GenericConditionSubForm";

const ConditionTypeFormGroup = ({type, previousCondition, workup, onWorkUpChange}) => {
  const typeName = type.action.workup.condition_type
  const hasPreviousCondition = !!previousCondition
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

  const toggleShowForm = () => {
    setShowForm(!showForm)
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
              workup={workup}
              onWorkupChange={onWorkUpChange}
            />:
            <GenericConditionSubForm
              label={type.createLabel}
              typeName={typeName}
              workup={workup}
              onWorkupChange={onWorkUpChange}
            />
          }

          <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-2">
            <Button color='condition' onClick={toggleShowForm} outline>Cancel</Button>
            <Button color='condition' onClick={toggleShowForm}>Set</Button>
          </div>
        </div>
      }
    </FormGroup>
  );
};

export default ConditionTypeFormGroup;
