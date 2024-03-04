import React, { useState } from "react";

import { useDrag, useDrop } from "react-dnd";
import { DndItemTypes } from "../../constants/dndItemTypes";

import Activity from "../activities/Activity";
import ActivityCreator from "../activities/ActivityCreator";
import ProcedureCard from "../utilities/ProcedureCard";
import StepInfo from "./StepInfo";
import StepForm from "./StepForm";
import StepLockButton from "./StepLockButton";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

import { StepSelectOptions } from "../../contexts/StepSelectOptions";
import { StepLock } from "../../contexts/StepLock";

const StepColumCard = ({ processStep, reactionProcess, onCancel }) => {
  const isInitialised = !!processStep;
  const [showForm, setShowForm] = useState(!isInitialised);
  const cardTitle = isInitialised ? processStep.label : "New Step";
  const api = useReactionsFetcher();
  const isLocked = !!processStep?.locked;

  const displayMode = () => {
    return showForm ? "form" : "info";
  };

  const confirmDeleteStep = () => {
    window.confirm(
      "Deleting the ProcessStep will irreversably delete this " +
        "step and all associated actions. This can not be undone. Are you sure?"
    ) && deleteStep();
  };

  const deleteStep = () => api.deleteProcessStep(processStep.id);

  const handleCancel = () => {
    if (isInitialised) {
      toggleForm();
    } else {
      onCancel();
    }
  };

  const onSave = (stepName, vesselId, reactionProcessVessel) => {
    if (isInitialised) {
      if (stepName !== processStep.name || vesselId !== processStep.vessel?.id || reactionProcessVessel !== processStep.reaction_process_vessel) {
        api.updateProcessStep({
          ...processStep,
          name: stepName,
          vessel_id: vesselId,
          reaction_process_vessel: reactionProcessVessel
        });
      }

      setShowForm(false);
    } else {
      api.createProcessStep(reactionProcess.id, {
        ...processStep,
        name: stepName,
        vessel_id: vesselId,
      });
      setShowForm(false);
      onCancel();
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: DndItemTypes.STEP,
      item: { processStep: processStep },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: monitor.canDrag(),
      }),
      canDrag: () => processStep && !isLocked,
    }),
    [processStep]
  );

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: DndItemTypes.STEP,
      drop: (monitor) => dropItem(monitor, processStep),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      canDrop: () => processStep && !isLocked,
    }),
    [processStep]
  );

  const dropItem = (monitor, processStep) => {
    api.updateProcessStepPosition(monitor.processStep.id, processStep.position);
  };

  const renderActivities = () => {
    return processStep.actions.map((activity) => (
      <Activity
        key={activity.id}
        activity={activity}
        processStep={processStep}
      />
    ));
  };

  return (
    <StepSelectOptions.Provider value={processStep?.select_options}>
      <div ref={dropRef} style={{ opacity: isOver ? 0.5 : 1 }}>
        <div
          ref={previewRef}
          className={
            "draggable-element" +
            (isDragging ? " draggable-element--dragging" : "")
          }
        >
          <StepLock.Provider value={isLocked}>
            <ProcedureCard
              title={cardTitle}
              type="step"
              showEditBtn={!showForm && !isLocked}
              showMoveXBtn={!showForm && !isLocked}
              showDeleteBtn={!showForm && !isLocked}
              showCancelBtn={showForm && !isLocked}
              showMoveYBtn={false}
              onDelete={confirmDeleteStep}
              onEdit={toggleForm}
              onCancel={handleCancel}
              displayMode={displayMode()}
              dragRef={dragRef}
              customClass='procedure-card--column'
            >
              <ProcedureCard.Info>
                <StepInfo processStep={processStep} />
              </ProcedureCard.Info>
              <ProcedureCard.Form>
                <StepForm
                  processStep={processStep}
                  reactionProcess={reactionProcess}
                  nameSuggestionOptions={
                    reactionProcess.select_options.step_name_suggestions
                  }
                  onSave={onSave}
                  onCancel={handleCancel}
                />
              </ProcedureCard.Form>
              {isInitialised && (
                <ProcedureCard.Details>
                  <div className="step-column-card__condition-container">
                    {renderActivities()}
                    {!isLocked && (
                      <ActivityCreator
                        processStep={processStep}
                        preconditions={processStep.final_conditions}
                        insertNewBeforeIndex={processStep.actions.length}
                      />
                    )}
                  </div>
                </ProcedureCard.Details>
              )}
              {isInitialised && (
                <ProcedureCard.ExtraButtons>
                  <StepLockButton stepId={processStep?.id} locked={isLocked} />
                </ProcedureCard.ExtraButtons>
              )}
            </ProcedureCard>
          </StepLock.Provider>
        </div>
      </div>
    </StepSelectOptions.Provider>
  );
};

export default StepColumCard;
