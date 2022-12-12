import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainNavbar from '../navbars/MainNavbar';
import ReactionProcess from './ReactionProcess';

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
      <Container>
        <Row className="justify-content-center align-items-center">
          Fetching reaction process
          <FontAwesomeIcon icon="spinner" pulse size="2x" />
        </Row>
      </Container>
    )
  }
  return (
    <>
      <MainNavbar />
      {reactionProcess ? <ReactionProcess reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} /> : renderFetchDataHint()}
    </>
  );
}

export default Reaction;
