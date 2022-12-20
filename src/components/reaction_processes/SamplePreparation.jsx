import React from 'react'
import {  UncontrolledTooltip } from 'reactstrap'

const SamplePreparation = ({ preparation, preparationOptions }) => {

  return (
    <>
      <div id={"sample-preparation-" + preparation.id}>
        {preparationOptions.samples.find(option => option.value === preparation.sample_id).label}
        <br />
        {preparation.preparations.join(', ')}
      </div>
      < UncontrolledTooltip target={"sample-preparation-" + preparation.id} >
        {preparationOptions.samples.find(option => option.value === preparation.sample_id).label}
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

export default SamplePreparation
