import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import ReactionIndexCard from '../reactions/ReactionIndexCard'
import SpinnerWithMessage from "../utilities/SpinnerWithMessage";

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

  const reactionsNotLoadedHint = () => {
    if (fetchingReactions) {
      return (
        <SpinnerWithMessage message='Fetching reaction index' />
      )
    } else {
      return "No reactions found for this collection."
    }
  }

  return (
    <Container>
      <Row className="justify-content-center pt-4">
        {reactions.length > 0 ? renderReactions() : reactionsNotLoadedHint()}
      </Row>
    </Container>
  )
}

export default ReactionIndex
