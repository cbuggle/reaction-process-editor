import React, {useState} from 'react';
import CreateButton from "../utilities/CreateButton";
import ActionCard from "../actions/ActionCard";
import {useReactionsFetcher} from "../../fetchers/ReactionsFetcher";

const StepActivityCreator = ({onChange, processStep, insertNewBeforeIndex}) => {

  const api = useReactionsFetcher()
  const [displayState, setDisplayState] = useState('buttons')

  const save = (actionForm) => {
    setDisplayState('buttons')
    api.createAction(processStep.id, actionForm, insertNewBeforeIndex).then(() => {
      onChange()
    })
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

  const renderState = () => {
    switch (displayState) {
      case 'action':
        return (
          <ActionCard onSave={save} onCancel={cancel} processStep={processStep}/>
        )
      case 'condition':
        return (
          <p>Condition</p>
        )
      default:
        return (
          <div className="d-grid gap-2 d-md-flex">
            <CreateButton label='New Action' type='action' onClick={createAction} />
            <CreateButton label='New Condition' type='condition' onClick={createCondition} />
          </div>
        )
    }
  }

  return (
    <>
      {renderState()}
    </>
  );
};

export default StepActivityCreator;
