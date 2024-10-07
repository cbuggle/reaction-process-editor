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

  static defaultValueForUnitType = (unitType) => unitType.inputRange.initialstep

  static defaultValueInDefaultUnit = (metricName) => this.defaultValueForUnitType(this.defaultUnitType(metricName))

  static analysisTypeLabel = (metricName) => this.metric(metricName).analysisTypeLabel

  static baseUnit = (unit) => Object.values(metrics).find(metric => metric.units.includes(unit))?.defaultUnit

  static inputRange = (unitType) => this.unitType(unitType).inputRange

  static unitType = (unit) => unitTypes[unit]

  static unitLabel = (unit) => unitTypes[unit]?.label

  static overscaledAmount = (value) => allowedAmountOverscale * value

  static infoLineAmount(amount) {
    if (amount?.value || amount?.value === 0) {
      let value = parseFloat(amount.value).toPrecision(12) / 1
      return value + ' ' + this.unitLabel(amount.unit)
    }
  }

  static infoLineAmountWithPercentage(amount) {
    return this.infoLineAmount(amount) + ' (' + parseFloat(amount?.percentage).toPrecision(3) + '%)'
  }

  static infoLineAmountWithDelta = (conditionWorkup, precondition) => {
    let info = MetricsDecorator.infoLineAmount(conditionWorkup);
    if (!!precondition) {
      let valueDiff =
        Math.round((conditionWorkup.value - precondition.value) * 100) / 100;
      if (valueDiff > 0) {
        valueDiff = "+" + valueDiff;
      }
      info += " (" + valueDiff + ")";
    }

    return info;
  };
}
