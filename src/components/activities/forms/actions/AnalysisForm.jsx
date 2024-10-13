import React from 'react'

import SpectrometryForm from './analysis/SpectrometryForm';
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
    case "SPECTROMETRY":
      return (<SpectrometryForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "SPECTROSCOPY":
      return (<SpectroscopyForm workup={workup} onWorkupChange={onWorkupChange} />)
    default:
      return (<>{"Unknown analysis type Error in AnalysisBaseForm: " + workup['analysis_type']} </>)
  }
}

export default AnalysisForm
