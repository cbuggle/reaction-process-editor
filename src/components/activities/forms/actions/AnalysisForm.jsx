import React from 'react'

import SpectronomyForm from './analysis/SpectronomyForm';
import SpectroscopyForm from './analysis/SpectroscopyForm';
import AnalysisChromatographyForm from './analysis/AnalysisChromatographyForm';

const AnalysisForm = (
  {
    workup,
    onWorkupChange
  }) => {
  switch (workup['analysis_type']) {
    case "CHROMATOGRAPHY":
      return (<AnalysisChromatographyForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "SPECTRONOMY":
      return (<SpectronomyForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "SPECTROSCOPY":
      return (<SpectroscopyForm workup={workup} onWorkupChange={onWorkupChange} />)
    default:
      return (<>{"Unknown analysis type Error in AnalysisBaseForm: " + workup['analysis_type']} </>)
  }
}

export default AnalysisForm
