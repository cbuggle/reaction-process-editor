
// These conditions will be included in the conditionForm, in order of desired appearance.
export const conditionFormTypeNames = ['TEMPERATURE', 'PH', 'PRESSURE', 'IRRADIATION', 'MOTION', 'EQUIPMENT']

export const conditionTypes = {
  'EQUIPMENT': {
    label: 'Equipment'
  },
  'TEMPERATURE': {
    label: 'Temperature',
    defaultUnit: 'CELSIUS',
    unitTypes: {
      'CELSIUS': {
        label: '°C',
        inputRange: {
          min: -100,
          max: 400,
          precision: 1,
          step: 0.1,
          default: 20,
        }
      },
      'KELVIN': {
        label: 'K',
        inputRange: {
          min: 173.15,
          max: 573.15,
          precision: 1,
          step: 0.1,
          default: 293.15,
        }
      }
    },
  },
  'PH': {
    label: 'pH',
    defaultUnit: 'PH',
    unitTypes: {
      'PH': {
        label: 'pH',
        inputRange: {
          min: 0,
          max: 14,
          precision: 2,
          step: 0.01,
          default: 7,
        }
      }
    }
  },
  'PRESSURE': {
    label: 'Pressure',
    defaultUnit: "MBAR",
    unitTypes: {
      'MBAR': {
        label: 'mBar',
        inputRange: {

          min: 0,
          max: 10000,
          precision: 3,
          step: 1,
          default: 1024,
        }
      }
    }
  },
  'IRRADIATION': {
    label: 'Irradiation',
    defaultUnit: 'NM',
    unitTypes: {
      'NM': {
        label: 'nm',
        inputRange: {
          min: 10,
          max: 800,
          precision: 0,
          step: 1,
          default: 254,
        }
      }
    }
  },
  'POWER': {
    label: 'Power',
    defaultUnit: 'WATT',
    unitTypes: {
      'WATT': {
        label: 'Watt',
        inputRange: {

          min: 0,
          max: 10000,
          precision: 0,
          step: 10,
          default: 1000,
        }
      }
    }
  },
  'VELOCITY': {
    label: 'Velocity',
    defaultUnit: 'MLMIN',
    unitTypes: {
      'MLMIN': {
        label: 'ml/min',
        inputRange: {
          min: 0,
          max: 100,
          precision: 1,
          step: 0.1,
          default: 0,
        }
      }
    }
  },
  'PERCENTAGE': {
    label: 'Percentage',
    defaultUnit: 'PERCENT',
    unitTypes: {
      'PERCENT':
      {
        label: '%',
        inputRange: {
          min: 0,
          max: 200, // we allow > 100% as the sample amounts are somewhat fuzzy.
          precision: 0,
          step: 1,
          default: 0,
        }
      },
      'FRACTION': {
        // experimental
        label: '[fraction]',
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
      }
    }
  },
  'MOTION': {
    label: 'Motion',
    defaultUnit: 'RPM',
    unitTypes: {
      'RPM': {
        label: 'rpm',
        inputRange: {
          min: 0,
          max: 9999,
          step: '',
          default: 500,
        }
      }
    }
  },
  'DURATION': {
    label: 'Duration',
    defaultUnit: 'MINUTES',
    unitTypes: {
      'MINUTES': {
        label: 'minutes',
        inputRange: {
          min: 0,
          max: 1440,
          precision: 0,
          step: 1,
          default: 0,
        }
      }
    }
  },
  'REPETITIONS': {
    label: 'Repetitions',
    defaultUnit: 'TIMES',
    unitTypes: {
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
  }
}

