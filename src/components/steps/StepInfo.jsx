import React, { useContext } from "react";

import StepEquipments from "./StepEquipments";
import StepMaterials from "./StepMaterials";
import VesselDecorator from "../../decorators/VesselDecorator";
import StepVesselPreparationInfo from "./StepVesselPreparationInfo";
import { StepSelectOptions } from "../../contexts/StepSelectOptions";

const StepInfo = ({ processStep }) => {
  const stepSelectOptions = useContext(StepSelectOptions);
  const vessel = processStep.reaction_process_vessel?.vessel

  return (
    <>
      <h6 className="mb-1">
        Vessel: {VesselDecorator.vesselSingleLine(vessel)}
      </h6>
      <StepVesselPreparationInfo
        reactionProcessVessel={processStep.reaction_process_vessel}
      />
      {stepSelectOptions.added_materials?.length > 0 && <StepMaterials />}
      {stepSelectOptions.mounted_equipment?.length > 0 && <StepEquipments />}
    </>
  );
};

export default StepInfo;
