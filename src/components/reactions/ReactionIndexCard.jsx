import React from 'react'
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, UncontrolledTooltip, PopoverHeader, PopoverBody } from 'reactstrap'

import { useNavigate } from 'react-router-dom'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

const ReactionIndexCard = ({ reaction }) => {

  const api = useReactionsFetcher();

  const navigate = useNavigate();
  const navigateReaction = (id) => { navigate("/reactions/" + id) }

  return (
    <>
      <Card id={"tooltip-reaction-link-" + reaction.id} className='reaction-index-card mb-2'>
        <CardBody onClick={() => navigateReaction(reaction.id)}>
          <CardTitle>{reaction.short_label}</CardTitle>
          <CardSubtitle> ID: {reaction.id} </CardSubtitle>
          <CardImg src={api.svgImage(reaction)} alt={reaction.short_label} />
        </CardBody>
      </Card>
      <UncontrolledTooltip placement="bottom" target={"tooltip-reaction-link-" + reaction.id}>
        <PopoverHeader>
          {reaction.short_label}
          <br />
          ID: {reaction.id}
        </PopoverHeader>
        <PopoverBody>
          <CardImg src={api.svgImage(reaction)} alt={reaction.short_label} />
        </PopoverBody>
      </UncontrolledTooltip>
    </>
  )
}

export default ReactionIndexCard
