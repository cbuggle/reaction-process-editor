import React from 'react';

import ActivityForm from "../ActivityForm";
import AddSampleForm from "./AddSampleForm";
import AnalysisForm from "./AnalysisForm";
import PurificationForm from "./PurificationForm";
import RemoveForm from "./RemoveForm";
import SaveSampleForm from "./SaveSampleForm";
import TransferForm from "./TransferForm";
import EvaporationForm from './EvaporationForm';
import DiscardForm from './DiscardForm';
import VialFormGroup from '../formgroups/VialFormGroup';

const ActionForm = (
  {
    activity,
    preconditions,
    onCancel,
    onSave,
    onWorkupChange,
    onChangeDuration,
    onChangeVessel
  }) => {

  const actionTypeName = activity.activity_name
  const workup = activity.workup

  const customActivityForm = () => {
    switch (actionTypeName) {
      case "ADD":
        return (
          <AddSampleForm
            workup={workup}
            preconditions={preconditions}
            onWorkupChange={onWorkupChange}
          />
        )
      case "SAVE":
        return (
          <SaveSampleForm
            workup={workup}
            onWorkupChange={onWorkupChange}
            reactionProcessVessel={activity.reaction_process_vessel}
            onChangeVessel={onChangeVessel}
          />
        )
      case "TRANSFER":
        return (
          <TransferForm
            workup={workup}
            onWorkupChange={onWorkupChange}
            isPersisted={!!activity.id}
          />
        )
      case "REMOVE":
        return (
          <RemoveForm
            workup={workup}
            preconditions={preconditions}
            onWorkupChange={onWorkupChange}
          />
        )
      case "PURIFICATION":
        return (
          <>
            <PurificationForm
              workup={workup}
              onWorkupChange={onWorkupChange}
              preconditions={preconditions}
              reactionProcessVessel={activity.reaction_process_vessel}
              onChangeVessel={onChangeVessel}
            />
          </>
        )
      case "ANALYSIS":
        return (
          <>
            <AnalysisForm
              workup={workup}
              onWorkupChange={onWorkupChange}
            />
          </>
        )
      case "DISCARD":
        return (
          <DiscardForm
            workup={workup}
            onChangeVessel={onChangeVessel}
            reactionProcessVessel={activity.reaction_process_vessel}
          />
        )
      case "EVAPORATION":
        return (
          <EvaporationForm
            workup={workup}
            onChangeVessel={onChangeVessel}
            reactionProcessVessel={activity.reaction_process_vessel}
          />
        )
      case "WAIT":
        return (<></>)
      default:
        return (<div>Error in ActivityForm: Unknown action type '{actionTypeName}'</div>)
    }
  }

  return (
    <ActivityForm
      type='action'
      activity={activity}
      onCancel={onCancel}
      onSave={onSave}
      onWorkupChange={onWorkupChange}
      onChangeDuration={onChangeDuration}>
      <VialFormGroup vials={workup.vials} />
      {customActivityForm()}
    </ActivityForm>
  );
};

export default ActionForm;
