import MetricsDecorator from "./MetricsDecorator";
import StringDecorator from "./StringDecorator";
import OptionsDecorator from "./OptionsDecorator";
export default class PurifyDecorator {

  static purifyStepInfo = (stepData, purifySolventOptions) => {

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

  static infoLineSolvents = (solvents) => {
    return solvents?.map((solvent) => solvent.label).join(", ")
  }

  static infoLineSolventsWithRatio = (stepData) => {
    let ratioList = "";

    if (!stepData.solvents) { return "no StepData" }
    if (stepData.solvents.length > 1) {
      ratioList = StringDecorator.brackets(
        stepData.solvents.map((solvent) => solvent.ratio).join(":")
      );
    }

    return [
      MetricsDecorator.infoLineAmount(stepData.amount),
      stepData.solvents.map((solvent) => solvent.label),
      ratioList,
    ].join(" ");

  };

  static infoLinePurifySolvents = (workup, purifySolventOptions) => {
    let infoLines = []

    if (workup.purify_type === 'CRYSTALLIZATION') {
      infoLines.push(PurifyDecorator.infoLineSolvents(workup.solvents, purifySolventOptions))
    } else { }
    let steps = workup["purify_steps"];

    if (steps) {
      for (let i = 0; i < steps.length; i++) {
        if (steps.length > 1) {
          infoLines.push("Step " + (i + 1));
        }
        infoLines.push(
          PurifyDecorator.purifyStepInfo(steps[i], purifySolventOptions)
        );
      }
    }
    return infoLines
  }
}
