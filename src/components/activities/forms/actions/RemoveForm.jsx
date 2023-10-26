import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import NumericalInputWithUnit from '../../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import MetricsDecorator from '../../../../decorators/MetricsDecorator';

import { StepSelectOptions } from '../../../../contexts/StepSelectOptions';
import { SelectOptions } from '../../../../contexts/SelectOptions';
import { removeFormMetricNames } from '../../../../constants/metrics';

const RemoveForm = (
  {
    activity,
    preconditions,
    onWorkupChange
  }) => {

  const stepSelectOptions = useContext(StepSelectOptions)
  const selectOptions = useContext(SelectOptions)

  const mediumSelectOptions = stepSelectOptions.removable_materials['MEDIUM']
    .concat([{ value: "", label: "Undefined" }])
  const additivesSelectOptions = stepSelectOptions.removable_materials['ADDITIVE']
    .concat([{ value: "", label: "Undefined" }])
  const diverseSolventsSelectOptions = stepSelectOptions.removable_materials['DIVERSE_SOLVENT']
    .concat([{ value: "", label: "Undefined" }])

  const handleActsAsChange = ({ actsAs }) => {
    onWorkupChange({ name: 'acts_as', value: actsAs })
    onWorkupChange({ name: 'sample_id', value: '' })

    // reset those non-applicable workups in current actsAs
    if (actsAs === 'MEDIUM') {
      removeFormMetricNames.forEach(typeName =>
        onWorkupChange({ name: typeName, value: null }))
    } else {
      onWorkupChange({ name: 'duration_in_minutes', value: null })
      onWorkupChange({ name: 'remove_repetitions', value: null })
      onWorkupChange({ name: 'replacement_medium', value: null })
    }
  }

  const handleValueChange = (name) => (value) => onWorkupChange({ name: name, value: value })

  const handleConditionChange = (typeName) => (value) => {
    onWorkupChange({ name: typeName, value: { value: value, unit: MetricsDecorator.defaultUnit(typeName) } })
  }

  const valueFor = (typeName) => {
    return activity.workup[typeName]?.['value'] || activity.workup[typeName]?.['value'] === 0 ?
      activity.workup[typeName]['value']
      :
      preconditions[typeName]?.value
  }

  const renderConditions = () => {
    return (
      removeFormMetricNames.map(typeName =>
        <>
          <NumericalInputWithUnit
            label={MetricsDecorator.label(typeName)}
            value={valueFor(typeName)}
            unitType={MetricsDecorator.defaultUnitType(typeName)}
            onChange={handleConditionChange(typeName)}
          />
        </>

      )
    )
  }

  const renderSampleSelect = (label, selectOptions) => {
    return (
      <SingleLineFormGroup label={label}>
        <Select
          // Setting key forces re-render when label changes, as a change on value={activity.workup['sample_id']} alone
          // will retain the previous selection (which isn't even in the selectOptions anymore, they change alongside).
          // React state model for the glory.
          key={label}
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          options={selectOptions}
          value={selectOptions.find(option => option.value === activity.workup['sample_id'])}
          onChange={selectedOption => handleValueChange('sample_id')(selectedOption.value)}
        />
      </SingleLineFormGroup>

    )
  }

  const solventRemoveFields = (label, solventOptions) => {
    return (
      <>
        {renderSampleSelect(label, solventOptions)}
        {renderConditions()}
      </>
    )
  }

  const mediumRemoveFields = () => {
    return (
      < >
        {renderSampleSelect('Sample', mediumSelectOptions)}
        <NumericalInputWithUnit
          label={MetricsDecorator.label('DURATION')}
          value={activity.workup['duration_in_minutes'] || MetricsDecorator.defaultValueInDefaultUnit('DURATION')}
          unitType={MetricsDecorator.defaultUnitType('DURATION')}
          onChange={handleValueChange('duration_in_minutes')}
        />
        <NumericalInputWithUnit
          label={MetricsDecorator.label('REPETITIONS')}
          value={activity.workup['remove_repetitions'] || MetricsDecorator.defaultValueInDefaultUnit('REPETITIONS')}
          unitType={MetricsDecorator.defaultUnitType('REPETITIONS')}
          onChange={handleValueChange('remove_repetitions')}
        />
        <SingleLineFormGroup label='Replacement Medium'>
          <Input
            type="textarea"
            value={activity.workup['replacement_medium']}
            placeholder="Replacement Medium"
            onChange={event => onWorkupChange({ name: 'replacement_medium', value: event.target.value })}
          />
        </SingleLineFormGroup>
      </>
    )
  }

  const renderGenericRemoveFields = () => {
    switch (activity.workup['acts_as']) {
      case 'ADDITIVE':
        return solventRemoveFields('Solvent (Additive)', additivesSelectOptions)
      case 'DIVERSE_SOLVENT':
        return solventRemoveFields('Solvent (Diverse)', additivesSelectOptions)
      case 'MEDIUM':
        return mediumRemoveFields()
      default:
        break;
    }
  }

  return (
    <>
      <SingleLineFormGroup label='Type'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="acts_as"
          options={selectOptions.remove_types}
          value={selectOptions.remove_types.find(option => option.value === activity.workup['acts_as'])}
          onChange={selectedOption => handleActsAsChange({ actsAs: selectedOption.value })}
        />
      </SingleLineFormGroup>
      {renderGenericRemoveFields()}
    </ >
  )
}

export default RemoveForm

