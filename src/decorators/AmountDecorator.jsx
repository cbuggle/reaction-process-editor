import {substanceUnitOptions} from "../constants/substanceUnitOptions";

export default class AmountDecorator {
  static measurementTypeObject = (typeName) => {
    return substanceUnitOptions.find(item => item.type === typeName)
  }
  static unitMeasurementType = (unitValue) => {
    return substanceUnitOptions.find(item => item.units.some(unit => unit.value === unitValue))
  }
  static unitScale = (unitValue) => {
    const measurementType = AmountDecorator.unitMeasurementType(unitValue)
    return measurementType.units.find(item => item.value === unitValue).scale
  }
}
