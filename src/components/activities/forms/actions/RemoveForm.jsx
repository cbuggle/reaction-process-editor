import React, { useContext, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

import RemoveDiverseSolventsForm from "./remove/RemoveDiverseSolventsForm";
import RemoveFromReactionForm from "./remove/RemoveFromReactionForm";
import RemoveFromSampleForm from "./remove/RemoveFromSampleForm";
import RemoveFromMethodForm from "./remove/RemoveFromMethodForm";
import RemoveStepWiseForm from "./remove/RemoveStepWiseForm";

import ButtonGroupToggle from "../../../utilities/ButtonGroupToggle";
import FormSection from "../../../utilities/FormSection";
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import OptionsDecorator from "../../../../decorators/OptionsDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";
import { StepSelectOptions } from "../../../../contexts/StepSelectOptions";

const RemoveForm = ({ workup, preconditions, onWorkupChange }) => {
  const selectOptions = useContext(SelectOptions).FORMS.REMOVE;
  const removableSamplesOptions = useContext(StepSelectOptions).FORMS.REMOVE.removable_samples;

  useEffect(() => {
    fillSamplesFields(workup.origin_type) ?
      onWorkupChange({ name: 'samples', value: removableSamplesOptions[workup.origin_type] })
      : onWorkupChange({ name: 'samples', value: undefined })
  }, [])

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleTypeChange = (newType) => {
    onWorkupChange({ name: "origin_type", value: newType })
    fillSamplesFields(newType) ?
      onWorkupChange({ name: 'samples', value: removableSamplesOptions[newType] })
      : onWorkupChange({ name: 'samples', value: undefined })
  }

  const fillSamplesFields = (originType) => {
    return ['FROM_REACTION_STEP', 'FROM_REACTION'].find((fillSamplesType) => originType === fillSamplesType)
  }

  const renderGenericRemoveFormSections = () => {
    switch (workup.origin_type) {
      case 'FROM_REACTION':
        return (<RemoveFromReactionForm workup={workup} preconditions={preconditions} onWorkupChange={onWorkupChange} />)
      case 'FROM_REACTION_STEP':
        return (<RemoveFromReactionForm workup={workup} preconditions={preconditions} onWorkupChange={onWorkupChange} />)
      case 'FROM_SAMPLE':
        return (<RemoveFromSampleForm workup={workup} preconditions={preconditions} onWorkupChange={onWorkupChange} />)
      case 'DIVERSE_SOLVENTS':
        return (<RemoveDiverseSolventsForm workup={workup} preconditions={preconditions} onWorkupChange={onWorkupChange} />)
      case 'FROM_METHOD':
        return (<RemoveFromMethodForm workup={workup} preconditions={preconditions} onWorkupChange={onWorkupChange} />)
      case 'STEPWISE':
        return (<RemoveStepWiseForm workup={workup} preconditions={preconditions} onWorkupChange={onWorkupChange} />)
      default:
        break;
    }
  }

  return (
    <>
      <FormSection type='action'>
        <FormGroup>
          <Label> Automation </Label>
          {workup.automation_mode?.label}
          <ButtonGroupToggle value={workup.automation} options={selectOptions.automation_modes}
            onChange={handleWorkupChange('automation')} />
        </FormGroup>
        <SingleLineFormGroup label="Origin">
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="origin_type"
            options={selectOptions.origin_types}
            value={OptionsDecorator.optionForKey(workup["origin_type"], selectOptions.origin_types)}
            onChange={(selectedOption) => handleTypeChange(selectedOption.value)
            }
          />
        </SingleLineFormGroup>
      </FormSection>
      {renderGenericRemoveFormSections()}
    </>
  );
};

export default RemoveForm;
