import React from 'react';

import ActivityForm from "../ActivityForm";
import AddSampleForm from "./AddSampleForm";
import AnalysisForm from "./AnalysisForm";
import MeasurementBaseForm from './MeasurementBaseForm';
import PurifyBaseForm from "./PurifyBaseForm";
import RemoveForm from "./RemoveForm";
import SaveSampleForm from "./SaveSampleForm";
import TransferForm from "./TransferForm";

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
      case "PURIFY":
        return (
          <>
            <PurifyBaseForm
              workup={workup}
              onWorkupChange={onWorkupChange}
              preconditions={preconditions}
              reactionProcessVessel={activity.reaction_process_vessel}
              onChangeVessel={onChangeVessel}
            />
          </>
        )
      case "MEASUREMENT":
        return (
          <>
            <MeasurementBaseForm
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
      {customActivityForm()}
    </ActivityForm>
  );
};

export default ActionForm;
