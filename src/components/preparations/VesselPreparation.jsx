import React, { useContext, useState } from "react";

import PreparationCard from "./PreparationCard";
import ProcedureCard from "../utilities/ProcedureCard";
import VesselPreparationForm from "./VesselPreparationForm";
import VesselDecorator from "../../decorators/VesselDecorator";
import OptionsDecorator from "../../decorators/OptionsDecorator";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

import { SelectOptions } from "../../contexts/SelectOptions";

const VesselPreparation = ({ reactionProcessVessel }) => {
  const api = useReactionsFetcher();

  const selectOptions = useContext(SelectOptions);

  const [showForm, setShowForm] = useState(false);
  const preparationOptions =
    selectOptions.vessel_preparations.preparation_types;

  const onSave = (preparationForm) => {
    api.updateReactionProcessVessel(preparationForm);
    closeForm();
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <PreparationCard
      title={VesselDecorator.vesselTitle(reactionProcessVessel?.vessel)}
      onEdit={openForm}
      onCancel={closeForm}
      showForm={showForm}
      allowDelete={false}
    >
      <ProcedureCard.Info>
        <span className="procedure-card__info-line">
          {VesselDecorator.vesselVolumeAndMaterial(reactionProcessVessel.vessel)}
        </span>
        {reactionProcessVessel.preparations.length > 0 && (
          <span className="procedure-card__info-line">
            Preparations:{" "}
            {OptionsDecorator.optionsArrayToLabel(
              reactionProcessVessel.preparations,
              preparationOptions
            )}
          </span>
        )}
        {reactionProcessVessel.step_names.length > 0 && (
          <span className="procedure-card__info-line">
            Steps: {reactionProcessVessel.step_names.join(", ")}
          </span>
        )}
      </ProcedureCard.Info>
      <ProcedureCard.Form>
        <VesselPreparationForm
          reactionProcessVessel={reactionProcessVessel}
          onSave={onSave}
          onCancel={closeForm}
        />
      </ProcedureCard.Form>
    </PreparationCard>
  );
};

export default VesselPreparation;
