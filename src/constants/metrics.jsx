
// These conditions will be included in the conditionForm, in order of desired appearance.
export const amountInputSetMetricNames = ['VOLUME', 'WEIGHT', 'MOLAR']

export const conditionFormMetricNames = ['TEMPERATURE', 'PH', 'PRESSURE', 'IRRADIATION', 'MOTION', 'EQUIPMENT']
export const predefinableMetricNames = ['TEMPERATURE', 'PH', 'PRESSURE']

export const removeFormMetricNames = ['TEMPERATURE', 'PRESSURE']

export const amountsDefaultUnits = ['ml', 'mg', 'mmol']

// We want to allow 120% of sample amounts when Adding/Transfering
export const allowedAmountOverscale = 1.2

export const metrics = {
  'TEMPERATURE': {
    label: 'Temperature',
    defaultUnit: 'CELSIUS',
    units: ['CELSIUS', 'KELVIN', 'FAHRENHEIT'],
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
    label: 'Flow Rate',
    defaultUnit: 'MLMIN',
    units: ['MLMIN']
  },
  'PERCENTAGE': {
    label: 'Percentage',
    defaultUnit: 'PERCENT',
    units: ['PERCENT']
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
  'RATIO': {
    label: 'Ratio',
    defaultUnit: 'RATIO',
    units: ['RATIO']
  },
  'REPETITIONS': {
    label: 'Repetitions',
    defaultUnit: 'TIMES',
    units: ['TIMES']
  },
  'WEIGHT': {
    label: 'Weight',
    measurementTypeLabel: 'gravimetric',
    defaultUnit: 'mg',
    units: ['mg', 'g', 'mcg']
  },
  'LENGTH': {
    label: '',
    defaultUnit: 'CM',
    units: ['CM']
  },
  'WAVENUMBER': {
    label: 'Wavenumber',
    defaultUnit: 'WAVENUMBER',
    units: ['WAVENUMBER']
  },
  'VOLUME': {
    label: 'Volume',
    measurementTypeLabel: 'volumetric',
    defaultUnit: 'ml',
    units: ['ml', 'l']
  },
  'MOLAR': {
    label: 'Moles',
    measurementTypeLabel: 'molar',
    defaultUnit: 'mmol',
    units: ['mol', 'mmol', 'mcmol', 'nmol']
  }
}

export const unitTypes = {
  // Definition of availble units for use in NumericalInputs etc.

  // mg, mmol, ml, etc. are downcase for consistency with ELN.
  // All others are unaltered (upcase) ORD constants.

  // fromBase, toBase are required technically only on metrics bearing more than one but better have it complete.

  // MOL / molar
  'mol': {
    label: 'mol',
    inputRange: { min: 0, precision: 1, step: 0.1, initialStep: 1, },
    fromBase: (value) => value / 1000,
    toBase: (value) => value * 1000,
  },
  'mmol': {
    label: 'mmol',
    inputRange: { min: 0, precision: 0, step: 10, initialStep: 10, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'mcmol': {
    label: 'mcmol',
    inputRange: { min: 0, precision: 0, step: 10, initialStep: 10, },
    fromBase: (value) => value * 1000,
    toBase: (value) => value / 1000,
  },
  'nmol': {
    label: 'nmol',
    inputRange: { min: 0, precision: 0, step: 10, initialStep: 10, },
    fromBase: (value) => value * (1000 * 1000),
    toBase: (value) => value / (1000 * 1000),
  },
  // WEIGHT / gravimetric
  'g': {
    label: 'g',
    inputRange: { min: 0, precision: 0, step: 1, initialStep: 1, },
    fromBase: (value) => value / 1000,
    toBase: (value) => value * 1000,
  },
  'mg': {
    label: 'mg',
    inputRange: { min: 0, precision: 0, step: 10, initialStep: 10, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'mcg': {
    label: 'mcg',
    inputRange: { min: 0, precision: 0, step: 10, initialStep: 10, },
    fromBase: (value) => value * 1000,
    toBase: (value) => value / 1000,
  },
  // VOLUME / volumetric
  'ml': {
    label: 'ml',
    inputRange: { min: 0, precision: 0, step: 10, initialStep: 10, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'l': {
    label: 'l',
    inputRange: { min: 0, precision: 1, step: 1, initialStep: 1, },
    fromBase: (value) => value / 1000,
    toBase: (value) => value * 1000,
  },
  'CELSIUS': {
    label: '°C',
    inputRange: { min: -100, max: 400, precision: 1, step: 1, initialStep: 21, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'KELVIN': {
    label: 'K',
    inputRange: { min: 173.15, max: 673.15, precision: 1, step: 1, initialStep: 294.15, },
    fromBase: (value) => value + 273.15,
    toBase: (value) => value - 273.15,
  },
  'FAHRENHEIT': {
    label: '°F',
    inputRange: { min: -148, max: 752, precision: 1, step: 1, initialStep: 69.8, },
    fromBase: (value) => 32 + (value * 9 / 5),
    toBase: (value) => (value - 32) * 5 / 9,
  },
  'PH': {
    label: 'pH',
    inputRange: { min: 0, max: 14, precision: 2, step: 0.01, initialStep: 7, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'MBAR': {
    label: 'mbar',
    inputRange: { min: 0, max: 10000, precision: 0, step: 1, initialStep: 1013, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'WATT': {
    label: 'Watt',
    inputRange: { min: 0, max: 10000, precision: 0, step: 10, initialStep: 1000, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'MLMIN': {
    label: 'ml/min',
    inputRange: { min: 0, max: 10000, precision: 0, step: 10, initialStep: 10 },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'PERCENT': {
    label: '%',
    inputRange: { min: 0, max: 100, precision: 0, step: 1, initialStep: 1, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'FRACTION': { // experimental, unused
    label: '',
    inputRange: { min: 0, max: 10, precision: 2, step: 0.01, initialStep: 0.01, },
    fromBase: (value) => value * 100,
    toBase: (value) => 100 / value,
  },
  'PURITY': {
    label: '',
    inputRange: { min: 0, max: 1, precision: 2, step: 0.01, initialStep: 1, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'NM': {
    label: 'nm',
    inputRange: { min: 10, max: 800, precision: 0, step: 1, initialStep: 254, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'RPM': {
    label: 'rpm',
    inputRange: { min: 0, max: 9999, precision: 0, step: 100, initialStep: 500, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'MINUTES': {
    label: 'minutes',
    inputRange: { min: 0, max: 1440, precision: 0, step: 1, initialStep: 0, },
    fromBase: (value) => value * 60,
    toBase: (value) => value / 60,
  },
  'RATIO': {
    label: '',
    inputRange: { min: 0, max: 100, precision: 0, step: 1, initialStep: 1, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'TIMES': {
    label: 'times',
    inputRange: { min: 0, max: 100, precision: 0, step: 1, initialStep: 1, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'CM': {
    label: 'cm',
    inputRange: { min: 0, max: 1000, precision: 0, step: 1, initialStep: 1, },
    fromBase: (value) => value,
    toBase: (value) => value,
  },
  'WAVENUMBER': {
    label: '1/cm',
    inputRange: { min: 0, max: 100000, precision: 0, step: 1000, initialStep: 5000, },
    fromBase: (value) => value,
    toBase: (value) => value,
  }
}
