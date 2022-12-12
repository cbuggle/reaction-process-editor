import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainNavbar from '../navbars/MainNavbar';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import ReactionIndexCard from './ReactionIndexCard'

const ReactionIndex = () => {

  const reactionApi = useReactionsFetcher();

  const [reactions, setReactions] = useState([])
  const [fetchingReactions, setFetchingReactions] = useState(true)

  useEffect(() => {
    fetchReactions()
  }, []);

  const fetchReactions = () => {
    setFetchingReactions(true)
    reactionApi.index().then((data) => {
      setReactions(data['reactions'])
      setFetchingReactions(false)
    })
  }

  const renderReactions = () => {
    return (
      <>
        {
          reactions.map((reaction, idx) => (
            <Col md="3" key={reaction.id}>
              <ReactionIndexCard key={idx} reaction={reaction} />
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
          <FontAwesomeIcon icon="spinner" pulse size="2x" />
          Fetching reaction index
        </>
      )
    } else {
      return "No reactions found for this collection."
    }
  }

  return (
    <>
      <MainNavbar onChangeCollection={fetchReactions} />
      <Container>
        <Row className="justify-content-center align-items-center">
          {reactions.length > 0 ? renderReactions() : renderNoReactionsHint()}
        </Row>
      </Container>
    </>
  )
}

export default ReactionIndex
