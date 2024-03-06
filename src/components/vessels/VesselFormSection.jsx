import React, { useContext } from "react";
import Select from "react-select";
import MultiInputFormGroup from "../utilities/MultiInputFormGroup";
import SingleLineFormGroup from "../utilities/SingleLineFormGroup";
import VesselSelector from "../vessels/VesselSelector";
import VesselDecorator from "../../decorators/VesselDecorator";

import { SelectOptions } from "../../contexts/SelectOptions";
import { VesselOptions } from "../../contexts/VesselOptions";
import OptionsDecorator from "../../decorators/OptionsDecorator";

const VesselFormSection = ({
  onChange,
  reactionProcessVessel,
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

  return (
    <MultiInputFormGroup label="Vessel" typeColor={typeColor}>
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
          value={OptionsDecorator.optionsForKeys(reactionProcessVessel.preparations, preparationOptions)}
          onChange={(selected) =>
            handleSelectPreparations(selected.map((option) => option.value))
          }
        />
      </SingleLineFormGroup>
    </MultiInputFormGroup>
  );
};

export default VesselFormSection;
