import React, { useContext } from "react";

import StepEquipments from "./StepEquipments";
import StepMaterials from "./StepMaterials";
import VesselDecorator from "../../decorators/VesselDecorator";
import StepVesselPreparations from "./StepVesselPreparations";
import { StepSelectOptions } from "../../contexts/StepSelectOptions";

const StepInfo = ({ processStep }) => {
  const stepSelectOptions = useContext(StepSelectOptions);
  return (
    <>
      <h6 className="mb-1">
        {VesselDecorator.vesselSingleLine(processStep.vessel)}
      </h6>
      <StepVesselPreparations reactionProcessVessel={processStep.reaction_process_vessel} />
      {stepSelectOptions.added_materials?.length > 0 && <StepMaterials />}
      {stepSelectOptions.mounted_equipment?.length > 0 && <StepEquipments />}
    </>
  );
};

export default StepInfo;
