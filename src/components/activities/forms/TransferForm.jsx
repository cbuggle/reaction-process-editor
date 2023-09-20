import React, { useMemo, useEffect } from 'react'
import Select from 'react-select'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';

import { conditionTypes } from '../../../constants/conditionTypes';

const TransferForm = (
  {
    activity,
    processStep,
    openSubFormLabel, // unused ?
    onWorkupChange
  }) => {

  useEffect(() => {
    onWorkupChange({ name: 'transfer_source_step_id', value: processStep.id })
  }, [processStep])

  useEffect(() => {
    onWorkupChange({ name: 'transfer_percentage', value: activity.workup['transfer_percentage'] || 100 })
  }, [])

  const sampleOptions = useMemo(() => { return processStep.transfer_sample_options }, [])
  const transferToOptions = useMemo(() => { return processStep.transfer_to_options }, [])

  // Hardcoded default until we implement unit switching
  const defaultPercentageUnit = conditionTypes['PERCENTAGE'].defaultUnit
  const percentageUnitType = conditionTypes['PERCENTAGE'].unitTypes[defaultPercentageUnit]

  return (
    <>
      <SingleLineFormGroup label='Transfer Sample'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          options={sampleOptions}
          value={sampleOptions.find(option => option.value === activity.workup['sample_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Transfer to Step'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="transfer_target_step_id"
          isDisabled={!!activity.id}
          options={transferToOptions}
          value={transferToOptions.find(option => option.value === activity.workup['transfer_target_step_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <NumericalInputWithUnit
        label={conditionTypes['PERCENTAGE'].label}
        name='transfer_percentage'
        value={activity.workup['transfer_percentage']}
        unitType={percentageUnitType}
        onWorkupChange={onWorkupChange}
      />
    </>
  )
}

export default TransferForm
