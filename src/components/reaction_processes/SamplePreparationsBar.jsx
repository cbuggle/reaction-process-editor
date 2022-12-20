import React from 'react'
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap'
import SamplePreparationForm from './SamplePreparationForm'

const SamplePreparationsBar = ({ reactionProcess, onChange }) => {

  const renderSamplePreparations = () => {
    return (
      <>
        {reactionProcess.samples_preparations.map((preparation, idx) => (
          <SamplePreparationForm key={idx} preparation={preparation} reactionProcess={reactionProcess} onChange={onChange} />
        ))}
      </>
    )
  }

  return (
    <Card>
      <CardTitle>
        Preparations
      </CardTitle>
      <CardBody>
        {renderSamplePreparations()}
      </CardBody>
      <CardFooter>
        <SamplePreparationForm reactionProcess={reactionProcess} onChange={onChange} />
      </CardFooter>
    </Card>
  )
}

export default SamplePreparationsBar
