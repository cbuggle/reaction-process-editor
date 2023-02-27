import React, {useState} from 'react';
import {Button} from "reactstrap";
import ActivityCreator from "./ActivityCreator";

const InsertZone = (
  {
    state,
    processStep,
    previousConditions,
    insertNewBeforeIndex
  }) => {
  const [showCreator, setShowCreator] = useState(false)

  const toggleShowCreator = () => {
    setShowCreator(!showCreator)
  }

  const zoneStateClassName = () => {
    let stateAppendix = state
    if (stateAppendix === 'default' && showCreator) {
      stateAppendix = 'creator'
    }
    return 'insert-zone--' + stateAppendix
  }

  const isTarget = () => {
    return state === 'target'
  }

  return (
    <div className={'insert-zone ' + zoneStateClassName()}>
      {isTarget() ?
        <span className='insert-zone__drop-target-label'>Move here!</span>:
        <>
          {showCreator ?
            <ActivityCreator
              processStep={processStep}
              previousConditions={previousConditions}
              insertNewBeforeIndex={insertNewBeforeIndex}
              onClose={toggleShowCreator}
            /> :
            <Button
              className='insert-zone__reveal-creator-button'
              onClick={() => {
                toggleShowCreator()
              }}
            >
              + insert
            </Button>
          }
        </>
      }
    </div>
  );
};

export default InsertZone;
