import React, { useState } from 'react';

import ActivityDecorator from "../../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "../ApplyExtraEquipmentForm";
import ConditionTypeDecorator from '../../../../decorators/ConditionTypeDecorator';
import EquipmentForm from "./EquipmentForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import MotionForm from "./MotionForm";

const ConditionTypeFormGroup = (
  {
    conditionTypeName,
    equipmentOptions,
    preCondition,
    workup,
    openSubFormLabel,
    onWorkupChange,
    onToggleSubform
  }) => {

  const hasPreCondition = !!preCondition && preCondition.value !== null
  const hasWorkupCondition = !!workup[conditionTypeName] && workup[conditionTypeName].value !== null

  const findInitialValue = (key, fallBackValue) => {
    if (workup[conditionTypeName] && workup[conditionTypeName][key] !== null) {
      return workup[conditionTypeName][key]
    } else if (preCondition && preCondition[key] !== null) {
      return preCondition[key]
    } else {
      return fallBackValue
    }
  }
  const summary = () => {
    if (hasWorkupCondition) {
      return ActivityDecorator.conditionInfo(conditionTypeName, workup[conditionTypeName], equipmentOptions)
    } else if (hasPreCondition) {
      return ActivityDecorator.conditionInfo(conditionTypeName, preCondition, equipmentOptions)
    } else {
      return undefined
    }
  }
  const resetEquipment = () => {
    return findInitialValue('equipment', [])
  }
  const [equipment, setEquipment] = useState(resetEquipment());
  // const equipmentOptions = useMemo(() => { return  }, [processStep, conditionTypeName])

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
          equipmentOptions={equipmentOptions}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
        />
      }
      {['EQUIPMENT', 'MOTION'].includes(conditionTypeName) ||
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
