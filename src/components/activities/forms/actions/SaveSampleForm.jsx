import React, { useContext, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

import AmountInputSet from "../../../utilities/AmountInputSet";
import ButtonGroupToggle from "../../../utilities/ButtonGroupToggle";
import FormSection from "../../../utilities/FormSection";
import MetricsInput from "../../../utilities/MetricsInput";
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";
import VesselFormSection from "../../../vessels/VesselFormSection";
import VesselDecorator from "../../../../decorators/VesselDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";
import { VesselOptions } from "../../../../contexts/VesselOptions";

const SaveSampleForm = ({ workup, onWorkupChange }) => {
  const selectOptions = useContext(SelectOptions);
  const vessels = useContext(VesselOptions);

  const assignVessel = (vesselId) => {
    setCurrentVessel(VesselDecorator.getVesselById(vesselId, vessels));
    onWorkupChange({ name: "vessel_id", value: vesselId });
  };

  const [currentVessel, setCurrentVessel] = useState(
    VesselDecorator.getVesselById(workup.vessel_id, vessels)
  );

  const handleChangeSampleWorkup = (workupKey) => (value) => {
    onWorkupChange({ name: workupKey, value: value });
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
      <VesselFormSection
        currentVessel={currentVessel}
        onSelectVessel={assignVessel}
        typeColor="action"
        buttonLabel={!!currentVessel ? "Change" : "Set"}
        scope={"Sample" + (workup.name ? ' "' + workup.name + '"' : "")}
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
            value={selectOptions.save_sample_types.find(
              (option) => option.value === workup.intermediate_type
            )}
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
