import React, {useMemo, useState} from 'react';
import MotionForm from "./MotionForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import ActivityDecorator from "../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import EquipmentForm from "./EquipmentForm";

const ConditionTypeFormGroup = (
  {
    type,
    processStep,
    preCondition,
    workup,
    onWorkupChange,
    onToggleSubform
  }) => {
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
  const summary = () => {
    if(hasWorkupCondition) {
      return ActivityDecorator.conditionInfo(typeName, workup[typeName], processStep.equipment_options)
    } else if (hasPreCondition) {
      return ActivityDecorator.conditionInfo(typeName, preCondition)
    } else {
      return undefined
    }
  }
  const resetEquipment = () => {
    return findInitialValue('equipment', [])
  }
  const [equipment, setEquipment] = useState(resetEquipment());
  const equipmentOptions = useMemo(() => {return processStep['action_equipment_options']['CONDITION'][typeName]}, [processStep, typeName])

  const handleSave = (condition) => {
    condition.unit = type.action.workup.condition_unit
    condition.create_label = type.createLabel
    condition.equipment = equipment
    onWorkupChange({
      name: typeName,
      value: condition
    })
  }

  return (
    <>
      {typeName === 'MOTION' &&
        <MotionForm
          label={type.createLabel}
          valueSummary={summary()}
          findInitialValue={findInitialValue}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
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
          valueSummary={summary()}
          findInitialValue={findInitialValue}
          equipmentOptions={processStep.equipment_options}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
        />
      }
      {!!(typeName !== 'EQUIPMENT' & typeName !== 'MOTION') &&
        <GenericConditionSubForm
          label={type.createLabel}
          valueSummary={summary()}
          typeName={typeName}
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
