import React, { useState, useContext } from 'react';

import ActivityDecorator from "../../../../decorators/ActivityDecorator";
import ApplyExtraEquipmentForm from "../ApplyExtraEquipmentForm";
import MetricsDecorator from '../../../../decorators/MetricsDecorator';
import EquipmentForm from "./EquipmentForm";
import GenericMetricSubForm from "./GenericMetricSubForm";
import MotionForm from "./MotionForm";

import { SelectOptions } from '../../../views/Reaction';
import { MainHeaderSelectOptions } from '../../../layout/MainHeader';

const MetricsFormGroup = (
  {
    metricName,
    preCondition,
    workup,
    openSubFormLabel,
    onWorkupChange,
    onToggleSubform,
    typeColor = 'condition'
  }) => {
    // This Component is ancestor of either Reaction or MainHeader which both define the required context.
  const headerSelectOptions = useContext(MainHeaderSelectOptions)
  const selectOptions = useContext(SelectOptions) || headerSelectOptions
  const equipmentOptions = selectOptions.action_type_equipment['CONDITION'][metricName]

  const hasPreCondition = !!preCondition && preCondition.value !== null
  const hasWorkupCondition = !!workup[metricName] && workup[metricName].value !== null

  const findInitialValue = (key, fallBackValue) => {
    if (workup[metricName] && workup[metricName][key] !== null) {
      return workup[metricName][key]
    } else if (preCondition && preCondition[key] !== null) {
      return preCondition[key]
    } else {
      return fallBackValue
    }
  }
  const summary = () => {
    if (hasWorkupCondition) {
      return ActivityDecorator.conditionInfo(metricName, workup[metricName], selectOptions)
    } else if (hasPreCondition) {
      return ActivityDecorator.conditionInfo(metricName, preCondition, selectOptions)
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
      name: metricName,
      value: condition
    })
  }

  return (
    <>
      {metricName === 'MOTION' &&
        <MotionForm
          label={MetricsDecorator.label(metricName)}
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
      {metricName === 'EQUIPMENT' &&
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
      {['EQUIPMENT', 'MOTION'].includes(metricName) ||
        <GenericMetricSubForm
          metricName={metricName}
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
        </GenericMetricSubForm >
      }
    </>
  );
};

export default MetricsFormGroup;
