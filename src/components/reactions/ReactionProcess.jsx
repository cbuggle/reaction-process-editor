import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import ReactionNavbar from '../navbars/ReactionNavbar';

import VesselsSelectBar from '../vessels/VesselsSelectBar';
import SamplesSideBar from '../samples/SamplesSideBar';

const ReactionProcess = ({ reactionProcess, fetchReactionProcess }) => {
  return (
    <>
      <ReactionNavbar reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} />
      <Container fluid className="reaction-process-container">
        <Row className="scroll-container">
          <Col md={2} className="scroll-body">
            preparations
          </Col>
          <Col md={8} className="reaction-process-container-body scroll-body">
            process steps
          </Col>
          <Col md={2} className="samples-select-bar scroll-body">
            <VesselsSelectBar reactionProcess={reactionProcess} onChangeVessels={fetchReactionProcess} />
            <SamplesSideBar reactionProcess={reactionProcess} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ReactionProcess
