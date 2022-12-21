import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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

  return (
    reactionProcess ?
        <ReactionProcess reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} />
        : <SpinnerWithMessage message='Fetching reaction process' />
  );
}

export default Reaction;
