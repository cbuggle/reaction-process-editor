import React, { useContext } from 'react'
import MediumBox from './MediumBox'
import SampleBox from './SampleBox'
import SolventBox from './SolventBox'

import { StepSelectOptions } from '../StepColumnCard'

const StepSamples = () => {

  const stepSelectOptions = useContext(StepSelectOptions)

  const renderSampleBox = (material) => {
    switch (material.acts_as) {
      case 'SAMPLE':
        return <SampleBox key={material.id} material={material} />
      case 'SOLVENT':
        return <SolventBox key={material.id} material={material} />
      case 'MEDIUM':
        return <MediumBox key={material.id} material={material} />
      default:
        // ADDITIVE and DIVERSE_SOLVENT will not be displayed in StepHeader
        break;
    }
  }

  return (
    <>
      {
        stepSelectOptions.added_materials.map((material) => {
          return renderSampleBox(material)
        })
      }
    </>
  )
}

export default StepSamples
