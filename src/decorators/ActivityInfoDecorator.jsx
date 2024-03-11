import MetricsDecorator from "./MetricsDecorator";
import StringDecorator from "./StringDecorator";
import OptionsDecorator from "./OptionsDecorator";
export default class ActivityInfoDecorator {
  static cardTitle = (activity) => {
    let title = activity.activity_name;
    const workup = activity.workup;

    if (workup && !!Object.keys(workup).length) {
      switch (activity.activity_name) {
        case "PURIFY":
          title = workup.purify_type;
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
            title +=
              workup.acts_as === "DIVERSE_SOLVENT" ? "Solvent" : workup.acts_as;
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
        return this.infoLineAmountWithDelta(conditionWorkup, precondition);
    }
  };

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

  static infoLineMotion = (conditionWorkup, selectOptions) => {
    return [
      MetricsDecorator.infoLineAmount(conditionWorkup.speed),
      OptionsDecorator.optionToLabel(
        conditionWorkup.motion_type,
        selectOptions.motion_types
      ),
      OptionsDecorator.optionToLabel(
        conditionWorkup.motion_mode,
        selectOptions.automation_modes
      ),
    ].join(", ");
  };

  static filtrationStepInfo = (stepData, purifySolventOptions) => {

    const solventsList = OptionsDecorator.optionsArrayToLabel(
      stepData.solvents?.map((solvent) => solvent.id),
      purifySolventOptions
    );

    let ratioList = "";


    if (stepData.solvents?.length > 1) {
      ratioList = StringDecorator.brackets(
        stepData.solvents.map((solvent) => solvent.ratio).join(":")
      );
    }

    const infoStrings = [
      MetricsDecorator.infoLineAmount(stepData.amount),
      solventsList,
      ratioList,
    ];

    if (stepData.step_mode) {
      infoStrings.push(
        StringDecorator.brackets(
          StringDecorator.toLabelSpelling(stepData.step_mode)
        )
      );
    }

    if (stepData.prod_mode) {
      infoStrings.push(
        StringDecorator.brackets(
          "prod: " + StringDecorator.toLabelSpelling(stepData.prod_mode)
        )
      );
    }

    if (stepData.repetitions) {
      infoStrings.push(
        StringDecorator.brackets(
          stepData.repetitions.value +
          " " +
          MetricsDecorator.label("REPETITIONS")
        )
      );
    }

    return infoStrings.join(" ");
  };
  static chromatographyStepInfo = (stepData, purifySolventOptions) => {
    const solventsList = OptionsDecorator.optionsArrayToLabel(
      stepData.solvents.map((s) => s.id),
      purifySolventOptions
    );
    let ratioList = "";

    if (stepData.solvents.length > 1) {
      ratioList = StringDecorator.brackets(
        stepData.solvents.map((solvent) => solvent.ratio).join(":")
      );
    }

    return [
      MetricsDecorator.infoLineAmount(stepData.amount),
      solventsList,
      ratioList,
    ].join(" ");
  };

  static infoLineEquipment = (equipment, equipmentOptions) => {
    return (
      equipment?.value &&
      OptionsDecorator.optionsArrayToLabel(equipment.value, equipmentOptions)
    );
  };

  static addSampleConditionInfoLine = (workup) => {
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
}
