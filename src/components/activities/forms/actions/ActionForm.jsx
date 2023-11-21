import React from 'react';

import ActivityForm from "../ActivityForm";
import AddSampleForm from "./AddSampleForm";
import AnalysisForm from "./AnalysisForm";
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
  }) => {

  const actionTypeName = activity.action_name
  const workup = activity.workup

  const customActionForm = () => {
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
      case 'PAUSE':
      case "WAIT":
        return (<></>)
      default:
        return (<div>Error in ActionForm: Unknown ACTION TYPE: {actionTypeName} ***</div>)
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
      {customActionForm()}
    </ActivityForm>
  );
};

export default ActionForm;
