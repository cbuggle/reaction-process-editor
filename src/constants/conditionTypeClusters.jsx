export const conditionTypeClusters = [
  {
    id: 'conditions',
    types: [
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
            condition_unit: '1000'
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
            condition_value: '1000',
            condition_unit: '1000'
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
        id: 'motion_unspecified',
        createLabel: 'Unspecified',
        action: {
          action_name: 'CONDITION',
          workup: {
            condition_type: 'MOTION',
            motion_type: 'UNSPECIFIED',
            motion_mode: 'AUTOMATIC',
            motion_speed: '1',
            motion_unit: 'RPM'
          },
        },
      },
      {
        id: 'motion_stir',
        createLabel: 'Stir',
        action: {
          action_name: 'CONDITION',
          workup: {
            condition_type: 'MOTION',
            motion_type: 'STIR_BAR',
            motion_mode: 'AUTOMATIC',
            motion_speed: '1',
            motion_unit: 'RPM'
          },
        },
      },
      {
        id: 'motion_shake',
        createLabel: 'Shake',
        action: {
          action_name: 'CONDITION',
          workup: {
            condition_type: 'MOTION',
            motion_type: 'AGITATION',
            motion_mode: 'AUTOMATIC',
            motion_speed: '1',
            motion_unit: 'RPM'
          },
        },
      },
      {
        id: 'motion_other',
        createLabel: 'Other',
        action: {
          action_name: 'CONDITION',
          workup: {
            condition_type: 'MOTION',
            motion_type: 'OTHER'
          },
        },
      },
    ]
  }
]
