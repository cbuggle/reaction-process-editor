export default class OptionsDecorator {
  // Avoid issues with numerical vs. string kay by using "==", not "===".
  // eslint-disable-next-line
  static optionForKey = (key, options) => key && options?.find((option) => key == option.value)

  static optionsForKeys = (keys, options) => options?.filter(option => keys?.includes(option.value))

  static optionToLabel = (key, options) => this.optionForKey(key, options)?.label;

  static optionsArrayToLabel = (keys, options) =>
    !!keys && keys.map((key) => this.optionToLabel(key, options)).join(", ");
}
