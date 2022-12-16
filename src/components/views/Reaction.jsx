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

import ReactionProcess from '../reactions/ReactionProcess';
import SpinnerWithMessage from "../utilities/SpinnerWithMessage";

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
      <SpinnerWithMessage message='Fetching reaction process' />
    )
  }

  const renderReaction = () => {
    return (
      <>
        <ReactionNavbar reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} />
        <Row className='g-0 flex-grow-1'>
          <Col md={10} className="scroll-body overflow-auto p-3">
            <Row className='flex-nowrap'>
              <Col className='flex-shrink-0'>
                <PreparationColumnCard reactionProcess={reactionProcess} onChange={fetchReactionProcess} />
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

  return (
    reactionProcess ? renderReaction() : renderFetchDataHint()
  );
}

export default Reaction;
