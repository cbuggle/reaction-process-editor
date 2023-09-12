import React from 'react';
import ActivityForm from "./ActivityForm";
import AddSampleForm from "./AddSampleForm";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import SaveSampleForm from "./SaveSampleForm";
import TransferForm from "./TransferForm";
import RemoveForm from "./RemoveForm";
import PurifyForm from "./PurifyForm";
import AnalysisForm from "./AnalysisForm";

const ActionForm = (
  {
    activity,
    processStep,
    subFormOpenState,
    onCancel,
    onSave,
    onWorkupChange,
    setDuration,
    onChangeSubFormOpenState
  }) => {
  const workup = activity.workup
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
            <AddSampleForm
              activity={activity}
              processStep={processStep}
              onWorkupChange={onWorkupChange}
            />
            <ApplyExtraEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
          </>
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
          <>
            <TransferForm
              activity={activity}
              processStep={processStep}
              onWorkupChange={onWorkupChange}
            />
            <ApplyExtraEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
          </>
        )
      case "REMOVE":
        return (
          <>
            <RemoveForm
              activity={activity}
              processStep={processStep}
              onWorkupChange={onWorkupChange}
            />
            <ApplyExtraEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
            />
          </>
        )
      case "PURIFY":
        return (
          <>
            <PurifyForm
              activity={activity}
              processStep={processStep}
              onWorkupChange={onWorkupChange}
            />
            <ApplyExtraEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              onChangeEquipment={setEquipment}
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
        return (<div>Error in Sample Form: Unknown ACTION TYPE: {actionName} ***</div>)
    }
  }

  return (
    <ActivityForm
      type='action'
      activity={activity}
      subFormOpenState={subFormOpenState}
      onCancel={onCancel}
      onSave={onSave}
      onWorkupChange={onWorkupChange}
      onChangeSubFormOpenState={onChangeSubFormOpenState}
    >
      {customActionForm()}
    </ActivityForm>
  );
};

export default ActionForm;
