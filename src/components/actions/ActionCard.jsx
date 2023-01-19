import React, {useState} from 'react';
import Dummy from "../utilities/Dummy";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActionInfo from "./ActionInfo";
import ActionForm from "./ActionForm";
import {actionTypeClusters} from "../../constants/actionTypeClusters";
import {useReactionsFetcher} from "../../fetchers/ReactionsFetcher";

const ActionCard = ({action, onSave, onChange, dragRef, processStep}) => {
  const api = useReactionsFetcher()
  const [actionForm, setActionForm] = useState(action)
  const [showForm, setShowForm] = useState(false)

  const title = () => {
    return action.label
  }

  const displayMode = () => {
    return showForm ? 'form' : 'info'
  }

  const openForm = () => {
    setShowForm(true)
  }

  const onDelete = () => {
    api.deleteAction(action.id).then(() => {
      onChange()
    })
  }

  const onCancel = () => {
    setActionForm(action)
    setShowForm(false)
  }

  const onSelectType = (action) => () => {
    setActionForm(action)
  }

  const onSaveForm = () => {
    setShowForm(false)
    onSave(actionForm)
    if (!actionForm.id) {
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
      title={title()}
      type='action'
      onEdit={openForm}
      onDelete={onDelete}
      onCancel={onCancel}
      showEditBtn={!showForm}
      showMoveXBtn={false}
      showMoveYBtn={!showForm}
      showDeleteBtn={!showForm}
      showCancelBtn={showForm}
      dragRef={dragRef}
      displayMode={displayMode()}
    >
      <Dummy.Info>
        <ActionInfo action={action} />
      </Dummy.Info>
      <Dummy.TypePanel>
        <TypeSelectionPanel clusters={actionTypeClusters} onSelect={onSelectType} selectionType={'action'} />
      </Dummy.TypePanel>
      <Dummy.Form>
        <ActionForm action={actionForm} onCancel={onCancel} onSave={onSaveForm} onWorkupChange={onWorkupChange} setDuration={setDuration} processStep={processStep} />
      </Dummy.Form>
    </Dummy>
  );
};

export default ActionCard;
