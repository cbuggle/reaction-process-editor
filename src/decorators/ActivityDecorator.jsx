import MetricsDecorator from './MetricsDecorator';
export default class ActivityDecorator {
  static toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  static cardTitle = (activity) => {
    let title = activity.action_name
    const workup = activity.workup

    if (workup && !!Object.keys(workup).length) {
      switch (activity.action_name) {
        case 'PURIFY':
          title = workup.purify_type
          break
        case 'CONDITION':
          title = 'Change Condition'
          break
        case 'ANALYSIS':
          if (workup.analysis_type) {
            title += ' ' + workup.analysis_type
          }
          break
        case 'ADD':
        case 'REMOVE':
          title += ' '
          if (workup.sample_name) {
            title += workup.sample_name
          } else {
            title += workup.acts_as === 'DIVERSE_SOLVENT' ? 'Solvent' : workup.acts_as
          }
          break
        case 'TRANSFER':
        case 'SAVE':
        case 'PAUSE':
        case 'WAIT':
        default:
          break
      }
    }
    return this.toTitleCase(title)
  }

  static conditionInfo = (metricName, conditionWorkup, precondition, selectOptions) => {
    switch (metricName) {
      case 'EQUIPMENT':
        return this.infoLineEquipment(conditionWorkup, selectOptions.equipment)
      case 'MOTION':
        return this.infoLineMotion(conditionWorkup, selectOptions)
      case 'IRRADIATION':
        return MetricsDecorator.infoLineAmount(conditionWorkup)
      default:
        return this.infoLineAmountWithDelta(conditionWorkup, precondition)

    }
  }

  static infoLineAmountWithDelta = (conditionWorkup, precondition) => {
    let info = MetricsDecorator.infoLineAmount(conditionWorkup)
    if (!!precondition) {
      let valueDiff = (Math.round((conditionWorkup.value - precondition.value) * 100) / 100)
      if (valueDiff > 0) {
        valueDiff = '+' + valueDiff
      }
      info += ' (' + valueDiff + ')'
    }

    return info;
  }

  static infoLineMotion = (conditionWorkup, selectOptions) => {
    return [
      MetricsDecorator.infoLineAmount(conditionWorkup.speed),
      selectOptions.motion_types.find(option => option.value === conditionWorkup.motion_type)?.label,
      selectOptions.automation_modes.find(option => option.value === conditionWorkup.motion_mode)?.label
    ].join(', ')
  }

  static filtrationStepInfo = (stepData, purifySolventOptions) => {
    const solventsList = stepData.solvents.map(
      solvent => purifySolventOptions.find(option => option.value === solvent.id).label
    ).join(', ')
    let ratioList = ''

    if (stepData.solvents.length > 1) {
      ratioList = '(' + stepData.solvents.map(solvent => solvent.ratio).join(':') + ')'
    }

    return [
      MetricsDecorator.infoLineAmount(stepData.repetitions),
      MetricsDecorator.infoLineAmount(stepData.amount),
      solventsList,
      ratioList
    ].join(' ')
  }

  static infoLineEquipment = (equipment, equipmentOptions) => {
    return equipment?.value && equipment.value.map((item) => (
      equipmentOptions.find((option) => option.value === item).label
    )).join(', ')
  }

  static addSampleConditionInfoLine = (workup) => {
    return ['add_sample_velocity', 'add_sample_temperature', 'add_sample_pressure'].map((metric) => {
      return (workup[metric]?.value !== undefined)
        && MetricsDecorator.infoLineAmount(workup[metric])
    }).filter((el) => el).join(', ')
  }
}
