import React, { useContext } from 'react'

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FiltrationStepForm from "./FiltrationStepForm";
import FormSection from '../../../../utilities/FormSection'
import withActivitySteps from '../../../../utilities/WithActivitySteps';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const FiltrationForm = (
  {
    workup,
    onWorkupChange,
    activitySteps,
    showNewStepForm,
    addStep,
    handleSaveStep,
    handleCancelStep,
    handleDeleteStep
  }) => {

  const selectOptions = useContext(SelectOptions)
  const filtrationModeOptions = selectOptions.purify.filtration.modes

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
      {activitySteps.map((step, idx) =>
        <FiltrationStepForm
          index={idx}
          workup={step}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
          onDelete={handleDeleteStep}
          key={'step-' + step.solvents.map(element => element.id).join() + '-' + idx}
          canDelete={activitySteps.length > 1}
        />
      )}
      {showNewStepForm &&
        <FiltrationStepForm
          index={workup.filtration_steps?.length || 0}
          workup={workup.filtration_steps?.at(-1)}
          initialShowForm={true}
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

export default withActivitySteps(FiltrationForm, 'filtration_steps')
