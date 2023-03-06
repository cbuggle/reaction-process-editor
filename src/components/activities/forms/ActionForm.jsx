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
  const activity = props.activity
  const workup = activity.workup
  const processStep = props.processStep
  const onWorkupChange = props.onWorkupChange
  const actionName = activity.action_name
  const equipmentOptions = processStep.action_equipment_options[actionName]
  const setEquipment = (equipment) => {
    onWorkupChange({ name: 'equipment', value: equipment })
  }

  const customActionForm = () => {
    switch (actionName) {
      case "ADD":
        return (
          <>
            <AddSampleForm {...props} />
            <ApplyEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
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
            <ApplyEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
          </>
        )
      case "REMOVE":
        return (
          <>
            <RemoveForm {...props} />
            <ApplyEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
          </>
        )
      case "PURIFY":
        return (
          <>
            <PurifyForm {...props} />
            <ApplyEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
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
        return (<div>Error in Sample Form: Unknown ACTION TYPE: {actionName} ***</div>)
    }
  }

  return (
    <ActivityForm
      type='action'
      activity={activity}
      onCancel={props.onCancel}
      onSave={props.onSave}
    >
      {customActionForm()}
    </ActivityForm>
  );
};

export default ActionForm;
