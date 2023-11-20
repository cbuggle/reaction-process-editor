import React, { useContext, useEffect } from 'react'
import { FormGroup } from 'reactstrap'

import ButtonGroupToggle from '../../../../utilities/ButtonGroupToggle';
import DurationSelection from '../../../../utilities/DurationSelection';
import FormSection from "../../../../utilities/FormSection";
import MetricsInput from '../../../../utilities/MetricsInput';
import SolventListForm from './SolventListForm';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const CrystallizationForm = (
  {
    activity,
    preconditions,
    onWorkupChange
  }) => {

  const workup = activity.workup

  const solvents = workup.solvents || []
  const amount = workup.amount || { value: 0, unit: 'ml' }

  const selectOptions = useContext(SelectOptions)
  const solventOptions = selectOptions.materials['ADDITIVE']
  const crystallizationModeOptions = selectOptions.purify.crystallization_modes

  useEffect(() => {
    workup.automation ||
      onWorkupChange({ name: 'automation', value: selectOptions.automation_modes[0].value })
    workup.TEMPERATURE ||
      onWorkupChange({ name: 'TEMPERATURE', value: preconditions.TEMPERATURE })
    workup.crystallization_mode ||
      onWorkupChange({ name: 'crystallization_mode', value: selectOptions.purify.crystallization_modes[0]['value'] })
    workup.heating_duration ||
      onWorkupChange({ name: 'heating_duration', value: 0 })
    workup.cooling_duration ||
      onWorkupChange({ name: 'cooling_duration', value: 0 })
  }, [])


  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })


  return (
    <>
      <FormSection type='action'>
        <ButtonGroupToggle
          value={workup.automation}
          options={selectOptions.automation_modes}
          onChange={selectedValue => onWorkupChange({ name: 'automation', value: selectedValue })}
          label='Automation'
        />
      </FormSection>
      <FormSection type='action'>
        <FormGroup>
          <SolventListForm
            solvents={solvents}
            solventOptions={solventOptions}
            setSolvents={handleWorkupChange('solvents')}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInput
            metricName={'VOLUME'}
            amount={amount}
            onChange={handleWorkupChange('amount')}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInput
            metricName={'TEMPERATURE'}
            amount={activity.workup.TEMPERATURE}
            onChange={handleWorkupChange('TEMPERATURE')}
          />
        </FormGroup>
        <FormGroup>
          <DurationSelection
            label="Heating"
            duration={workup.heating_duration}
            onChangeDuration={handleWorkupChange('heating_duration')}
          />
        </FormGroup>
        <FormGroup>
          <DurationSelection
            label="Cooling"
            duration={workup.cooling_duration}
            onChangeDuration={handleWorkupChange('cooling_duration')}
          />
        </FormGroup>
        <ButtonGroupToggle
          label="Filtration"
          value={workup.crystallization_mode}
          options={crystallizationModeOptions}
          onChange={handleWorkupChange('crystallization_mode')}
        />
      </FormSection >
    </>
  )
}

export default CrystallizationForm
