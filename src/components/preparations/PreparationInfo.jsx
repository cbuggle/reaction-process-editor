import React from "react";
import { UncontrolledTooltip } from "reactstrap";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const PreparationInfo = ({ preparation, preparationOptions }) => {
  const api = useReactionsFetcher();

  const renderPreparationsInfo = () => {
    return preparation.preparations
      .map((preparationType) => {
        return preparationOptions.preparation_types.find(
          (option) => option.value === preparationType
        ).label;
      })
      .join(", ");
  };

  const renderEquipmentsInfo = () => {
    return preparation.equipment
      .map((equipment) => {
        return preparationOptions.equipment.find(
          (option) => option.value === equipment
        ).label;
      })
      .join(", ");
  };

  return (
    <div className="d-flex">
      <img
        src={api.sampleSvgImage(preparation.sample)}
        alt={preparation.sample.short_label}
        className="sample-molecule-image bg-white border rounded-3"
      />
      <p>
        <span className="procedure-card__info-line">
          {renderPreparationsInfo()}
        </span>
        <span className="procedure-card__info-line">
          {renderEquipmentsInfo()}
        </span>
        <span className="procedure-card__info-line">{preparation.details}</span>
      </p>
    </div>
  );
};

export default PreparationInfo;
