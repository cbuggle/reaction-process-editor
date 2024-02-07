import React, { useContext } from "react";
import MaterialBox from "./MaterialBox";

import { StepSelectOptions } from "../../contexts/StepSelectOptions";

const StepMaterials = () => {
  const stepSelectOptions = useContext(StepSelectOptions);

  return (
    <div className="procedure-card__info-section procedure-card__info-section--step">
      <h6>Materials</h6>
      {stepSelectOptions.added_materials.map((material) => (
        <MaterialBox key={material.id} material={material} />
      ))}
    </div>
  );
};

export default StepMaterials;
