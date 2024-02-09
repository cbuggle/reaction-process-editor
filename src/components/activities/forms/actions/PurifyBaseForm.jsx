import React from 'react'

import FiltrationForm from './purify/FiltrationForm';
import ExtractionForm from './purify/ExtractionForm';
import CrystallizationForm from './purify/CrystallizationForm';
import ChromatographyForm from './purify/ChromatographyForm';

const PurifyBaseForm = (
  {
    workup,
    onWorkupChange,
    preconditions,
  }) => {

  switch (workup['purify_type']) {
    case "FILTRATION":
      return (<FiltrationForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "EXTRACTION":
      return (<ExtractionForm workup={workup} onWorkupChange={onWorkupChange} />)
    case "CRYSTALLIZATION":
      return (<CrystallizationForm workup={workup} onWorkupChange={onWorkupChange} preconditions={preconditions} />)
    case "CHROMATOGRAPHY":
      return (<ChromatographyForm workup={workup} onWorkupChange={onWorkupChange} />)
    default:
      return (<>{"Unknown purify type Error in PurifyBaseForm: " + workup['purify_type']} </>)
  }
}

export default PurifyBaseForm
