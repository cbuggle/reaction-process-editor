import React from 'react';
import { Col, Row } from 'reactstrap';

import ReactionNavbar from '../reactions/ReactionNavbar';
import VesselsSelectBar from '../vessels/VesselsSelectBar';
import SamplesSideBar from '../samples/SamplesSideBar';
import PreparationColumnCard from "../preparations/PreparationColumnCard";
import StepsContainer from "../steps/StepsContainer";
import SamplePreparationsBar from "../reaction_processes/SamplePreparationsBar";

const ReactionProcess = ({ reactionProcess, fetchReactionProcess }) => {
  return (
    <>
      <ReactionNavbar reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} />
      <Row noGutters>
        <Col md={10} className="scroll-body overflow-auto">
          <Row className='flex-nowrap'>
            <Col className='flex-shrink-0'>
              <PreparationColumnCard />
              <SamplePreparationsBar reactionProcess={reactionProcess} onChange={fetchReactionProcess}/>
            </Col>
            <StepsContainer />
          </Row>
        </Col>
        <Col md={2} className="samples-select-bar scroll-body">
          <VesselsSelectBar reactionProcess={reactionProcess} onChangeVessels={fetchReactionProcess} />
          <SamplesSideBar reactionProcess={reactionProcess} />
        </Col>
      </Row>
    </>
  )
}

export default ReactionProcess
