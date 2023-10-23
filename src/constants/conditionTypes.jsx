
// These conditions will be included in the conditionForm, in order of desired appearance.
export const conditionFormTypeNames = ['TEMPERATURE', 'PH', 'PRESSURE', 'IRRADIATION', 'MOTION', 'EQUIPMENT']
export const removeFormConditionTypeNames = ['TEMPERATURE', 'PRESSURE']

// We want to allow 120% of sample amounts for
export const allowedAmountOverscale = 1.2

export const conditionTypes = {
  'EQUIPMENT': {
    label: 'Equipment'
  },
  'TEMPERATURE': {
    label: 'Temperature',
    defaultUnit: 'CELSIUS',
    units: ['CELSIUS', 'KELVIN'],
    predefined: true
  },
  'PH': {
    label: 'pH',
    defaultUnit: 'PH',
    units: ['PH'],
    predefined: true
  },
  'PRESSURE': {
    label: 'Pressure',
    defaultUnit: 'MBAR',
    units: ['MBAR'],
    predefined: true
  },
  'IRRADIATION': {
    label: 'Irradiation',
    defaultUnit: 'NM',
    units: ['NM']
  },
  'POWER': {
    label: 'Power',
    defaultUnit: 'WATT',
    units: ['WATT']
  },
  'POWER_START': {
    label: 'Power',
    defaultUnit: 'WATT',
    units: ['WATT']
  },
  'POWER_END': {
    label: 'Power (End)',
    defaultUnit: 'WATT',
    units: ['WATT']
  },
  'POWER_RAMP': {
    label: 'Power Ramp'
  },
  'VELOCITY': {
    label: 'Velocity',
    defaultUnit: 'MLMIN',
    units: ['MLMIN']
  },
  'PERCENTAGE': {
    label: 'Percentage',
    defaultUnit: 'PERCENT',
    units: ['PERCENT', 'FRACTION']
  },
  'PURITY': {
    label: 'Purity',
    defaultUnit: 'PURITY',
    units: ['PURITY']
  },
  'MOTION': {
    label: 'Motion',
    defaultUnit: 'RPM',
    units: ['RPM']
  },
  'DURATION': {
    label: 'Duration',
    defaultUnit: 'MINUTES',
    units: ['MINUTES']
  },
  'REPETITIONS': {
    label: 'Repetitions',
    defaultUnit: 'TIMES',
    units: ['TIMES']
  }
}

export const unitTypes = {
  // Definition of availble units for use in NumericalInputs etc.
  // mg, mmol, ml are downcase for consistency with ELN.
  // All others are unaltered (upcase) ORD constants.
  'mmol': {
    label: 'mmol',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      default: 0,
    }
  },
  'mg': {
    label: 'mg',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      default: 0,
    }
  },
  'ml': {
    label: 'ml',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      default: 0,
    }
  },
  'CELSIUS': {
    label: '°C',
    inputRange: {
      min: -100,
      max: 400,
      precision: 1,
      step: 1,
      default: 21,
    }
  },
  'KELVIN': {
    name: 'KELVIN',
    label: 'K',
    inputRange: {
      min: 173.15,
      max: 573.15,
      precision: 1,
      step: 0.1,
      default: 293.15,
    }
  },
  'PH': {
    label: '',
    inputRange: {
      min: 0,
      max: 14,
      precision: 2,
      step: 0.01,
      default: 7,
    }
  },
  'MBAR': {
    label: 'mBar',
    inputRange: {
      min: 0,
      max: 10000,
      precision: 0,
      step: 1,
      default: 1013,
    }
  },
  'WATT': {
    label: 'Watt',
    inputRange: {
      min: 0,
      max: 10000,
      precision: 0,
      step: 10,
      default: 1000,
    }
  },
  'MLMIN': {
    label: 'ml/min',
    inputRange: {
      min: 0,
      max: 100,
      precision: 1,
      step: 10,
      default: 0,
    }
  },
  'PERCENT': {
    label: '%',
    inputRange: {
      min: 0,
      max: 100 * allowedAmountOverscale,
      precision: 0,
      step: 1,
      default: 0,
    }
  },
  'FRACTION': {
    // experimental, unused
    label: '',
    inputRange: {
      min: 0,
      max: 10,
      precision: 2,
      step: 0.01,
      default: 0,
    }
  },
  'PURITY': {
    label: '',
    inputRange: {
      min: 0,
      max: 1,
      precision: 2,
      step: 0.01,
      default: 1,
    }
  },
  'NM': {
    label: 'nm',
    inputRange: {
      min: 10,
      max: 800,
      precision: 0,
      step: 1,
      default: 254,
    },
  },
  'RPM': {
    label: 'rpm',
    inputRange: {
      min: 0,
      max: 9999,
      precision: 0,
      step: 100,
      default: 500,
    }
  },
  'MINUTES': {
    label: 'minutes',
    inputRange: {
      min: 0,
      max: 1440,
      precision: 0,
      step: 1,
      default: 0,
    }
  },
  'TIMES': {
    label: 'times',
    inputRange: {
      min: 0,
      max: 100,
      precision: 0,
      step: 1,
      default: 1,
    }
  }
}
