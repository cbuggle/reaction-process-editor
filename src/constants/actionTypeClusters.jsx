import { chmoId } from "./chmoId"

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
    id: 'remove_exchange',
    label: 'Remove / Exchange',
    types: [
      {
        id: 'remove_exchange_sample',
        createLabel: 'From Reaction',
        activity: {
          activity_name: 'REMOVE',
          workup: { origin_type: 'FROM_REACTION', automation: 'AUTOMATED' }
        }
      },
      {
        id: 'remove_exchange_sample',
        createLabel: 'From Reaction Step',
        activity: {
          activity_name: 'REMOVE',
          workup: { origin_type: 'FROM_REACTION_STEP', automation: 'AUTOMATED' }
        }
      },
      {
        id: 'remove_exchange_sample',
        createLabel: 'From Sample',
        activity: {
          activity_name: 'REMOVE',
          workup: { origin_type: 'FROM_SAMPLE', automation: 'AUTOMATED' }
        }
      },
      {
        id: 'remove_exchange_sample',
        createLabel: 'Diverse Solvents',
        activity: {
          activity_name: 'REMOVE',
          workup: { origin_type: 'DIVERSE_SOLVENTS', automation: 'AUTOMATED' }
        }
      },
      {
        id: 'remove_exchange_sample',
        createLabel: 'Stepwise',
        activity: {
          activity_name: 'REMOVE',
          workup: { origin_type: 'STEPWISE', automation: 'AUTOMATED' }
        }
      },
      {
        id: 'remove_exchange_sample',
        createLabel: 'From Method',
        activity: {
          activity_name: 'REMOVE',
          workup: { origin_type: 'FROM_METHOD', automation: 'AUTOMATED' }
        }
      },
    ]
  },
  {
    id: 'purification',
    label: 'Separate / Purify',
    types: [
      {
        id: 'filtration',
        createLabel: 'Filtration',
        activity: {
          activity_name: 'PURIFICATION',
          workup: {
            purification_type: 'FILTRATION',
            automation: 'AUTOMATED',
            filtration_mode: 'KEEP_PRECIPITATE'
          }
        }
      },
      {
        id: 'extraction',
        createLabel: 'Extraction',
        activity: {
          activity_name: 'PURIFICATION',
          workup: {
            purification_type: 'EXTRACTION',
            automation: 'AUTOMATED',
            phase: 'ORGANIC'
          }
        }
      },
      {
        id: 'chromatography',
        createLabel: 'Chromatography',
        activity: {
          activity_name: 'PURIFICATION',
          workup: {
            purification_type: 'CHROMATOGRAPHY', // supportive? soon unused?
            action: chmoId.action.purification,
            class: chmoId.class.chromatography,
            mode: chmoId.mode.automated
          }
        }
      },
      {
        id: 'crystallization',
        createLabel: 'Crystallization',
        activity: {
          activity_name: 'PURIFICATION',
          workup: {
            purification_type: 'CRYSTALLIZATION',
            automation: 'AUTOMATED'
          }
        }
      },
    ]
  },
  {
    id: 'analysis',
    label: 'Analysis',
    types: [
      {
        id: 'analysis_chromatography',
        createLabel: 'Chromatography',
        activity: {
          activity_name: 'ANALYSIS',
          workup: {
            analysis_type: 'CHROMATOGRAPHY', // soon unused
            action: chmoId.action.analysis,
            class: chmoId.class.chromatography,
            mode: chmoId.mode.automated
          }
        }
      },
      {
        id: 'analysis_spectroscopy',
        createLabel: 'Spectroscopy',
        activity: {
          activity_name: 'ANALYSIS',
          workup: {
            action: chmoId.action.analysis,
            class: chmoId.class.spectroscopy,
            mode: chmoId.mode.automated,
            analysis_type: 'SPECTROSCOPY'
          }
        }
      },
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
  {
    id: 'intermediate',
    label: 'Save Sample',
    types: [
      {
        id: 'intermediate_save',
        createLabel: 'Intermediate',
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
]
