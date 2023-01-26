import React, { useState, useMemo } from 'react'
import { ListGroupItem, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'

import PropTypes from 'prop-types'

import { samplevolumeUnitOptions } from '../../../constants/dropdownOptions/samplesOptions'
import { conditionUnitOptions, conditionValueRanges } from '../../../constants/dropdownOptions/conditionsOptions';

import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';
import ActionFormGroup from "./ActionFormGroup";

const AddSampleForm = ({ action, processStep, onWorkupChange }) => {

  const [sampleSelectOptions, setSampleSelectOptions] = useState(processStep.materials_options)

  const currentSampleActsAs = useMemo(() => {
    return action.workup['acts_as'] || 'SAMPLE'
  }, [action.workup['acts_as']])

  const currentSampleIdValue = useMemo(() => {
    return action.workup['sample_id']
  }, [action.workup['sample_id']])

  const currentSampleOptions = useMemo(() => {
    return sampleSelectOptions[currentSampleActsAs].concat([{ value: "", label: "Undefined" }])
  }, [sampleSelectOptions, currentSampleActsAs])

  const handlePercentageInput = ({ value }) => {
    var new_volume = (value * action.workup['sample_original_amount']) / 100
    if (value < 100) {
      new_volume = new_volume.toFixed(5)
    }

    onWorkupChange({ name: 'target_amount_value', value: new_volume })
    onWorkupChange({ name: 'sample_volume_percentage', value: value })
  }

  const handleAmountInput = ({ value }) => {
    const new_percentage = value * 100 / action.workup['sample_original_amount']
    onWorkupChange({ name: 'target_amount_value', value: value })
    onWorkupChange({ name: 'sample_volume_percentage', value: new_percentage })
  }

  const handleActsAsChange = ({ actsAS }) => {
    onWorkupChange({ name: 'acts_as', value: actsAS })
    onWorkupChange({ name: 'target_amount_value', value: '' })
    onWorkupChange({ name: 'water_free_solvent', value: '' })
    onWorkupChange({ name: 'target_amount_unit', value: '' })
    onWorkupChange({ name: 'sample_original_amount', value: '' })
    onWorkupChange({ name: 'sample_volume_percentage', value: 100 })
    onWorkupChange({ name: 'sample_id', value: '' })

    onWorkupChange({ name: 'add_sample_speed', value: '' })
    onWorkupChange({ name: 'add_sample_speed', value: '' })

    onWorkupChange({ name: 'pressure_value', value: '' })
    onWorkupChange({ name: 'temperature_value', value: '' })
  }

  const handleSampleChange = ({ sampleId }) => {
    const sample = currentSampleOptions.find(sample => sample.value === sampleId)

    onWorkupChange({ name: 'sample_id', value: sampleId })
    onWorkupChange({ name: 'target_amount_value', value: sample['amount'] })
    onWorkupChange({ name: 'sample_original_amount', value: sample['amount'] })
    onWorkupChange({ name: 'sample_volume_percentage', value: 100 })
    onWorkupChange({ name: 'target_amount_unit', value: sample['unit'] || "UNSPECIFIED" })
  }

  return (
    <>
      <ActionFormGroup label='Sample'>
        <Select
          name="sample_id"
          options={currentSampleOptions}
          value={currentSampleOptions.find(sample => sample.value === currentSampleIdValue)}
          onChange={selectedOption => handleSampleChange({ sampleId: selectedOption.value })}
        />
      </ActionFormGroup>
      <ActionFormGroup label='Volume/Amount'>
        <Input
          value={action.workup['target_amount_value']}
          placeholder="Amount"
          onChange={event => handleAmountInput({ value: event.target.value })}
        />
      </ActionFormGroup>
      <ActionFormGroup label='Unit'>
        <Select
          name="target_amount_unit"
          options={samplevolumeUnitOptions}
          value={samplevolumeUnitOptions.find(item => item.value === action.workup['target_amount_unit'])}
          onChange={selectedOption => onWorkupChange({ name: 'target_amount_unit', value: selectedOption.value })}
        />
      </ActionFormGroup>
      <NumericalnputWithUnit
        label='Percentage'
        name='sample_volume_percentage'
        unit={'%'}
        precision={1}
        step={0.1}
        value={action.workup['sample_volume_percentage'] || 100}
        min={0}
        max={100}
        disabled={!action.workup['sample_original_amount']}
        onWorkupChange={handlePercentageInput}
      />
      <NumericalnputWithUnit
        label="Speed"
        name='add_sample_speed'
        unit={conditionUnitOptions['VELOCITY'][0].label}
        precision={conditionValueRanges['VELOCITY']['precision']}
        step={conditionValueRanges['VELOCITY']['step']}
        value={action.workup['add_sample_speed'] }
        min={conditionValueRanges['VELOCITY']['min']}
        max={conditionValueRanges['VELOCITY']['max']}
        onWorkupChange={onWorkupChange}
      />
      <NumericalnputWithUnit
        label="Temperature"
        name='temperature_value'
        unit={conditionUnitOptions['TEMPERATURE'][0].label}
        precision={conditionValueRanges['TEMPERATURE']['precision']}
        step={conditionValueRanges['TEMPERATURE']['step']}
        value={action.workup['temperature_value']}
        min={conditionValueRanges['TEMPERATURE']['min']}
        max={conditionValueRanges['TEMPERATURE']['max']}
        onWorkupChange={onWorkupChange}
      />
      <NumericalnputWithUnit
        label="Pressure"
        name='pressure_value'
        unit={conditionUnitOptions['PRESSURE'][0].label}
        precision={conditionValueRanges['PRESSURE']['precision']}
        step={conditionValueRanges['PRESSURE']['step']}
        value={action.workup['pressure_value']}
        min={conditionValueRanges['PRESSURE']['min']}
        max={conditionValueRanges['PRESSURE']['max']}
        onWorkupChange={onWorkupChange}
      />
      {currentSampleActsAs === 'SOLVENT' &&
        <FormGroup check className='mb-3'>
          <Label check>
            <Input type="checkbox" checked={action.workup['is_waterfree_solvent']} onChange={ (event) =>
              onWorkupChange({ name: 'is_waterfree_solvent', value: event.target.value })
            } />
            Water Free Solvent
          </Label>
        </FormGroup>
      }
    </>
  )
}

AddSampleForm.propTypes = {
  action: PropTypes.object.isRequired,
  onWorkupChange: PropTypes.func.isRequired
}

export default AddSampleForm
