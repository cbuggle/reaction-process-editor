import React, { useContext } from 'react'

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FiltrationStepForm from "./FiltrationStepForm";
import FormSection from '../../../../utilities/FormSection'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';

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

  const filtrationOptions = useContext(SelectOptions).purify.FILTRATION

  const renderFilterMethodToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup.filtration_mode}
        options={filtrationOptions.modes}
        onChange={selectedValue => onWorkupChange({ name: 'filtration_mode', value: selectedValue })}
        label='Keep'
      />
    )
  }

  const renderAutomationToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup.automation}
        options={filtrationOptions.automation_modes}
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
          index={workup.purify_steps?.length || 0}
          workup={workup.purify_steps?.at(-1)}
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

export default withActivitySteps(FiltrationForm, 'purify_steps')
