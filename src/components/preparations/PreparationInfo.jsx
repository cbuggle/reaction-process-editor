import React from 'react'
import {  UncontrolledTooltip } from 'reactstrap'

const PreparationInfo = ({ preparation, sampleName }) => {

  return (
    <>
      <div id={"sample-preparation-" + preparation.id}>
        {sampleName}
        <br />
        {preparation.preparations.join(', ')}
      </div>
      < UncontrolledTooltip target={"sample-preparation-" + preparation.id} >
        {sampleName}
        <br />
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
