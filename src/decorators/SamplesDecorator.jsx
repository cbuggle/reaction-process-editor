import React from 'react'

import { apiHostname } from '../constants'

import ConditionTypeDecorator from './ConditionTypeDecorator'

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
    const units = ['ml', 'mg', 'mmol'] // reference units sloppily hardcoded.
    const infoLines = units.map((unit) =>
      availableAmounts && availableAmounts[unit] &&
      ConditionTypeDecorator.infoLineValueWithUnit(availableAmounts[unit], unit)
    ).filter((el) => el)
    return infoLines.length > 0 && 'Available: ' + infoLines.join(', ')
  }
}
