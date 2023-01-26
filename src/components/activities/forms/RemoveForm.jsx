import React, { useMemo } from 'react'
import { Row, Col, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'

import { conditionUnitOptions, conditionValueRanges } from '../../../constants/dropdownOptions/conditionsOptions';
import { removeTypeOptions } from '../../../constants/dropdownOptions/removeFormOptions';

import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';
import ActionFormGroup from "./ActionFormGroup";

const RemoveForm = ({ action, onWorkupChange, processStep }) => {

  const mediumSelectOptions = processStep.added_materials_options['MEDIUM'].concat([{ value: "", label: "Undefined" }])
  const additivesSelectOptions = processStep.added_materials_options['ADDITIVE'].concat([{ value: "", label: "Undefined" }])
  const diverseSolventsSelectOptions = processStep.added_materials_options['DIVERSE_SOLVENT'].concat([{ value: "", label: "Undefined" }])

  const currentSampleIdValue = useMemo(() => {
    return action.workup['sample_id']
  }, [action.workup['sample_id']])

  const handleActsAsChange = ({actsAs}) => {
    onWorkupChange({ name: 'acts_as', value: actsAs})
    onWorkupChange({ name: 'sample_id', value: ''})
  }

  const renderConditions = () => {
    return (
      <>
        <NumericalnputWithUnit
          label='Temperature'
          name='remove_temperature'
          unit={conditionUnitOptions['TEMPERATURE'][0].label}
          precision={conditionValueRanges['TEMPERATURE']['precision']}
          step={conditionValueRanges['TEMPERATURE']['step']}
          value={action.workup['remove_temperature'] || conditionValueRanges['TEMPERATURE']['default']}
          min={conditionValueRanges['TEMPERATURE']['min']}
          max={conditionValueRanges['TEMPERATURE']['max']}
          onWorkupChange={onWorkupChange}
        />
        <NumericalnputWithUnit
          label='Pressure'
          name='remove_pressure'
          unit={conditionUnitOptions['PRESSURE'][0].label}
          precision={conditionValueRanges['PRESSURE']['precision']}
          step={conditionValueRanges['PRESSURE']['step']}
          value={action.workup['remove_pressure'] || conditionValueRanges['PRESSURE']['default']}
          min={conditionValueRanges['PRESSURE']['min']}
          max={conditionValueRanges['PRESSURE']['max']}
          onWorkupChange={onWorkupChange}
        />
      </>
    )

  }

  const additiveRemoveFields = () => {
    return (
      <>
        <ActionFormGroup label='Solvent (Additive)'>
          <Select
            name="sample_id"
            options={additivesSelectOptions}
            value={additivesSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
          />
        </ActionFormGroup>
        {renderConditions()}
      </>
    )
  }

  const diverseSolventRemoveFields = () => {
    // This is an exact clone of additiveRemoveFields, except the options hash in the Select. Might be tightened. cbuggle, 28.10.2021.
    return (
      <>
        <ActionFormGroup label='Solvent (Divers)'>
          <Select
            name="sample_id"
            options={diverseSolventsSelectOptions}
            value={diverseSolventsSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
          />
        </ActionFormGroup>
        {renderConditions()}
      </>

    )
  }

  const mediumRemoveFields = () => {
    return (
      < >
        <ActionFormGroup label='Sample'>
          <Select
            name="sample_id"
            options={mediumSelectOptions}
            value={mediumSelectOptions.find(option => option.value === currentSampleIdValue)}
            onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
          />
        </ActionFormGroup>
        <NumericalnputWithUnit
          label='Duration'
          name='duration_in_minutes'
          unit={"Minutes"}
          precision={conditionValueRanges['REMOVE_DURATION']['precision']}
          step={conditionValueRanges['REMOVE_DURATION']['step']}
          value={action.workup['duration_in_minutes'] || conditionValueRanges['REMOVE_DURATION']['default']}
          min={conditionValueRanges['REMOVE_DURATION']['min']}
          max={conditionValueRanges['REMOVE_DURATION']['max']}
          onWorkupChange={onWorkupChange}
        />
        <NumericalnputWithUnit
          label='Repetition'
          name='remove_repetitions'
          unit={"times"}
          precision={conditionValueRanges['REMOVE_REPETITIONS']['precision']}
          step={conditionValueRanges['REMOVE_REPETITIONS']['step']}
          value={action.workup['remove_repetitions'] || conditionValueRanges['REMOVE_REPETITIONS']['default']}
          min={conditionValueRanges['REMOVE_REPETITIONS']['min']}
          max={conditionValueRanges['REMOVE_REPETITIONS']['max']}
          onWorkupChange={onWorkupChange}
        />
        <ActionFormGroup label='Replacement Medium'>
          <Input
            type="textarea"
            value={action.workup['remove_replacement_medium']}
            placeholder="Replacement Medium"
            onChange={event => onWorkupChange({ name: 'remove_replacement_medium', value: event.target.value })}
          />
        </ActionFormGroup>
      </>
    )
  }

  const renderGenericRemoveFields = () => {
    switch (action.workup['acts_as']) {
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
      <ActionFormGroup label='Type'>
        <Select
          name="acts_as"
          options={removeTypeOptions}
          value={removeTypeOptions.find(option => option.value === action.workup['acts_as'])}
          onChange={selectedOption => handleActsAsChange({actsAs: selectedOption.value})}
        />
      </ActionFormGroup>
      {renderGenericRemoveFields()}
    </>
  )
}

export default RemoveForm

