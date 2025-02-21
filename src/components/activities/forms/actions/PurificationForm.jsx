import React from 'react'

import FiltrationForm from './purification/FiltrationForm';
import ExtractionForm from './purification/ExtractionForm';
import CrystallizationForm from './purification/CrystallizationForm';
import ChromatographyForm from './purification/ChromatographyForm';

const PurificationForm = (
  {
    workup,
    onWorkupChange,
    preconditions
  }) => {

  switch (workup.purification_type) {
    case "CHROMATOGRAPHY":
      return (<ChromatographyForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "CRYSTALLIZATION":
      return (<CrystallizationForm workup={workup} onWorkupChange={onWorkupChange} preconditions={preconditions} />)
    case "EXTRACTION":
      return (<ExtractionForm workup={workup}
        onWorkupChange={onWorkupChange} />)
    case "FILTRATION":
      return (<FiltrationForm workup={workup} onWorkupChange={onWorkupChange} />)
    default:
      return (<>{"Unknown purification type Error in PurificationForm: " + workup.purification_type} </>)
  }
}

export default PurificationForm
