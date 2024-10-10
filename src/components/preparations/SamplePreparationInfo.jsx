import React from "react";

import OptionsDecorator from "../../decorators/OptionsDecorator";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const PreparationInfo = ({ preparation, preparationOptions }) => {
  const api = useReactionsFetcher();

  return (
    <div className="d-flex">
      <img
        src={api.sampleSvgImage(preparation.sample)}
        alt={preparation.sample.short_label}
        className="sample-molecule-image bg-white border rounded-3"
      />
      <p>
        <span className="procedure-card__info-line">
          {OptionsDecorator.valuesToLabel(
            preparation.preparations,
            preparationOptions.preparation_types
          )}
        </span>
        <span className="procedure-card__info-line">
          {OptionsDecorator.valuesToLabel(
            preparation.equipment,
            preparationOptions.equipment
          )}
        </span>
        <span className="procedure-card__info-line">{preparation.details}</span>
      </p>
    </div>
  );
};

export default PreparationInfo;
