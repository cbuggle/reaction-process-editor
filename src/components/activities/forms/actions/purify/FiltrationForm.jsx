import React, {useEffect} from 'react'
import Select from 'react-select'

import IconButton from '../../../../utilities/IconButton'
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';
import CreateButton from '../../../../utilities/CreateButton';

import { SelectOptions } from '../../../../../contexts/SelectOptions';
import { useContext } from 'react';
import FiltrationRepeatForm from './FiltrationRepeatForm';
import FormSection from '../../../../utilities/FormSection'
import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";

const FiltrationForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const actionPurifySolventIds = activity.workup['solvent_ids'] || []

  const selectOptions = useContext(SelectOptions)
  const purifySolventOptions = selectOptions.materials['SOLVENT']
  const filtrationModeOptions = selectOptions.filtration_modes

  const workupRepetitions = activity.workup.repetitions || []

  useEffect(() => {
    console.log(activity)
    if (!activity.workup.repetitions) { addRepetition() }
  }, [])

  const addSolvent = (solventId) => {
    onWorkupChange({ name: 'solvent_ids', value: actionPurifySolventIds.concat(solventId) })
  }
  const removeSolvent = (idx) => () => {
    const solvents = activity.workup.solvent_ids.splice((idx, 1))
    onWorkupChange({ name: 'solvent_ids', value: solvents })
  }
  const changeSolvent = (idx) => (newSolventId) => {
    let solventIds = activity.workup.solvent_ids
    solventIds[idx] = newSolventId
    onWorkupChange({ name: 'solvent_ids', value: solventIds })
  }

  const handleRepetitionChange = (idx) => (newWorkup) => {
    let repetitions = activity.workup.repetitions
    repetitions[idx] = { ...repetitions[idx], ...newWorkup }
    onWorkupChange({ name: 'repetitions', value: repetitions })
  }

  const addRepetition = () => {
    const repetitions = (activity.workup.repetitions || []).concat({
      solventIds: [],
      AMOUNT: { value: undefined, unit: "ml" },
      rinseVessel: false,
      ratio: ''
    })
    onWorkupChange({ name: 'repetitions', value: repetitions })
  }

  const removeRepetition = (idx) => () => {
    const repetitions = activity.workup.repetitions.splice((idx, 1))
    onWorkupChange({ name: 'repetitions', value: repetitions })
  }

  const renderFilterMethodToggle = () => {
    return (
      <FormSection type='action'>
        <ButtonGroupToggle
          value={activity.workup['filtration_mode'] || filtrationModeOptions[0]['value']}
          options={filtrationModeOptions}
          onChange={selectedValue => onWorkupChange({ name: 'filtration_mode', value: selectedValue })}
        />
      </FormSection>
    )
  }

  const renderAutomationToggle = () => {
    return (
      <FormSection type='action'>
        <ButtonGroupToggle
          value={activity.workup['purify_automation'] || selectOptions.automation_modes[0]['value']}
          options={selectOptions.automation_modes}
          onChange={selectedValue => onWorkupChange({ name: 'purify_automation', value: selectedValue })}
        />
      </FormSection>
    )
  }

  return (
    <>
      {renderFilterMethodToggle()}
      {renderAutomationToggle()}
      <FormSection>
        {actionPurifySolventIds.map((solventId, idx) =>
          <SingleLineFormGroup
            key={solventId}
            label={<IconButton onClick={removeSolvent(idx)} icon='trash' className='icon-button--positive' size='sm' />}>


            <Select
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name="purify_solvent_solvent_ids"
              options={purifySolventOptions}
              value={purifySolventOptions.filter(option => solventId === option.value)}
              onChange={selectedOption => changeSolvent(idx)(selectedOption.value)}
            />
          </SingleLineFormGroup >
        )}

        <SingleLineFormGroup>
          <Select
            placeholder={'Add Solvent'}
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="purify_solvent_solvent_ids"
            options={purifySolventOptions}
            value={''}
            onChange={selectedOption => addSolvent(selectedOption.value)}
          />

        </SingleLineFormGroup>
      </FormSection>


      {workupRepetitions && workupRepetitions.map((repetitionWorkup, idx) => {
        return (
          <FormSection>
            <FiltrationRepeatForm
              key={'repetition' + idx}
              workup={repetitionWorkup}
              onWorkupChange={handleRepetitionChange(idx)}
              onDelete={removeRepetition(idx)} />
          </FormSection>
        )
      })}
      <CreateButton label='Repetition' type='step' onClick={addRepetition} />
    </>
  )
}

export default FiltrationForm
