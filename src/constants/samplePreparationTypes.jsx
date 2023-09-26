// We re-define the preparationTypes in the Frontend for clarity in the UI-project.
// This is our well defined subset of available ORD preparationTypes which we want
// to have selectable in KIT environment.
// The values are required to match an existing OrdKit::CompoundPreparation::PreparationType
// (else the ORD export will fail). cbuggle, 26.09.2023.

export const samplePreparationOptions = [
  { value: 'DISSOLVED', label: 'Dissolved' },
  { value: 'HOMOGENIZED', label: 'Homogenized' },
  { value: 'TEMPERATURE_ADJUSTED', label: 'Temperature-Adjusted' },
  { value: 'DEGASSED', label: 'Degassed' },
  { value: 'DRIED', label: 'Drying' },
]

export const samplePreparationTypes =
  samplePreparationOptions.reduce((preparationOptions, option) => {
    preparationOptions[option.value] = option.label;
    return preparationOptions
  }, {})

