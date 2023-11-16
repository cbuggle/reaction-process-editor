import React, { useContext } from 'react'
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

  const handleChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  return (
    <>
      <FormSection type='action'>
        <ButtonGroupToggle
          value={workup['automation'] || selectOptions.automation_modes[0]['value']}
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
            setSolvents={handleChange('solvents')}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInput
            metricName={'VOLUME'}
            amount={amount}
            onChange={handleChange('amount')}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInput
            metricName={'TEMPERATURE'}
            amount={workup.TEMPERATURE || preconditions.TEMPERATURE}
            onChange={handleChange('TEMPERATURE')}
          />
        </FormGroup>
        <FormGroup>
          <DurationSelection
            label="Heating"
            duration={workup.heating_duration || 0}
            onChangeDuration={handleChange('heating_duration')}
          />
        </FormGroup>
        <FormGroup>
          <DurationSelection
            label="Cooling"
            duration={workup.cooling_duration || 0}
            onChangeDuration={handleChange('cooling_duration')}
          />
        </FormGroup>
        <ButtonGroupToggle
          label="Filtration"
          value={workup['crystallization_mode'] || selectOptions.purify.crystallization_modes[0]['value']}
          options={crystallizationModeOptions}
          onChange={handleChange('crystallization_mode')}
        />
      </FormSection >
    </>
  )
}

export default CrystallizationForm
