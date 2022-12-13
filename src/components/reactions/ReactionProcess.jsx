import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import ReactionNavbar from '../navbars/ReactionNavbar';

import VesselsSelectBar from '../vessels/VesselsSelectBar';

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
            {/* <SampleSelectBarCollapsible name={"Additives"} actsAs={"ADDITIVE"} samples={reactionProcess.additives} />
            <SampleSelectBarCollapsible name={"Diverse Solvents"} actsAs={"DIVERSE_SOLVENT"} samples={reactionProcess.diverse_solvents} />
            <SamplesSelectBar reactionProcess={reactionProcess} /> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ReactionProcess
