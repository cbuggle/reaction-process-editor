import React from 'react'

import FiltrationForm from './purification/FiltrationForm';
import ExtractionForm from './purification/ExtractionForm';
import CrystallizationForm from './purification/CrystallizationForm';
import ChromatographyForm from './purification/ChromatographyForm';

const PurificationForm = (props) => {

  switch (props.workup.purification_type) {
    case "CHROMATOGRAPHY":
      return (<ChromatographyForm {...props} />)
    case "CRYSTALLIZATION":
      return (<CrystallizationForm {...props} />)
    case "EXTRACTION":
      return (<ExtractionForm {...props} />)
    case "FILTRATION":
      return (<FiltrationForm {...props} />)
    default:
      return (<>{"Unknown purification type Error in PurificationForm: " + props.workup.purification_type} </>)
  }
}

export default PurificationForm
