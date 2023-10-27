import React, { useEffect, useState, useContext } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import PropTypes from 'prop-types'

import AmountInputSet from "../../../utilities/AmountInputSet";
import FormSection from "../../../utilities/FormSection";
import NumericalInputWithUnit from '../../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import MetricsDecorator from '../../../../decorators/MetricsDecorator';
import SamplesDecorator from '../../../../decorators/SamplesDecorator';

import { unitTypes } from '../../../../constants/metrics';
import { SelectOptions } from '../../../../contexts/SelectOptions';

const AddSampleForm = (
  {
    activity,
    preconditions,
    onWorkupChange
  }) => {

  // TODO: move to metrics.jsx (and restrict to keys; requires some work as workup_keys depend on it)
  const inputMetrics = [
    ['VELOCITY', 'add_sample_velocity'],
    ['TEMPERATURE', 'add_sample_temperature'],
    ['PRESSURE', 'add_sample_pressure']
  ]

  const selectOptions = useContext(SelectOptions)

  useEffect(() => {
    inputMetrics.forEach(([metricName, workupKey]) => {
      const unitKey = workupKey + '_unit'
      const valueKey = workupKey + '_value'

      const unit = activity.workup[unitKey] ||
        preconditions[metricName]?.unit ||
        MetricsDecorator.defaultUnit(metricName)

      let value = activity.workup[valueKey]
      // Seriously, Javascript? We need to go a long way to avoid fallback to default when a value === 0 (aka "false").
      value = value === 0 ? 0 : value || preconditions[metricName]?.value
      value = value === 0 ? 0 : value || MetricsDecorator.defaultValueInDefaultUnit(metricName)

      onWorkupChange({ name: unitKey, value: unit })
      onWorkupChange({ name: valueKey, value: value })
    })
    // eslint-disable-next-line
  }, [])

  // 'DIVERSE_SOLVENT' shall be categorized as 'SOLVENT' in AddSample, requested by NJung.
  const currentSampleActsAs = activity.workup['acts_as'] === 'DIVERSE_SOLVENT' ? 'SOLVENT' : activity.workup['acts_as']
  const currentSampleOptions = selectOptions.materials[currentSampleActsAs]
  const [sample, setSample] = useState(currentSampleOptions.find(sample =>
    sample.value === activity.workup['sample_id'] &&
    sample.label === activity.workup['sample_name']))

  const currentAdditionSpeedType =
    selectOptions.addition_speed_types.find((option) => option.value === activity.workup['addition_speed_type'])
    || selectOptions.addition_speed_types[0]

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a risk of collisions on sampleID alone as we are coping with 2 different ActiveRecord
    // models (Solvent, DiverseSolvent). So we also compare the label.
    const newSample = currentSampleOptions.find(sample => sample.value === sampleId && sample.label === label)
    if (newSample) {
      onWorkupChange({ name: 'acts_as', value: newSample.acts_as })
      onWorkupChange({ name: 'sample_id', value: newSample.value })
      onWorkupChange({ name: 'sample_name', value: newSample.label })

      // We want to retain current amounts in workup when selected Sample has unspecified amount (Additives, Solvents …)
      newSample.amount && onWorkupChange({ name: 'target_amount_value', value: newSample.amount })
      newSample.amount && onWorkupChange({ name: 'target_amount_unit', value: newSample.unit })
      newSample.amount && onWorkupChange({ name: 'sample_original_amount', value: newSample.amount })
    }
    setSample(newSample)
  }

  const handleValueChange = (name) => (value) => {
    onWorkupChange({ name: name, value: value })
  }

  const handleChangeAmount = ({ value, unit }) => {
    onWorkupChange({ name: "target_amount_value", value: value })
    onWorkupChange({ name: "target_amount_unit", value: unit })
  }

  const renderConditionInputs = () => {
    return inputMetrics.map(([metricName, workupKey]) => {
      return (
        <>
          <NumericalInputWithUnit
            label={MetricsDecorator.label(metricName)}
            value={activity.workup[workupKey + '_value']}
            unitType={unitTypes[activity.workup[workupKey + '_unit']]}
            onChange={handleValueChange(workupKey + '_value')}
          />
        </>
      )
    })
  }

  return (
    <>
      <FormSection type='action'>
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

        <SingleLineFormGroup label={SamplesDecorator.sampleSvgImg(sample)}>
          {sample && SamplesDecorator.availableAmountsInfoLine(sample['unit_amounts'])}
        </SingleLineFormGroup>

        <AmountInputSet
          amount={activity.workup['target_amount_value']}
          unit={activity.workup['target_amount_unit']}
          maxAmounts={sample?.unit_amounts}
          onChangeAmount={handleChangeAmount}
        />
      </FormSection >
      <FormSection type='action'>
        <SingleLineFormGroup label='Addition'>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="addition_speed_type"
            options={selectOptions.addition_speed_types}
            value={currentAdditionSpeedType}
            onChange={selected => handleValueChange('addition_speed_type')(selected.value)}
          />
        </SingleLineFormGroup>

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
  preconditions: PropTypes.object.isRequired,
  onWorkupChange: PropTypes.func.isRequired,
}

export default AddSampleForm
