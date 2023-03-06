import React, {useMemo, useState} from 'react';
import {Button, FormGroup, Label} from "reactstrap";
import MotionForm from "./MotionForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import ActivityDecorator from "../../../decorators/ActivityDecorator";
import ApplyEquipmentForm from "./ApplyEquipmentForm";

const ConditionTypeFormGroup = ({type, processStep, preCondition, workup, onWorkupChange}) => {
  const typeName = type.action.workup.condition_type
  const hasPreCondition = !!preCondition && !!preCondition.value
  const hasWorkupCondition = !!workup[typeName] && !!workup[typeName].value
  const findInitialValue = (key, fallBack) => {
    if(workup[typeName] && workup[typeName][key]) {
      return workup[typeName][key]
    } else if (preCondition[key]) {
      return preCondition[key]
    } else {
      return fallBack
    }
  }
  const conditionSummary = () => {
    if(hasWorkupCondition) {
      return ActivityDecorator.conditionInfo(typeName, workup[typeName])
    } else if (hasPreCondition) {
      return ActivityDecorator.conditionInfo(typeName, preCondition)
    } else {
      return ActivityDecorator.conditionInfo(typeName, {create_label: type.createLabel})
    }
  }
  const toggleFormButtonLabel = hasWorkupCondition ? 'Change' : 'Set'
  const [showForm, setShowForm] = useState(false)
  const resetEquipment = () => {
    return findInitialValue('equipment', [])
  }
  const [equipment, setEquipment] = useState(resetEquipment());
  const equipmentOptions = useMemo(() => {return processStep.action_equipment_options.CONDITION[typeName]}, [])

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleSave = (condition) => {
    condition.unit = type.action.workup.condition_unit
    condition.create_label = type.createLabel
    condition.equipment = equipment
    onWorkupChange({
      name: typeName,
      value: condition
    })
    toggleShowForm()
  }

  return (
    <FormGroup className={'condition-type-form-group mb-2 pt-2 condition-type-form-group--' + type.id}>
      {!showForm &&
        <div className='d-flex justify-content-between align-self-center'>
          <Label className={'col-form-label' + (hasWorkupCondition ? '' : ' label--disabled')}>{conditionSummary()}</Label>
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
            >
              <ApplyEquipmentForm
                equipment={equipment}
                equipmentOptions={equipmentOptions}
                onChangeEquipment={setEquipment}
              />
            </MotionForm>:
            <GenericConditionSubForm
              label={type.createLabel}
              typeName={typeName}
              findInitialValue={findInitialValue}
              onSave={handleSave}
              onCancel={toggleShowForm}
            >
              <ApplyEquipmentForm
                equipment={equipment}
                equipmentOptions={equipmentOptions}
                onChangeEquipment={setEquipment}
              />
            </GenericConditionSubForm>
          }
        </div>
      }
    </FormGroup>
  );
};

export default ConditionTypeFormGroup;
