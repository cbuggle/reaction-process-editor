import React from 'react'

import { apiHostname } from '../constants'

import MetricsDecorator from './MetricsDecorator'

export default class SamplesDecorator {
  static sampleSvgImg = (sample) => {
    if (sample && sample.sample_svg_file) {
      return (
        <img
          src={`${apiHostname}/images/samples/${sample.sample_svg_file}`}
          alt={sample.short_label}
          className='sample-molecule-image bg-white border rounded-3'
        />
      )
    }
  }

  static availableAmounts = (availableAmounts) => {
    const units = ['ml', 'mg', 'mmol'] // reference units sloppily hardcoded.
    return units.map((unit) =>
      availableAmounts && availableAmounts[unit] &&
      MetricsDecorator.infoLineAmount({ value: Number(availableAmounts[unit]).toFixed(2), unit: unit })
    ).filter((el) => el)
  }
}
