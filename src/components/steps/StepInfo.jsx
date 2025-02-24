import React, { useContext } from "react";

import StepEquipments from "./StepEquipments";
import StepMaterials from "./StepMaterials";
import StepVesselPreparationInfo from "./StepVesselPreparationInfo";

import VesselableDecorator from "../../decorators/VesselableDecorator";

import { StepSelectOptions } from "../../contexts/StepSelectOptions";

const StepInfo = ({ processStep }) => {
  const stepSelectOptions = useContext(StepSelectOptions);
  const vesselable = processStep.reaction_process_vessel?.vesselable

  return (
    <>
      <h6 className="mb-1">
        {VesselableDecorator.vesselableType(vesselable) + ': '}
        {VesselableDecorator.vesselableSingleLine(vesselable)}
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
