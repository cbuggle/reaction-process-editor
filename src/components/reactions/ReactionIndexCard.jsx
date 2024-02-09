import React from 'react'
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  UncontrolledTooltip,
  PopoverHeader,
  PopoverBody,
  CardHeader, Container
} from 'reactstrap'

import { useNavigate } from 'react-router-dom'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

const ReactionIndexCard = ({ reaction }) => {

  const api = useReactionsFetcher();

  const navigate = useNavigate();
  const navigateReaction = (id) => { navigate("/reactions/" + id) }

  return (
    <>
      <Card id={"tooltip-reaction-link-" + reaction.id} className='reaction-index-card mb-4'>
        <CardHeader className='d-flex justify-content-between align-items-center'>
          <CardTitle className='mb-0'>{reaction.short_label}</CardTitle>
          <CardSubtitle className='mt-0'> ID: {reaction.id} </CardSubtitle>
        </CardHeader>
        <CardBody onClick={() => navigateReaction(reaction.id)}>
          <CardImg src={api.svgImage(reaction)} alt={reaction.short_label} />
        </CardBody>
      </Card>
      <UncontrolledTooltip placement="bottom" target={"tooltip-reaction-link-" + reaction.id}>
        <Container>
          <PopoverHeader>
            {reaction.short_label}
            <br />
            ID: {reaction.id}
          </PopoverHeader>
          <PopoverBody>
            <CardImg src={api.svgImage(reaction)} alt={reaction.short_label} />
          </PopoverBody>
        </Container>
      </UncontrolledTooltip>
    </>
  )
}

export default ReactionIndexCard
