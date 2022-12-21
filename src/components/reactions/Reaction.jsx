import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactionProcess from './ReactionProcess';
import ReactionNavbar from '../navbars/ReactionNavbar';

import VesselsSelectBar from '../vessels/VesselsSelectBar';
import SamplesSideBar from '../samples/SamplesSideBar';
import SamplePreparationsBar from '../reaction_processes/SamplePreparationsBar';


import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const Reaction = () => {

  const api = useReactionsFetcher();

  const { reactionId } = useParams()
  const auth_token = new URLSearchParams(useLocation().search).get('auth');
  const username = new URLSearchParams(useLocation().search).get('username');

  const [reactionProcess, setReactionProcess] = useState()

  useEffect(() => {
    if (auth_token) {
      localStorage.setItem('bearer_auth_token', auth_token);
    }
    if (username) {
      localStorage.setItem('username', username)
    }
    fetchReactionProcess()
  }, [])

  const fetchReactionProcess = () => {
    api.getReactionProcess(reactionId).then((data) => {
      setReactionProcess(data['reaction_process'])
    })
  }

  const renderFetchDataHint = () => {
    return (
      <Container className="cursor-wait">
        <Row className="justify-content-center align-items-top-third">
          Fetching reaction process
          <FontAwesomeIcon icon="spinner" pulse size="2x" />
        </Row>
      </Container>
    )
  }

  const renderReaction = () => {
    return (
      <>
        <ReactionNavbar reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} />
        <Container fluid>
          <Row>
            <Col md={2}>
              <SamplePreparationsBar reactionProcess={reactionProcess} onChange={fetchReactionProcess}/>
            </Col>
            <Col>
              <ReactionProcess reactionProcess={reactionProcess} onChange={fetchReactionProcess} />
            </Col>
            <Col md={2}>
              <VesselsSelectBar reactionProcess={reactionProcess} onChangeVessels={fetchReactionProcess} />
              <SamplesSideBar reactionProcess={reactionProcess} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  return (
    reactionProcess ? renderReaction() : renderFetchDataHint()
  );
}

export default Reaction;
