export default class OptionsDecorator {
  // Avoid issues with numerical vs. string kay by using "==", not "===".
  // eslint-disable-next-line
  static optionForValue = (value, options) => value && options?.find(option => value == option.value)

  static optionsForValues = (values, options) => options?.filter(option => values?.includes(option.value))

  static valueToLabel = (value, options) => this.optionForValue(value, options)?.label

  static valuesToLabel = (values, options) => values?.map((value) => this.valueToLabel(value, options)).join(", ")

  static toOption = (value) => { return { value: value, label: value } }

  static createUnavailableOption = (value) => value && { value: value, label: value, unavailable: true }

  static unavailableOption = (option) => { option['unavailable'] = true; return option }

  static inclusiveOptionForValue = (value, options) =>
    this.optionForValue(value, options) || this.createUnavailableOption(value)

  static inclusiveOptionsForValues = (values, options) => {
    return values ? Array.from(values).map((value) => this.inclusiveOptionForValue(value, options)) : options
  }

  static inclusiveOptions = (currentOptions, options) => {
    var newOptions = options?.slice()?.filter(e => e) || []
    Array(currentOptions)
      .filter(e => e)
      .forEach(currentOption => {
        this.optionForValue(currentOption.value, options) || newOptions.push(this.unavailableOption(currentOption))
      })
    return newOptions || []
  }

  static stationaryPhaseOption = (currentPhaseValue, phase) => {
    if (currentPhaseValue) {
      return currentPhaseValue === phase?.value ? this.toOption(currentPhaseValue) : this.createUnavailableOption(currentPhaseValue)
    } else {
      return phase || {}
    }
  }

  static stationaryPhaseOptions = (currentPhase, phase) => {
    let options = []
    phase && options.push(phase)
    currentPhase && currentPhase.value !== phase?.value && options.push(this.unavailableOption(currentPhase))
    return options
  }
}
