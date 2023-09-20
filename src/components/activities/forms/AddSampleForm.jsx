import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'

import PropTypes from 'prop-types'

import AmountSelection from "../../utilities/AmountSelection";
import FormSection from "../../utilities/FormSection";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

import { conditionTypes } from '../../../constants/conditionTypes';

const AddSampleForm = (
  {
    activity,
    processStep,
    openSubFormLabel,
    onWorkupChange
  }) => {

  const currentSampleId = activity.workup['sample_id']
  const currentName = activity.workup['sample_name']
  const currentSampleActsAs = activity.workup['acts_as'] === 'DIVERSE_SOLVENT' ? 'SOLVENT' : activity.workup['acts_as']

  const currentSampleOptions = processStep.materials_options[currentSampleActsAs]

  const unitType = (conditionType, conditionUnit) => {
    const currentUnit = conditionUnit || conditionTypes[conditionType].defaultUnit
    return conditionTypes[conditionType].unitTypes[currentUnit]
  }

  const label = (conditionType) => {
    return conditionTypes[conditionType].label
  }

  const handleAmountInput = (value) => {
    onWorkupChange({ name: 'target_amount_value', value: value })
  }

  const handleUnitInput = ({ value }) => {
    onWorkupChange({ name: 'target_amount_unit', value: value })
  }

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID alone as we are coping with 2 different ActiveRecord models (Solvent, DiverseSolvent).
    const sample = currentSampleOptions.find(sample => sample.value === sampleId && sample.label === label)

    onWorkupChange({ name: 'acts_as', value: sample.acts_as || activity.workup['acts_as'] })
    onWorkupChange({ name: 'sample_id', value: sampleId })
    onWorkupChange({ name: 'sample_name', value: label })
    onWorkupChange({ name: 'target_amount_value', value: sample.amount || '' })
    onWorkupChange({ name: 'sample_original_amount', value: sample.amount })
    onWorkupChange({ name: 'target_amount_unit', value: sample.unit })
  }

  return (
    <>
      <FormSection type='action' openSubFormLabel={openSubFormLabel}>
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
        <AmountSelection
          amount={activity.workup['target_amount_value']}
          maxAmount={activity.workup['sample_original_amount']}
          unit={activity.workup['target_amount_unit']}
          disableunitelection={!!activity.workup['sample_original_amount']}
          onChangeAmount={handleAmountInput}
          onChangeUnit={handleUnitInput}
        />
      </FormSection>
      <FormSection type='action' openSubFormLabel={openSubFormLabel}>
        <NumericalInputWithUnit
          label={label('VELOCITY')}
          name='add_sample_velocity'
          value={activity.workup['add_sample_velocity']}
          unitType={unitType('VELOCITY')}
          onWorkupChange={onWorkupChange}
        />
        <NumericalInputWithUnit
          label={label('TEMPERATURE')}
          name='add_sample_temperature'
          value={activity.workup['add_sample_temperature']}
          unitType={unitType('TEMPERATURE')}
          onWorkupChange={onWorkupChange}
        />
        <NumericalInputWithUnit
          label={label('VELOCITY')}
          name='add_sample_pressure'
          value={activity.workup['add_sample_pressure']}
          unitType={unitType('PRESSURE')}
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
      </FormSection>
    </>
  )
}

AddSampleForm.propTypes = {
  activity: PropTypes.object.isRequired,
  onWorkupChange: PropTypes.func.isRequired
}

export default AddSampleForm
