import React from 'react';
import ActivityForm from "./ActivityForm";
import AddSampleForm from "./AddSampleForm";
import ApplyEquipmentForm from "./ApplyEquipmentForm";
import SaveSampleForm from "./SaveSampleForm";
import EquipmentForm from "./EquipmentForm";
import TransferForm from "./TransferForm";
import RemoveForm from "./RemoveForm";
import PurifyForm from "./PurifyForm";
import AnalysisForm from "./AnalysisForm";

const ActionForm = (props) => {
  const customActionForm = () => {
    switch (props.activity.action_name) {
      case "ADD":
        return (
          <>
            <AddSampleForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "SAVE":
        return (
          <SaveSampleForm {...props} />
        )
      case "EQUIP":
        return (
          <EquipmentForm {...props} />
        )
      case "TRANSFER":
        return (
          <>
            <TransferForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "REMOVE":
        return (
          <>
            <RemoveForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "PURIFY":
        return (
          <>
            <PurifyForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "ANALYSIS":
        return (
          <>
            <AnalysisForm {...props} />
          </>
        )
      case 'PAUSE':
      case "WAIT":
        return (<></>)
      default:
        return (<div>Error in Sample Form: Unknown ACTION TYPE: {props.activity.activity_name} ***</div>)
    }
  }

  return (
    <ActivityForm
      type='action'
      activity={props.activity}
      onCancel={props.onCancel}
      onSave={props.onSave}
    >
      {customActionForm()}
    </ActivityForm>
  );
};

export default ActionForm;
