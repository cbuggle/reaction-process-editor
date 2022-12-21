import React from 'react';
import { Button } from 'reactstrap';


import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import ReactionProcessStep from '../process_steps/ReactionProcessStep';

const ReactionProcess = ({ reactionProcess, onChange }) => {

  const api = useReactionsFetcher();

  const createProcessStep = () => {
    api.createProcessStep(reactionProcess.id).then(() => {
      onChange()
    })
  }

  const renderProcessSteps = () => {
    return (
      <>
        {
          reactionProcess.reaction_process_steps.map((processStep, idx) => (
            <ReactionProcessStep key={idx} processStep={processStep} onChange={onChange}/>
          ))
        }
      </>
    )
  }

  return (
    <>
      {renderProcessSteps()}
      <Button color="outline-success" size="sm" onClick={createProcessStep}>+ Step</Button>
    </>
  )
};


export default ReactionProcess
