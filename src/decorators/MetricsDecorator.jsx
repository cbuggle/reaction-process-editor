import { metrics, unitTypes, allowedAmountOverscale } from '../constants/metrics.jsx';

export default class MetricsDecorator {
  static metric = (metricName) => metrics[metricName]

  static label = (metricName) => this.metric(metricName).label

  static units = (metricName) => this.metric(metricName).units

  static defaultAmount = (metricName) => {
    return {
      value: this.defaultValueInDefaultUnit(metricName),
      unit: this.defaultUnit(metricName)
    }
  }
  static defaultUnit = (metricName) => this.metric(metricName).defaultUnit

  static defaultUnitType = (metricName) => unitTypes[this.defaultUnit(metricName)]

  static defaultValueForUnitType = (unitType) => unitType.inputRange.initialStep

  static defaultValueInDefaultUnit = (metricName) => this.defaultValueForUnitType(this.defaultUnitType(metricName))

  static measurementTypeLabel = (metricName) => this.metric(metricName).measurementTypeLabel

  static baseUnit = (unit) => Object.values(metrics).find(metric => metric.units.includes(unit))?.defaultUnit

  static unitType = (unit) => unitTypes[unit]

  // Fallback only for PH w/o label but we want to display something
  static unitLabel = (unit) => unitTypes[unit]?.label || unit


  static overscaledAmount = (value) => allowedAmountOverscale * value

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
