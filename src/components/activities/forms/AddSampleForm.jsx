import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import PropTypes from 'prop-types'

import AmountInputSet from "../../utilities/AmountInputSet";
import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import FormSection from "../../utilities/FormSection";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

import { unitTypes } from '../../../constants/conditionTypes';

const AddSampleForm = (
  {
    activity,
    processStep,
    openSubFormLabel,
    onWorkupChange
  }) => {

  // 'DIVERSE_SOLVENT' need to be included as 'SOLVENT' for UI selects, as requested by NJung.
  const currentSampleActsAs = activity.workup['acts_as'] === 'DIVERSE_SOLVENT' ? 'SOLVENT' : activity.workup['acts_as']
  const currentSampleOptions = processStep.materials_options[currentSampleActsAs]
  const [sample, setSample] = useState(currentSampleOptions.find(sample => sample.value === activity.workup['sample_id'] && sample.label === activity.workup['sample_name']))

  const currentAddSampleUnitType = {
    TEMPERATURE: unitTypes[activity.workup['add_sample_temperature_unit']] ||
      ConditionTypeDecorator.defaultUnitType('TEMPERATURE'),
    PRESSURE: unitTypes[activity.workup['add_sample_pressure_unit']] ||
      ConditionTypeDecorator.defaultUnitType('PRESSURE'),
    VELOCITY: unitTypes[activity.workup['add_sample_velocity_unit']] ||
      ConditionTypeDecorator.defaultUnitType('VELOCITY'),
  }

  // This is tedious. We set workup to default units, but the first rendering happens before useEffect,
  // thus NumericalInput will raise an exception when using a undefined workup.add_sample_[…]_unit
  // Therefore we also set currentAddSampleUnitType and thereby reinvent the fallback to default.
  useEffect(() => {
    activity.workup['add_sample_temperature_unit'] ||
      onWorkupChange({
        name: 'add_sample_temperature_unit',
        value: ConditionTypeDecorator.defaultUnit('TEMPERATURE')
      })
    activity.workup['add_sample_pressure_unit'] ||
      onWorkupChange({
        name: 'add_sample_pressure_unit',
        value: ConditionTypeDecorator.defaultUnit('PRESSURE')
      })

    activity.workup['add_sample_velocity_unit']
      || onWorkupChange({
        name: 'add_sample_velocity_unit',
        value: ConditionTypeDecorator.defaultUnit('VELOCITY')
      })
    return () => {
    }
  })

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID alone as we are coping with 2 different ActiveRecord models (Solvent, DiverseSolvent).
    const newSample = currentSampleOptions.find(sample => sample.value === sampleId && sample.label === label)
    if(newSample) {
      onWorkupChange({ name: 'acts_as', value: newSample.acts_as })
      onWorkupChange({ name: 'sample_id', value: newSample.value })
      onWorkupChange({ name: 'sample_name', value: newSample.label })
      onWorkupChange({ name: 'target_amount_value', value: newSample.amount })
      onWorkupChange({ name: 'sample_original_amount', value: newSample.amount })
      onWorkupChange({ name: 'target_amount_unit', value: newSample.unit })
    }
    setSample(newSample)
  }

  const handleValueChange = (name) => (value) => {
    onWorkupChange({ name: name, value: value })
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
            value={sample}
            onChange={selectedOption => handleSampleChange({ sampleId: selectedOption.value, label: selectedOption.label })}
          />
        </SingleLineFormGroup>
        <AmountInputSet
          amount={activity.workup['target_amount_value']}
          maxAmounts={sample ? sample['unit_amounts'] : undefined}
          unit={activity.workup['target_amount_unit']}
          onChangeAmount={handleValueChange('target_amount_value')}
          onChangeUnit={handleValueChange('target_amount_unit')}
        />
      </FormSection>
      <FormSection type='action' openSubFormLabel={openSubFormLabel}>
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('VELOCITY')}
          value={activity.workup['add_sample_velocity_value']}
          unitType={currentAddSampleUnitType['VELOCITY']}
          onChange={handleValueChange('add_sample_velocity_value')}
        />
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('TEMPERATURE')}
          value={activity.workup['add_sample_temperature_value']}
          unitType={currentAddSampleUnitType['TEMPERATURE']}
          onChange={handleValueChange('add_sample_temperature_value')}
        />
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('PRESSURE')}
          value={activity.workup['add_sample_pressure_value']}
          unitType={currentAddSampleUnitType['PRESSURE']}
          onChange={handleValueChange('add_sample_pressure_value')}
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
