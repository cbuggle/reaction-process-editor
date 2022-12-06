import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainNavbar from '../navbars/MainNavbar';

import ReactionsFetcher from '../../fetchers/ReactionsFetcher'
import ReactionLink from './ReactionLink'

import { toast } from 'react-toastify';

import { afterSignOutPath } from '../../Constants';

const ReactionIndex = () => {

  const navigate = useNavigate();

  const [reactions, setReactions] = useState([])
  const [fetchingReactions, setFetchingReactions] = useState(true)

  useEffect(() => {
    fetchReactions()
  }, []);

  const fetchReactions = () => {
    setFetchingReactions(true)
    ReactionsFetcher.indexResponse().then((response) => {
      switch (response.status) {
        case 200:
          response.json().then((json) => {
            setReactions(json['reactions'])
          })
          setFetchingReactions(false)
          return;
        case 401:
          localStorage.setItem('jwt', null);
          navigate(afterSignOutPath);
          return;
        default:
          toast.error("An unknown error has occured. HTTP status: " + response.status, { autoClose: false })
          navigate(afterSignOutPath);
          return;
      }
    });
  }

  const renderReactions = () => {
    return (
      <>
        {
          reactions.map((reaction, idx) => (
            <Col md="3" key={reaction.id}>
              <ReactionLink key={idx} reaction={reaction} />
            </Col>
          ))
        }
      </>
    )
  }

  const renderNoReactionsHint = () => {
    if (fetchingReactions) {
      return (
        <>
          <FontAwesomeIcon icon="spinner" pulse size="2x"/>
          Fetching reaction index
        </>
      )
    } else {
      return "No reactions found for this collection."
    }
  }

  return (
    <>
      <MainNavbar onChangeCollection={fetchReactions}/>
      <Container>
        <Row className="justify-content-center align-items-center">
          {reactions.length > 0 ? renderReactions() : renderNoReactionsHint()}
        </Row>
      </Container>
    </>
  )
}

export default ReactionIndex
