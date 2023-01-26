import React, { useState } from 'react';
import CreateButton from "../utilities/CreateButton";
import ActivityCard from "./ActivityCard";
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const ActivityCreator = ({ processStep, insertNewBeforeIndex }) => {

  const api = useReactionsFetcher()
  const [displayState, setDisplayState] = useState('buttons')

  const save = (actionForm) => {
    setDisplayState('buttons')
    api.createAction(processStep.id, actionForm, insertNewBeforeIndex)
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
        <div className="d-grid gap-2 d-md-flex">
          <CreateButton label='New Action' type='action' onClick={createAction} />
          <CreateButton label='New Condition' type='condition' onClick={createCondition} />
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
