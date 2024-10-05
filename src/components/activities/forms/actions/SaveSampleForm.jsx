import React, { useContext, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

import AmountInputSet from "../../../utilities/AmountInputSet";
import ButtonGroupToggle from "../../../utilities/ButtonGroupToggle";
import FormSection from "../../../utilities/FormSection";
import MetricsInput from "../../../utilities/MetricsInput";
import SamplesIconSelect from "../../../utilities/SamplesIconSelect";
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";
import VesselFormSection from "../../../vessels/VesselFormSection";

import OptionsDecorator from "../../../../decorators/OptionsDecorator";
import PurificationDecorator from "../../../../decorators/PurificationDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";
import { StepSelectOptions } from "../../../../contexts/StepSelectOptions";

const SaveSampleForm = ({ workup, onWorkupChange, reactionProcessVessel, onChangeVessel }) => {

  const selectOptions = useContext(SelectOptions);
  const saveSampleOptions = selectOptions.FORMS.SAVE

  const stepSelectOptions = useContext(StepSelectOptions);

  useEffect(() => {
    workup.solvents_amount ||
      (workup.sample_origin_purification_step && onWorkupChange({ name: 'solvents_amount', value: workup.sample_origin_purification_step?.amount }))

    // eslint-disable-next-line
  }, [workup.sample_origin_purification_step])

  const handleWorkupChange = (name) => (value) => {
    onWorkupChange({ name: name, value: value });
  };

  const handleChangeAction = (action) => {
    onWorkupChange({ name: 'sample_origin_purification_step', value: action.purification_steps?.[0] });
    onWorkupChange({ name: 'sample_origin_action_id', value: action.value });
  }

  const currentOriginAction = OptionsDecorator.optionForKey(workup.sample_origin_action_id, saveSampleOptions.origins)

  const purificationStepFormIsDisabled = currentOriginAction?.purification_type === 'CRYSTALLIZATION'

  const renderStepSelect = () => {
    return (<>
      <SingleLineFormGroup label="Purification Step">
        <Select
          key={'action-select' + currentOriginAction?.value}
          isDisabled={purificationStepFormIsDisabled}
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_origin_purification_step"
          options={currentOriginAction?.purification_steps || []}
          value={workup.sample_origin_purification_step}
          onChange={(selectedOption) => handleWorkupChange("sample_origin_purification_step")(selectedOption)}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label={'Solvents'}>
        {workup?.sample_origin_purification_step && PurificationDecorator.infoLineSolvents(workup.sample_origin_purification_step.solvents)}
      </SingleLineFormGroup >
    </>)
  }

  const renderOriginPurificationSubForm = () => {
    return (
      <>
        <SingleLineFormGroup label="Activity">
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="sample_origin_action_id"
            options={stepSelectOptions.FORMS.SAVE.origins}
            value={currentOriginAction}
            onChange={handleChangeAction}
          />
        </SingleLineFormGroup>
        {renderStepSelect()}
        <SingleLineFormGroup label={'Amount'}>
          <MetricsInput
            displayMultiLine
            metricName={"VOLUME"}
            amount={workup.solvents_amount}
            onChange={handleWorkupChange('solvents_amount')}
          />
        </SingleLineFormGroup>

        <SingleLineFormGroup label="Solvents">
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            isMulti
            isClearable={false}
            name="extra_solvents"
            options={selectOptions.materials.SOLVENT}
            value={workup.extra_solvents}
            onChange={(selectedOptions) =>
              handleWorkupChange("extra_solvents")(selectedOptions)
            }
          />
        </SingleLineFormGroup>
      </>
    )
  }

  const renderOriginToggle = () => {

    return (
      <FormGroup>
        <ButtonGroupToggle
          label="Origin"
          value={workup.sample_origin_type || saveSampleOptions.origin_types[0].value}
          options={saveSampleOptions.origin_types}
          onChange={handleWorkupChange("sample_origin_type")}
        />
      </FormGroup>
    )
  }

  const renderOriginSubForm = () => {
    switch (workup.sample_origin_type) {
      case "PURIFICATION":
        return renderOriginPurificationSubForm()
      default:
        return (
          <>
          </>
        )
    }
  }

  const renderOriginFormGroup = () => {
    return (
      <>
        {renderOriginToggle()}
        {renderOriginSubForm()}
      </>
    )
  }

  return (
    <>
      <FormGroup>
        <Label>Molecular Entities</Label>
        <SamplesIconSelect
          isMulti
          isClearable={false}
          samples={workup.samples}
          onChange={handleWorkupChange("samples")} />
      </FormGroup>

      <FormGroup>
        <Label>Name</Label>
        <Input
          value={workup.name}
          placeholder="Name (Leave blank to autofill)"
          onChange={(event) =>
            handleWorkupChange("name")(event.target.value)
          }
        />
      </FormGroup>

      <FormGroup>
        <Label>Short Label</Label>
        <Input
          value={workup.short_label}
          placeholder="Short Label (Leave blank to autofill)"
          onChange={(event) =>
            handleWorkupChange("short_label")(event.target.value)
          }
        />
      </FormGroup>

      {renderOriginFormGroup()}

      <VesselFormSection
        onChange={onChangeVessel}
        reactionProcessVessel={reactionProcessVessel || {}}
      />
      <FormSection type="action">
        <AmountInputSet
          amount={workup.target_amount}
          maxAmounts={undefined}
          onChangeAmount={handleWorkupChange("target_amount")}
        />
        <MetricsInput
          metricName={"PURITY"}
          amount={workup.purity}
          onChange={handleWorkupChange("purity")}
        />
        <SingleLineFormGroup label="Location">
          <Input
            type="textarea"
            value={workup.location}
            placeholder="Location"
            onChange={(event) =>
              handleWorkupChange("location")(event.target.value)
            }
          />
        </SingleLineFormGroup>
        <SingleLineFormGroup label="Sample Type">
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="intermediate_type"
            options={saveSampleOptions.types}
            value={OptionsDecorator.optionForKey(workup.intermediate_type, saveSampleOptions.types)}
            onChange={(selectedOption) =>
              handleWorkupChange("intermediate_type")(
                selectedOption.value
              )
            }
          />
        </SingleLineFormGroup>
        <ButtonGroupToggle
          value={!!workup.hide_in_eln}
          options={[
            {
              value: false,
              label: "show",
            },
            {
              value: true,
              label: "hide",
            },
          ]}
          onChange={(selectedValue) => {
            handleWorkupChange("hide_in_eln")(selectedValue);
          }}
          size="sm"
          label="Display in ELN"
        />
      </FormSection>
    </>
  );
};

export default SaveSampleForm;
