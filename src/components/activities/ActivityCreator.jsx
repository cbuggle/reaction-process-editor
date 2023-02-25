import React, { useState } from 'react';
import CreateButton from "../utilities/CreateButton";
import ActivityCard from "./ActivityCard";
import IconButton from "../utilities/IconButton";
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const ActivityCreator = ({ processStep, insertNewBeforeIndex, showCloseButton, onClose }) => {

  const api = useReactionsFetcher()
  const [displayState, setDisplayState] = useState('buttons')

  const save = (actionForm) => {
    setDisplayState('buttons')
    api.createAction(processStep.id, actionForm, insertNewBeforeIndex)
    onClose()
  }

  const cancel = () => {
    setDisplayState('buttons')
  }

  const createAction = () => {
    setDisplayState('action')
  }

  const createCondition = () => {
    setDisplayState('condition')
  }

  return (
    <>
      {displayState === 'buttons' ?
        <div className="d-flex justify-content-between">
          <div className="d-grid gap-2 d-md-flex">
            <CreateButton label='New Action' type='action' onClick={createAction} />
            <CreateButton label='New Condition' type='condition' onClick={createCondition} />
          </div>
          {showCloseButton &&
            <IconButton onClick={onClose} icon='times' className='icon-button--positive'/>
          }
        </div> :
        <ActivityCard
          type={displayState}
          onSave={save}
          onCancel={cancel}
          processStep={processStep}
        />
      }
    </>
  );
};

export default ActivityCreator;
