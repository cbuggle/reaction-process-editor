import React, {useState} from 'react';
import Dummy from "../utilities/Dummy";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActionInfo from "../actions/ActionInfo";
import ActionForm from "../actions/ActionForm";
import {useReactionsFetcher} from "../../fetchers/ReactionsFetcher";

const ActivityCard = (
  {
    type,
    activity,
    onSave,
    onChange,
    onCancel,
    processStep,
    dragRef
  }) => {

  const api = useReactionsFetcher()
  const isInitialised = !!activity
  const [activityForm, setActivityForm] = useState(activity)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : 'type-panel')
  const editable = displayMode !== 'info'

  const cardTitle = () => {
    if (isInitialised) {
      return activity.label
    } else {
      let label = 'New Activity'
      if (activityForm) {
        label += ' ' + activityForm.action_name + ' ' + (activityForm.workup['acts_as'] || '')
      }
      return label
    }
  }

  const edit = () => {
    setDisplayMode(isInitialised ? 'form' : 'type-panel')
  }

  const onDelete = () => {
    api.deleteAction(activity.id).then(() => {
      onChange()
    })
  }

  const cancel = () => {
    if (isInitialised) {
      setActivityForm(activity)
      setDisplayMode('info')
    } else {
      onCancel()
    }
  }

  const onSelectType = (activity) => () => {
    setActivityForm(activity)
    setDisplayMode('form')
  }

  const onSaveForm = () => {
    onSave(activityForm)
    if (isInitialised) {
      setDisplayMode('info')
    } else {
      setActivityForm({ workup: {} })
    }
  }

  const onWorkupChange = (field) => {
    const { name, value } = field;
    setActivityForm(prevState => ({
      ...prevState, workup: { ...prevState.workup, [name]: value }
    }));
  }


  const setDuration = (value) => {
    setActivityForm({ name: "duration", value: value })
    onWorkupChange({ name: "duration", value: value })
  }

  return (
    <Dummy
      title={cardTitle()}
      type={type}
      onEdit={edit}
      onDelete={onDelete}
      onCancel={cancel}
      showEditBtn={!editable}
      showMoveXBtn={false}
      showMoveYBtn={!editable}
      showDeleteBtn={!editable}
      showCancelBtn={editable}
      dragRef={dragRef}
      displayMode={displayMode}
    >
      <Dummy.Info>
        <ActionInfo action={activity} />
      </Dummy.Info>
      <Dummy.TypePanel>
        <TypeSelectionPanel onSelect={onSelectType} selectionType={type} />
      </Dummy.TypePanel>
      <Dummy.Form>
        {activityForm &&
          <ActionForm
            action={activityForm}
            onCancel={onCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
            setDuration={setDuration}
            processStep={processStep}
          />
        }
      </Dummy.Form>
    </Dummy>
  );
};

export default ActivityCard;
