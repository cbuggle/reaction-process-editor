import React from 'react';
import { Col } from 'reactstrap';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import CreateButton from '../utilities/CreateButton';
import StepColumCard from "./StepColumnCard";

const StepsContainer = ({ reactionProcess, onChange }) => {

  // const api = useReactionsFetcher();

  // const createProcessStep = () => {
  //   api.createProcessStep(reactionProcess.id).then(() => {
  //     onChange()
  //   })
  // }

  return (
    <>
      {reactionProcess.reaction_process_steps.map((processStep, index) => (
        <Col key={processStep.id} className='flex-shrink-0'>
          <StepColumCard index={index}
            reactionProcess={reactionProcess}
            processStep={processStep}
            totalSteps={reactionProcess.reaction_process_steps.length}
            onChange={onChange} />
        </Col>
      ))}
      <Col className='flex-shrink-0'>
        <StepColumCard reactionProcess={reactionProcess} onChange={onChange} />
      </Col>
    </>
  );
};


export default StepsContainer
