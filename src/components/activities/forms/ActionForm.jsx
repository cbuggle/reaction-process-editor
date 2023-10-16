import React from 'react';
import ActivityForm from "./ActivityForm";
import AddSampleForm from "./AddSampleForm";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import SaveSampleForm from "./SaveSampleForm";
import TransferForm from "./TransferForm";
import RemoveForm from "./RemoveForm";
import PurifyForm from "./PurifyForm";
import AnalysisForm from "./AnalysisForm";
import FormSection from "../../utilities/FormSection";

const ActionForm = (
  {
    activity,
    preconditions,
    processStep,
    openSubFormLabel,
    onCancel,
    onSave,
    onWorkupChange,
    onChangeDuration,
    onToggleSubform
  }) => {
  const workup = activity.workup
  const actionTypeName = activity.action_name
  const equipmentOptions = processStep.action_type_equipment_options[actionTypeName]

  const setEquipment = (equipment) => {
    onWorkupChange({ name: 'equipment', value: equipment })
  }

  const customActionForm = () => {
    switch (actionTypeName) {
      case "ADD":
        return (
          <>
            <AddSampleForm
              activity={activity}
              preconditions={preconditions}
              openSubFormLabel={openSubFormLabel}
              materialsOptions={processStep.materials_options}
              additionSpeedTypeOptions={processStep.addition_speed_type_options}
              onWorkupChange={onWorkupChange}
            />
            <FormSection type='action' openSubFormLabel={openSubFormLabel}>
              <ApplyExtraEquipmentForm
                equipment={workup.equipment}
                equipmentOptions={equipmentOptions}
                openSubFormLabel={openSubFormLabel}
                onChangeEquipment={setEquipment}
              />
            </FormSection>
          </>
        )
      case "SAVE":
        return (
          <SaveSampleForm
            activity={activity}
            openSubFormLabel={openSubFormLabel}
            onWorkupChange={onWorkupChange}
          />
        )
      case "TRANSFER":
        return (
          <FormSection type='action' openSubFormLabel={openSubFormLabel}>
            <TransferForm
              activity={activity}
              processStep={processStep}
              openSubFormLabel={openSubFormLabel}
              onWorkupChange={onWorkupChange}
            />
            <ApplyExtraEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              openSubFormLabel={openSubFormLabel}
              onChangeEquipment={setEquipment}
            />
          </FormSection>
        )
      case "REMOVE":
        return (
          <>
            <RemoveForm
              activity={activity}
              removableMaterialsOptions={processStep.removable_materials_options}
              openSubFormLabel={openSubFormLabel}
              onWorkupChange={onWorkupChange}
            />
            <ApplyExtraEquipmentForm
              equipment={workup.equipment}
              equipmentOptions={equipmentOptions}
              openSubFormLabel={openSubFormLabel}
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
              openSubFormLabel={openSubFormLabel}
              onWorkupChange={onWorkupChange}
            />
            <FormSection type='action' openSubFormLabel={openSubFormLabel}>
              <ApplyExtraEquipmentForm
                equipment={workup.equipment}
                equipmentOptions={equipmentOptions}
                openSubFormLabel={openSubFormLabel}
                onChangeEquipment={setEquipment}
              />
            </FormSection>
          </>
        )
      case "ANALYSIS":
        return (
          <>
            <AnalysisForm
              activity={activity}
              openSubFormLabel={openSubFormLabel}
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
      openSubFormLabel={openSubFormLabel}
      onCancel={onCancel}
      onSave={onSave}
      onWorkupChange={onWorkupChange}
      onChangeDuration={onChangeDuration}
      onToggleSubform={onToggleSubform}
    >
      {customActionForm()}
    </ActivityForm>
  );
};

export default ActionForm;
