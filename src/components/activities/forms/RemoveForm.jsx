import React from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';

import { removeTypeOptions } from '../../../constants/dropdownOptions/removeFormOptions';
import FormSection from "../../utilities/FormSection";

import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';

const RemoveForm = (
  {
    activity,
    processStep,
    openSubFormLabel,
    onWorkupChange
  }) => {

  const mediumSelectOptions = processStep.added_materials_options['MEDIUM'].concat([{ value: "", label: "Undefined" }])
  const additivesSelectOptions = processStep.added_materials_options['ADDITIVE'].concat([{ value: "", label: "Undefined" }])
  const diverseSolventsSelectOptions = processStep.added_materials_options['DIVERSE_SOLVENT'].concat([{ value: "", label: "Undefined" }])

  const currentSampleIdValue = activity.workup['sample_id'];

  const handleActsAsChange = ({ actsAs }) => {
    onWorkupChange({ name: 'acts_as', value: actsAs })
    onWorkupChange({ name: 'sample_id', value: '' })
  }

  const handleValueChange = (name) => (value) => {
    return onWorkupChange({ name: name, value: value })
  }

  const renderConditions = () => {
    return (
      <>
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('TEMPERATURE')}
          value={activity.workup['remove_temperature'] || ConditionTypeDecorator.defaultValueInDefaultUnit('TEMPERATURE')}
          unitType={ConditionTypeDecorator.defaultUnitType('TEMPERATURE')}
          onChange={handleValueChange('remove_temperature')}
        />
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('PRESSURE')}
          value={activity.workup['remove_pressure'] || ConditionTypeDecorator.defaultValueInDefaultUnit('PRESSURE')}
          unitType={ConditionTypeDecorator.defaultUnitType('PRESSURE')}
          onChange={handleValueChange('remove_pressure')}
        />
      </>
    )

  }

  const additiveRemoveFields = () => {
    return (
      <>
        <SingleLineFormGroup label='Solvent (Additive)'>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="sample_id"
            options={additivesSelectOptions}
            value={additivesSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => handleValueChange('sample_id')(selectedOption.value)}
          />
        </SingleLineFormGroup>
        {renderConditions()}
      </>
    )
  }

  const diverseSolventRemoveFields = () => {
    // This is an exact clone of additiveRemoveFields, except the options hash in the Select. Might be tightened. cbuggle, 28.10.2021.
    return (
      <>
        <SingleLineFormGroup label='Solvent (Divers)'>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="sample_id"
            options={diverseSolventsSelectOptions}
            value={diverseSolventsSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => handleValueChange('sample_id')(selectedOption.value)}
          />
        </SingleLineFormGroup>
        {renderConditions()}
      </>

    )
  }

  const mediumRemoveFields = () => {
    return (
      < >
        <SingleLineFormGroup label='Sample'>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="sample_id"
            options={mediumSelectOptions}
            value={mediumSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
          />
        </SingleLineFormGroup>
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
            value={activity.workup['remove_replacement_medium']}
            placeholder="Replacement Medium"
            onChange={event => onWorkupChange({ name: 'remove_replacement_medium', value: event.target.value })}
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
          options={removeTypeOptions}
          value={removeTypeOptions.find(option => option.value === activity.workup['acts_as'])}
          onChange={selectedOption => handleActsAsChange({ actsAs: selectedOption.value })}
        />
      </SingleLineFormGroup>
      {renderGenericRemoveFields()}
    </FormSection>
  )
}

export default RemoveForm

