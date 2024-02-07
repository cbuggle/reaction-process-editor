import React, { useContext } from "react";

import { StepSelectOptions } from "../../contexts/StepSelectOptions";

const StepEquipments = () => {
  const stepSelectOptions = useContext(StepSelectOptions);
  return (
    <div className="procedure-card__info-section procedure-card__info-section--step">
      <h6>Equipment</h6>
      <p className="py-1">
        {stepSelectOptions.mounted_equipment
          .map((equipment) => equipment.label)
          .join(", ")}
      </p>
    </div>
  );
};

export default StepEquipments;
