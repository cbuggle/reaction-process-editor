import React from 'react'

import { Card, CardBody, CardImg, CardTitle, CardSubtitle, UncontrolledTooltip, PopoverHeader, PopoverBody } from 'reactstrap'

import { apiHostname } from '../../Constants'

import { useNavigate } from 'react-router-dom'

const ReactionIndexCard = ({ reaction }) => {

  const navigate = useNavigate();

  const navigateReaction = (id) => {
    navigate("/reactions/" + id)
  }

  return (
    <>
      <Card id={"tooltip-reaction-link-" + reaction.id} className='reaction-link-card'>
        <CardBody onClick={() => navigateReaction(reaction.id)}>
          <CardTitle>{reaction.short_label}</CardTitle>
          <CardSubtitle> ID: {reaction.id} </CardSubtitle>
          <CardImg src={`${apiHostname}/images/reactions/${reaction.reaction_svg_file}`} alt={reaction.short_label} />
        </CardBody>
      </Card>
      <UncontrolledTooltip placement="bottom" target={"tooltip-reaction-link-" + reaction.id}>
        <PopoverHeader>
          {reaction.short_label}
          <br />
          ID: {reaction.id}
        </PopoverHeader>
        <PopoverBody>
          <CardImg src={`${apiHostname}/images/reactions/${reaction.reaction_svg_file}`} alt={reaction.short_label} />
        </PopoverBody>
      </UncontrolledTooltip>
    </>
  )
}

export default ReactionIndexCard
