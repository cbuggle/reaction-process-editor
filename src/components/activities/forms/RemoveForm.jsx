import React, { useMemo } from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';

import { conditionUnitOptions, conditionInputRanges } from '../../../constants/dropdownOptions/conditionsOptions';
import { removeTypeOptions } from '../../../constants/dropdownOptions/removeFormOptions';

const RemoveForm = ({ activity, onWorkupChange, processStep }) => {

  const mediumSelectOptions = processStep.added_materials_options['MEDIUM'].concat([{ value: "", label: "Undefined" }])
  const additivesSelectOptions = processStep.added_materials_options['ADDITIVE'].concat([{ value: "", label: "Undefined" }])
  const diverseSolventsSelectOptions = processStep.added_materials_options['DIVERSE_SOLVENT'].concat([{ value: "", label: "Undefined" }])

  const currentSampleIdValue = useMemo(() => {
    return activity.workup['sample_id']
  }, [activity.workup['sample_id']])

  const handleActsAsChange = ({ actsAs }) => {
    onWorkupChange({ name: 'acts_as', value: actsAs })
    onWorkupChange({ name: 'sample_id', value: '' })
  }

  const renderConditions = () => {
    return (
      <>
        <NumericalnputWithUnit
          label='Temperature'
          name='remove_temperature'
          value={activity.workup['remove_temperature'] || conditionInputRanges['TEMPERATURE']['default']}
          inputRanges={conditionInputRanges['TEMPERATURE']}
          onWorkupChange={onWorkupChange}
        />
        <NumericalnputWithUnit
          label='Pressure'
          name='remove_pressure'
          value={activity.workup['remove_pressure'] || conditionInputRanges['PRESSURE']['default']}
          inputRanges={conditionInputRanges['PRESSURE']}
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
            name="sample_id"
            options={mediumSelectOptions}
            value={mediumSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
          />
        </SingleLineFormGroup>
        <NumericalnputWithUnit
          label='Duration'
          name='duration_in_minutes'
          value={activity.workup['duration_in_minutes'] || conditionInputRanges['REMOVE_DURATION']['default']}
          inputRanges={conditionInputRanges['REMOVE_DURATION']}
          onWorkupChange={onWorkupChange}
        />
        <NumericalnputWithUnit
          label='Repetition'
          name='remove_repetitions'
          value={activity.workup['remove_repetitions'] || conditionInputRanges['REMOVE_REPETITIONS']['default']}
          inputRanges={conditionInputRanges['REMOVE_REPETITIONS']}
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
    <>
      <SingleLineFormGroup label='Type'>
        <Select
          name="acts_as"
          options={removeTypeOptions}
          value={removeTypeOptions.find(option => option.value === activity.workup['acts_as'])}
          onChange={selectedOption => handleActsAsChange({ actsAs: selectedOption.value })}
        />
      </SingleLineFormGroup>
      {renderGenericRemoveFields()}
    </>
  )
}

export default RemoveForm

