import React, { useContext } from "react";
import Select from "react-select";
import MultiInputFormGroup from "../utilities/MultiInputFormGroup";
import SingleLineFormGroup from "../utilities/SingleLineFormGroup";
import VesselSelector from "../vessels/VesselSelector";

import { SelectOptions } from "../../contexts/SelectOptions";
import OptionsDecorator from "../../decorators/OptionsDecorator";

const VesselFormSection = ({
  currentVessel,
  onSelectVessel,
  reactionProcessVessel,
  onSelectPreparations,
  typeColor,
  scope,
}) => {
  const selectOptions = useContext(SelectOptions);
  const preparationOptions =
    selectOptions.vessel_preparations.preparation_types;

  return (
    <MultiInputFormGroup label="Vessel" typeColor={typeColor}>
      <div className="pt-1 mb-3">
        <VesselSelector
          currentVessel={currentVessel}
          onSelectVessel={onSelectVessel}
          typeColor={typeColor}
          buttonLabel={!!currentVessel ? "Change" : "Set"}
          scope={scope}
        />
      </div>
      <SingleLineFormGroup label="Preparations:" typeColor={typeColor}>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          isDisabled={false}
          isMulti
          isClearable={false}
          options={preparationOptions}
          value={OptionsDecorator.optionsForKeys(reactionProcessVessel.preparations, preparationOptions)}
          onChange={(selected) =>
            onSelectPreparations(selected.map((option) => option.value))
          }
        />
      </SingleLineFormGroup>
    </MultiInputFormGroup>
  );
};

export default VesselFormSection;
