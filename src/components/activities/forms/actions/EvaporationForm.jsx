import React from "react";

import VesselableFormSection from "../../../vesselables/VesselableFormSection";

const EvaporationForm = ({ reactionProcessVessel, onChangeVessel }) => {

  return (
    <VesselableFormSection
      onChange={onChangeVessel}
      reactionProcessVessel={reactionProcessVessel || {}}
    />
  );
};

export default EvaporationForm;
