import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'

import PropTypes from 'prop-types'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';

import { samplevolumeUnitOptions } from '../../../constants/dropdownOptions/samplesOptions'
import { conditionInputRanges } from '../../../constants/dropdownOptions/conditionsOptions';

const AddSampleForm = ({ activity, processStep, onWorkupChange }) => {

  const currentSampleId = activity.workup['sample_id']
  const currentName = activity.workup['sample_name']
  const currentSampleActsAs = activity.workup['acts_as'] === 'DIVERSE_SOLVENT' ? 'SOLVENT' : activity.workup['acts_as']

  const currentSampleOptions = processStep.materials_options[currentSampleActsAs]

  const handlePercentageInput = ({ value }) => {
    var new_volume = (value * activity.workup['sample_original_amount']) / 100
    if (value < 100) {
      new_volume = new_volume.toFixed(5)
    }

    onWorkupChange({ name: 'target_amount_value', value: new_volume })
    onWorkupChange({ name: 'sample_volume_percentage', value: value })
  }

  const handleAmountInput = ({ value }) => {
    const new_percentage = value * 100 / activity.workup['sample_original_amount']
    onWorkupChange({ name: 'target_amount_value', value: value })
    onWorkupChange({ name: 'sample_volume_percentage', value: new_percentage })
  }

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID alone as we are coping with 2 different ActiveRecord models (Solvent, DiverseSolvent).
    const sample = currentSampleOptions.find(sample => sample.value === sampleId && sample.label === label)

    onWorkupChange({ name: 'acts_as', value: sample.acts_as || activity.workup['acts_as'] })
    onWorkupChange({ name: 'sample_id', value: sampleId })
    onWorkupChange({ name: 'sample_name', value: label })
    onWorkupChange({ name: 'target_amount_value', value: sample.amount || '' })
    onWorkupChange({ name: 'sample_original_amount', value: sample.amount })
    onWorkupChange({ name: 'sample_volume_percentage', value: 100 })
    onWorkupChange({ name: 'target_amount_unit', value: sample.unit })
  }

  return (
    <>
      <SingleLineFormGroup label='Sample'>
        <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
          name="sample_id"
          options={currentSampleOptions}
          value={currentSampleOptions.find(sample => sample.value === currentSampleId && sample.label == currentName)}
          onChange={selectedOption => handleSampleChange({ sampleId: selectedOption.value, label: selectedOption.label })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Volume/Amount'>
        <Input
          value={activity.workup['target_amount_value']}
          placeholder="Amount"
          onChange={event => handleAmountInput({ value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Unit'>
        <Select
          isDisabled={!!activity.workup['sample_original_amount']}
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="target_amount_unit"
          options={samplevolumeUnitOptions}
          value={samplevolumeUnitOptions.find(item => item.value === activity.workup['target_amount_unit'])}
          onChange={selectedOption => onWorkupChange({ name: 'target_amount_unit', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <NumericalnputWithUnit
        label='Percentage'
        name='sample_volume_percentage'
        value={activity.workup['sample_volume_percentage'] || 100}
        inputRanges={conditionInputRanges['PERCENTAGE']}
        onWorkupChange={onWorkupChange}
      />
      <NumericalnputWithUnit
        label="Speed"
        name='add_sample_speed'
        value={activity.workup['add_sample_speed']}
        inputRanges={conditionInputRanges['VELOCITY']}
        onWorkupChange={onWorkupChange}
      />
      <NumericalnputWithUnit
        label="Temperature"
        name='add_sample_temperature'
        value={activity.workup['add_sample_temperature']}
        inputRanges={conditionInputRanges['TEMPERATURE']}
        onWorkupChange={onWorkupChange}
      />
      <NumericalnputWithUnit
        label="Pressure"
        name='add_sample_pressure'
        value={activity.workup['add_sample_pressure']}
        inputRanges={conditionInputRanges['PRESSURE']}
        onWorkupChange={onWorkupChange}
      />

      {currentSampleActsAs === 'SOLVENT' &&
        <FormGroup check className='mb-3'>
          <Label check>
            <Input type="checkbox" checked={activity.workup['is_waterfree_solvent']} onChange={(event) =>
              onWorkupChange({ name: 'is_waterfree_solvent', value: event.target.checked })
            } />
            Water Free Solvent
          </Label>
        </FormGroup>
      }
    </>
  )
}

AddSampleForm.propTypes = {
  activity: PropTypes.object.isRequired,
  onWorkupChange: PropTypes.func.isRequired
}

export default AddSampleForm
