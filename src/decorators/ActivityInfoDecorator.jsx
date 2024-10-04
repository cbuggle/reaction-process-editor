import MetricsDecorator from "./MetricsDecorator";
import OptionsDecorator from "./OptionsDecorator";
import StringDecorator from "./StringDecorator";
import TimeDecorator from "./TimeDecorator";

export default class ActivityInfoDecorator {
  static cardTitle = (activity) => {
    let title = activity.activity_name;
    const workup = activity.workup;

    if (workup && !!Object.keys(workup).length) {
      switch (activity.activity_name) {
        case "PURIFY":
          title = workup.purify_type;
          break;
        case "MEASUREMENT":
          title = 'Measurement ' + workup.measurement_type;
          break;
        case "CONDITION":
          title = "Change Condition";
          break;
        case "ANALYSIS":
          if (workup.analysis_type) {
            title += " " + workup.analysis_type;
          }
          break;
        case "ADD":
        case "REMOVE":
          title += " ";
          if (workup.sample_name) {
            title += workup.sample_name;
          } else {
            title += workup.origin_type
          }
          break;
        case "TRANSFER":
        case "SAVE":
        case "WAIT":
        default:
          break;
      }
    }
    return StringDecorator.toLabelSpelling(title);
  };

  static conditionInfo = (
    metricName,
    conditionWorkup,
    precondition,
    selectOptions
  ) => {
    switch (metricName) {
      case "EQUIPMENT":
        return this.infoLineEquipment(conditionWorkup, selectOptions.equipment);
      case "MOTION":
        return this.infoLineMotion(conditionWorkup, selectOptions);
      case "IRRADIATION":
        return MetricsDecorator.infoLineAmount(conditionWorkup);
      default:
        return MetricsDecorator.infoLineAmountWithDelta(conditionWorkup, precondition);
    }
  };

  static infoLineMotion = (conditionWorkup, selectOptions) => {
    return [
      OptionsDecorator.optionToLabel(
        conditionWorkup.motion_type,
        selectOptions.FORMS.MOTION.motion_types
      ),
      OptionsDecorator.optionToLabel(
        conditionWorkup.motion_mode,
        selectOptions.FORMS.MOTION.automation_modes
      ),
      MetricsDecorator.infoLineAmount(conditionWorkup.speed),
    ].join(" ");
  };

  static infoLineWavelengths = (wavelengths) => {
    return wavelengths?.peaks[0] && (
      wavelengths.is_range ?
        'Range ' + wavelengths.peaks[0]?.value + ' - ' + wavelengths.peaks.at(-1)?.value + ' nm'
        :
        '' + wavelengths.peaks.map((peak) => peak.value).join(', ') + wavelengths.peaks[0].unit
    )
  }

  static infoLineEquipment = (equipment, equipmentOptions) => {
    return (
      equipment?.value &&
      OptionsDecorator.optionsArrayToLabel(equipment.value, equipmentOptions)
    );
  };

  static infoLineAddSampleCondition = (workup) => {
    return [
      "add_sample_velocity",
      "add_sample_temperature",
      "add_sample_pressure",
    ]
      .map((metric) => {
        return (
          workup[metric]?.value !== undefined &&
          MetricsDecorator.infoLineAmount(workup[metric])
        );
      })
      .filter((el) => el)
      .join(", ");
  };

  static infoLineRemoveConditions = (conditions) => {
    return [
      MetricsDecorator.infoLineAmount(conditions?.TEMPERATURE),
      MetricsDecorator.infoLineAmount(conditions?.PRESSURE),
      conditions?.duration && TimeDecorator.timeString(conditions?.duration)
    ].filter((item) => (item)).join(", ");
  }
}
