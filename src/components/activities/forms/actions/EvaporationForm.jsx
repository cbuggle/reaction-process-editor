import React from "react";

import VesselableFormSection from "../../../vesselables/VesselableFormSection";

const EvaporationForm = ({ workup, reactionProcessVessel, onChangeVessel }) => {

  return (
    <>
      {workup['vials']?.join(', ')}
      <VesselableFormSection
        onChange={onChangeVessel}
        reactionProcessVessel={reactionProcessVessel || {}}
      />

    </>
  );
};

export default EvaporationForm;
