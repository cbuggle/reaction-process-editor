export const substanceUnitOptions = [
  {
    type: 'unspecified',
    units: [
      {
        label: 'Unit Unspecified',
        value: 'UNSPECIFIED',
        scale: 1
      }
    ]
  }, {
    type: 'volumetric',
    maxUnit: 'ml',
    units: [
      {
        label: 'Liter',
        value: 'l',
        scale: 1
      },
      {
        label: 'Milliliter',
        value: 'ml',
        scale: 1000
      }
    ]
  }, {
    type: 'gravimetric',
    maxUnit: 'mg',
    units: [
      {
        label: 'Gram',
        value: 'g',
        scale: 1
      }, {
        label: 'Milligram',
        value: 'mg',
        scale: 1000
      }, {
        label: 'Microgram',
        value: 'mcg',
        scale: 1000000
      }
    ]
  }, {
    type: 'molar',
    maxUnit: 'mmol',
    units: [
      {
        label: 'Mol',
        value: 'mol',
        scale: 1
      }, {
        label: 'Millimol',
        value: 'mmol',
        scale: 1000
      }, {
        label: 'Micromole',
        value: 'mcmol',
        scale: 1000000
      }, {
        label: 'Nanomole',
        value: 'nmol',
        scale: 1000000000
      }
    ]
  }
]
