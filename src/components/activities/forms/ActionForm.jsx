import React, { useContext } from 'react';

import ActivityForm from "./ActivityForm";
import AddSampleForm from "./AddSampleForm";
import AnalysisForm from "./AnalysisForm";
import ApplyExtraEquipmentForm from "./ApplyExtraEquipmentForm";
import FormSection from "../../utilities/FormSection";
import PurifyForm from "./PurifyForm";
import RemoveForm from "./RemoveForm";
import SaveSampleForm from "./SaveSampleForm";
import TransferForm from "./TransferForm";

import { SelectOptions } from '../../views/Reaction';

const ActionForm = (
  {
    activity,
    preconditions,
    openSubFormLabel,
    onCancel,
    onSave,
    onWorkupChange,
    onChangeDuration,
    onToggleSubform
  }) => {

  const actionTypeName = activity.action_name
  const workup = activity.workup
  const selectOptions = useContext(SelectOptions)
  const equipmentOptions = selectOptions.action_type_equipment[actionTypeName]

  const setEquipment = (equipment) => {
    onWorkupChange({ name: 'EQUIPMENT', value: equipment })
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
              materialsOptions={selectOptions.materials}
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
