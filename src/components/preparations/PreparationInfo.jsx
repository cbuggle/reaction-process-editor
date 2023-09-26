import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

import { samplePreparationTypes } from '../../constants/samplePreparationTypes'

const PreparationInfo = ({ preparation, preparationOptions }) => {

  const api = useReactionsFetcher()

  const renderPreparationsInfo = () => {
    return (preparation.preparations.map((preparation) => {
      return samplePreparationTypes[preparation]
    }))
  }

  const renderEquipmentsInfo = () => {
    return preparation.equipment.map((equipment) => {
      return preparationOptions.equipment.find(option => option.value === equipment).label
    })
  }

  return (
    <>
      <img
        src={api.sampleSvgImage(preparation.sample)}
        alt={preparation.sample.short_label}
        className='sample-molecule-image bg-white border rounded-3'
      />
      <div id={"sample-preparation-" + preparation.id}>
        {renderPreparationsInfo()}
        <br />
        {renderEquipmentsInfo()}
        <br />
        {preparation.details}
      </div>
      < UncontrolledTooltip target={"sample-preparation-" + preparation.id} >
        {renderPreparationsInfo()}
        <br />
        {renderEquipmentsInfo()}
        <br />
        {preparation.details}
      </UncontrolledTooltip >
    </>
  )
}

export default PreparationInfo
