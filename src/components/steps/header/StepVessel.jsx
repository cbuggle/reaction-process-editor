import React from "react";
import { Button } from "reactstrap";
import VesselModalButton from "../../vessels/VesselModalButton";

import VesselDecorator from "../../../decorators/VesselDecorator";
import { useReactionsFetcher } from "../../../fetchers/ReactionsFetcher";

const StepVessel = ({ processStep }) => {
  const api = useReactionsFetcher();

  const vessel = processStep?.vessel;

  const assignVessel = (vesselId) =>
    api.assignProcessStepVessel(processStep.id, vesselId);

  const unassignVessel = () => api.assignProcessStepVessel(processStep.id);

  return <>{VesselDecorator.renderVesselProcessStepInfo(vessel)}</>;
};

export default StepVessel;
