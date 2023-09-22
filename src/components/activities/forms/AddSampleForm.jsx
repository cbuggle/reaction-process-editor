import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import PropTypes from 'prop-types'

import AmountSelection from "../../utilities/AmountSelection";
import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import FormSection from "../../utilities/FormSection";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

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

  const handleValueChange = (name) => (value) => {
    onWorkupChange({name: name, value: value})
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
            value={currentSampleOptions.find(sample => sample.value === currentSampleId && sample.label === currentName)}
            onChange={selectedOption => handleSampleChange({ sampleId: selectedOption.value, label: selectedOption.label })}
          />
        </SingleLineFormGroup>
        <AmountSelection
          amount={activity.workup['target_amount_value']}
          maxAmount={activity.workup['sample_original_amount']}
          unit={activity.workup['target_amount_unit']}
          disableunitelection={!!activity.workup['sample_original_amount']}
          onChangeAmount={handleValueChange('target_amount_value')}
          onChangeUnit={handleValueChange('target_amount_unit')}
        />
      </FormSection>
      <FormSection type='action' openSubFormLabel={openSubFormLabel}>
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('VELOCITY')}
          value={activity.workup['add_sample_velocity']}
          unitType={ConditionTypeDecorator.defaultUnitType('VELOCITY')}
          onChange={handleValueChange('add_sample_velocity')}
        />
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('TEMPERATURE')}
          value={activity.workup['add_sample_temperature']}
          unitType={ConditionTypeDecorator.defaultUnitType('TEMPERATURE')}
          onChange={handleValueChange('add_sample_temperature')}
          />
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('PRESSURE')}
          value={activity.workup['add_sample_pressure']}
          unitType={ConditionTypeDecorator.defaultUnitType('PRESSURE')}
          onChange={handleValueChange('add_sample_pressure')}
        />
        {currentSampleActsAs === 'SOLVENT' &&
          <FormGroup check className='mb-3'>
            <Label check>
              <Input type="checkbox" checked={activity.workup['is_waterfree_solvent']} onChange={(event) =>
                handleValueChange('is_waterfree_solvent')(event.target.checked)
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
