import React from 'react'

import { apiHostname } from '../constants'

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

  static availableAmountsInfoLine = (availableAmounts) => {
    let infoLine = []

    if (availableAmounts) {
      // These are the reference units, hardcoded dirty.
      availableAmounts['ml'] && infoLine.push(parseFloat(availableAmounts['ml'].toFixed(3)) + 'ml')
      availableAmounts['mg'] && infoLine.push(parseFloat(availableAmounts['mg'].toFixed(3)) + 'mg')
      availableAmounts['mmol'] && infoLine.push(parseFloat(availableAmounts['mmol'].toFixed(3)) + 'mmol')
    }
    return infoLine.length > 0  && 'Available: ' + infoLine.join(', ')

  }
}
