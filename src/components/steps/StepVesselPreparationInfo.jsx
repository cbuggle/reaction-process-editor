import React, { useContext } from "react";

import { SelectOptions } from "../../contexts/SelectOptions";
import VesselableDecorator from "../../decorators/VesselableDecorator";

const StepVesselPreparationInfo = ({ reactionProcessVessel }) => {
  const selectOptions = useContext(SelectOptions);

  return (
    <>
      {VesselableDecorator.vesselablePreparationsLine(reactionProcessVessel?.preparations, selectOptions.vessel_preparations.preparation_types)}
    </>
  );
};

export default StepVesselPreparationInfo;
