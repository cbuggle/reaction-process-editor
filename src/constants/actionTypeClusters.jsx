export const actionTypeClusters = [
  {
    id: 'add',
    label: 'Add',
    types: [
      {
        id: 'add_sample',
        createLabel: 'Sample',
        action: {
          action_name: "ADD",
          workup: { acts_as: 'SAMPLE' }
        }
      },
      {
        id: 'add_solvent',
        createLabel: 'Solvent',
        action: {
          action_name: "ADD",
          workup: { acts_as: 'SOLVENT' }
        }
      },
      {
        id: 'add_additive',
        createLabel: 'Additive',
        action: {
          action_name: 'ADD',
          workup: { acts_as: 'ADDITIVE' }
        }
      },
      {
        id: 'add_medium',
        createLabel: 'Medium',
        action: {
          action_name: 'ADD',
          workup: { acts_as: 'MEDIUM' }
        }
      },
      {
        id: 'add_transfer',
        createLabel: 'Transfer',
        action: { action_name: 'TRANSFER', workup: {} }
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
        action: { action_name: 'WAIT', workup: {} }
      },
      {
        id: 'time_pause',
        createLabel: 'Pause',
        action: { action_name: 'PAUSE', workup: {} }
      }
    ]
  },
  {
    id: 'remove_exchange',
    label: 'Remove / Exchange',
    types: [
      {
        id: 'remove_exchange_sample',
        createLabel: 'Sample',
        action: {
          action_name: 'REMOVE',
          workup: { acts_as: 'SAMPLE' }
        }
      },
      {
        id: 'remove_exchange_solvent',
        createLabel: 'Solvent',
        action: {
          action_name: 'REMOVE',
          workup: { acts_as: 'ADDITIVE' }
        }
      },
      {
        id: 'remove_exchange_medium',
        createLabel: 'Medium',
        action: {
          action_name: 'REMOVE',
          workup: { acts_as: 'MEDIUM' }
        }
      },
    ]
  },
  {
    id: 'equipment',
    label: 'Equipment',
    types: [
      {
        id: 'equipment_mount',
        createLabel: 'Mount',
        action: {
          action_name: 'EQUIP',
          workup: { mount_action: 'MOUNT' }
        }
      },
      {
        id: 'equipment_unmount',
        createLabel: 'Unmount',
        action: {
          action_name: 'EQUIP',
          workup: { mount_action: 'UNMOUNT' }
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
        action: {
          action_name: 'PURIFY',
          workup: {
            purify_type: 'FILTRATION',
            purify_automation: 'AUTOMATIC',
            filtration_mode: 'KEEP_PERMEATE'
          }
        }
      },
      {
        id: 'extraction',
        createLabel: 'Extraction',
        action: {
          action_name: 'PURIFY',
          workup: {
            purify_type: 'EXTRACTION',
            purify_automation: 'AUTOMATIC'
          }
        }
      },
      {
        id: 'chromatography',
        createLabel: 'Chromatography',
        action: {
          action_name: 'PURIFY',
          workup: {
            purify_type: 'CHROMATOGRAPHY',
            purify_automation: 'AUTOMATIC'
          }
        }
      },
      {
        id: 'crystallization',
        createLabel: 'Crystallizationn',
        action: {
          action_name: 'PURIFY',
          workup: {
            purify_type: 'CRYSTALLIZATION',
            purify_automation: 'AUTOMATIC'
          }
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
        action: { action_name: 'ANALYSIS', workup: {} }
      },
      {
        id: 'intermediate_save',
        createLabel: 'Save',
        action: {
          action_name: 'SAVE',
          workup: {
            sample: {
              intermediate_type: 'CRUDE',
              target_amount_unit: 'l',
              purity: 1
            }
          }
        }
      }
    ]
  }
]
