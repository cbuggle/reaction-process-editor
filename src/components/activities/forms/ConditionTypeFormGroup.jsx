import React, {useMemo, useState} from 'react';
import {Button, FormGroup, Label} from "reactstrap";
import MotionForm from "./MotionForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import ActivityDecorator from "../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import EquipmentForm from "./EquipmentForm";

const ConditionTypeFormGroup = ({type, processStep, preCondition, workup, onWorkupChange, onToggleFocus}) => {
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
      return ActivityDecorator.conditionInfo(typeName, workup[typeName], processStep.equipment_options)
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
  const equipmentOptions = useMemo(() => {return processStep['action_equipment_options']['CONDITION'][typeName]}, [processStep, typeName])

  const toggleShowForm = () => {
    setShowForm(!showForm)
    onToggleFocus()
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
    <FormGroup className={'form-section form-section--condition condition-type-form-group--' + type.id}>
      {!showForm &&
        <div className='d-flex justify-content-between align-self-center'>
          <Label className={'col-form-label' + (hasWorkupCondition ? '' : ' label--disabled')}>{conditionSummary()}</Label>
          <div className='condition-type-form-group__open-controls'>
            <div className="d-grid gap-2">
              <Button color='condition' onClick={toggleShowForm} outline>{toggleFormButtonLabel}</Button>
            </div>
          </div>
        </div>
      }
      {showForm &&
        <div className="condition-sub-form">
          {typeName === 'MOTION' &&
            <MotionForm
              label={type.createLabel}
              findInitialValue={findInitialValue}
              onSave={handleSave}
              onCancel={toggleShowForm}
            >
              <ApplyExtraEquipmentForm
                equipment={equipment}
                equipmentOptions={equipmentOptions}
                onChangeEquipment={setEquipment}
              />
            </MotionForm>
          }
          {typeName === 'EQUIPMENT' &&
            <EquipmentForm
              label={type.createLabel}
              findInitialValue={findInitialValue}
              equipmentOptions={processStep.equipment_options}
              onSave={handleSave}
              onCancel={toggleShowForm}
            />
          }
          {(typeName !== 'EQUIPMENT' & typeName !== 'MOTION') &&
            <GenericConditionSubForm
              label={type.createLabel}
              typeName={typeName}
              findInitialValue={findInitialValue}
              onSave={handleSave}
              onCancel={toggleShowForm}
            >
              <ApplyExtraEquipmentForm
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
