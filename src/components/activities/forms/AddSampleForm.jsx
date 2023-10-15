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
import AmountDecorator from "../../../decorators/AmountDecorator";

const AddSampleForm = (
  {
    activity,
    preconditions,
    processStep,
    openSubFormLabel,
    onWorkupChange
  }) => {

  const conditionInputs = [
    ['VELOCITY', 'add_sample_velocity'],
    ['TEMPERATURE', 'add_sample_temperature'],
    ['PRESSURE', 'add_sample_pressure']
  ]

  // 'DIVERSE_SOLVENT' need to be included as 'SOLVENT' for UI selects, as requested by NJung.
  const currentSampleActsAs = activity.workup['acts_as'] === 'DIVERSE_SOLVENT' ? 'SOLVENT' : activity.workup['acts_as']
  const currentSampleOptions = processStep.materials_options[currentSampleActsAs]
  const [sample, setSample] = useState(currentSampleOptions.find(sample =>
    sample.value === activity.workup['sample_id'] &&
    sample.label === activity.workup['sample_name']))


  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID alone as we are coping with 2 different ActiveRecord
    // models (Solvent, DiverseSolvent). So we also compare the label.
    const newSample = currentSampleOptions.find(sample => sample.value === sampleId && sample.label === label)
    if (newSample) {
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

  const renderConditionInputs = () => {
    return conditionInputs.map(([conditionTypeName, workupKey]) => {
      // Seriously, Javascript? We need to go a long way to avoid fallback to default when value === 0 (aka "false").
      let value = activity.workup[workupKey + '_value']
      value = value !== undefined ? value : preconditions[conditionTypeName]?.value
      value = value !== undefined ? value : ConditionTypeDecorator.defaultValueInDefaultUnit(conditionTypeName)

      const unitType = unitTypes[activity.workup[workupKey + '_unit']] ||
        unitTypes[preconditions[conditionTypeName]?.unit] ||
        ConditionTypeDecorator.defaultUnitType(conditionTypeName)

      return (
        <>
          <NumericalInputWithUnit
            label={ConditionTypeDecorator.label(conditionTypeName)}
            value={value}
            unitType={unitType}
            onChange={handleValueChange(workupKey + '_value')}
          />
        </>
      )
    })
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
            onChange={selected => handleSampleChange({ sampleId: selected.value, label: selected.label })}
          />
        </SingleLineFormGroup>
        <AmountInputSet
          amount={activity.workup['target_amount_value']}
          maxAmounts={AmountDecorator.sampleHasMaxAmounts(sample) ? sample['unit_amounts'] : undefined}
          unit={activity.workup['target_amount_unit']}
          onChangeAmount={handleValueChange('target_amount_value')}
          onChangeUnit={handleValueChange('target_amount_unit')}
        />
      </FormSection>
      <FormSection type='action' openSubFormLabel={openSubFormLabel}>
        {renderConditionInputs()}
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
