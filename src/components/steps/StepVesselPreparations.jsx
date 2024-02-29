import React, { useContext } from "react";

import { SelectOptions } from "../../contexts/SelectOptions";
import VesselDecorator from "../../decorators/VesselDecorator";

const StepVesselPreparations = ({ reactionProcessVessel }) => {
  const selectOptions = useContext(SelectOptions);

  return (
    <>
      {VesselDecorator.vesselPreparationsLine(reactionProcessVessel.preparations, selectOptions.vessel_preparations.preparation_types)}
    </>
  );
};

export default StepVesselPreparations;
