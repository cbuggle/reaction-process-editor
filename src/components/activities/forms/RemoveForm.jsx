import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import FormSection from "../../utilities/FormSection";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';

import { StepSelectOptions } from '../../steps/StepColumnCard';
import { SelectOptions } from '../../views/Reaction';
import { removeFormConditionTypeNames } from '../../../constants/conditionTypes';

const RemoveForm = (
  {
    activity,
    openSubFormLabel,
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

    // reset workup n/a in current actsAs-specific Form.
    if (actsAs === 'MEDIUM') {
      removeFormConditionTypeNames.forEach(typeName =>
        onWorkupChange({ name: typeName, value: null }))
    } else {
      onWorkupChange({ name: 'duration_in_minutes', value: null })
      onWorkupChange({ name: 'remove_repetitions', value: null })
      onWorkupChange({ name: 'replacement_medium', value: null })
    }
  }

  const handleValueChange = (name) => (value) => {
    return onWorkupChange({ name: name, value: value })
  }

  const handleConditionChange = (typeName) => (value) => {
    onWorkupChange({ name: typeName, value: { value: value, unit: ConditionTypeDecorator.defaultUnit(typeName) } })
  }

  const valueFor = (typeName) => (
    (activity.workup[typeName] && activity.workup[typeName]['value'])
    || ConditionTypeDecorator.defaultValueInDefaultUnit(typeName)
  )

  const renderConditions = () => {
    return (
      removeFormConditionTypeNames.map(typeName =>
        <>
          <NumericalInputWithUnit
            label={ConditionTypeDecorator.label(typeName)}
            value={valueFor(typeName)}
            unitType={ConditionTypeDecorator.defaultUnitType(typeName)}
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
          // will retain the previous selection (which isn't even in the also changed selectOptions).
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

  const additiveRemoveFields = () => {
    return (
      <>
        {renderSampleSelect('Solvent (Additive)', additivesSelectOptions)}
        {renderConditions()}
      </>
    )
  }

  const diverseSolventRemoveFields = () => {
    // This is an exact clone of additiveRemoveFields, except the options hash in the Select. Might be tightened. cbuggle, 28.10.2021.
    return (
      <>
        {renderSampleSelect('Solvent (Diverse)', diverseSolventsSelectOptions)}
        {renderConditions()}
      </>
    )
  }

  const mediumRemoveFields = () => {
    return (
      < >
        {renderSampleSelect('Sample', mediumSelectOptions)}
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('DURATION')}
          value={activity.workup['duration_in_minutes'] || ConditionTypeDecorator.defaultValueInDefaultUnit('DURATION')}
          unitType={ConditionTypeDecorator.defaultUnitType('DURATION')}
          onChange={handleValueChange('duration_in_minutes')}
        />
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('REPETITIONS')}
          value={activity.workup['remove_repetitions'] || ConditionTypeDecorator.defaultValueInDefaultUnit('REPETITIONS')}
          unitType={ConditionTypeDecorator.defaultUnitType('REPETITIONS')}
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
        return additiveRemoveFields()
      case 'DIVERSE_SOLVENT':
        return diverseSolventRemoveFields()
      case 'MEDIUM':
        return mediumRemoveFields()
      default:
        break;
    }
  }

  return (
    <FormSection type='action' openSubFormLabel={openSubFormLabel}>
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
    </FormSection>
  )
}

export default RemoveForm

