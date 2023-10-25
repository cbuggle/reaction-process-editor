import React, { useState, useContext } from 'react';

import ActivityDecorator from "../../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "../ApplyExtraEquipmentForm";
import ConditionTypeDecorator from '../../../../decorators/ConditionTypeDecorator';
import EquipmentForm from "./EquipmentForm";
import GenericConditionSubForm from "./GenericConditionSubForm";
import MotionForm from "./MotionForm";

import { SelectOptions } from '../../../views/Reaction';
import { MainHeaderSelectOptions } from '../../../layout/MainHeader';

const ConditionTypeFormGroup = (
  {
    conditionTypeName,
    preCondition,
    workup,
    openSubFormLabel,
    onWorkupChange,
    onToggleSubform,
    typeColor = 'condition'
  }) => {
  const headerSelectOptions = useContext(MainHeaderSelectOptions)
  const selectOptions = useContext(SelectOptions) || headerSelectOptions
  const equipmentOptions = selectOptions.action_type_equipment['CONDITION'][conditionTypeName]

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
      return ActivityDecorator.conditionInfo(conditionTypeName, workup[conditionTypeName], selectOptions)
    } else if (hasPreCondition) {
      return ActivityDecorator.conditionInfo(conditionTypeName, preCondition, selectOptions)
    } else {
      return undefined
    }
  }
  const resetEquipment = () => {
    return findInitialValue('equipment', [])
  }
  const [equipment, setEquipment] = useState(resetEquipment());

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
          label={'Equipment'}
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
          equipmentOptions={equipmentOptions}
          valueSummary={summary()}
          openSubFormLabel={openSubFormLabel}
          findInitialValue={findInitialValue}
          onSave={handleSave}
          onToggleSubform={onToggleSubform}
          isEqualToPredefinedValue={!hasWorkupCondition}
          typeColor={typeColor}
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
