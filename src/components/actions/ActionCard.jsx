import React, {useState} from 'react';
import Dummy from "../utilities/Dummy";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActionInfo from "./ActionInfo";
import ActionForm from "./ActionForm";
import {actionTypeClusters} from "../../constants/actionTypeClusters";
import {useReactionsFetcher} from "../../fetchers/ReactionsFetcher";

const ActionCard = (
  {
    action,
    onSave,
    onChange,
    onCancel,
    processStep,
    dragRef
  }) => {

  const api = useReactionsFetcher()
  const isInitialised = !!action
  const [actionForm, setActionForm] = useState(action)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : 'type-panel')
  const cardTitle = isInitialised ? action.label : 'New Action'
  const editable = displayMode !== 'info'

  const edit = () => {
    setDisplayMode(isInitialised ? 'form' : 'type-panel')
  }

  const onDelete = () => {
    api.deleteAction(action.id).then(() => {
      onChange()
    })
  }

  const cancel = () => {
    if (isInitialised) {
      setActionForm(action)
      setDisplayMode('info')
    } else {
      onCancel()
    }
  }

  const onSelectType = (action) => () => {
    setActionForm(action)
  }

  const onSaveForm = () => {
    onSave(actionForm)
    if (isInitialised) {
      setDisplayMode('info')
    } else {
      setActionForm({ workup: {} })
    }
  }

  const onWorkupChange = (field) => {
    const { name, value } = field;
    setActionForm(prevState => ({
      ...prevState, workup: { ...prevState.workup, [name]: value }
    }));
  }


  const setDuration = (value) => {
    setActionForm({ name: "duration", value: value })
    onWorkupChange({ name: "duration", value: value })
  }

  return (
    <Dummy
      title={cardTitle}
      type='action'
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
        <ActionInfo action={action} />
      </Dummy.Info>
      <Dummy.TypePanel>
        <TypeSelectionPanel clusters={actionTypeClusters} onSelect={onSelectType} selectionType={'action'} />
      </Dummy.TypePanel>
      <Dummy.Form>
        {actionForm &&
          <ActionForm
            action={actionForm}
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

export default ActionCard;
