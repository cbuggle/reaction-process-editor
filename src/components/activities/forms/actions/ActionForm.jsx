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

  const customActionForm = () => {
    switch (actionTypeName) {
      case "ADD":
        return (
          <AddSampleForm
            activity={activity}
            preconditions={preconditions}
            onWorkupChange={onWorkupChange}
          />
        )
      case "SAVE":
        return (
          <SaveSampleForm
            activity={activity}
            onWorkupChange={onWorkupChange}
          />
        )
      case "TRANSFER":
        return (
          <TransferForm
            activity={activity}
            onWorkupChange={onWorkupChange}
          />
        )
      case "REMOVE":
        return (
          <RemoveForm
            activity={activity}
            preconditions={preconditions}
            onWorkupChange={onWorkupChange}
          />
        )
      case "PURIFY":
        return (
          <>
            <PurifyBaseForm
              activity={activity}
              preconditions={preconditions}
              onWorkupChange={onWorkupChange}
            />
          </>
        )
      case "ANALYSIS":
        return (
          <>
            <AnalysisForm
              activity={activity}
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
