import React from 'react'

import FiltrationForm from './purify/FiltrationForm';
import ExtractionForm from './purify/ExtractionForm';
import CrystallizationForm from './purify/CrystallizationForm';
import ChromatographyForm from './purify/ChromatographyForm';

const PurifyBaseForm = (
  {
    activity,
    onWorkupChange
  }) => {

  switch (activity.workup['purify_type']) {
    case "FILTRATION":
      return (<FiltrationForm activity={activity} onWorkupChange={onWorkupChange} />)
    case "EXTRACTION":
      return (<ExtractionForm activity={activity} onWorkupChange={onWorkupChange} />)
    case "CRYSTALLIZATION":
      return (<CrystallizationForm activity={activity} onWorkupChange={onWorkupChange} />)
    case "CHROMATOGRAPHY":
      return (<ChromatographyForm activity={activity} onWorkupChange={onWorkupChange} />)
    default:
      return (<>{"Unknown purify type Error in PurifyBaseForm: " + activity.workup['purify_type']} </>)
  }
}

export default PurifyBaseForm
