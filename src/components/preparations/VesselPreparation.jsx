import React, { useContext, useState } from "react";

import PreparationCard from "./PreparationCard";
import ProcedureCard from "../utilities/ProcedureCard";
import VesselPreparationForm from "./VesselPreparationForm";
import VesselDecorator from "../../decorators/VesselDecorator";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

import { SelectOptions } from "../../contexts/SelectOptions";

const VesselPreparation = ({ vesselObject }) => {
  const api = useReactionsFetcher();

  const selectOptions = useContext(SelectOptions);

  const [showForm, setShowForm] = useState(false);
  const preparationOptions =
    selectOptions.vessel_preparations.preparation_types;

  const cardTitle = VesselDecorator.vesselTitle(vesselObject.vessel);

  const renderPreparationsInfo = (preparations) => {
    return preparations
      .map((preparationType) => {
        return preparationOptions.find(
          (option) => option.value === preparationType
        ).label;
      })
      .join(", ");
  };

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
      title={cardTitle}
      onEdit={openForm}
      onCancel={closeForm}
      showForm={showForm}
    >
      <ProcedureCard.Info>
        <span className="procedure-card__info-line">
          {VesselDecorator.vesselVolumeAndMaterial(vesselObject.vessel)}
        </span>
        {vesselObject.preparations.length > 0 && (
          <span className="procedure-card__info-line">
            Preparations: {renderPreparationsInfo(vesselObject.preparations)}
          </span>
        )}
        {vesselObject.step_names.length > 0 && (
          <span className="procedure-card__info-line">
            Steps: {vesselObject.step_names.join(", ")}
          </span>
        )}
      </ProcedureCard.Info>
      <ProcedureCard.Form>
        <VesselPreparationForm
          formData={vesselObject}
          onSave={onSave}
          onCancel={closeForm}
        />
      </ProcedureCard.Form>
    </PreparationCard>
  );
};

export default VesselPreparation;
