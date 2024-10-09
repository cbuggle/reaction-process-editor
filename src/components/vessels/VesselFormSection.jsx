import React, { useContext } from "react";
import Select from "react-select";
import MultiInputFormGroup from "../activities/forms/formgroups/MultiInputFormGroup";
import SingleLineFormGroup from "../activities/forms/formgroups/SingleLineFormGroup";
import VesselSelector from "../vessels/VesselSelector";
import VesselDecorator from "../../decorators/VesselDecorator";

import { SelectOptions } from "../../contexts/SelectOptions";
import { VesselOptions } from "../../contexts/VesselOptions";
import OptionsDecorator from "../../decorators/OptionsDecorator";
import { Button, Label } from "reactstrap";

const VesselFormSection = ({
  onChange,
  reactionProcessVessel,
  reactionProcessVesselSuggestion,
  typeColor,
  scope,
}) => {
  const selectOptions = useContext(SelectOptions);
  const vessels = useContext(VesselOptions);

  const preparationOptions =
    selectOptions.vessel_preparations.preparation_types;

  const assignVessel = (vesselId) => {
    onChange({
      ...reactionProcessVessel,
      vessel_id: vesselId,
      vessel: VesselDecorator.getVesselById(vesselId, vessels),
    });
  };

  const handleSelectPreparations = (preparations) => {
    onChange({
      ...reactionProcessVessel,
      preparations: preparations,
    });
  };

  const renderVesselSuggestion = () => {
    return (reactionProcessVesselSuggestion ?
      <div className="d-flex justify-content-between align-self-center">
        <Label className={"col-form-label"}        >
          Previous: {VesselDecorator.vesselSingleLine(reactionProcessVesselSuggestion.vessel)}
        </Label>
        <div className="optional-form-group__open-controls">
          <div className="d-grid gap-2">
            <Button size={'sm'} color={'step'} onClick={() => assignVessel(reactionProcessVesselSuggestion.vessel.id)} >
              Use
            </Button>
          </div>
        </div>
      </div>
      : <></>
    )
  }

  return (
    <>
      <MultiInputFormGroup label="Vessel" typeColor={typeColor}>
        <div className="pt-1 mb-3">
          {renderVesselSuggestion()}
        </div>
        <div className="pt-1 mb-3">
          <VesselSelector
            currentVessel={reactionProcessVessel.vessel}
            onSelectVessel={assignVessel}
            typeColor={typeColor}
            buttonLabel={!!reactionProcessVessel.vessel ? "Change" : "Set"}
            scope={scope}
          />
        </div>
        <SingleLineFormGroup label="Preparations:" typeColor={typeColor}>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="vessel_id"
            isDisabled={false}
            isMulti
            isClearable={false}
            options={preparationOptions}
            value={OptionsDecorator.optionsForValues(reactionProcessVessel.preparations, preparationOptions)}
            onChange={(selected) =>
              handleSelectPreparations(selected.map((option) => option.value))
            }
          />
        </SingleLineFormGroup>
      </MultiInputFormGroup>
    </>
  );
};

export default VesselFormSection;
