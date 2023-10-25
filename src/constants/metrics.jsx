
// These conditions will be included in the conditionForm, in order of desired appearance.
export const amountInputMetricNames = ['VOLUME', 'WEIGHT', 'MOLAR']

export const conditionFormTypeNames = ['TEMPERATURE', 'PH', 'PRESSURE', 'IRRADIATION', 'MOTION', 'EQUIPMENT']
export const predefinableMetricNames = ['TEMPERATURE', 'PH', 'PRESSURE']

export const removeFormMetricNames = ['TEMPERATURE', 'PRESSURE']

// We want to allow 120% of sample amounts for
export const allowedAmountOverscale = 1.2

export const metrics = {
  'TEMPERATURE': {
    label: 'Temperature',
    defaultUnit: 'CELSIUS',
    units: ['CELSIUS', 'KELVIN'],
  },
  'PH': {
    label: 'pH',
    defaultUnit: 'PH',
    units: ['PH'],
  },
  'PRESSURE': {
    label: 'Pressure',
    defaultUnit: 'MBAR',
    units: ['MBAR'],
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
  },
  'WEIGHT': {
    label: 'gravimetric',
    defaultUnit: 'mg',
    units: ['mg', 'g', 'mcg']
  },
  'VOLUME': {
    label: 'volumetric',
    defaultUnit: 'ml',
    units: ['ml', 'l']
  },
  'MOLAR': {
    label: 'molar',
    defaultUnit: 'mmol',
    units: ['mol', 'mmol', 'mcmol', 'nmol']
  }
}

export const unitTypes = {
  // Definition of availble units for use in NumericalInputs etc.

  // mg, mmol, ml, etc. are downcase for consistency with ELN.
  // All others are unaltered (upcase) ORD constants.
  // MOL / molar
  'mol': {
    label: 'mol',
    inputRange: {
      min: 0,
      precision: 1,
      step: 1,
      initialStepValue: 1,
    },
    fromBase: (value) => value / 1000,
    toBase: (value) => value * 1000,
  },
  'mmol': {
    label: 'mmol',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      initialStepValue: 10,
    },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'mcmol': {
    label: 'mcmol',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      initialStepValue: 10,
    },
    fromBase: (value) => value * 1000,
    toBase: (value) => value / 1000,
  },
  'nmol': {
    label: 'nmol',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      initialStepValue: 10,
    },
    fromBase: (value) => value * (1000 * 1000),
    toBase: (value) => value / (1000 * 1000),
  },
  // WEIGHT / gravimetric
  'g': {
    label: 'g',
    inputRange: {
      min: 0,
      precision: 0,
      step: 1,
      initialStepValue: 1,
    },
    fromBase: (value) => value / 1000,
    toBase: (value) => value * 1000,
  },
  'mg': {
    label: 'mg',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      initialStepValue: 10,
    },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'mcg': {
    label: 'mcg',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      initialStepValue: 10,
    },
    fromBase: (value) => value * 1000,
    toBase: (value) => value / 1000,
  },
  // VOLUME / volumetric
  'ml': {
    label: 'ml',
    inputRange: {
      min: 0,
      precision: 0,
      step: 10,
      initialStepValue: 10,
    },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'l': {
    label: 'l',
    inputRange: {
      min: 0,
      precision: 1,
      step: 1,
      initialStepValue: 1,
    },
    fromBase: (value) => value / 1000,
    toBase: (value) => value * 1000,
  },
  'CELSIUS': {
    label: '°C',
    inputRange: {
      min: -100,
      max: 400,
      precision: 1,
      step: 1,
      initialStepValue: 21,
    },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'KELVIN': {
    name: 'KELVIN',
    label: 'K',
    inputRange: {
      min: 173.15,
      max: 573.15,
      precision: 1,
      step: 1,
      initialStepValue: 294.15,
    },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'PH': {
    label: '',
    inputRange: {
      min: 0,
      max: 14,
      precision: 2,
      step: 0.01,
      initialStepValue: 7,
    }
  },
  'MBAR': {
    label: 'mBar',
    inputRange: {
      min: 0,
      max: 10000,
      precision: 0,
      step: 1,
      initialStepValue: 1013,
    }
  },
  'WATT': {
    label: 'Watt',
    inputRange: {
      min: 0,
      max: 10000,
      precision: 0,
      step: 10,
      initialStepValue: 1000,
    }
  },
  'MLMIN': {
    label: 'ml/min',
    inputRange: {
      min: 0,
      max: 100,
      precision: 1,
      step: 10,
      initialStepValue: 0,
    }
  },
  'PERCENT': {
    label: '%',
    inputRange: {
      min: 0,
      max: 100 * allowedAmountOverscale,
      precision: 0,
      step: 1,
      initialStepValue: 0,
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
      initialStepValue: 0,
    }
  },
  'PURITY': {
    label: '',
    inputRange: {
      min: 0,
      max: 1,
      precision: 2,
      step: 0.01,
      initialStepValue: 1,
    }
  },
  'NM': {
    label: 'nm',
    inputRange: {
      min: 10,
      max: 800,
      precision: 0,
      step: 1,
      initialStepValue: 254,
    },
  },
  'RPM': {
    label: 'rpm',
    inputRange: {
      min: 0,
      max: 9999,
      precision: 0,
      step: 100,
      initialStepValue: 500,
    }
  },
  'MINUTES': {
    label: 'minutes',
    inputRange: {
      min: 0,
      max: 1440,
      precision: 0,
      step: 1,
      initialStepValue: 0,
    }
  },
  'TIMES': {
    label: 'times',
    inputRange: {
      min: 0,
      max: 100,
      precision: 0,
      step: 1,
      initialStepValue: 1,
    }
  }
}
