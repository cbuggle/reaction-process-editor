import React from 'react'

import SpectronomyForm from './measurement/SpectronomyForm';
import SpectroscopyForm from './measurement/SpectroscopyForm';
import MeasurementChromatographyForm from './measurement/MeasurementChromatographyForm';

const MeasurementBaseForm = (
  {
    workup,
    onWorkupChange
  }) => {
  switch (workup['measurement_type']) {
    case "CHROMATOGRAPHY":
      return (<MeasurementChromatographyForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "SPECTRONOMY":
      return (<SpectronomyForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "SPECTROSCOPY":
      return (<SpectroscopyForm workup={workup} onWorkupChange={onWorkupChange} />)
    default:
      return (<>{"Unknown measurement type Error in MeasurementBaseForm: " + workup['measurement_type']} </>)
  }
}

export default MeasurementBaseForm
