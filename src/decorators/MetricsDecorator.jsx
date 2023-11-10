import { metrics, unitTypes } from '../constants/metrics.jsx';

export default class MetricsDecorator {
  static metric = (metricName) => metrics[metricName]

  static label = (metricName) => this.metric(metricName).label

  static unitLabel = (unit) => {
    const label = unitTypes[unit] && unitTypes[unit].label
    // The `|| unit` is for PH only which has no unit label but we want to display something
    return label || unit
  }

  static defaultAmount = (metricName) => {
    return {
      value: this.defaultValueInDefaultUnit(metricName),
      unit: this.defaultUnit(metricName)
    }
  }

  // Hardcoded defaultUnit until we implement unit switching.
  static defaultUnit = (metricName) => this.metric(metricName).defaultUnit

  // Hardcoded defaultValue in defaultUnit until we implement unit switching.
  static defaultValueInDefaultUnit = (metricName) => this.defaultValueForUnitType(this.defaultUnitType(metricName))

  static defaultUnitType = (metricName) => unitTypes[this.defaultUnit(metricName)]

  static defaultValueForUnitType = (unitType) => unitType.inputRange.initialStepValue

  static infoLineAmount(amount) {
    if (amount?.value || amount?.value === 0) {
      let value = parseFloat(amount.value).toPrecision(12) / 1
      return value + ' ' + this.unitLabel(amount.unit)
    }
  }

  static infoLineAmountWithPercentage(amount) {
    return this.infoLineAmount(amount) + ' (' + amount?.percentage + '%)'
  }
}
