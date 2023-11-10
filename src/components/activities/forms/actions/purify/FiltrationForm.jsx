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
  const filtrationModeOptions = selectOptions.filtration_modes

  const newFiltration = !workup['filtration_steps']
  const [filtrationSteps, setFiltrationSteps] = useState(newFiltration ? [] : workup['filtration_steps'])
  const [showNewStepForm, setShowNewStepForm] = useState(newFiltration)

  const addStep = () => setShowNewStepForm(true)

  const handleSaveStep = (stepInfo) => {
    const stepData = stepInfo.data
    const stepIndex = stepInfo.index
    setShowNewStepForm(false)
    let updatedSteps
    if (filtrationSteps[stepIndex]) {
      updatedSteps = filtrationSteps.map((value, index) =>
        index === stepIndex ? stepData : value
      );
    } else {
      updatedSteps = [...filtrationSteps, stepData]
    }
    setFiltrationSteps(updatedSteps)
    onWorkupChange({ name: 'filtration_steps', value: updatedSteps })
  }

  const handleCancelStep = () => setShowNewStepForm(false)

  const renderFilterMethodToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup['filtration_mode'] || filtrationModeOptions[0]['value']}
        options={filtrationModeOptions}
        onChange={selectedValue => onWorkupChange({ name: 'filtration_mode', value: selectedValue })}
        label='Keep'
      />
    )
  }

  const renderAutomationToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup['purify_automation'] || selectOptions.automation_modes[0]['value']}
        options={selectOptions.automation_modes}
        onChange={selectedValue => onWorkupChange({ name: 'purify_automation', value: selectedValue })}
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
          stepData={step}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
          key={'step-' + step.solvents.map(element => element.id).join() + '-' + idx}
        />
      )}
      {showNewStepForm &&
        <FiltrationStepForm
          index={workup['filtration_steps'] ? workup['filtration_steps'].length : 0}
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
