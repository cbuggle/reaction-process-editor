import React, { useMemo, useState } from 'react';
import MotionForm from "./MotionForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import ActivityDecorator from "../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import EquipmentForm from "./EquipmentForm";

const ConditionTypeFormGroup = (
  {
    conditionTypeName,
    conditionType,
    processStep,
    preCondition,
    workup,
    openSubFormLabel,
    onWorkupChange,
    onToggleSubform
  }) => {
  const hasPreCondition = !!preCondition && !!preCondition.value
  const hasWorkupCondition = !!workup[conditionTypeName] && !!workup[conditionTypeName].value

  const findInitialValue = (key, fallBack) => {
    if (workup[conditionTypeName] && workup[conditionTypeName][key]) {
      return workup[conditionTypeName][key]
    } else if (preCondition[key]) {
      return preCondition[key]
    } else {
      return fallBack
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
    condition.unit = conditionType.defaultUnit
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
          label={conditionType.label}
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
          label={conditionType.label}
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
          label={conditionTypeName}
          valueSummary={summary()}
          openSubFormLabel={openSubFormLabel}
          conditionTypeName={conditionTypeName}
          conditionType={conditionType}
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
        </GenericConditionSubForm>
      }
    </>
  );
};

export default ConditionTypeFormGroup;
