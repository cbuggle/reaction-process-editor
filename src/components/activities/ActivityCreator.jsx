import React, { useState } from 'react';
import ActivityCard from "./ActivityCard";
import IconButton from "../utilities/IconButton";
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";
import {Button} from "reactstrap";

const ActivityCreator = ({ processStep, preConditions, insertNewBeforeIndex, onClose }) => {

  const api = useReactionsFetcher()
  const [displayState, setDisplayState] = useState('buttons')

  const save = (actionForm) => {
    setDisplayState('buttons')
    api.createAction(processStep.id, actionForm, insertNewBeforeIndex)
    if(typeof onClose === 'function') {
      onClose()
    }
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
        <div className="activity-creator d-flex justify-content-between">
          <div className="d-grid gap-2 d-md-flex">
            <Button color='action' onClick={createAction}>New Action</Button>
            <Button color='condition' onClick={createCondition}>Change Condition</Button>
          </div>
          {onClose &&
            <IconButton
              onClick={onClose}
              icon='times'
              className='icon-button--positive'
            />
          }
        </div> :
        <ActivityCard
          type={displayState}
          onSave={save}
          onCancel={cancel}
          preConditions={preConditions}
          processStep={processStep}
        />
      }
    </>
  );
};

export default ActivityCreator;
