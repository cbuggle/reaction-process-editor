import React, { useEffect, useState, useContext } from 'react';

import EquipmentSubsetFormSection from './EquipmentSubsetFormSection';
import EquipmentForm from "./EquipmentForm";
import GenericMetricSubForm from "./GenericMetricSubForm";
import MotionForm from "./MotionForm";

import ActivityDecorator from "../../../../decorators/ActivityDecorator";
import MetricsDecorator from '../../../../decorators/MetricsDecorator';

import { SelectOptions } from '../../../../contexts/SelectOptions';

const MetricFormGroup = (
  {
    metricName,
    precondition,
    workup,
    onWorkupChange,
    typeColor = 'condition'
  }) => {

  const selectOptions = useContext(SelectOptions)

  const hasPrecondition = !!precondition && precondition.value !== null
  const hasWorkupCondition = !!workup[metricName] && workup[metricName].value !== null

  const findInitialValue = (key, fallBackValue) => {
    if (workup[metricName] && workup[metricName][key] !== null) {
      return workup[metricName][key]
    } else if (precondition && precondition[key] !== null) {
      return precondition[key]
    } else {
      return fallBackValue
    }
  }

  const summary = () => {
    if (hasWorkupCondition) {
      return ActivityDecorator.conditionInfo(metricName, workup[metricName], selectOptions)
    } else if (hasPrecondition) {
      return ActivityDecorator.conditionInfo(metricName, precondition, selectOptions)
    } else {
      return undefined
    }
  }

  const [equipment, setEquipment] = useState([]);
  const resetEquipment = () => setEquipment(workup['EQUIPMENT']?.['value'] || [])

  // eslint-disable-next-line
  useEffect(() => { resetEquipment() }, [workup])

  const handleSave = (condition) => {
    onWorkupChange({ name: 'EQUIPMENT', value: { value: equipment } })
    if (metricName !== 'EQUIPMENT') { onWorkupChange({ name: metricName, value: condition }) }
  }

  const handleCancel = () => resetEquipment()

  const handleChangeEquipment = (newEquipment) => setEquipment(newEquipment)

  return (
    <>
      {metricName === 'MOTION' &&
        <MotionForm
          label={MetricsDecorator.label(metricName)}
          valueSummary={summary()}
          findInitialValue={findInitialValue}
          onSave={handleSave}
          onCancel={handleCancel}
        >
          <EquipmentSubsetFormSection
            valueSummary={summary()}
            equipment={equipment}
            metricName={metricName}
            onChangeEquipment={handleChangeEquipment}
          />
        </MotionForm>
      }
      {metricName === 'EQUIPMENT' &&
        <div>
          <EquipmentForm
            metricName={metricName}
            equipment={equipment}
            onChangeEquipment={handleChangeEquipment}
            valueSummary={summary()}
            onSave={handleSave}
            onCancel={handleCancel}
          >
          </EquipmentForm>
        </div>
      }
      {['MOTION', 'EQUIPMENT'].includes(metricName) ||
        <GenericMetricSubForm
          metricName={metricName}
          valueSummary={summary()}
          findInitialValue={findInitialValue}
          onSave={handleSave}
          isEqualToPredefinedValue={!hasWorkupCondition}
          typeColor={typeColor}
          onCancel={handleCancel}
        >
          <EquipmentSubsetFormSection
            metricName={metricName}
            equipment={equipment}
            onChangeEquipment={handleChangeEquipment}
          />
        </GenericMetricSubForm >
      }
    </>
  );
};

export default MetricFormGroup;
