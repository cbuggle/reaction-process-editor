import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Row, Col } from 'reactstrap';

import StepsContainer from '../steps/StepsContainer';
import PreparationColumnCard from '../preparations/PreparationColumnCard';

import ReactionNavbar from '../reactions/ReactionNavbar';

import VesselsSelectBar from '../vessels/VesselsSelectBar';
import SamplesSideBar from '../samples/SamplesSideBar';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import SpinnerWithMessage from "../utilities/SpinnerWithMessage";

const Reaction = () => {
  const api = useReactionsFetcher();

  const { reactionId } = useParams()
  const auth_token = new URLSearchParams(useLocation().search).get('auth');
  const username = new URLSearchParams(useLocation().search).get('username');

  const [reactionProcess, setReactionProcess] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const reloadDone = () => {
      setIsLoading(false)
    }
    const indicateSave = () => {
      setIsLoading(true)
    }
    const requireReload = () => {
      fetchReactionProcess()
      setIsLoading(true)
    }

    window.addEventListener('indicateSave', indicateSave);
    window.addEventListener('requireReload', requireReload);
    window.addEventListener('reloadDone', reloadDone);

    return () => {
      window.removeEventListener('indicateSave', indicateSave);
      window.removeEventListener('requireReload', requireReload);
      window.removeEventListener('reloadDone', reloadDone);
    };
  }, []);

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
      window.dispatchEvent(new Event("reloadDone"))
    })
  }

  const renderReactionNavbar = () => {
    return (
      isLoading ? <SpinnerWithMessage message={'Storing process data'} /> : <ReactionNavbar reactionProcess={reactionProcess} />
    )
  }

  const renderReaction = () => {
    return (
      <>
        {renderReactionNavbar()}
        <Row className='g-0 flex-grow-1'>
          <Col md={10} className="scroll-body overflow-auto p-3">
            <Row className='flex-nowrap'>
              <Col className='flex-shrink-0'>
                <PreparationColumnCard reactionProcess={reactionProcess} />
              </Col>
              <StepsContainer reactionProcess={reactionProcess} />
            </Row>
          </Col>
          <Col md={2} className="samples-select-bar scroll-body">
            <VesselsSelectBar reactionProcess={reactionProcess} />
            <SamplesSideBar reactionProcess={reactionProcess} />
          </Col>
        </Row>
      </>
    )
  }

  return (
    reactionProcess ? renderReaction() : <SpinnerWithMessage message={'Fetching reaction process data'} />
  );
}

export default Reaction;
