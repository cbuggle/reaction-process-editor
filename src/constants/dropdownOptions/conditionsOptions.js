export const conditionTypeOptions = [{
  label: 'Temperature',
  value: 'TEMPERATURE'
}, {
  label: 'pH',
  value: 'PH'
}, {
  label: 'Pressure',
  value: 'PRESSURE'
},
{
  label: 'Irradiation',
  value: 'IRRADIATION'
}
]

export const conditionTendencyOptions = [{
  label: 'Increase',
  value: 'INCREASE'
}, {
  label: 'Decrease',
  value: 'DECREASE'
}]

export const conditionValueRanges = {
  'TEMPERATURE': {
    min: -100,
    max: 400,
    precision: 1,
    step: 0.1,
    default: 20,
    unit: 'CELSIUS'
  },
  'PH': {
    min: 0,
    max: 14,
    precision: 2,
    step: 0.01,
    default: 7,
    unit: 'PH'
  },
  'PRESSURE': {
    min: 0,
    max: 10000,
    precision: 3,
    step: 1,
    default: 1000,
    unit: 'MILLIBAR'
  },
  'IRRADIATION': {
    min: 10,
    max: 800,
    precision: 0,
    step: 1,
    default: 254,
    unit: 'NM'
  },
  'POWER': {
    min: 0,
    max: 10000,
    precision: 0,
    step: 10,
    default: 1000,
    unit: 'WATT'
  },
  'VELOCITY': {
    min: 0,
    max: 100,
    precision: 1,
    step: 0.1,
    default: 0,
    unit: 'MLPMIN'
  },
  'REMOVE_DURATION': {
    min: 0,
    max: 1440,
    precision: 0,
    step: 1,
    default: 0
  },
  'REMOVE_REPETITIONS': {
    min: 0,
    max: 100,
    precision: 0,
    step: 1,
    default: 1
  },
}

export const conditionUnitOptions = {
  'TEMPERATURE': [{
    label: '°C',
    value: 'CELSIUS'
  }, {
    label: 'K',
    value: 'KELVIN'
  }, {
    label: '°F',
    value: 'FAHRENHEIT'
  }, {
    label: 'Unspecified',
    value: 'UNSPECIFIED'
  }],
  'PH': [{
    label: 'pH',
    value: 'PH'
  }],
  'PRESSURE': [{
    label: 'mbar',
    value: 'MILLIBAR'
  }],
  'IRRADIATION': [{
    label: 'nm',
    value: 'NM'
  }],
  'VELOCITY': [{
    label: 'ml / min',
    value: 'MLPMIN'
  }]
}

export const conditionAdditionalInformationOptions = {
  'TEMPERATURE': [
    {
      label: "Unspecified",
      value: "UNSPECIFIED"
    }, {
      label: "Custom",
      value: "CUSTOM"
    }, {
      label: "Room Temperature",
      value: "AMBIENT"
    }, {
      label: "Temp of Oil Bath",
      value: "OIL_BATH"
    }, {
      label: "Water Bath",
      value: "WATER_BATH"
    }, {
      label: "Sand Bath",
      value: "SAND_BATH"
    }, {
      label: "Ice Bath",
      value: "ICE_BATH"
    }, {
      label: "Dry Aluminium Plate",
      value: "DRY_ALUMINUM_PLATE"
    }, {
      label: "Microwave",
      value: "MICROWAVE"
    }, {
      label: "Dry Ice Bath",
      value: "DRY_ICE_BATH"
    }, {
      label: "Air Fan",
      value: "AIR_FAN"
    }, {
      label: "Liquid Nitrogen",
      value: "LIQUID_NITROGEN"
    }, {
      label: "Measurement in Reaction",
      value: "MEASUREMENT_IN_REACTION"
    }, {
      label: "Temp of other contact Media",
      value: "CONTACT_MEDIUM"
    }],
  "PH": [{
    label: "pH Electrode",
    value: "PH_ELECTRODE"
  },
  {
    label: "pH Stripe",
    value: "PH_STRIPE"
  },
  {
    label: "Other",
    value: "PH_OTHER"
  }],
  "PRESSURE": [],
  "IRRADIATION": [{
    label: "Unspecified",
    value: "UNSPECIFIED"
  }, {
    label: "LED",
    value: "LED"
  }, {
    label: "Microwave Reactor",
    value: "MICROWAVE_REACTOR"
  }, {
    label: "Lamp",
    value: "LAMP"
  }, {
    label: "Laser",
    value: "LASER"
  }, {
    label: "Custom",
    value: "CUSTOM"
  }, {
    label: "Ambient",
    value: "AMBIENT"
  }, {
    label: "Halogen Lamp",
    value: "HALOGEN_LAMP"
  }, {
    label: "Deuterium Lamp",
    value: "DEUTERIUM_LAMP"
  }, {
    label: "Solar Simulator",
    value: "SOLAR_SIMULATOR"
  }, {
    label: "Broad Spectrum",
    value: "BROAD_SPECTRUM"
  }, {
    label: "Dark",
    value: "DARK"
  }]
}
