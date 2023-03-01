
export const conditionTypes = [
  // condition_unit currently unused as we work with SI defaults only.
  {
    id: 'temperature',
    createLabel: 'Temperature',
    action: {
      action_name: "CONDITION",
      workup: {
        condition_type: 'TEMPERATURE',
        condition_tendency: 'INCREASE',
        condition_value: '20',
        condition_unit: '°C'
      },
    },
  },
  {
    id: 'pressure',
    createLabel: 'Pressure',
    action: {
      action_name: "CONDITION",
      workup: {
        condition_type: 'PRESSURE',
        condition_tendency: 'INCREASE',
        condition_value: '1000',
        condition_unit: 'mBar'
      },
    },
  },
  {
    id: 'ph',
    createLabel: 'pH Adjust',
    action: {
      action_name: "CONDITION",
      workup: {
        condition_type: 'PH',
        condition_tendency: 'INCREASE',
        condition_value: '7',
        condition_unit: 'pH'
      },
    },
  },
  {
    id: 'irradiation',
    createLabel: 'Irradiation',
    action: {
      action_name: 'CONDITION',
      workup: {
        condition_type: 'IRRADIATION',
        condition_tendency: 'INCREASE',
        condition_value: '254',
        condition_unit: 'nm'
      },
    },
  },
  {
    id: 'motion',
    createLabel: 'Motion',
    action: {
      action_name: 'CONDITION',
      workup: {
        condition_type: 'MOTION',
        motion_type: 'UNSPECIFIED',
        motion_mode: 'AUTOMATIC',
        condition_value: '1',
        condition_unit: 'RPM'
      },
    },
  }
]
