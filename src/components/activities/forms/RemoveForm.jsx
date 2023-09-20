import React, { useMemo } from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';

import { removeTypeOptions } from '../../../constants/dropdownOptions/removeFormOptions';
import FormSection from "../../utilities/FormSection";

import { conditionTypes } from '../../../constants/conditionTypes';

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

  const currentSampleIdValue = useMemo(() => {
    return activity.workup['sample_id']
  }, [activity.workup['sample_id']])


  const defaultValue = (typeName) => {
    return currentUnitType(typeName).inputRange.default
  }

  const currentUnitType = (typeName) => {
    // hardcoded defaultUnit  until we implement unit switching.
    console.log("currentUnitType")
    console.log(typeName)
    console.log(conditionTypes[typeName])
    const defaultUnit = conditionTypes[typeName].defaultUnit
    return conditionTypes[typeName].unitTypes[defaultUnit]
  }

  const handleActsAsChange = ({ actsAs }) => {
    onWorkupChange({ name: 'acts_as', value: actsAs })
    onWorkupChange({ name: 'sample_id', value: '' })
  }

  const renderConditions = () => {
    return (
      <>
        <NumericalInputWithUnit
          label='Temperature'
          name='remove_temperature'
          value={activity.workup['remove_temperature'] || defaultValue('TEMPERATURE')}
          unitType={currentUnitType('TEMPERATURE')}
          onWorkupChange={onWorkupChange}
        />
        <NumericalInputWithUnit
          label='Pressure'
          name='remove_pressure'
          value={activity.workup['remove_pressure'] || defaultValue('PRESSURE')}
          unitType={currentUnitType('PRESSURE')}
          onWorkupChange={onWorkupChange}
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
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
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
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
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
          label={conditionTypes['DURATION'].label}
          name='duration_in_minutes'
          value={activity.workup['duration_in_minutes'] || defaultValue('DURATION')}
          unitType={currentUnitType('DURATION')}
          onWorkupChange={onWorkupChange}
        />
        <NumericalInputWithUnit
          label={conditionTypes['REPETITIONS'].label}
          name='remove_repetitions'
          value={activity.workup['remove_repetitions'] || defaultValue('REPETITIONS')}
          unitType={currentUnitType('REPETITIONS')}
          onWorkupChange={onWorkupChange}
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

