import React, { useContext } from "react";

import ExtractionStepForm from "./ExtractionStepForm";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FormSection from "../../../../utilities/FormSection";

import { SelectOptions } from "../../../../../contexts/SelectOptions";

import withActivitySteps from "../../../../utilities/WithActivitySteps";

const ExtractionForm = ({
  workup,
  onWorkupChange,
  activitySteps,
  showNewStepForm,
  addStep,
  handleSaveStep,
  handleCancelStep,
  handleDeleteStep
}) => {
  const extractionOptions = useContext(SelectOptions).purify.EXTRACTION;

  const renderAutomationToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup.automation}
        options={extractionOptions.automation_modes}
        onChange={(selectedValue) =>
          onWorkupChange({ name: "automation", value: selectedValue })
        }
        label="Automation"
      />
    )
  }

  const renderPhaseToggle = () => {
    return (
      <ButtonGroupToggle
        value={workup.phase}
        options={extractionOptions.phases}
        onChange={(selectedValue) =>
          onWorkupChange({ name: "phase", value: selectedValue })
        }
        label="Retain phase"
      />
    )
  }


  return (
    <>
      <FormSection type="action">
        {renderAutomationToggle()}
        {renderPhaseToggle()}
      </FormSection>

      {activitySteps.map((step, idx) =>
        <ExtractionStepForm
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
        <ExtractionStepForm
          index={workup.purify_steps?.length || 0}
          workup={workup.purify_steps?.at(-1)}
          initialShowForm={true}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
        />
      }
      <FormSection type='action'>
        <CreateButton
          label='Extraction Step'
          type='action'
          onClick={addStep}
          size='sm'
        />
      </FormSection>
    </>
  );
};


export default withActivitySteps(ExtractionForm, 'purify_steps');
