import React, { useContext, useState } from 'react'

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FiltrationStepForm from "./FiltrationStepForm";
import FormSection from '../../../../utilities/FormSection'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const FiltrationForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const workup = activity.workup
  const selectOptions = useContext(SelectOptions)
  const filtrationModeOptions = selectOptions.purify.filtration_modes

  const newFiltration = !workup['filtration_steps']
  const [filtrationSteps, setFiltrationSteps] = useState(newFiltration ? [] : workup['filtration_steps'])
  const [showNewStepForm, setShowNewStepForm] = useState(newFiltration)

  const addStep = () => setShowNewStepForm(true)

  const handleSaveStep = (stepInfo) => {
    let updatedSteps = filtrationSteps
    updatedSteps[stepInfo.index] = stepInfo.data
    setFiltrationSteps(updatedSteps)
    setShowNewStepForm(false)
    onWorkupChange({ name: 'filtration_steps', value: updatedSteps })
  }

  const handleCancelStep = () => setShowNewStepForm(false)

  const renderFilterMethodToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup.filtration_mode}
        options={filtrationModeOptions}
        onChange={selectedValue => onWorkupChange({ name: 'filtration_mode', value: selectedValue })}
        label='Keep'
      />
    )
  }

  const renderAutomationToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup.automation}
        options={selectOptions.automation_modes}
        onChange={selectedValue => onWorkupChange({ name: 'automation', value: selectedValue })}
        label='Automation'
      />
    )
  }

  return (
    <>
      <FormSection type='action'>
        {renderFilterMethodToggle()}
        {renderAutomationToggle()}
      </FormSection>
      {filtrationSteps.map((step, idx) =>
        <FiltrationStepForm
          index={idx}
          workup={step}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
          key={'step-' + step.solvents.map(element => element.id).join() + '-' + idx}
        />
      )}
      {showNewStepForm &&
        <FiltrationStepForm
          index={workup.filtration_steps?.length || 0}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
        />
      }
      <FormSection type='action'>
        <CreateButton
          label='Filtration Step'
          type='action'
          onClick={addStep}
          size='sm'
        />
      </FormSection>
    </>
  )
}

export default FiltrationForm
