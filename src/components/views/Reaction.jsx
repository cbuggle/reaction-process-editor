import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Row, Col } from 'reactstrap';

import StepsContainer from '../steps/StepsContainer';
import PreparationColumnCard from '../preparations/PreparationColumnCard';

import ReactionNavbar from '../reactions/ReactionNavbar';

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
      <>
        <SpinnerWithMessage message={'Storing process data'} isOpen={isLoading} />
        {!isLoading &&
          <ReactionNavbar reactionProcess={reactionProcess} />
        }
      </>
    )
  }

  return (
    <>
      <SpinnerWithMessage message={'Fetching reaction process data'} isOpen={!reactionProcess}/>
      {reactionProcess &&
        <>
          {renderReactionNavbar()}
          <div className="scroll-body overflow-auto flex-grow-1">
            <div className='px-3 py-4 d-inline-block'>
              <div className='d-inline-flex flex-nowrap align-items-start'>
                <PreparationColumnCard reactionProcess={reactionProcess} />
                <StepsContainer reactionProcess={reactionProcess} />
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default Reaction;
