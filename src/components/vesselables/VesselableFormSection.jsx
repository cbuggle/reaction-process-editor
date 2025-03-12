import React, { useContext } from "react";
import Select from "react-select";
import MultiInputFormGroup from "../activities/forms/formgroups/MultiInputFormGroup";
import SingleLineFormGroup from "../activities/forms/formgroups/SingleLineFormGroup";
import VesselableSelector from "../vesselables/VesselableSelector";
import VesselableDecorator from "../../decorators/VesselableDecorator";
import VesselableLabelQuickSelectorInput from "./VesselableLabelQuickSelectorInput";

import { SelectOptions } from "../../contexts/SelectOptions";
import { VesselOptions } from "../../contexts/VesselOptions";
import OptionsDecorator from "../../decorators/OptionsDecorator";
import { Button, Label } from "reactstrap";

const VesselableFormSection = ({
  onChange,
  reactionProcessVessel,
  reactionProcessVesselSuggestion,
  typeColor,
  scope,
}) => {
  const selectOptions = useContext(SelectOptions);
  const vesselables = useContext(VesselOptions);

  const preparationOptions = selectOptions.vessel_preparations.preparation_types;

  const currentVesselable = VesselableDecorator.getVesselableByParams(
    { vesselable_id: reactionProcessVessel.vesselable_id, vesselable_type: reactionProcessVessel.vesselable_type },
    vesselables)

  const assignVesselable = (vesselableParams) => {
    onChange(
      {
        ...reactionProcessVessel, // retain id & preparations
        ...vesselableParams
      }
    )
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
          Previous: {VesselableDecorator.vesselableSingleLine(reactionProcessVesselSuggestion.vesselable)}
        </Label>
        <div className="optional-form-group__open-controls">
          <div className="d-grid gap-2">
            <Button size={'sm'} color={'step'} onClick={() => assignVesselable(reactionProcessVesselSuggestion.vesselable)} >
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
      <MultiInputFormGroup label={VesselableDecorator.vesselableType(currentVesselable)} typeColor={typeColor}>
        <div className="pt-1 mb-3">
          {renderVesselSuggestion()}
        </div>
        <div className="pt-1 mb-3">
          <VesselableLabelQuickSelectorInput
            onSelectVesselable={assignVesselable}
            typeColor={typeColor}
            scope={scope}
          />
        </div>
        <div className="pt-1 mb-3">
          <VesselableSelector
            currentVesselable={currentVesselable}
            onSelectVesselable={assignVesselable}
            typeColor={typeColor}
            buttonLabel={!!reactionProcessVessel?.vesselable_id ? "Change" : "Set"}
            scope={scope}
          />
        </div>
        <SingleLineFormGroup label="Preparations:" typeColor={typeColor}>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="vesselable_preparations"
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

export default VesselableFormSection;
