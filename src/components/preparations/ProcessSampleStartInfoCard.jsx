import React, { useContext, useState } from "react";

import ProcedureCard from "../utilities/ProcedureCard";
import SamplePreparationInfo from "./SamplePreparationInfo";

import VesselableFormSection from "../vesselables/VesselableFormSection";

import SamplesDecorator from "../../decorators/SamplesDecorator";
import SingleLineFormGroup from "../activities/forms/formgroups/SingleLineFormGroup";

import { SelectOptions } from "../../contexts/SelectOptions";

import FormButtons from "../utilities/FormButtons";

import VesselableDecorator from "../../decorators/VesselableDecorator";
import OptionsDecorator from "../../decorators/OptionsDecorator";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const ProcessSampleStartInfoCard = ({ reactionProcess }) => {
  const api = useReactionsFetcher()
  const selectOptions = useContext(SelectOptions);

  const currentSample = reactionProcess.sample || {};

  const [reactionProcessVessel, setReactionProcessVessel] = useState(reactionProcess?.sample_initial_info?.reaction_process_vessel);

  const vesselPreparationOptions = selectOptions.vessel_preparations.preparation_types || {};
  console.log("selectionOptions:");
  console.log(selectOptions);

  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    api.updateSampleInitialInfo(reactionProcess.id,
      { 'reaction_process_vessel': reactionProcessVessel });
    closeForm();
    // onSave(stepName, reactionProcessVessel, automationStatus);
  };



  // const onSave = () => {
  //   // Placeholder for save functionality
  // }

  const handleCancel = () => {
    setReactionProcessVessel(reactionProcess?.sample_initial_info?.reaction_process_vessel);
    closeForm();
  }

  const currentSamplePreparation = reactionProcess.samples_preparations
    .find(preparation => preparation.sample_id === reactionProcess.sample_id) || {
    sample: reactionProcess.sample, preparations: [], equipment: [], details: ""
  }

  console.log("Current Sample Preparation:");
  console.log(reactionProcessVessel);
  console.log(reactionProcess);

  const displayMode = () => {
    return showForm ? "form" : "info";
  };

  // const renderSample = () => {
  //   console.log("Current Sample Preparation:");
  //   console.log(currentSamplePreparation);
  //   console.log(reactionProcess);

  //   return (
  //     < SamplePreparationInfo
  //       preparation={currentSamplePreparation}
  //       preparationOptions={preparationOptions}
  //     />
  //   )
  // };

  const onDelete = () => {
    // api.deleteSamplePreparation(reactionProcessId, preparation.id);
    closeForm();
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    console.log("closeForm")
    setShowForm(false);
    // setInitPreparation(false);
  };

  const toggleForm = () => setShowForm(!showForm);

  const renderSampleFormGroup = () => {
    return (
      <SingleLineFormGroup label={SamplesDecorator.sampleSvgImg(currentSample)}>
        <span className="sample-id">{currentSample.short_label}</span>

        {SamplesDecorator.infoAvailableAmounts(currentSample['amounts']).map((amount, index) => (
          <p key={index + "" + amount} className="mb-0">
            {amount}
          </p>
        ))}
      </SingleLineFormGroup>
    )
  }

  return (
    <ProcedureCard
      title="Initial"
      type="preparation"
      showEditBtn={!showForm}
      showMoveBtn={false}
      showDeleteBtn={false}
      showCancelBtn={showForm}
      onEdit={toggleForm}
      onDelete={onDelete}
      onCancel={closeForm}
      showForm={showForm}
      displayMode={displayMode()}
      customClass="procedure-card--column"
    >
      <ProcedureCard.Info>
        {renderSampleFormGroup()}
        {reactionProcessVessel ?
          <>
            <span className="procedure-card__info-line">
              {VesselableDecorator.vesselableType(reactionProcessVessel)}
            </span>
            <span className="procedure-card__info-line">
              {VesselableDecorator.vesselVolumeAndMaterial(reactionProcessVessel)}
            </span>
            {reactionProcessVessel.preparations?.length > 0 && (
              <span className="procedure-card__info-line">
                Preparations: {" "}
                {OptionsDecorator.valuesToLabel(reactionProcessVessel.preparations, vesselPreparationOptions
                )}
              </span>
            )}
          </> : <>No vessel assigned</>
        }
      </ProcedureCard.Info>
      <ProcedureCard.Form>
        {renderSampleFormGroup()}
        <VesselableFormSection
          onChange={setReactionProcessVessel}
          reactionProcessVessel={reactionProcessVessel}
          typeColor="step"
        />
        <FormButtons
          onSave={handleSave}
          onCancel={handleCancel}
          type="step"
        />

      </ProcedureCard.Form>
    </ProcedureCard>
  );
};

export default ProcessSampleStartInfoCard;
