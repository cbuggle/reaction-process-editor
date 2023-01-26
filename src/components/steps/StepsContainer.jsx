import React, { useState } from 'react';
import { Col } from 'reactstrap';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreateButton from '../utilities/CreateButton';
import StepColumCard from "./StepColumnCard";

const StepsContainer = ({ reactionProcess }) => {

  const [displayNewStep, setDisplayNewStep] = useState(false)

  const toggleNewStep = () => {
    setDisplayNewStep(!displayNewStep)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {reactionProcess.reaction_process_steps.map((processStep, index) => (
        <Col key={processStep.id} className='flex-shrink-0'>
          <StepColumCard index={index}
            reactionProcess={reactionProcess}
            processStep={processStep}
            totalSteps={reactionProcess.reaction_process_steps.length}
          />
        </Col>
      ))}
      <Col className='flex-shrink-0'>
        {displayNewStep ?
          <StepColumCard
            reactionProcess={reactionProcess}
            onCancel={toggleNewStep}
          />
          :
          <CreateButton label='New Step' type='step' onClick={toggleNewStep} />
        }
      </Col>
    </DndProvider>
  );
};


export default StepsContainer
