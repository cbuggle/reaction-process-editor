import React from 'react'

import { apiHostname } from '../../Constants'

export default class SamplesDecorator {
  static sampleSvgFile = (sample) => {
    if (sample && sample.sample_svg_file) {
      return (
        <img src={`${apiHostname}/images/samples/${sample.sample_svg_file}`} alt={sample.short_label} />
      )
    }
  }

  static labelForButtonSolvent = (sample) => {
    return (sample.preferred_label || sample.short_label)
  }

  static infoForButtonSolvent = (sample) => {
    return (<>
      {parseFloat(sample.target_amount_value).toPrecision(3) + ' '}
      {sample.target_amount_unit}
    </>)
  }

  static infoForButtonStandard = (sample) => {
    return (
      <>
        {sample.short_label}
        <br />
        {parseFloat(sample.real_amount_value || sample.target_amount_value).toPrecision(3)}
        {sample.real_amount_unit || sample.target_amount_unit}
      </>
    )
  }

  static tooltip = (sample) => {
    return (
      <>
        {SamplesDecorator.labelForButtonSolvent(sample)}
        <br />
        {SamplesDecorator.infoForButtonSolvent(sample)}
      </>
    )
  }
}
