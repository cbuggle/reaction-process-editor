export const actionTypeClusters = [
  {
    id: 'add',
    label: 'Add',
    types: [
      {
        id: 'add_sample',
        createLabel: 'Sample',
        activity: {
          activity_name: "ADD",
          workup: { acts_as: 'SAMPLE' }
        }
      },
      {
        id: 'add_solvent',
        createLabel: 'Solvent',
        activity: {
          activity_name: "ADD",
          workup: { acts_as: 'SOLVENT' }
        }
      },
      {
        id: 'add_additive',
        createLabel: 'Additive',
        activity: {
          activity_name: 'ADD',
          workup: { acts_as: 'ADDITIVE' }
        }
      },
      {
        id: 'add_medium',
        createLabel: 'Medium',
        activity: {
          activity_name: 'ADD',
          workup: { acts_as: 'MEDIUM' }
        }
      },
      {
        id: 'add_transfer',
        createLabel: 'Transfer',
        activity: {
          activity_name: 'TRANSFER',
          workup: {}
        }
      },
    ]
  },
  {
    id: 'purify',
    label: 'Separate / Purify',
    types: [
      {
        id: 'filtration',
        createLabel: 'Filtration',
        activity: {
          activity_name: 'PURIFY',
          workup: {
            purify_type: 'FILTRATION',
            automation: 'AUTOMATED',
            filtration_mode: 'KEEP_PRECIPITATE'
          }
        }
      },
      {
        id: 'extraction',
        createLabel: 'Extraction',
        activity: {
          activity_name: 'PURIFY',
          workup: {
            purify_type: 'EXTRACTION',
            automation: 'AUTOMATED',
            phase: 'ORGANIC'
          }
        }
      },
      {
        id: 'chromatography',
        createLabel: 'Chromatography',
        activity: {
          activity_name: 'PURIFY',
          workup: {
            purify_type: 'CHROMATOGRAPHY',
            automation: 'AUTOMATED',

          }
        }
      },
      {
        id: 'crystallization',
        createLabel: 'Crystallization',
        activity: {
          activity_name: 'PURIFY',
          workup: {
            purify_type: 'CRYSTALLIZATION',
            automation: 'AUTOMATED'
          }
        }
      },
    ]
  },
  {
    id: 'remove_exchange',
    label: 'Remove / Exchange',
    types: [
      {
        id: 'remove_exchange_sample',
        createLabel: 'Solvent',
        activity: {
          activity_name: 'REMOVE',
          workup: { acts_as: 'DIVERSE_SOLVENT' }
        }
      },
      {
        id: 'remove_exchange_solvent',
        createLabel: 'Additive',
        activity: {
          activity_name: 'REMOVE',
          workup: { acts_as: 'ADDITIVE' }
        }
      },
      {
        id: 'remove_exchange_medium',
        createLabel: 'Medium',
        activity: {
          activity_name: 'REMOVE',
          workup: { acts_as: 'MEDIUM' }
        }
      },
    ]
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    types: [
      {
        id: 'intermediate_analyse',
        createLabel: 'Analysis',
        activity: { activity_name: 'ANALYSIS', workup: {} }
      },
      {
        id: 'intermediate_save',
        createLabel: 'Save',
        activity: {
          activity_name: 'SAVE',
          workup: {
            intermediate_type: 'CRUDE',
            target_amount: { unit: 'ml' },
            purity: { value: 1, unit: 'PURITY' }
          }
        }
      }
    ]
  },
  {
    id: 'time',
    label: 'Time',
    types: [
      {
        id: 'time_wait',
        createLabel: 'Wait',
        activity: { activity_name: 'WAIT', workup: {} }
      }
    ]
  },
]
