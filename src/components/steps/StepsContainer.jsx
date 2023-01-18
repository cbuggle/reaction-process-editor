import React, {useState} from 'react';
import { Col } from 'reactstrap';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import CreateButton from '../utilities/CreateButton';
import StepColumCard from "./StepColumnCard";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const StepsContainer = ({ reactionProcess, onChange }) => {

  // const api = useReactionsFetcher();

  // const createProcessStep = () => {
  //   api.createProcessStep(reactionProcess.id).then(() => {
  //     onChange()
  //   })
  // }
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
            onChange={onChange}
            initialDisplayMode='info'
          />
        </Col>
      ))}
      <Col className='flex-shrink-0'>
        {displayNewStep ?
          <StepColumCard
            reactionProcess={reactionProcess}
            onChange={onChange}
            onCancel={toggleNewStep}
            initialDisplayMode='form'
          />
          :
          <CreateButton label='New Step' type='step' onClick={toggleNewStep} />
        }
      </Col>
    </DndProvider>
  );
};


export default StepsContainer
