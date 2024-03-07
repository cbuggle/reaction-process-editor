import React, { useContext } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

import AmountInputSet from "../../../utilities/AmountInputSet";
import ButtonGroupToggle from "../../../utilities/ButtonGroupToggle";
import FormSection from "../../../utilities/FormSection";
import MetricsInput from "../../../utilities/MetricsInput";
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";
import VesselFormSection from "../../../vessels/VesselFormSection";

import OptionsDecorator from "../../../../decorators/OptionsDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";

const SaveSampleForm = ({ workup, onWorkupChange, reactionProcessVessel, onChangeVessel }) => {
  { console.log("ReactionProcessVessel savesample form") }
  { console.log(reactionProcessVessel) }
  const selectOptions = useContext(SelectOptions);

  const handleChangeSampleWorkup = (workupKey) => (value) => {
    onWorkupChange({ name: workupKey, value: value });
  };

  const handleChangeReactionProcessVessel = (reactionProcessVessel) => {
    onWorkupChange({ name: "reaction_process_vessel", value: reactionProcessVessel });
  };

  return (
    <>
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
      <FormGroup>
        <VesselFormSection
          onChange={onChangeVessel}
          reactionProcessVessel={reactionProcessVessel || {}}
        />
        {/* <Label>Vessel</Label>
        <VesselSelector
          currentVessel={currentVessel}
          onSelectVessel={assignVessel}
          typeColor="action"
          buttonLabel={!!currentVessel ? "Change" : "Set"}
          scope={"Sample" + (workup.name ? ' "' + workup.name + '"' : "")}
        /> */}
      </FormGroup>
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
