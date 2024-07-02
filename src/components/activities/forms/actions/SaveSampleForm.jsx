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
import PurifyDecorator from "../../../../decorators/PurifyDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";
import { StepSelectOptions } from "../../../../contexts/StepSelectOptions";

const SaveSampleForm = ({ workup, onWorkupChange, reactionProcessVessel, onChangeVessel }) => {

  const selectOptions = useContext(SelectOptions);
  const stepSelectOptions = useContext(StepSelectOptions);


  useEffect(() => {
    workup.extra_solvents_amount ||
      (workup.sample_origin_purify_step && onWorkupChange({ name: 'extra_solvents_amount', value: workup.sample_origin_purify_step?.amount }))

    // eslint-disable-next-line
  }, [workup.sample_origin_purify_step])

  const handleChangeSampleWorkup = (workupKey) => (value) => {
    onWorkupChange({ name: workupKey, value: value });
  };

  const handleChangeAction = (action) => {
    onWorkupChange({ name: 'sample_origin_purify_step', value: action.purify_steps[0] });
    onWorkupChange({ name: 'sample_origin_action', value: action });
  }

  const currentAction = workup.sample_origin_action

  const purifyStepFormIsDisabled = currentAction?.purify_type === 'CRYSTALLIZATION'

  const renderStepSelect = () => {
    return (<>
      <SingleLineFormGroup label="Purify Step">
        <Select
          key={'action-select' + currentAction?.value}
          isDisabled={purifyStepFormIsDisabled}
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_origin_purify_step"
          options={currentAction?.purify_steps}
          value={workup.sample_origin_purify_step}
          onChange={(selectedOption) => handleChangeSampleWorkup("sample_origin_purify_step")(selectedOption)}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label={'Solvents'}>
        {workup?.sample_origin_purify_step && PurifyDecorator.infoLineSolvents(workup.sample_origin_purify_step.solvents)}
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
            name="sample_origin"
            options={stepSelectOptions.save_sample_origins}
            value={currentAction}
            onChange={handleChangeAction}
          />
        </SingleLineFormGroup>
        {renderStepSelect()}
        <SingleLineFormGroup label={'Amount'}>
          <MetricsInput
            displayMultiLine
            metricName={"VOLUME"}
            amount={workup.extra_solvents_amount}
            onChange={handleChangeSampleWorkup('extra_solvents_amount')}
          />
        </SingleLineFormGroup>

        <SingleLineFormGroup label="Extra Solvents">
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            isMulti
            isClearable={false}
            name="extra_solvents"
            options={selectOptions.materials.SOLVENT}
            value={workup.extra_solvents}
            onChange={(selectedOptions) =>
              handleChangeSampleWorkup("extra_solvents")(selectedOptions)
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
          value={workup.sample_origin_type || selectOptions.save_sample_origin_types[0].value}
          options={selectOptions.save_sample_origin_types}
          onChange={handleChangeSampleWorkup("sample_origin_type")}
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
          samples={workup.samples}
          onChange={handleChangeSampleWorkup("samples")} />
      </FormGroup>

      <FormGroup>
        <Label>Name</Label>
        <Input
          value={workup.name}
          placeholder="Name (Leave blank to autofill)"
          onChange={(event) =>
            handleChangeSampleWorkup("name")(event.target.value)
          }
        />
      </FormGroup>

      <FormGroup>
        <Label>Short Label</Label>
        <Input
          value={workup.short_label}
          placeholder="Short Label (Leave blank to autofill)"
          onChange={(event) =>
            handleChangeSampleWorkup("short_label")(event.target.value)
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
          onChangeAmount={handleChangeSampleWorkup("target_amount")}
        />
        <MetricsInput
          metricName={"PURITY"}
          amount={workup.purity}
          onChange={handleChangeSampleWorkup("purity")}
        />
        <SingleLineFormGroup label="Location">
          <Input
            type="textarea"
            value={workup.location}
            placeholder="Location"
            onChange={(event) =>
              handleChangeSampleWorkup("location")(event.target.value)
            }
          />
        </SingleLineFormGroup>
        <SingleLineFormGroup label="Sample Type">
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="intermediate_type"
            options={selectOptions.save_sample_types}
            value={OptionsDecorator.optionForKey(workup.intermediate_type, selectOptions.save_sample_types)}
            onChange={(selectedOption) =>
              handleChangeSampleWorkup("intermediate_type")(
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
            handleChangeSampleWorkup("hide_in_eln")(selectedValue);
          }}
          size="sm"
          label="Display in ELN"
        />
      </FormSection>
    </>
  );
};

export default SaveSampleForm;
