import React from 'react'
import MediumBox from './MediumBox'
import SampleBox from './SampleBox'
import SolventBox from './SolventBox'

const StepSamples = ({ processStep }) => {

  const renderSampleBox = (material) => {
    console.log("material: ")
    console.log(material)
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
        processStep.added_materials_options.map((material) => {
          return renderSampleBox(material)
        })
      }
    </>
  )
}

export default StepSamples
