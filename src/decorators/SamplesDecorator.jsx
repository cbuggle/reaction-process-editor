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
}
