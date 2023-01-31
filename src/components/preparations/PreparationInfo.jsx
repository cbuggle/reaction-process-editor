import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

const PreparationInfo = ({ preparation }) => {

  const api = useReactionsFetcher()

  return (
    <>
      <img
        src={api.sampleSvgImage(preparation.sample)}
        alt={preparation.sample.short_label}
        className='sample-molecule-image bg-white border rounded-3'
      />
      <div id={"sample-preparation-" + preparation.id}>
        {preparation.preparations.join(', ')}
        <br />
        {preparation.equipment.join(', ')}
        <br />
        {preparation.details}
      </div>
      < UncontrolledTooltip target={"sample-preparation-" + preparation.id} >
        {preparation.preparations.join(', ')}
        <br />
        {preparation.equipment.join(', ')}
        <br />
        {preparation.details}
      </UncontrolledTooltip >
    </>
  )
}

export default PreparationInfo
