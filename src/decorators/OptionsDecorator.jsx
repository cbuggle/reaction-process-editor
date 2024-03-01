export default class OptionsDecorator {
  static optionToLabel = (key, options) =>
    !!key && options.find((option) => option.value === key)?.label;

  static optionsArrayToLabel = (keys, options) => {
    return (
      !!keys && keys.map((key) => this.optionToLabel(key, options)).join(", ")
    );
  };
}
