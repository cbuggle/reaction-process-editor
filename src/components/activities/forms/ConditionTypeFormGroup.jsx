import React, { useMemo, useState } from 'react';

import ActivityDecorator from "../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import EquipmentForm from "./EquipmentForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import MotionForm from "./MotionForm";

const ConditionTypeFormGroup = (
  {
    conditionTypeName,
    processStep,
    preCondition,
    workup,
    openSubFormLabel,
    onWorkupChange,
    onToggleSubform
  }) => {

  const hasPreCondition = !!preCondition && !!preCondition.value
  const hasWorkupCondition = !!workup[conditionTypeName] && !!workup[conditionTypeName].value

  const findInitialValue = (key, fallBackValue) => {
    if (workup[conditionTypeName] && workup[conditionTypeName][key]) {
      return workup[conditionTypeName][key]
    } else if (preCondition[key]) {
      return preCondition[key]
    } else {
      return fallBackValue
    }
  }
  const summary = () => {
    if (hasWorkupCondition) {
      return ActivityDecorator.conditionInfo(conditionTypeName, workup[conditionTypeName], processStep.equipment_options)
    } else if (hasPreCondition) {
      return ActivityDecorator.conditionInfo(conditionTypeName, preCondition)
    } else {
      return undefined
    }
  }
  const resetEquipment = () => {
    return findInitialValue('equipment', [])
  }
  const [equipment, setEquipment] = useState(resetEquipment());
  const equipmentOptions = useMemo(() => { return processStep['action_equipment_options']['CONDITION'][conditionTypeName] }, [processStep, conditionTypeName])

  const handleSave = (condition) => {
    condition.equipment = equipment
    onWorkupChange({
      name: conditionTypeName,
      value: condition
    })
  }

  return (
    <>
      {conditionTypeName === 'MOTION' &&
        <MotionForm
          label={ConditionTypeDecorator.label(conditionTypeName)}
          valueSummary={summary()}
          openSubFormLabel={openSubFormLabel}
          findInitialValue={findInitialValue}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
        >
          <ApplyExtraEquipmentForm
            equipment={equipment}
            equipmentOptions={equipmentOptions}
            onChangeEquipment={setEquipment}
            activityType='condition'
          />
        </MotionForm>
      }
      {conditionTypeName === 'EQUIPMENT' &&
        <EquipmentForm
          label={ConditionTypeDecorator.label(conditionTypeName)}
          valueSummary={summary()}
          openSubFormLabel={openSubFormLabel}
          findInitialValue={findInitialValue}
          equipmentOptions={processStep.equipment_options}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
        />
      }
      {!!(conditionTypeName !== 'EQUIPMENT' & conditionTypeName !== 'MOTION') &&
        <GenericConditionSubForm
          conditionTypeName={conditionTypeName}
          valueSummary={summary()}
          openSubFormLabel={openSubFormLabel}
          findInitialValue={findInitialValue}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
        >
          <ApplyExtraEquipmentForm
            equipment={equipment}
            equipmentOptions={equipmentOptions}
            onChangeEquipment={setEquipment}
            activityType='condition'
          />
        </GenericConditionSubForm >
      }
    </>
  );
};

export default ConditionTypeFormGroup;
