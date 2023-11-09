import React, { useState } from 'react';
import { Button } from "reactstrap";

import ActivityCard from "./ActivityCard";
import IconButton from "../utilities/IconButton";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";
import { SubFormController, SubFormToggle } from '../../contexts/SubFormController';

const ActivityCreator = ({ processStep, preconditions, insertNewBeforeIndex, onClose }) => {

  const api = useReactionsFetcher()
  const [displayState, setDisplayState] = useState('buttons')

  const save = (actionForm) => {
    setDisplayState('buttons')
    api.createAction(processStep.id, actionForm, insertNewBeforeIndex)
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  const cancel = () => setDisplayState('buttons')

  const createAction = () => setDisplayState('action')

  const createCondition = () => setDisplayState('condition')

  return (
    <SubFormController.Provider value={SubFormToggle()}>
      {/* The Context Provider must wrap everything. Having it only in the conditional where it belongs yields a */}
      {/* "Rendered more hooks than during the previous render Error" */}
      {displayState === 'buttons' ?
        <div className="activity-creator d-flex justify-content-between align-items-center">
          <div className="d-grid gap-2 d-md-flex">
            <Button color='action' onClick={createAction}>New Action</Button>
            <Button color='condition' onClick={createCondition}>Change Condition</Button>
          </div>
          {onClose &&
            <IconButton
              onClick={onClose}
              icon='times'
              positive={true}
            />
          }
        </div> :
        <ActivityCard
          type={displayState}
          onSave={save}
          onCancel={cancel}
          preconditions={preconditions}
          processStep={processStep}
        />
      }
    </SubFormController.Provider>
  );
};

export default ActivityCreator;
